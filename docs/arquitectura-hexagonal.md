# Guia de Arquitectura Hexagonal para Proyectos Nuevos

## Proposito

Este documento define la arquitectura base que se debe usar al iniciar un proyecto nuevo. No describe un modulo puntual del negocio. Define la convencion que debe seguir cualquier modulo para que el codigo sea consistente, entendible y mantenible.

La idea es que cualquier desarrollador pueda abrir el proyecto y entender rapidamente:

- que va en `src/common`;
- que va en `src/modules`;
- como se estructura un modulo;
- donde van los DTOs;
- donde viven los casos de uso;
- que es un input port;
- que es un output port;
- donde se implementan los adaptadores.

## Principios base

La arquitectura sigue estos principios:

- la logica de negocio no debe depender de frameworks;
- los detalles de infraestructura deben quedar aislados;
- los controladores solo exponen el sistema hacia afuera;
- los casos de uso orquestan el negocio;
- los puertos definen contratos;
- los adaptadores implementan esos contratos;
- NestJS se usa para componer dependencias, no para mezclar capas.

## Estructura general del proyecto

```text
src/
  app.module.ts
  main.ts
  common/
  config/
  modules/
```

## Que va en `src/common`

La carpeta `src/common` contiene piezas transversales que pueden ser reutilizadas por varios modulos. No debe convertirse en una bolsa de codigo sin criterio.

En `src/common` pueden vivir:

- `entities/`
- `filters/`
- `guards/`
- `interceptors/`
- `decorators/`
- `util/`
- `constants/`
- `types/`

### `src/common/entities`

Aqui van las entidades compartidas de persistencia, por ejemplo las clases TypeORM.

Regla:

- si una entidad ORM es usada por varios modulos, puede estar en `common/entities`;
- si en el futuro el dominio necesita mayor aislamiento, se puede separar entre entidades ORM y modelos de dominio.

### `src/common/util`

Aqui van utilidades transversales, por ejemplo:

- configuracion de Swagger;
- manejo de errores;
- funciones auxiliares compartidas.

### Que no deberia ir en `src/common`

- casos de uso de negocio;
- controladores de un modulo especifico;
- logica de aplicacion que solo usa un modulo;
- repositorios concretos de un modulo particular.

## Que va en `src/modules`

`src/modules` contiene los modulos funcionales del sistema. Cada modulo representa una capacidad de negocio o un bounded context pequeno.

Ejemplos:

- `users`
- `organization`
- `affiliates`
- `pqrs`

Cada modulo debe ser autocontenido en la mayor medida posible.

## Estructura objetivo de un modulo

La estructura recomendada es esta:

```text
src/
  modules/
    example/
      example.module.ts
      adapters/
        input/
          example.controller.ts
          dto/
            create-example.dto.ts
            update-example.dto.ts
        output/
          mysql/
            example-mysql.repository.ts
          s3/
            example-file.adapter.ts
      domain/
        models/
        input-ports/
          use-cases/
            create-example.usecase.ts
            update-example.usecase.ts
            get-example.usecase.ts
            delete-example.usecase.ts
        output-ports/
          example.repository.ts
          file-storage.port.ts
```

## Responsabilidad de cada carpeta dentro del modulo

### `example.module.ts`

Es el punto de ensamblaje del modulo.

Aqui se hace:

- registro de entidades con `TypeOrmModule.forFeature(...)` si aplica;
- declaracion de controladores;
- registro de casos de uso;
- vinculacion de output ports con adaptadores concretos usando `provide` y `useClass`.

Regla:

- el `module.ts` conoce implementaciones concretas;
- el dominio no.

## `adapters/input`

Aqui van los adaptadores de entrada. Normalmente son controladores HTTP, pero tambien podrian existir consumidores de colas, listeners o handlers de eventos.

Responsabilidades:

- recibir la peticion externa;
- validar y deserializar entrada mediante DTOs;
- invocar un caso de uso;
- devolver la respuesta.

No debe contener:

- reglas de negocio complejas;
- acceso directo a base de datos;
- logica de persistencia;
- orquestacion de multiples dependencias de negocio.

### `adapters/input/dto`

Aqui van los DTOs de entrada y salida del adaptador HTTP.

Responsabilidad de los DTOs:

- definir la forma del request o response;
- aplicar validaciones de transporte con `class-validator`;
- desacoplar el contrato HTTP del dominio.

Los DTOs no son entidades de dominio.

Ejemplo:

```ts
export class CreateExampleDto {
  name: string;
  description: string;
}
```

Separacion importante:

- `DTO` representa datos del borde de entrada;
- `Use Case` representa una accion del sistema;
- `Entity` o `Model` representa una estructura del dominio o persistencia.

