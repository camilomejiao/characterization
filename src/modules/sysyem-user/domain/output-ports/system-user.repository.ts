import { SystemUsersEntity } from '../../../../common/entities/system-users.entity';

export interface ISystemUserRepository {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param entity - Entidad del usuario a crear.
   * @returns El usuario creado.
   */
  create(entity: SystemUsersEntity): Promise<SystemUsersEntity>;

  /**
   * Busca un usuario por una condición específica.
   * @param condition - Condición de búsqueda (ejemplo: { id: 1 } o { email: 'test@example.com' }).
   * @returns El usuario encontrado o null si no existe.
   */
  findOneBy(
    condition: Partial<SystemUsersEntity>,
  ): Promise<SystemUsersEntity | null>;

  /**
   * Obtiene un usuario por una condición específica.
   * Similar a `findOneBy`, pero puede incluir relaciones adicionales.
   * @param condition - Condición de búsqueda.
   * @returns El usuario encontrado o null.
   */
  getUser(
    condition: Partial<SystemUsersEntity>,
  ): Promise<SystemUsersEntity | null>;

  /**
   * Obtiene todos los usuarios registrados en el sistema.
   * @returns Un array con todos los usuarios.
   */
  findAll(): Promise<SystemUsersEntity[]>;

  /**
   * Actualiza un usuario en la base de datos.
   * @param entity - Entidad del usuario con los datos actualizados.
   * @returns El usuario actualizado.
   */
  update(entity: SystemUsersEntity): Promise<SystemUsersEntity>;

  /**
   * Elimina un usuario de la base de datos.
   * @param id - ID del usuario a eliminar.
   */
  delete(id: number): Promise<void>;

  /**
   * Habilita o deshabilita un usuario en el sistema.
   * @param id - ID del usuario a modificar.
   * @param active - Estado a establecer (true = habilitado, false = deshabilitado).
   * @returns El usuario actualizado con su nuevo estado.
   */
  toggleStatus(id: number, active: number): Promise<SystemUsersEntity>;
}

export const ISystemUserRepository = Symbol('ISystemUserRepository');
