import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System_usersEntity } from '../../../../common/entities/system_users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(System_usersEntity)
    private userRepository: Repository<System_usersEntity>,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    // Validar las credenciales del usuario
    const user = await this.validateCredentials(email, password);
    // Generar el token JWT
    const token = this.generateJwtToken(user);
    // Construir la respuesta
    return this.buildResponse(user, token);
  }

  // Método auxiliar para validar credenciales
  private async validateCredentials(
    email: string,
    password: string,
  ): Promise<System_usersEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        role: true,
        organization: {
          department: true,
          municipality: true,
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  // Método auxiliar para generar el token JWT
  private generateJwtToken(user: System_usersEntity): string {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization.id,
      organization_info: user.organization,
    };
    return this.jwtService.sign(payload);
  }

  // Método auxiliar para construir la respuesta
  private buildResponse(user: System_usersEntity, token: string): any {
    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization.id,
        organization_info: user.organization,
      },
    };
  }
}
