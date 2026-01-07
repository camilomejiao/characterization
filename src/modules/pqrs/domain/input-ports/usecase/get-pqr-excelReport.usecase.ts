import { Inject } from '@nestjs/common';
import { IPqrsRepository } from '../../output-ports/pqrs.repository';
import * as ExcelJS from 'exceljs';

export class GetPqrExcelReportUsecase {
  constructor(
    @Inject(IPqrsRepository)
    private readonly pqrsRepository: IPqrsRepository,
  ) {}

  public async handler(startDate: string, endDate: string) {
    const pqrsData = await this.pqrsRepository.getInformationDetailExcel(
      startDate,
      endDate,
    );

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('PQRS');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Fecha creación', key: 'createdAt', width: 18 },
      { header: 'usuario', key: 'affiliate', width: 25 },
      { header: 'Identificación', key: 'identification', width: 20 },
      { header: 'Tipo PQRS', key: 'pqrsType', width: 20 },
      { header: 'Estado', key: 'status', width: 18 },
      { header: 'Departamento', key: 'department', width: 20 },
      { header: 'Municipio', key: 'municipality', width: 20 },
      { header: 'Razón', key: 'reason', width: 25 },
      { header: 'EPS', key: 'eps', width: 20 },
      { header: 'Entidad', key: 'entity', width: 25 },
      { header: 'Fecha hechos', key: 'dateOfEvents', width: 15 },
      { header: 'Descripción hechos', key: 'descriptionOfEvents', width: 45 },
    ];

    sheet.addRows(
      pqrsData.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        affiliate: r.affiliate,
        identification: r.identification,
        pqrsType: r.pqrsType,
        status: r.status,
        department: r.department,
        municipality: r.municipality,
        reason: r.reason,
        eps: r.eps,
        entity: r.entity,
        dateOfEvents: r.dateOfEvents,
        descriptionOfEvents: r.descriptionOfEvents,
      })),
    );

    sheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();

    return {
      filename: `reporte_pqrs_${startDate}_a_${endDate}.xlsx`,
      buffer: Buffer.from(buffer),
    };
  }
}