## `adapters/output`

Aqui van las implementaciones concretas de los puertos de salida.

Responsabilidades:

- conectarse con base de datos;
- conectarse con servicios externos;
- traducir el contrato del puerto a la tecnologia concreta.

Ejemplos:

- adaptador MySQL;
- adaptador S3;
- adaptador REST externo;
- adaptador de mensajeria.

Regla:

- aqui si puede existir dependencia a TypeORM, AWS SDK, axios, etc.

## `domain`

La carpeta `domain` contiene la logica del negocio y los contratos que necesita para funcionar. Es el centro de la arquitectura.

Dentro de `domain` se recomiendan estas carpetas:

- `models/`
- `input-ports/`
- `output-ports/`

### `domain/models`

Opcional, pero recomendable cuando el modulo tenga logica propia que no deba quedar atada a TypeORM.

Aqui pueden vivir:

- modelos de dominio;
- value objects;
- enums de negocio;
- reglas o helpers propios del dominio.

Si el proyecto aun usa directamente entidades ORM, esta carpeta puede no existir al inicio.

## `domain/input-ports`

Los input ports representan las capacidades del sistema vistas desde afuera. En esta convencion, los casos de uso son la implementacion concreta de esos input ports.

La subcarpeta recomendada es:

```text
domain/
  input-ports/
    use-cases/
```

### `domain/input-ports/use-cases`

Aqui vive la logica de aplicacion.

Responsabilidades de un caso de uso:

- ejecutar una accion del sistema;
- coordinar reglas de negocio;
- consultar o persistir informacion a traves de output ports;
- mantener el flujo del caso de uso.

Un caso de uso no debe:

- depender directamente de TypeORM;
- depender directamente de `Repository<T>`;
- depender directamente de servicios concretos externos;
- recibir objetos del framework innecesarios como `Request` o `Response`.

Ejemplo:

```ts
export class CreateExampleUsecase {
  constructor(
    @Inject(IExampleRepository)
    private readonly exampleRepository: IExampleRepository,
  ) {}

  async handler(dto: CreateExampleDto) {
    const example = new ExampleEntity(dto);
    return this.exampleRepository.create(example);
  }
}
```

## `domain/output-ports`

Los output ports son contratos que el dominio necesita para hablar con el exterior.

Ejemplos de responsabilidades:

- guardar un agregado;
- consultar un registro;
- firmar un archivo;
- enviar una notificacion;
- llamar un servicio externo.

Un output port no implementa tecnologia. Solo define el contrato.

Ejemplo:

```ts
export interface IExampleRepository {
  create(entity: ExampleEntity): Promise<ExampleEntity>;
  findById(id: number): Promise<ExampleEntity | null>;
}

export const IExampleRepository = Symbol('IExampleRepository');
```

Separacion importante:

- el output port declara que necesita el dominio;
- el adaptador de salida decide como resolverlo.

## Flujo completo de una peticion

El flujo esperado es este:

1. el cliente llama un endpoint HTTP;
2. el controller recibe el request;
3. el controller transforma y valida con DTOs;
4. el controller invoca un caso de uso;
5. el caso de uso ejecuta la logica;
6. el caso de uso llama uno o varios output ports;
7. los adaptadores implementan esos puertos;
8. la infraestructura responde;
9. el resultado vuelve al controller;
10. el controller devuelve la respuesta al cliente.

Representacion corta:

```text
Controller -> DTO -> Use Case -> Output Port -> Output Adapter -> Infraestructura
```

## Separacion entre DTOs, Use Cases, Input Ports y Output Ports

Esta es la separacion mas importante del proyecto.

### DTO

Es un objeto del borde de entrada o salida.

Se usa para:

- transportar datos;
- validar estructura;
- modelar contratos HTTP.

No se usa para:

- encapsular reglas de negocio;
- acceder a infraestructura.

### Input Port

Es la capacidad que el sistema expone al exterior.

En esta implementacion, normalmente se expresa con un caso de uso.

Ejemplos:

- crear usuario;
- actualizar organizacion;
- listar afiliados;
- generar reporte.

### Use Case

Es la implementacion del input port.

Se usa para:

- coordinar la accion;
- aplicar validaciones de negocio;
- ejecutar el flujo de la aplicacion.

### Output Port

Es el contrato de salida que el caso de uso necesita para persistencia o integraciones.

Ejemplos:

- repositorio de usuarios;
- servicio de almacenamiento de archivos;
- cliente de notificaciones.

### Output Adapter

Es la implementacion tecnica del output port.

Ejemplos:

