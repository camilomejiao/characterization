import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BulkAffiliateDto } from '../../../../adapters/input/dto/dataBulk.dto';
import { UserEntity } from '../../../../../../common/entities/user.entity';
import { AffiliatesEntity } from '../../../../../../common/entities/affiliate.entity';
import { IAffiliateRepository } from '../../../output-ports/affiliate.repository';
import { ValidateFileNameUsecase } from './validate_file_name.usecase';
import { ValidateMonthlyUploadsUsecase } from './validate_monthly_uploads.usecase';
import { ValidateDiffUserUsecase } from './validate_diff_user.usecase';
import { ValidateDiffAffiliateUsecase } from './validate_diff_affiliate.usecase';
import { LmaUsecase } from './lma.usecase';
import { AffiliateHistoryUsecase } from './affiliate_history.usecase';
import { UpsertUploadFileUsecase } from './upsert_upload_file.usecase';

export class BulkAffiliateUsecase {
  private readonly logger = new Logger(BulkAffiliateUsecase.name);

  constructor(
    private readonly dataSource: DataSource,
    @Inject(IAffiliateRepository)
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly validateFileNameUsecase: ValidateFileNameUsecase,
    private readonly validateMonthlyUploadsUsecase: ValidateMonthlyUploadsUsecase,
    private readonly validateDiffUserUsecase: ValidateDiffUserUsecase,
    private readonly validateDiffAffiliateUsecase: ValidateDiffAffiliateUsecase,
    private readonly lmaUsecase: LmaUsecase,
    private readonly affiliateHistoryUsecase: AffiliateHistoryUsecase,
    private readonly upsertUploadFileUsecase: UpsertUploadFileUsecase,
  ) {}

  public async handler(dto: BulkAffiliateDto) {
    try {
      await this.validateFileNameUsecase.handler(
        dto.fileName,
        dto.regime,
        dto.period,
      );

      if (!dto.rows?.length) {
        throw new BadRequestException('Archivo vacío');
      }

      await this.validateMonthlyUploadsUsecase.handler(dto.organizationId);

      const summary = {
        total: dto.rows.length,
        success: 0,
        userUpdated: 0,
        affiliateUpdated: 0,
        lmaInserted: 0,
        notFoundUsers: [] as Array<{ identificationNumber: number }>,
        usersWithoutAffiliate: [] as Array<{ identificationNumber: number }>,
        skippedLmaWithoutAffiliate: [] as Array<{
          identificationNumber: number;
        }>,
        rowErrors: [] as Array<{
          index: number;
          identificationNumber?: number;
          message: string;
        }>,
      };

      const BATCH = 500;

      for (let i = 0; i < dto.rows.length; i += BATCH) {
        const chunk = dto.rows.slice(i, i + BATCH);
        const chunkNumbers = Array.from(
          new Set(chunk.map((r) => r.identificationNumber)),
        );

        const map = await this.affiliateRepo.findUsersAndAffiliatesByIdNumbers(
          //Number(dto.organizationId),
          Number(2),
          chunkNumbers,
        );

        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();

        console.log('map: ', map);

        try {
          for (let k = 0; k < chunk.length; k++) {
            const row = chunk[k];
            const globalIndex = i + k;

            this.logger.debug(
              `➡️ Procesando fila ${globalIndex} (${row.identificationNumber})`,
            );

            const entry = map.get(row.identificationNumber)!;

            console.log('entry: ', entry);

            if (!entry?.user) {
              summary.notFoundUsers.push({
                identificationNumber: row.identificationNumber,
              });
              continue;
            }

            if (!entry.affiliate) {
              summary.usersWithoutAffiliate.push({
                identificationNumber: row.identificationNumber,
              });
              continue;
            }

            try {
              // ====== USER DIFF ======
              const userPatch = await this.validateDiffUserUsecase.handler(
                entry.user,
                row,
              );

              if (userPatch && Object.keys(userPatch).length) {
                const updateUserPatch =
                  this.sanitizePatchForUpdate<UserEntity>(userPatch);

                await qr.manager.update(
                  UserEntity,
                  { id: entry.user.id },
                  updateUserPatch,
                );
                summary.userUpdated++;

                const changes = this.describeDiff(
                  userPatch,
                  entry.user,
                  this.USER_FIELD_LABELS,
                );

                this.logger.debug(
                  `➡️ Procesando changes ${changes} (${row.identificationNumber})`,
                );

                for (const description of changes) {
                  await this.affiliateHistoryUsecase.handler(
                    qr.manager,
                    entry.affiliate.id,
                    description,
                  );
                }
              }

              // ====== AFFILIATE DIFF ======
              const affPatch = await this.validateDiffAffiliateUsecase.handler(
                entry.affiliate,
                row,
              );

              if (affPatch && Object.keys(affPatch).length) {
                const updateAffPatch =
                  this.sanitizePatchForUpdate<AffiliatesEntity>(affPatch);
                await qr.manager.update(
                  AffiliatesEntity,
                  { id: entry.affiliate.id },
                  updateAffPatch,
                );
                summary.affiliateUpdated++;

                const changesAff = this.describeDiff(
                  affPatch,
                  entry.affiliate,
                  this.AFF_FIELD_LABELS,
                );

                for (const description of changesAff) {
                  await this.affiliateHistoryUsecase.handler(
                    qr.manager,
                    entry.affiliate.id,
                    description,
                  );
                }
              }

              // ====== LMA ======
              if (
                entry.affiliate?.id &&
                row.valorLMA !== undefined &&
                row.valorLMA !== null
              ) {
                await this.lmaUsecase.handler(
                  qr.manager,
                  entry.affiliate.id,
                  dto.period,
                  row.valorLMA,
                );
                summary.lmaInserted++;
              } else {
                summary.skippedLmaWithoutAffiliate.push({
                  identificationNumber: row.identificationNumber,
                });
              }

              summary.success++;
            } catch (e: any) {
              // ⛔️ Error específico en ESTA fila → detenemos todo
              this.logger.error(
                `❌ Error procesando fila ${globalIndex} (${row.identificationNumber}): ${e?.message}`,
                e?.stack,
              );

              summary.rowErrors.push({
                index: globalIndex,
                identificationNumber: row.identificationNumber,
                message: e?.message ?? 'Error de proceso',
              });

              // rollback del chunk completo
              await qr.rollbackTransaction();

              // lanzamos 400 hacia el controller con el summary actualizado
              throw new BadRequestException({
                message: `Error al procesar la fila ${globalIndex} (id=${row.identificationNumber})`,
                summary,
              });
            }
          }

          await qr.commitTransaction();
        } finally {
          await qr.release();
        }
      }

      // Si llegó aquí, no hubo errores de filas
      await this.upsertUploadFileUsecase.handler(
        this.dataSource,
        dto.organizationId,
        dto.userId,
        dto.fileName,
        dto.period,
      );

      return summary;
    } catch (error: any) {
      this.logger.error(
        `💥 [BulkAffiliateUsecase.handler] Error inesperado: ${error.name} - ${error.message}`,
        error.stack,
      );

      // Si ya es BadRequestException (con summary y todo) la dejamos igual
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Cualquier otra cosa la envolvemos genéricamente
      throw new BadRequestException(
        `Error interno en carga masiva: ${error.message}`,
      );
    }
  }

