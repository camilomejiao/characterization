import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Population_typeEntity } from '../../src/common/entities/population_type.entity';

export class PopulationTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Population_typeEntity);

    const regs = [
      { id: 1, name: 'Habitante de la calle' },
      {
        id: 2,
        name: 'Población infantil abandonada a cargo del Instituto Colombiano de Bienestar Familiar',
      },
      { id: 4, name: 'Creador o gestor cultural' },
      { id: 5, name: 'Población con SISBEN' },
      {
        id: 6,
        name: 'Menores desvinculados del conflicto armado bajo la protección del ICBF',
      },
      {
        id: 8,
        name: 'Población desmovilizada y/o miembros del grupo armado ilegal que celebren acuerdos de paz con el Gobierno Nacional',
      },
      { id: 9, name: 'Víctimas del conflicto armado interno' },
      {
        id: 10,
        name: 'Población infantil vulnerable bajo protección de instituciones diferentes al ICBF',
      },
      { id: 11, name: 'Programa en protección a testigos' },
      { id: 12, name: 'Población en centros psiquiátricos' },
      { id: 13, name: 'Población rural migratorio' },
      { id: 14, name: 'Población reclusa a cargo de la entidad territorial' },
      { id: 15, name: 'Población rural no migratoria' },
      { id: 16, name: 'Adulto mayor en centros de protección' },
      { id: 17, name: 'Comunidades indígenas' },
      //{ id: 18, name: 'Rrom (Gitano)' },
      { id: 22, name: 'Personas en prisión domiciliaria a cargo del INPEC' },
      { id: 23, name: 'Personas que dejan de ser madres comunitarias' },
      {
        id: 24,
        name: 'Migrantes colombianos repatriados, que han retornado voluntariamente al país o han sido deportados o expulsados de territorio extranjero',
      },
      {
        id: 25,
        name: 'Adolescentes y jóvenes a cargo del ICBF en el sistema de responsabilidad penal para adolescentes',
      },
      {
        id: 27,
        name: 'Recién nacidos y menores de edad de padres no afiliados',
      },
    ];

    for (const data of regs) {
      const populationType = await repository.findOneBy({ id: data.id });

      if (!populationType) {
        await repository.insert([data]);
      }
    }
  }
}