- repositorio MySQL con TypeORM;
- adaptador S3 con AWS SDK;
- cliente HTTP a un microservicio externo.

## Ejemplo completo de modulo

### Estructura

```text
src/modules/example/
  example.module.ts
  adapters/
    input/
      example.controller.ts
      dto/
        create-example.dto.ts
    output/
      mysql/
        example-mysql.repository.ts
  domain/
    input-ports/
      use-cases/
        create-example.usecase.ts
    output-ports/
      example.repository.ts
```

### Controller

```ts
@Controller('examples')
export class ExampleController {
  constructor(
    private readonly createExampleUsecase: CreateExampleUsecase,
  ) {}

  @Post()
  create(@Body() dto: CreateExampleDto) {
    return this.createExampleUsecase.handler(dto);
  }
}
```

### DTO

```ts
export class CreateExampleDto {
  name: string;
}
```

### Output Port

```ts
export interface IExampleRepository {
  create(entity: ExampleEntity): Promise<ExampleEntity>;
}

export const IExampleRepository = Symbol('IExampleRepository');
```

### Use Case

```ts
export class CreateExampleUsecase {
  constructor(
    @Inject(IExampleRepository)
    private readonly repository: IExampleRepository,
  ) {}

  async handler(dto: CreateExampleDto) {
    const entity = new ExampleEntity(dto);
    return this.repository.create(entity);
  }
}
```

### Output Adapter

```ts
@Injectable()
export class ExampleMysqlRepository implements IExampleRepository {
  constructor(
    @InjectRepository(ExampleEntity)
    private readonly repository: Repository<ExampleEntity>,
  ) {}

  async create(entity: ExampleEntity): Promise<ExampleEntity> {
    return this.repository.save(entity);
  }
}
```

### Module

```ts
@Module({
  imports: [TypeOrmModule.forFeature([ExampleEntity])],
  controllers: [ExampleController],
  providers: [
    CreateExampleUsecase,
    {
      provide: IExampleRepository,
      useClass: ExampleMysqlRepository,
    },
  ],
})
export class ExampleModule {}
```

## Reglas de implementacion

Estas reglas deben cumplirse en todos los proyectos nuevos:

- un controller nunca debe usar `Repository<T>` directamente;
- un use case nunca debe usar TypeORM directamente;
- un use case solo depende de output ports;
- un output port no conoce NestJS ni TypeORM;
- un adaptador de salida si puede conocer infraestructura;
- el `module.ts` es quien conecta contrato con implementacion;
- los DTOs viven en la capa de entrada, no en dominio;
- los nombres de carpetas deben ser consistentes en todos los modulos.

## Convencion de nombres recomendada

Usar una sola convencion y mantenerla.

Recomendado:

- `adapters/input`
- `adapters/output`
- `domain/input-ports/use-cases`
- `domain/output-ports`
- `create-example.dto.ts`
- `create-example.usecase.ts`
- `example.repository.ts`
- `example-mysql.repository.ts`

Evitar mezclar:

- `adapter` con `adapters`;
- `usecase` con `use-cases`;
- `input` con `inputs`;
- `repository_mysql` con `mysql.repository`.

## Que probar en cada capa

### Controllers

Probar:

- validacion de request;
- codigos HTTP;
- delegacion correcta al caso de uso.

### Use Cases

Probar:

- reglas de negocio;
- escenarios felices;
- errores de validacion;
- interaccion con output ports mockeados.

### Output Adapters

Probar:

- integracion con TypeORM o servicio externo;
- mapeos;
- consultas o persistencia.

## Plantilla base para iniciar un modulo desde cero

1. crear la carpeta del modulo en `src/modules`;
2. crear `adapters/input`;
3. crear `adapters/input/dto`;
4. crear `adapters/output/<tecnologia>`;
5. crear `domain/input-ports/use-cases`;
6. crear `domain/output-ports`;
7. definir primero el output port;
8. implementar el caso de uso;
9. implementar el controller;
10. implementar el adaptador concreto;
11. registrar todo en el `module.ts`;
12. agregar pruebas.

## Decision final

Esta es la convencion que debe replicarse en cualquier proyecto nuevo basado en esta arquitectura:

- `src/common` para piezas transversales;
- `src/modules` para capacidades de negocio;
- `adapters/input` para entrada al sistema;
- `domain/input-ports/use-cases` para logica de aplicacion;
- `domain/output-ports` para contratos de salida;
- `adapters/output` para implementaciones concretas;
- `module.ts` para composicion de dependencias.

Si esta separacion se mantiene, el proyecto conserva bajo acoplamiento, mejor testabilidad y una estructura facil de replicar.
