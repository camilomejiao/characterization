import { UnprocessableEntityException } from '@nestjs/common';

export class ValidateFileNameUsecase {
  constructor() {}

  public async handler(fileName: string, regime: 'S' | 'C', period: string) {
    // MS202510 | MSCM202510 | MC202510 | MCCM202510
    const re = /^(MS(CM)?|MC(CM)?)\d{6}$/;
    if (!re.test(fileName)) {
      throw new UnprocessableEntityException('Nombre de archivo inválido');
    }

    // Verifica que el prefijo coincida con el régimen elegido
    const isSubs = fileName.startsWith('MS');
    const isContr = fileName.startsWith('MC');
    if ((regime === 'S' && !isSubs) || (regime === 'C' && !isContr)) {
      throw new UnprocessableEntityException(
        'Régimen no coincide con el nombre del archivo',
      );
    }

    // Verifica que el período AAAAMM del nombre coincida con dto.period
    const filePeriod = fileName.slice(-6);
    if (filePeriod !== period) {
      throw new UnprocessableEntityException(
        'El período no coincide con el nombre del archivo',
      );
    }
  }
}
