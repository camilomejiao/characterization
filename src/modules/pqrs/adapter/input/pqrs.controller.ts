import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Header,
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
  StreamableFile,
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
import { Create_pqrsUsecase } from '../../domain/input-ports/usecase/create_pqrs.usecase';
import { Get_pqrs_by_documentUsecase } from '../../domain/input-ports/usecase/get_pqrs_by_document.usecase';
import { Update_pqrsUsecase } from '../../domain/input-ports/usecase/update_pqrs.usecase';
import { Get_pqrsUsecase } from '../../domain/input-ports/usecase/get_pqrs.usecase';
import { Create_notification_pqrsUsecase } from '../../domain/input-ports/usecase/create_notification_pqrs.usecase';
import { Delete_pqrsUsecase } from '../../domain/input-ports/usecase/delete_pqrs.usecase';
import { GetPqrsDetailByIdUsecase } from '../../domain/input-ports/usecase/get-pqrs-detail-by-id.usecase';

//Entity
import { RoleEntity } from '../../../../common/entities/role.entity';
import { DepartmentEntity } from '../../../../common/entities/department.entity';
import { MunicipalityEntity } from '../../../../common/entities/municipality.entity';
import { PqrsEntity } from '../../../../common/entities/pqrs.entity';
import { GetPqrExcelReportUsecase } from '../../domain/input-ports/usecase/get-pqr-excelReport.usecase';

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
    @Inject(Create_pqrsUsecase)
    private readonly createPQRS: Create_pqrsUsecase,
    @Inject(GetPqrsDetailByIdUsecase)
    private readonly getPqrsDetailByIdUsecase: GetPqrsDetailByIdUsecase,
    @Inject(Get_pqrs_by_documentUsecase)
    private readonly getPqrsByDocument: Get_pqrs_by_documentUsecase,
    @Inject(Update_pqrsUsecase)
    private readonly updatePQRS: Update_pqrsUsecase,
    @Inject(Get_pqrsUsecase)
    private readonly getPqrsUseCase: Get_pqrsUsecase,
    @Inject(Create_notification_pqrsUsecase)
    private readonly createNotoficationPqrsUsecase: Create_notification_pqrsUsecase,
    @Inject(Delete_pqrsUsecase)
    private readonly deletePqrsUsecase: Delete_pqrsUsecase,
    @Inject(GetPqrExcelReportUsecase)
    private readonly getPqrExcelReportUsecase: GetPqrExcelReportUsecase,
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
  ): Promise<{ type: string; data: any }> {
    const pqrsList = await this.getPqrsByDocument.handler(identificationNumber);

    if (pqrsList.length > 0) {
      return {
        type: 'pqrs',
        data: pqrsList,
      };
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

  @Get('report-information-pqrs/:start/:end')
  @UseGuards(AuthGuard('jwt'))
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  public async getReportPqrsExcel(
    @Param('start') start: string,
    @Param('end') end: string,
  ) {
    const file = await this.getPqrExcelReportUsecase.handler(start, end);

    return new StreamableFile(file.buffer, {
      disposition: `attachment; filename="${file.filename}"`,
    });
  }
}
