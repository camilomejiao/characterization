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
  Post,
  Put,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//Dto
import { Create_organizationDto } from './dto/create_organization.dto';
import { Update_organizationDto } from './dto/update_organization.dto';
//Usecase
import { Create_organizationUsecase } from '../../domain/input-ports/use-case/create_organization.usecase';
import { ListOrganizationUsecase } from '../../domain/input-ports/use-case/list_organization.usecase';
import { DeleteOrganizationUsecase } from '../../domain/input-ports/use-case/delete_organization.usecase';
import { UpdateOrganziationUsecase } from '../../domain/input-ports/use-case/update_organziation.usecase';
import { ToogleOrganizationUsecase } from '../../domain/input-ports/use-case/toogle_organization.usecase';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject(Create_organizationUsecase)
    private readonly CreateOrganizationUsecase: Create_organizationUsecase,
    @Inject(ListOrganizationUsecase)
    private readonly listOrganizationUsecase: ListOrganizationUsecase,
    @Inject(UpdateOrganziationUsecase)
    private readonly updateOrganziationUsecase: UpdateOrganziationUsecase,
    @Inject(DeleteOrganizationUsecase)
    private readonly deleteOrganizationUsecase: DeleteOrganizationUsecase,
    @Inject(ToogleOrganizationUsecase)
    private readonly toogleOrganizationUsecase: ToogleOrganizationUsecase,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() createOrganizationDto: Create_organizationDto,
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
    try {
      const organization = await this.CreateOrganizationUsecase.handler(
        createOrganizationDto,
        file ?? null,
      );

      if (!organization) {
        throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      }

      return {
        data: {
          type: 'organization',
          id: `${organization.id}`,
        },
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  public async listOrganizations() {
    return await this.listOrganizationUsecase.handler();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async getOrganization(@Param('id') id: number) {
    return await this.listOrganizationUsecase.getById(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  public async updateUser(
    @Param('id') id: number,
    @Body() UpdateOrganizationDto: Update_organizationDto,
  ) {
    return await this.updateOrganziationUsecase.handler(
      id,
      UpdateOrganizationDto,
    );
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  public async deleteUser(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    await this.deleteOrganizationUsecase.handler(id);
    return {
      message: 'Organization deleted successfully',
    };
  }

  @Put('toggle-status/:id')
  @UseGuards(AuthGuard('jwt'))
  public async toggleStatus(
    @Param('id') id: number,
    @Body() body: { status: number },
  ) {
    return await this.toogleOrganizationUsecase.handler(id, body.status);
  }
}
