import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

//Dto
import {
  CreatePqrsDto,
  NotificationHistoryPqrsDto,
  UpdatePqrsDto,
} from './dto/pqrs.dto';

//Use Case
import { CreatePqrsUsecase } from '../../domain/input-ports/usecase/create-pqrs.usecase';
import { GetPqrsBydocumentUsecase } from '../../domain/input-ports/usecase/get-pqrs-bydocument.usecase';
import { UpdatePqrsUsecase } from '../../domain/input-ports/usecase/update-pqrs.usecase';
import { GetPqrsUsecase } from '../../domain/input-ports/usecase/get-pqrs.usecase';
import { CreateNotificationPqrsUsecase } from '../../domain/input-ports/usecase/create-notification-pqrs.usecase';
import { DeletePqrsUsecase } from '../../domain/input-ports/usecase/delete-pqrs.usecase';
import { GetPqrsDetailByIdUsecase } from '../../domain/input-ports/usecase/get-pqrs-detail-by-id.usecase';

//Entity
import { RoleEntity } from '../../../../common/entities/role.entity';
import { DepartmentEntity } from '../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../common/entities/municipality.entity';
import { PqrsEntity } from '../../../../common/entities/pqrs.entity';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    name: string;
    email: string;
    role: RoleEntity;
    department: DepartmentEntity;
    municipality: MunicipalityEntity;
    iat?: number;
    exp?: number;
  };
}

@Controller('pqrs')
export class PqrsController {
  constructor(
    @Inject(CreatePqrsUsecase)
    private readonly createPQRS: CreatePqrsUsecase,
    @Inject(GetPqrsDetailByIdUsecase)
    private readonly getPqrsDetailByIdUsecase: GetPqrsDetailByIdUsecase,
    @Inject(GetPqrsBydocumentUsecase)
    private readonly getPqrsByDocument: GetPqrsBydocumentUsecase,
    @Inject(UpdatePqrsUsecase)
    private readonly updatePQRS: UpdatePqrsUsecase,
    @Inject(GetPqrsUsecase)
    private readonly getPqrsUseCase: GetPqrsUsecase,
    @Inject(CreateNotificationPqrsUsecase)
    private readonly createNotoficationPqrsUsecase: CreateNotificationPqrsUsecase,
    @Inject(DeletePqrsUsecase)
    private readonly deletePqrsUsecase: DeletePqrsUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() pqrsDto: CreatePqrsDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(pdf)$/i }), // tipos permitidos
        ],
      }),
    )
    file: Express.Multer.File | undefined,
    @Req() req: RequestWithUser,
  ): Promise<{ data: { type: string; id: string } }> {
    const userId = req.user?.id;

    const pqrs = await this.createPQRS.handler(pqrsDto, file ?? null, userId);

    if (pqrs) {
      return {
        data: { type: 'pqrs', id: `${pqrs.id}` },
      };
    }
    throw new HttpException('PQRS not created', HttpStatus.BAD_REQUEST);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async listPqrs(): Promise<PqrsEntity[]> {
    return await this.getPqrsUseCase.handler();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getPqrs(@Param('id', ParseIntPipe) id: number) {
    return await this.getPqrsDetailByIdUsecase.handler(id);
  }

  @Get('by-identification/:identificationNumber')
  @UseGuards(AuthGuard('jwt'))
  public async getByIdentification(
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
  @UseInterceptors(FileInterceptor('file'))
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePqrsDto: UpdatePqrsDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(pdf)$/i }), // tipos permitidos
        ],
      }),
    )
    file: Express.Multer.File | undefined,
  ): Promise<{ data: { type: string; id: string } }> {
    const updatedPqrs = await this.updatePQRS.handler(
      id,
      updatePqrsDto,
      file ?? null,
    );

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

  @Post('notification/:id')
  @UseGuards(AuthGuard('jwt'))
  public async notificationPQRS(
    @Param('id', ParseIntPipe) id: number,
    @Body() notificationHistoryPqrsDto: NotificationHistoryPqrsDto,
  ): Promise<{ data: { type: string; id: string } }> {
    const notification = await this.createNotoficationPqrsUsecase.handler(
      id,
      notificationHistoryPqrsDto,
    );

    if (notification) {
      return {
        data: {
          type: 'pqrs_description',
          id: `${notification.id}`,
        },
      };
    }

    throw new HttpException(
      'PQRS Notification not created',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public async deletePqrs(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: { type: string; id: string } }> {
    const deleteId = this.deletePqrsUsecase.handler(id);

    if (deleteId) {
      return {
        data: {
          type: 'pqrs_description',
          id: `${deleteId}`,
        },
      };
    }
  }
}
