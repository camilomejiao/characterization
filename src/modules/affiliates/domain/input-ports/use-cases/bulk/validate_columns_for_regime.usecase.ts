import { UnprocessableEntityException } from '@nestjs/common';

export class ValidateColumnsForRegimeUsecase {
  constructor() {}

  public async handler(sampleRow: any, regime: 'S' | 'C') {
    const normalize = (s: string) =>
      s?.toString().trim().toUpperCase().replace(/\s+/g, ' ');
    const keys = Object.keys(sampleRow).map(normalize);
    const has = (k: string) => keys.includes(normalize(k));

    const required =
      regime === 'S' ? this.SUBSIDIZED_COLUMNS : this.CONTRIBUTIVE_COLUMNS;
    const missing = required.filter((k) => !has(k));

    if (missing.length) {
      throw new UnprocessableEntityException(
        `Columnas faltantes para régimen ${regime}: ${missing.join(', ')}`,
      );
    }
  }

  SUBSIDIZED_COLUMNS = [
    'TIPO_DOCUMENTO',
    'IDENTIFICACION',
    'PRIMER_NOMBRE',
    'SEGUNDO_NOMBRE',
    'PRIMER_APELLIDO',
    'SEGUNDO_APELLIDO',
    'FECHA_NACIMIENTO',
    'SEXO',
    'PAIS',
    'EPS',
    'TIPO_POBLACION',
    'CODIGO_DPTO',
    'CODIGO_MUN',
    'ESTADO',
    'LMA',
  ];

  CONTRIBUTIVE_COLUMNS = [
    'TIPO_DOCUMENTO',
    'IDENTIFICACION',
    'PRIMER_NOMBRE',
    'SEGUNDO_NOMBRE',
    'PRIMER_APELLIDO',
    'SEGUNDO_APELLIDO',
    'FECHA_NACIMIENTO',
    'SEXO',
    'PAIS',
    'EPS',
    'TIPO_POBLACION',
    'CODIGO_DPTO',
    'CODIGO_MUN',
    'ESTADO',
  ];
}
