import { OrganizationEntity } from '../../../../common/entities/organization.entity';

export interface IOrganizationRepository {
  /**
   * Crea una nueva organizacion en la base de datos.
   * @param entity - Entidad de la organizacion a crear.
   * @returns La organizacion creada.
   */
  create(entity: OrganizationEntity): Promise<OrganizationEntity>;

  /**
   * Busca una organizacion por una condición específica.
   * @param condition - Condición de búsqueda (ejemplo: { id: 1 } o { name: 'organizacion123' }).
   * @returns La organizacion encontrada o null si no existe.
   */
  findOneBy(
    condition: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity | null>;

  /**
   * Obtiene una organizacion por una condición específica.
   * Similar a `findOneBy`, pero puede incluir relaciones adicionales.
   * @param condition - Condición de búsqueda.
   * @returns La organización encontrada o null.
   */
  getOrganization(
    condition: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity | null>;

  /**
   * Obtiene todos las organizaciones registrados en el sistema.
   * @returns Un array con todas las organziaciones.
   */
  findAll(): Promise<OrganizationEntity[]>;

  /**
   * Actualiza una organizacion en la base de datos.
   * @param entity - Entidad de la organizacion con los datos actualizados.
   * @returns La organizacion actualizada.
   */
  update(entity: OrganizationEntity): Promise<OrganizationEntity>;

  /**
   * Elimina una organizacion de la base de datos.
   * @param id - ID de la organizacion a eliminar.
   */
  delete(id: number): Promise<void>;

  /**
   * Habilita o deshabilita una organizacion en el sistema.
   * @param id - ID del usuario a modificar.
   * @param active - Estado a establecer (true = habilitado, false = deshabilitado).
   * @returns La organizacion actualizado con su nuevo estado.
   */
  toggleStatus(id: number, active: number): Promise<OrganizationEntity>;
}

export const IOrganizationRepository = Symbol('IOrganizationRepository');
