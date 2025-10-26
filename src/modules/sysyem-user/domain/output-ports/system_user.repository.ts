import { System_usersEntity } from '../../../../common/entities/system_users.entity';

export interface ISystemUserRepository {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param entity - Entidad del usuario a crear.
   * @returns El usuario creado.
   */
  create(entity: System_usersEntity): Promise<System_usersEntity>;

  /**
   * Busca un usuario por una condición específica.
   * @param condition - Condición de búsqueda (ejemplo: { id: 1 } o { email: 'test@example.com' }).
   * @returns El usuario encontrado o null si no existe.
   */
  findOneBy(
    condition: Partial<System_usersEntity>,
  ): Promise<System_usersEntity | null>;

  /**
   * Obtiene un usuario por una condición específica.
   * Similar a `findOneBy`, pero puede incluir relaciones adicionales.
   * @param condition - Condición de búsqueda.
   * @returns El usuario encontrado o null.
   */
  getUser(
    condition: Partial<System_usersEntity>,
  ): Promise<System_usersEntity | null>;

  /**
   * Obtiene todos los usuarios registrados en el sistema.
   * @returns Un array con todos los usuarios.
   */
  findAll(): Promise<System_usersEntity[]>;

  /**
   * Actualiza un usuario en la base de datos.
   * @param entity - Entidad del usuario con los datos actualizados.
   * @returns El usuario actualizado.
   */
  update(entity: System_usersEntity): Promise<System_usersEntity>;

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
  toggleStatus(id: number, active: number): Promise<System_usersEntity>;
}

export const ISystemUserRepository = Symbol('ISystemUserRepository');