  //
  private sanitizePatchForUpdate<T extends object>(
    patch: Partial<T>,
  ): Partial<T> {
    const out: any = {};

    for (const [key, value] of Object.entries(patch)) {
      if (value && typeof value === 'object' && 'id' in value) {
        out[key] = { id: (value as any).id };
      } else {
        out[key] = value;
      }
    }

    return out;
  }

  //
  private USER_FIELD_LABELS: Record<string, string> = {
    firstName: 'Primer nombre',
    middleName: 'Segundo nombre',
    firstLastName: 'Primer apellido',
    middleLastName: 'Segundo apellido',
    birthdate: 'Fecha de nacimiento',
    email: 'Correo electrónico',
    phoneNumber: 'Teléfono',
    neighborhood: 'Barrio o vereda',
    address: 'Dirección',
    country: 'País',
    department: 'Departamento',
    municipality: 'Municipio',
    area: 'Zona',
    sex: 'Sexo',
  };

  //
  private AFF_FIELD_LABELS: Record<string, string> = {
    sisbenNumber: 'Número ficha SISBEN',
    dateOfAffiliated: 'Fecha de afiliación',
    populationType: 'Tipo de población',
    eps: 'EPS',
    affiliatedState: 'Estado de afiliación',
    level: 'Nivel SISBEN',
    groupSubgroup: 'Grupo y subgrupo',
  };

  /*
   *
   */
  private formatValue(value: any): string {
    if (value === null || value === undefined) return '(sin valor)';

    // Si es objeto (relación)
    if (typeof value === 'object') {
      // intenta usar campos "bonitos"
      if ('name' in value && value.name) return String(value.name);
      if ('description' in value && value.description)
        return String(value.description);
      if ('cod' in value && value.cod) return String(value.cod);
      if ('code' in value && value.code) return String(value.code);
      if ('id' in value && value.id) return String(value.id);

      return JSON.stringify(value);
    }

    return String(value);
  }

  /*
   *
   */
  private describeDiff(
    patch: Record<string, any>,
    original: Record<string, any>,
    labels: Record<string, string>,
  ): string[] {
    const fields = Object.keys(patch);
    if (!fields.length) return [];

    const changes: string[] = [];

    for (const field of fields) {
      const newValue = patch[field];
      const oldValue = original[field];

      const label = labels[field] ?? field;

      const beforeText = this.formatValue(oldValue);
      const afterText = this.formatValue(newValue);

      changes.push(
        `Se realizó cambio en el campo ${label}: antes=${beforeText}, ahora=${afterText}`,
      );
    }

    return changes;
  }
}
