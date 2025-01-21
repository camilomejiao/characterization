import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Dto
import { CreatePqrsDto, UpdatePqrsDto } from './dto/pqrs.dto';

//Use Case
import { CreatePqrsUsecase } from '../../domain/input-ports/usecase/create-pqrs.usecase';
import { GetPqrsByIdUsecase } from '../../domain/input-ports/usecase/get-pqrs-by-id.usecase';
import { GetPqrsBydocumentUsecase } from '../../domain/input-ports/usecase/get-pqrs-bydocument.usecase';
import { UpdatePqrsUsecase } from '../../domain/input-ports/usecase/update-pqrs.usecase';

@Controller('pqrs')
export class PqrsController {
  constructor(
    @Inject(CreatePqrsUsecase)
    private readonly createPQRS: CreatePqrsUsecase,
    @Inject(GetPqrsByIdUsecase)
    private readonly getPqrsById: GetPqrsByIdUsecase,
    @Inject(GetPqrsBydocumentUsecase)
    private readonly getPqrsByDocument: GetPqrsBydocumentUsecase,
    @Inject(UpdatePqrsUsecase)
    private readonly updatePQRS: UpdatePqrsUsecase,
  ) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() pqrsDto: CreatePqrsDto,
  ): Promise<{ data: { type: string; id: string } }> {
    const pqrs = await this.createPQRS.handler(pqrsDto);

    if (pqrs) {
      return {
        data: {
          type: 'pqrs',
          id: `${pqrs.id}`,
        },
      };
    }
    throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: any }> {
    const pqrs = await this.getPqrsById.handler(id);

    if (pqrs) {
      return { data: pqrs };
    }

    throw new HttpException('PQRS not found', HttpStatus.NOT_FOUND);
  }

  @Get('by-identification/:identificationNumber')
  @UseGuards(AuthGuard('jwt'))
  public async getByCedula(
    @Param('identificationNumber') identificationNumber: number,
  ): Promise<{ data: any }> {
    const pqrsList = await this.getPqrsByDocument.handler(identificationNumber);

    if (pqrsList.length > 0) {
      return { data: pqrsList };
    }

    throw new HttpException('No PQRS found for the user', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePqrsDto: UpdatePqrsDto,
  ): Promise<{ data: { type: string; id: string } }> {
    const updatedPqrs = await this.updatePQRS.handler(id, updatePqrsDto);

    if (updatedPqrs) {
      return {
        data: {
          type: 'pqrs',
          id: `${updatedPqrs.id}`,
        },
      };
    }

    throw new HttpException('PQRS not updated', HttpStatus.BAD_REQUEST);
  }
}
