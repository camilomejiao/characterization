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
      if (!dto.rows?.length) throw new BadRequestException('Archivo vacío');

      await this.validateMonthlyUploadsUsecase.handler(
        dto.organizationId,
        dto.period,
      );

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
        rowErrors: [] as Array<{ index: number; message: string }>,
      };

      const BATCH = 500;
      for (let i = 0; i < dto.rows.length; i += BATCH) {
        const chunk = dto.rows.slice(i, i + BATCH);
        const chunkNumbers = Array.from(
          new Set(chunk.map((r) => r.identificationNumber)),
        );

        const map = await this.affiliateRepo.findUsersAndAffiliatesByIdNumbers(
          Number(dto.organizationId),
          chunkNumbers,
        );

        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();

        try {
          for (let k = 0; k < chunk.length; k++) {
            const row = chunk[k];
            const entry = map.get(row.identificationNumber)!;
            this.logger.debug(
              `➡️ Procesando fila ${i + k} (${row.identificationNumber})`,
            );

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

            // User diff
            const userPatch = await this.validateDiffUserUsecase.handler(
              entry.user,
              row,
            );
            this.logger.debug(
              `✅ DiffUser ${row.identificationNumber}: ${JSON.stringify(userPatch)}`,
            );

            if (Object.keys(userPatch).length) {
              await qr.manager.update(
                UserEntity,
                { id: entry.user.id },
                userPatch,
              );
              summary.userUpdated++;
              await this.affiliateHistoryUsecase.handler(
                qr.manager,
                entry.affiliate.id,
                this.describeDiff('USER', userPatch),
              );
            }

            // Affiliate diff
            const affPatch = await this.validateDiffAffiliateUsecase.handler(
              entry.affiliate,
              row,
            );
            this.logger.debug(
              `✅ DiffAffiliate ${row.identificationNumber}: ${JSON.stringify(affPatch)}`,
            );

            if (Object.keys(affPatch).length) {
              await qr.manager.update(
                AffiliatesEntity,
                { id: entry.affiliate.id },
                affPatch,
              );
              summary.affiliateUpdated++;
              await this.affiliateHistoryUsecase.handler(
                qr.manager,
                entry.affiliate.id,
                this.describeDiff('AFFILIATE', affPatch),
              );
            }

            // LMA
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
          }

          await qr.commitTransaction();
        } catch (e: any) {
          await qr.rollbackTransaction();
          this.logger.error(
            `❌ Error en fila ${i} (chunk): ${e.message}`,
            e.stack,
          );
          summary.rowErrors.push({
            index: i,
            message: e?.message ?? 'Error de proceso',
          });
        } finally {
          await qr.release();
        }
      }

      await this.upsertUploadFileUsecase.handler(
        this.dataSource,
        dto.organizationId,
        dto.userId,
        dto.fileName,
        dto.period,
      );

      return summary;
    } catch (error) {
      this.logger.error(
        `💥 [BulkAffiliateUsecase.handler] Error inesperado: ${error.name} - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        `Error interno en carga masiva: ${error.message}`,
      );
    }
  }

  private describeDiff(
    scope: 'USER' | 'AFFILIATE',
    patch: Record<string, any>,
  ): string {
    const fields = Object.keys(patch);
    if (!fields.length) return `${scope}: sin cambios`;
    return `${scope}: ${fields.join(', ')} actualizado(s)`;
  }
}
