
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuarios
 * 
 */
export type Usuarios = $Result.DefaultSelection<Prisma.$UsuariosPayload>
/**
 * Model Clientes
 * 
 */
export type Clientes = $Result.DefaultSelection<Prisma.$ClientesPayload>
/**
 * Model Produtos
 * 
 */
export type Produtos = $Result.DefaultSelection<Prisma.$ProdutosPayload>
/**
 * Model Categorias
 * 
 */
export type Categorias = $Result.DefaultSelection<Prisma.$CategoriasPayload>
/**
 * Model Pedidos
 * 
 */
export type Pedidos = $Result.DefaultSelection<Prisma.$PedidosPayload>
/**
 * Model ItensPedido
 * 
 */
export type ItensPedido = $Result.DefaultSelection<Prisma.$ItensPedidoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuarios.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuarios.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuarios`: Exposes CRUD operations for the **Usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): Prisma.UsuariosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clientes`: Exposes CRUD operations for the **Clientes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.clientes.findMany()
    * ```
    */
  get clientes(): Prisma.ClientesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produtos`: Exposes CRUD operations for the **Produtos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produtos.findMany()
    * ```
    */
  get produtos(): Prisma.ProdutosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categorias`: Exposes CRUD operations for the **Categorias** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categorias.findMany()
    * ```
    */
  get categorias(): Prisma.CategoriasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidos`: Exposes CRUD operations for the **Pedidos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedidos.findMany()
    * ```
    */
  get pedidos(): Prisma.PedidosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itensPedido`: Exposes CRUD operations for the **ItensPedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItensPedidos
    * const itensPedidos = await prisma.itensPedido.findMany()
    * ```
    */
  get itensPedido(): Prisma.ItensPedidoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuarios: 'Usuarios',
    Clientes: 'Clientes',
    Produtos: 'Produtos',
    Categorias: 'Categorias',
    Pedidos: 'Pedidos',
    ItensPedido: 'ItensPedido'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuarios" | "clientes" | "produtos" | "categorias" | "pedidos" | "itensPedido"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuarios: {
        payload: Prisma.$UsuariosPayload<ExtArgs>
        fields: Prisma.UsuariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>
          }
          findFirst: {
            args: Prisma.UsuariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>
          }
          findMany: {
            args: Prisma.UsuariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>[]
          }
          create: {
            args: Prisma.UsuariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>
          }
          createMany: {
            args: Prisma.UsuariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuariosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>[]
          }
          delete: {
            args: Prisma.UsuariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>
          }
          update: {
            args: Prisma.UsuariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>
          }
          deleteMany: {
            args: Prisma.UsuariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuariosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>[]
          }
          upsert: {
            args: Prisma.UsuariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuariosPayload>
          }
          aggregate: {
            args: Prisma.UsuariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuarios>
          }
          groupBy: {
            args: Prisma.UsuariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuariosCountArgs<ExtArgs>
            result: $Utils.Optional<UsuariosCountAggregateOutputType> | number
          }
        }
      }
      Clientes: {
        payload: Prisma.$ClientesPayload<ExtArgs>
        fields: Prisma.ClientesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>
          }
          findFirst: {
            args: Prisma.ClientesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>
          }
          findMany: {
            args: Prisma.ClientesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>[]
          }
          create: {
            args: Prisma.ClientesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>
          }
          createMany: {
            args: Prisma.ClientesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>[]
          }
          delete: {
            args: Prisma.ClientesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>
          }
          update: {
            args: Prisma.ClientesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>
          }
          deleteMany: {
            args: Prisma.ClientesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>[]
          }
          upsert: {
            args: Prisma.ClientesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientesPayload>
          }
          aggregate: {
            args: Prisma.ClientesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientes>
          }
          groupBy: {
            args: Prisma.ClientesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientesGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientesCountArgs<ExtArgs>
            result: $Utils.Optional<ClientesCountAggregateOutputType> | number
          }
        }
      }
      Produtos: {
        payload: Prisma.$ProdutosPayload<ExtArgs>
        fields: Prisma.ProdutosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProdutosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProdutosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>
          }
          findFirst: {
            args: Prisma.ProdutosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProdutosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>
          }
          findMany: {
            args: Prisma.ProdutosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>[]
          }
          create: {
            args: Prisma.ProdutosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>
          }
          createMany: {
            args: Prisma.ProdutosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProdutosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>[]
          }
          delete: {
            args: Prisma.ProdutosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>
          }
          update: {
            args: Prisma.ProdutosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>
          }
          deleteMany: {
            args: Prisma.ProdutosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProdutosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProdutosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>[]
          }
          upsert: {
            args: Prisma.ProdutosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutosPayload>
          }
          aggregate: {
            args: Prisma.ProdutosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProdutos>
          }
          groupBy: {
            args: Prisma.ProdutosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProdutosCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutosCountAggregateOutputType> | number
          }
        }
      }
      Categorias: {
        payload: Prisma.$CategoriasPayload<ExtArgs>
        fields: Prisma.CategoriasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>
          }
          findFirst: {
            args: Prisma.CategoriasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>
          }
          findMany: {
            args: Prisma.CategoriasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>[]
          }
          create: {
            args: Prisma.CategoriasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>
          }
          createMany: {
            args: Prisma.CategoriasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>[]
          }
          delete: {
            args: Prisma.CategoriasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>
          }
          update: {
            args: Prisma.CategoriasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>
          }
          deleteMany: {
            args: Prisma.CategoriasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>[]
          }
          upsert: {
            args: Prisma.CategoriasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriasPayload>
          }
          aggregate: {
            args: Prisma.CategoriasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategorias>
          }
          groupBy: {
            args: Prisma.CategoriasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriasGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriasCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriasCountAggregateOutputType> | number
          }
        }
      }
      Pedidos: {
        payload: Prisma.$PedidosPayload<ExtArgs>
        fields: Prisma.PedidosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          findFirst: {
            args: Prisma.PedidosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          findMany: {
            args: Prisma.PedidosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>[]
          }
          create: {
            args: Prisma.PedidosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          createMany: {
            args: Prisma.PedidosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>[]
          }
          delete: {
            args: Prisma.PedidosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          update: {
            args: Prisma.PedidosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          deleteMany: {
            args: Prisma.PedidosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PedidosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>[]
          }
          upsert: {
            args: Prisma.PedidosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          aggregate: {
            args: Prisma.PedidosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidos>
          }
          groupBy: {
            args: Prisma.PedidosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidosGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidosCountArgs<ExtArgs>
            result: $Utils.Optional<PedidosCountAggregateOutputType> | number
          }
        }
      }
      ItensPedido: {
        payload: Prisma.$ItensPedidoPayload<ExtArgs>
        fields: Prisma.ItensPedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItensPedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItensPedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>
          }
          findFirst: {
            args: Prisma.ItensPedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItensPedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>
          }
          findMany: {
            args: Prisma.ItensPedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>[]
          }
          create: {
            args: Prisma.ItensPedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>
          }
          createMany: {
            args: Prisma.ItensPedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItensPedidoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>[]
          }
          delete: {
            args: Prisma.ItensPedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>
          }
          update: {
            args: Prisma.ItensPedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>
          }
          deleteMany: {
            args: Prisma.ItensPedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItensPedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItensPedidoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>[]
          }
          upsert: {
            args: Prisma.ItensPedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItensPedidoPayload>
          }
          aggregate: {
            args: Prisma.ItensPedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItensPedido>
          }
          groupBy: {
            args: Prisma.ItensPedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItensPedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItensPedidoCountArgs<ExtArgs>
            result: $Utils.Optional<ItensPedidoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuarios?: UsuariosOmit
    clientes?: ClientesOmit
    produtos?: ProdutosOmit
    categorias?: CategoriasOmit
    pedidos?: PedidosOmit
    itensPedido?: ItensPedidoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuariosCountOutputType
   */

  export type UsuariosCountOutputType = {
    Pedidos: number
  }

  export type UsuariosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Pedidos?: boolean | UsuariosCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuariosCountOutputType
     */
    select?: UsuariosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidosWhereInput
  }


  /**
   * Count Type ClientesCountOutputType
   */

  export type ClientesCountOutputType = {
    Pedidos: number
  }

  export type ClientesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Pedidos?: boolean | ClientesCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * ClientesCountOutputType without action
   */
  export type ClientesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientesCountOutputType
     */
    select?: ClientesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientesCountOutputType without action
   */
  export type ClientesCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidosWhereInput
  }


  /**
   * Count Type ProdutosCountOutputType
   */

  export type ProdutosCountOutputType = {
    itensPedidoVenda: number
  }

  export type ProdutosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itensPedidoVenda?: boolean | ProdutosCountOutputTypeCountItensPedidoVendaArgs
  }

  // Custom InputTypes
  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutosCountOutputType
     */
    select?: ProdutosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeCountItensPedidoVendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItensPedidoWhereInput
  }


  /**
   * Count Type CategoriasCountOutputType
   */

  export type CategoriasCountOutputType = {
    produtos: number
  }

  export type CategoriasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | CategoriasCountOutputTypeCountProdutosArgs
  }

  // Custom InputTypes
  /**
   * CategoriasCountOutputType without action
   */
  export type CategoriasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriasCountOutputType
     */
    select?: CategoriasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriasCountOutputType without action
   */
  export type CategoriasCountOutputTypeCountProdutosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutosWhereInput
  }


  /**
   * Count Type PedidosCountOutputType
   */

  export type PedidosCountOutputType = {
    itensPedidoVenda: number
  }

  export type PedidosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itensPedidoVenda?: boolean | PedidosCountOutputTypeCountItensPedidoVendaArgs
  }

  // Custom InputTypes
  /**
   * PedidosCountOutputType without action
   */
  export type PedidosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidosCountOutputType
     */
    select?: PedidosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidosCountOutputType without action
   */
  export type PedidosCountOutputTypeCountItensPedidoVendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItensPedidoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuarios
   */

  export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  export type UsuariosAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuariosSumAggregateOutputType = {
    id: number | null
  }

  export type UsuariosMinAggregateOutputType = {
    id: number | null
    nome: string | null
    usuario: string | null
    senha: string | null
    email: string | null
    status: boolean | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type UsuariosMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    usuario: string | null
    senha: string | null
    email: string | null
    status: boolean | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type UsuariosCountAggregateOutputType = {
    id: number
    nome: number
    usuario: number
    senha: number
    email: number
    status: number
    data_criacao: number
    data_alteracao: number
    _all: number
  }


  export type UsuariosAvgAggregateInputType = {
    id?: true
  }

  export type UsuariosSumAggregateInputType = {
    id?: true
  }

  export type UsuariosMinAggregateInputType = {
    id?: true
    nome?: true
    usuario?: true
    senha?: true
    email?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type UsuariosMaxAggregateInputType = {
    id?: true
    nome?: true
    usuario?: true
    senha?: true
    email?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type UsuariosCountAggregateInputType = {
    id?: true
    nome?: true
    usuario?: true
    senha?: true
    email?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
    _all?: true
  }

  export type UsuariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to aggregate.
     */
    where?: UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuariosOrderByWithRelationInput | UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType
  }

  export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios[P]>
      : GetScalarType<T[P], AggregateUsuarios[P]>
  }




  export type UsuariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuariosWhereInput
    orderBy?: UsuariosOrderByWithAggregationInput | UsuariosOrderByWithAggregationInput[]
    by: UsuariosScalarFieldEnum[] | UsuariosScalarFieldEnum
    having?: UsuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuariosCountAggregateInputType | true
    _avg?: UsuariosAvgAggregateInputType
    _sum?: UsuariosSumAggregateInputType
    _min?: UsuariosMinAggregateInputType
    _max?: UsuariosMaxAggregateInputType
  }

  export type UsuariosGroupByOutputType = {
    id: number
    nome: string
    usuario: string
    senha: string
    email: string
    status: boolean
    data_criacao: Date
    data_alteracao: Date
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  type GetUsuariosGroupByPayload<T extends UsuariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type UsuariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    usuario?: boolean
    senha?: boolean
    email?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    Pedidos?: boolean | Usuarios$PedidosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuarios"]>

  export type UsuariosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    usuario?: boolean
    senha?: boolean
    email?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type UsuariosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    usuario?: boolean
    senha?: boolean
    email?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }, ExtArgs["result"]["usuarios"]>

  export type UsuariosSelectScalar = {
    id?: boolean
    nome?: boolean
    usuario?: boolean
    senha?: boolean
    email?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }

  export type UsuariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "usuario" | "senha" | "email" | "status" | "data_criacao" | "data_alteracao", ExtArgs["result"]["usuarios"]>
  export type UsuariosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Pedidos?: boolean | Usuarios$PedidosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuariosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuariosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuarios"
    objects: {
      Pedidos: Prisma.$PedidosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      usuario: string
      senha: string
      email: string
      status: boolean
      data_criacao: Date
      data_alteracao: Date
    }, ExtArgs["result"]["usuarios"]>
    composites: {}
  }

  type UsuariosGetPayload<S extends boolean | null | undefined | UsuariosDefaultArgs> = $Result.GetResult<Prisma.$UsuariosPayload, S>

  type UsuariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuariosCountAggregateInputType | true
    }

  export interface UsuariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuarios'], meta: { name: 'Usuarios' } }
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {UsuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuariosFindUniqueArgs>(args: SelectSubset<T, UsuariosFindUniqueArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuariosFindUniqueOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuariosFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuariosFindFirstArgs>(args?: SelectSubset<T, UsuariosFindFirstArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosFindFirstOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuariosFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuariosFindManyArgs>(args?: SelectSubset<T, UsuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuarios.
     * @param {UsuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     * 
     */
    create<T extends UsuariosCreateArgs>(args: SelectSubset<T, UsuariosCreateArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuariosCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuariosCreateManyArgs>(args?: SelectSubset<T, UsuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuariosCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuariosCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuariosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuarios.
     * @param {UsuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     * 
     */
    delete<T extends UsuariosDeleteArgs>(args: SelectSubset<T, UsuariosDeleteArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuarios.
     * @param {UsuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuariosUpdateArgs>(args: SelectSubset<T, UsuariosUpdateArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuariosDeleteManyArgs>(args?: SelectSubset<T, UsuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuariosUpdateManyArgs>(args: SelectSubset<T, UsuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuariosUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuariosUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuariosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuarios.
     * @param {UsuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends UsuariosUpsertArgs>(args: SelectSubset<T, UsuariosUpsertArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuariosCountArgs>(
      args?: Subset<T, UsuariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuariosAggregateArgs>(args: Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>

    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuariosGroupByArgs['orderBy'] }
        : { orderBy?: UsuariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuarios model
   */
  readonly fields: UsuariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Pedidos<T extends Usuarios$PedidosArgs<ExtArgs> = {}>(args?: Subset<T, Usuarios$PedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuarios model
   */
  interface UsuariosFieldRefs {
    readonly id: FieldRef<"Usuarios", 'Int'>
    readonly nome: FieldRef<"Usuarios", 'String'>
    readonly usuario: FieldRef<"Usuarios", 'String'>
    readonly senha: FieldRef<"Usuarios", 'String'>
    readonly email: FieldRef<"Usuarios", 'String'>
    readonly status: FieldRef<"Usuarios", 'Boolean'>
    readonly data_criacao: FieldRef<"Usuarios", 'DateTime'>
    readonly data_alteracao: FieldRef<"Usuarios", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuarios findUnique
   */
  export type UsuariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where: UsuariosWhereUniqueInput
  }

  /**
   * Usuarios findUniqueOrThrow
   */
  export type UsuariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where: UsuariosWhereUniqueInput
  }

  /**
   * Usuarios findFirst
   */
  export type UsuariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuariosOrderByWithRelationInput | UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * Usuarios findFirstOrThrow
   */
  export type UsuariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuariosOrderByWithRelationInput | UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * Usuarios findMany
   */
  export type UsuariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuariosOrderByWithRelationInput | UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * Usuarios create
   */
  export type UsuariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuarios.
     */
    data: XOR<UsuariosCreateInput, UsuariosUncheckedCreateInput>
  }

  /**
   * Usuarios createMany
   */
  export type UsuariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuariosCreateManyInput | UsuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuarios createManyAndReturn
   */
  export type UsuariosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuariosCreateManyInput | UsuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuarios update
   */
  export type UsuariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuarios.
     */
    data: XOR<UsuariosUpdateInput, UsuariosUncheckedUpdateInput>
    /**
     * Choose, which Usuarios to update.
     */
    where: UsuariosWhereUniqueInput
  }

  /**
   * Usuarios updateMany
   */
  export type UsuariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuariosUpdateManyMutationInput, UsuariosUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuariosWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuarios updateManyAndReturn
   */
  export type UsuariosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuariosUpdateManyMutationInput, UsuariosUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuariosWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuarios upsert
   */
  export type UsuariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuarios to update in case it exists.
     */
    where: UsuariosWhereUniqueInput
    /**
     * In case the Usuarios found by the `where` argument doesn't exist, create a new Usuarios with this data.
     */
    create: XOR<UsuariosCreateInput, UsuariosUncheckedCreateInput>
    /**
     * In case the Usuarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuariosUpdateInput, UsuariosUncheckedUpdateInput>
  }

  /**
   * Usuarios delete
   */
  export type UsuariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
    /**
     * Filter which Usuarios to delete.
     */
    where: UsuariosWhereUniqueInput
  }

  /**
   * Usuarios deleteMany
   */
  export type UsuariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuariosWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuarios.Pedidos
   */
  export type Usuarios$PedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    where?: PedidosWhereInput
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    cursor?: PedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Usuarios without action
   */
  export type UsuariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuarios
     */
    select?: UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuarios
     */
    omit?: UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuariosInclude<ExtArgs> | null
  }


  /**
   * Model Clientes
   */

  export type AggregateClientes = {
    _count: ClientesCountAggregateOutputType | null
    _avg: ClientesAvgAggregateOutputType | null
    _sum: ClientesSumAggregateOutputType | null
    _min: ClientesMinAggregateOutputType | null
    _max: ClientesMaxAggregateOutputType | null
  }

  export type ClientesAvgAggregateOutputType = {
    id: number | null
  }

  export type ClientesSumAggregateOutputType = {
    id: number | null
  }

  export type ClientesMinAggregateOutputType = {
    id: number | null
    nome: string | null
    apelido: string | null
    endereco: string | null
    fone: string | null
    status: boolean | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type ClientesMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    apelido: string | null
    endereco: string | null
    fone: string | null
    status: boolean | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type ClientesCountAggregateOutputType = {
    id: number
    nome: number
    apelido: number
    endereco: number
    fone: number
    status: number
    data_criacao: number
    data_alteracao: number
    _all: number
  }


  export type ClientesAvgAggregateInputType = {
    id?: true
  }

  export type ClientesSumAggregateInputType = {
    id?: true
  }

  export type ClientesMinAggregateInputType = {
    id?: true
    nome?: true
    apelido?: true
    endereco?: true
    fone?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type ClientesMaxAggregateInputType = {
    id?: true
    nome?: true
    apelido?: true
    endereco?: true
    fone?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type ClientesCountAggregateInputType = {
    id?: true
    nome?: true
    apelido?: true
    endereco?: true
    fone?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
    _all?: true
  }

  export type ClientesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to aggregate.
     */
    where?: ClientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClientesOrderByWithRelationInput | ClientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClientesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientesMaxAggregateInputType
  }

  export type GetClientesAggregateType<T extends ClientesAggregateArgs> = {
        [P in keyof T & keyof AggregateClientes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientes[P]>
      : GetScalarType<T[P], AggregateClientes[P]>
  }




  export type ClientesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientesWhereInput
    orderBy?: ClientesOrderByWithAggregationInput | ClientesOrderByWithAggregationInput[]
    by: ClientesScalarFieldEnum[] | ClientesScalarFieldEnum
    having?: ClientesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientesCountAggregateInputType | true
    _avg?: ClientesAvgAggregateInputType
    _sum?: ClientesSumAggregateInputType
    _min?: ClientesMinAggregateInputType
    _max?: ClientesMaxAggregateInputType
  }

  export type ClientesGroupByOutputType = {
    id: number
    nome: string
    apelido: string | null
    endereco: string | null
    fone: string | null
    status: boolean
    data_criacao: Date
    data_alteracao: Date
    _count: ClientesCountAggregateOutputType | null
    _avg: ClientesAvgAggregateOutputType | null
    _sum: ClientesSumAggregateOutputType | null
    _min: ClientesMinAggregateOutputType | null
    _max: ClientesMaxAggregateOutputType | null
  }

  type GetClientesGroupByPayload<T extends ClientesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientesGroupByOutputType[P]>
            : GetScalarType<T[P], ClientesGroupByOutputType[P]>
        }
      >
    >


  export type ClientesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    apelido?: boolean
    endereco?: boolean
    fone?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    Pedidos?: boolean | Clientes$PedidosArgs<ExtArgs>
    _count?: boolean | ClientesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientes"]>

  export type ClientesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    apelido?: boolean
    endereco?: boolean
    fone?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }, ExtArgs["result"]["clientes"]>

  export type ClientesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    apelido?: boolean
    endereco?: boolean
    fone?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }, ExtArgs["result"]["clientes"]>

  export type ClientesSelectScalar = {
    id?: boolean
    nome?: boolean
    apelido?: boolean
    endereco?: boolean
    fone?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }

  export type ClientesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "apelido" | "endereco" | "fone" | "status" | "data_criacao" | "data_alteracao", ExtArgs["result"]["clientes"]>
  export type ClientesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Pedidos?: boolean | Clientes$PedidosArgs<ExtArgs>
    _count?: boolean | ClientesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clientes"
    objects: {
      Pedidos: Prisma.$PedidosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      apelido: string | null
      endereco: string | null
      fone: string | null
      status: boolean
      data_criacao: Date
      data_alteracao: Date
    }, ExtArgs["result"]["clientes"]>
    composites: {}
  }

  type ClientesGetPayload<S extends boolean | null | undefined | ClientesDefaultArgs> = $Result.GetResult<Prisma.$ClientesPayload, S>

  type ClientesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientesCountAggregateInputType | true
    }

  export interface ClientesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clientes'], meta: { name: 'Clientes' } }
    /**
     * Find zero or one Clientes that matches the filter.
     * @param {ClientesFindUniqueArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientesFindUniqueArgs>(args: SelectSubset<T, ClientesFindUniqueArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clientes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientesFindUniqueOrThrowArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientesFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesFindFirstArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientesFindFirstArgs>(args?: SelectSubset<T, ClientesFindFirstArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clientes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesFindFirstOrThrowArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientesFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientesFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.clientes.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.clientes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientesWithIdOnly = await prisma.clientes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientesFindManyArgs>(args?: SelectSubset<T, ClientesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clientes.
     * @param {ClientesCreateArgs} args - Arguments to create a Clientes.
     * @example
     * // Create one Clientes
     * const Clientes = await prisma.clientes.create({
     *   data: {
     *     // ... data to create a Clientes
     *   }
     * })
     * 
     */
    create<T extends ClientesCreateArgs>(args: SelectSubset<T, ClientesCreateArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClientesCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const clientes = await prisma.clientes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientesCreateManyArgs>(args?: SelectSubset<T, ClientesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clientes and returns the data saved in the database.
     * @param {ClientesCreateManyAndReturnArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const clientes = await prisma.clientes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clientes and only return the `id`
     * const clientesWithIdOnly = await prisma.clientes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientesCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clientes.
     * @param {ClientesDeleteArgs} args - Arguments to delete one Clientes.
     * @example
     * // Delete one Clientes
     * const Clientes = await prisma.clientes.delete({
     *   where: {
     *     // ... filter to delete one Clientes
     *   }
     * })
     * 
     */
    delete<T extends ClientesDeleteArgs>(args: SelectSubset<T, ClientesDeleteArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clientes.
     * @param {ClientesUpdateArgs} args - Arguments to update one Clientes.
     * @example
     * // Update one Clientes
     * const clientes = await prisma.clientes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientesUpdateArgs>(args: SelectSubset<T, ClientesUpdateArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClientesDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.clientes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientesDeleteManyArgs>(args?: SelectSubset<T, ClientesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const clientes = await prisma.clientes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientesUpdateManyArgs>(args: SelectSubset<T, ClientesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes and returns the data updated in the database.
     * @param {ClientesUpdateManyAndReturnArgs} args - Arguments to update many Clientes.
     * @example
     * // Update many Clientes
     * const clientes = await prisma.clientes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clientes and only return the `id`
     * const clientesWithIdOnly = await prisma.clientes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientesUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clientes.
     * @param {ClientesUpsertArgs} args - Arguments to update or create a Clientes.
     * @example
     * // Update or create a Clientes
     * const clientes = await prisma.clientes.upsert({
     *   create: {
     *     // ... data to create a Clientes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clientes we want to update
     *   }
     * })
     */
    upsert<T extends ClientesUpsertArgs>(args: SelectSubset<T, ClientesUpsertArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.clientes.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClientesCountArgs>(
      args?: Subset<T, ClientesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientesAggregateArgs>(args: Subset<T, ClientesAggregateArgs>): Prisma.PrismaPromise<GetClientesAggregateType<T>>

    /**
     * Group by Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientesGroupByArgs['orderBy'] }
        : { orderBy?: ClientesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clientes model
   */
  readonly fields: ClientesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clientes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Pedidos<T extends Clientes$PedidosArgs<ExtArgs> = {}>(args?: Subset<T, Clientes$PedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Clientes model
   */
  interface ClientesFieldRefs {
    readonly id: FieldRef<"Clientes", 'Int'>
    readonly nome: FieldRef<"Clientes", 'String'>
    readonly apelido: FieldRef<"Clientes", 'String'>
    readonly endereco: FieldRef<"Clientes", 'String'>
    readonly fone: FieldRef<"Clientes", 'String'>
    readonly status: FieldRef<"Clientes", 'Boolean'>
    readonly data_criacao: FieldRef<"Clientes", 'DateTime'>
    readonly data_alteracao: FieldRef<"Clientes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clientes findUnique
   */
  export type ClientesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where: ClientesWhereUniqueInput
  }

  /**
   * Clientes findUniqueOrThrow
   */
  export type ClientesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where: ClientesWhereUniqueInput
  }

  /**
   * Clientes findFirst
   */
  export type ClientesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClientesOrderByWithRelationInput | ClientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClientesScalarFieldEnum | ClientesScalarFieldEnum[]
  }

  /**
   * Clientes findFirstOrThrow
   */
  export type ClientesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClientesOrderByWithRelationInput | ClientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClientesScalarFieldEnum | ClientesScalarFieldEnum[]
  }

  /**
   * Clientes findMany
   */
  export type ClientesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClientesOrderByWithRelationInput | ClientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    distinct?: ClientesScalarFieldEnum | ClientesScalarFieldEnum[]
  }

  /**
   * Clientes create
   */
  export type ClientesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * The data needed to create a Clientes.
     */
    data: XOR<ClientesCreateInput, ClientesUncheckedCreateInput>
  }

  /**
   * Clientes createMany
   */
  export type ClientesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClientesCreateManyInput | ClientesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clientes createManyAndReturn
   */
  export type ClientesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * The data used to create many Clientes.
     */
    data: ClientesCreateManyInput | ClientesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clientes update
   */
  export type ClientesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * The data needed to update a Clientes.
     */
    data: XOR<ClientesUpdateInput, ClientesUncheckedUpdateInput>
    /**
     * Choose, which Clientes to update.
     */
    where: ClientesWhereUniqueInput
  }

  /**
   * Clientes updateMany
   */
  export type ClientesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClientesUpdateManyMutationInput, ClientesUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClientesWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Clientes updateManyAndReturn
   */
  export type ClientesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClientesUpdateManyMutationInput, ClientesUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClientesWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Clientes upsert
   */
  export type ClientesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * The filter to search for the Clientes to update in case it exists.
     */
    where: ClientesWhereUniqueInput
    /**
     * In case the Clientes found by the `where` argument doesn't exist, create a new Clientes with this data.
     */
    create: XOR<ClientesCreateInput, ClientesUncheckedCreateInput>
    /**
     * In case the Clientes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientesUpdateInput, ClientesUncheckedUpdateInput>
  }

  /**
   * Clientes delete
   */
  export type ClientesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
    /**
     * Filter which Clientes to delete.
     */
    where: ClientesWhereUniqueInput
  }

  /**
   * Clientes deleteMany
   */
  export type ClientesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClientesWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Clientes.Pedidos
   */
  export type Clientes$PedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    where?: PedidosWhereInput
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    cursor?: PedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Clientes without action
   */
  export type ClientesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clientes
     */
    select?: ClientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clientes
     */
    omit?: ClientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientesInclude<ExtArgs> | null
  }


  /**
   * Model Produtos
   */

  export type AggregateProdutos = {
    _count: ProdutosCountAggregateOutputType | null
    _avg: ProdutosAvgAggregateOutputType | null
    _sum: ProdutosSumAggregateOutputType | null
    _min: ProdutosMinAggregateOutputType | null
    _max: ProdutosMaxAggregateOutputType | null
  }

  export type ProdutosAvgAggregateOutputType = {
    id: number | null
    idCategoria: number | null
    preco: Decimal | null
  }

  export type ProdutosSumAggregateOutputType = {
    id: number | null
    idCategoria: number | null
    preco: Decimal | null
  }

  export type ProdutosMinAggregateOutputType = {
    id: number | null
    idCategoria: number | null
    descricao: string | null
    preco: Decimal | null
    status: boolean | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type ProdutosMaxAggregateOutputType = {
    id: number | null
    idCategoria: number | null
    descricao: string | null
    preco: Decimal | null
    status: boolean | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type ProdutosCountAggregateOutputType = {
    id: number
    idCategoria: number
    descricao: number
    preco: number
    status: number
    data_criacao: number
    data_alteracao: number
    _all: number
  }


  export type ProdutosAvgAggregateInputType = {
    id?: true
    idCategoria?: true
    preco?: true
  }

  export type ProdutosSumAggregateInputType = {
    id?: true
    idCategoria?: true
    preco?: true
  }

  export type ProdutosMinAggregateInputType = {
    id?: true
    idCategoria?: true
    descricao?: true
    preco?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type ProdutosMaxAggregateInputType = {
    id?: true
    idCategoria?: true
    descricao?: true
    preco?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type ProdutosCountAggregateInputType = {
    id?: true
    idCategoria?: true
    descricao?: true
    preco?: true
    status?: true
    data_criacao?: true
    data_alteracao?: true
    _all?: true
  }

  export type ProdutosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produtos to aggregate.
     */
    where?: ProdutosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutosOrderByWithRelationInput | ProdutosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProdutosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produtos
    **/
    _count?: true | ProdutosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutosMaxAggregateInputType
  }

  export type GetProdutosAggregateType<T extends ProdutosAggregateArgs> = {
        [P in keyof T & keyof AggregateProdutos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProdutos[P]>
      : GetScalarType<T[P], AggregateProdutos[P]>
  }




  export type ProdutosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutosWhereInput
    orderBy?: ProdutosOrderByWithAggregationInput | ProdutosOrderByWithAggregationInput[]
    by: ProdutosScalarFieldEnum[] | ProdutosScalarFieldEnum
    having?: ProdutosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutosCountAggregateInputType | true
    _avg?: ProdutosAvgAggregateInputType
    _sum?: ProdutosSumAggregateInputType
    _min?: ProdutosMinAggregateInputType
    _max?: ProdutosMaxAggregateInputType
  }

  export type ProdutosGroupByOutputType = {
    id: number
    idCategoria: number | null
    descricao: string
    preco: Decimal
    status: boolean
    data_criacao: Date
    data_alteracao: Date
    _count: ProdutosCountAggregateOutputType | null
    _avg: ProdutosAvgAggregateOutputType | null
    _sum: ProdutosSumAggregateOutputType | null
    _min: ProdutosMinAggregateOutputType | null
    _max: ProdutosMaxAggregateOutputType | null
  }

  type GetProdutosGroupByPayload<T extends ProdutosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutosGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutosGroupByOutputType[P]>
        }
      >
    >


  export type ProdutosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCategoria?: boolean
    descricao?: boolean
    preco?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    categoria?: boolean | Produtos$categoriaArgs<ExtArgs>
    itensPedidoVenda?: boolean | Produtos$itensPedidoVendaArgs<ExtArgs>
    _count?: boolean | ProdutosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produtos"]>

  export type ProdutosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCategoria?: boolean
    descricao?: boolean
    preco?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    categoria?: boolean | Produtos$categoriaArgs<ExtArgs>
  }, ExtArgs["result"]["produtos"]>

  export type ProdutosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCategoria?: boolean
    descricao?: boolean
    preco?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    categoria?: boolean | Produtos$categoriaArgs<ExtArgs>
  }, ExtArgs["result"]["produtos"]>

  export type ProdutosSelectScalar = {
    id?: boolean
    idCategoria?: boolean
    descricao?: boolean
    preco?: boolean
    status?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }

  export type ProdutosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idCategoria" | "descricao" | "preco" | "status" | "data_criacao" | "data_alteracao", ExtArgs["result"]["produtos"]>
  export type ProdutosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | Produtos$categoriaArgs<ExtArgs>
    itensPedidoVenda?: boolean | Produtos$itensPedidoVendaArgs<ExtArgs>
    _count?: boolean | ProdutosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProdutosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | Produtos$categoriaArgs<ExtArgs>
  }
  export type ProdutosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | Produtos$categoriaArgs<ExtArgs>
  }

  export type $ProdutosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Produtos"
    objects: {
      categoria: Prisma.$CategoriasPayload<ExtArgs> | null
      itensPedidoVenda: Prisma.$ItensPedidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      idCategoria: number | null
      descricao: string
      preco: Prisma.Decimal
      status: boolean
      data_criacao: Date
      data_alteracao: Date
    }, ExtArgs["result"]["produtos"]>
    composites: {}
  }

  type ProdutosGetPayload<S extends boolean | null | undefined | ProdutosDefaultArgs> = $Result.GetResult<Prisma.$ProdutosPayload, S>

  type ProdutosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProdutosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutosCountAggregateInputType | true
    }

  export interface ProdutosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produtos'], meta: { name: 'Produtos' } }
    /**
     * Find zero or one Produtos that matches the filter.
     * @param {ProdutosFindUniqueArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProdutosFindUniqueArgs>(args: SelectSubset<T, ProdutosFindUniqueArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produtos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProdutosFindUniqueOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProdutosFindUniqueOrThrowArgs>(args: SelectSubset<T, ProdutosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosFindFirstArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProdutosFindFirstArgs>(args?: SelectSubset<T, ProdutosFindFirstArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produtos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosFindFirstOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProdutosFindFirstOrThrowArgs>(args?: SelectSubset<T, ProdutosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produtos.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produtos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produtosWithIdOnly = await prisma.produtos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProdutosFindManyArgs>(args?: SelectSubset<T, ProdutosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produtos.
     * @param {ProdutosCreateArgs} args - Arguments to create a Produtos.
     * @example
     * // Create one Produtos
     * const Produtos = await prisma.produtos.create({
     *   data: {
     *     // ... data to create a Produtos
     *   }
     * })
     * 
     */
    create<T extends ProdutosCreateArgs>(args: SelectSubset<T, ProdutosCreateArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {ProdutosCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produtos = await prisma.produtos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProdutosCreateManyArgs>(args?: SelectSubset<T, ProdutosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {ProdutosCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produtos = await prisma.produtos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Produtos and only return the `id`
     * const produtosWithIdOnly = await prisma.produtos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProdutosCreateManyAndReturnArgs>(args?: SelectSubset<T, ProdutosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Produtos.
     * @param {ProdutosDeleteArgs} args - Arguments to delete one Produtos.
     * @example
     * // Delete one Produtos
     * const Produtos = await prisma.produtos.delete({
     *   where: {
     *     // ... filter to delete one Produtos
     *   }
     * })
     * 
     */
    delete<T extends ProdutosDeleteArgs>(args: SelectSubset<T, ProdutosDeleteArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produtos.
     * @param {ProdutosUpdateArgs} args - Arguments to update one Produtos.
     * @example
     * // Update one Produtos
     * const produtos = await prisma.produtos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProdutosUpdateArgs>(args: SelectSubset<T, ProdutosUpdateArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {ProdutosDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produtos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProdutosDeleteManyArgs>(args?: SelectSubset<T, ProdutosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produtos = await prisma.produtos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProdutosUpdateManyArgs>(args: SelectSubset<T, ProdutosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos and returns the data updated in the database.
     * @param {ProdutosUpdateManyAndReturnArgs} args - Arguments to update many Produtos.
     * @example
     * // Update many Produtos
     * const produtos = await prisma.produtos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Produtos and only return the `id`
     * const produtosWithIdOnly = await prisma.produtos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProdutosUpdateManyAndReturnArgs>(args: SelectSubset<T, ProdutosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Produtos.
     * @param {ProdutosUpsertArgs} args - Arguments to update or create a Produtos.
     * @example
     * // Update or create a Produtos
     * const produtos = await prisma.produtos.upsert({
     *   create: {
     *     // ... data to create a Produtos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produtos we want to update
     *   }
     * })
     */
    upsert<T extends ProdutosUpsertArgs>(args: SelectSubset<T, ProdutosUpsertArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produtos.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends ProdutosCountArgs>(
      args?: Subset<T, ProdutosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutosAggregateArgs>(args: Subset<T, ProdutosAggregateArgs>): Prisma.PrismaPromise<GetProdutosAggregateType<T>>

    /**
     * Group by Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutosGroupByArgs['orderBy'] }
        : { orderBy?: ProdutosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Produtos model
   */
  readonly fields: ProdutosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produtos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProdutosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categoria<T extends Produtos$categoriaArgs<ExtArgs> = {}>(args?: Subset<T, Produtos$categoriaArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    itensPedidoVenda<T extends Produtos$itensPedidoVendaArgs<ExtArgs> = {}>(args?: Subset<T, Produtos$itensPedidoVendaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Produtos model
   */
  interface ProdutosFieldRefs {
    readonly id: FieldRef<"Produtos", 'Int'>
    readonly idCategoria: FieldRef<"Produtos", 'Int'>
    readonly descricao: FieldRef<"Produtos", 'String'>
    readonly preco: FieldRef<"Produtos", 'Decimal'>
    readonly status: FieldRef<"Produtos", 'Boolean'>
    readonly data_criacao: FieldRef<"Produtos", 'DateTime'>
    readonly data_alteracao: FieldRef<"Produtos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Produtos findUnique
   */
  export type ProdutosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where: ProdutosWhereUniqueInput
  }

  /**
   * Produtos findUniqueOrThrow
   */
  export type ProdutosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where: ProdutosWhereUniqueInput
  }

  /**
   * Produtos findFirst
   */
  export type ProdutosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutosOrderByWithRelationInput | ProdutosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * Produtos findFirstOrThrow
   */
  export type ProdutosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutosOrderByWithRelationInput | ProdutosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * Produtos findMany
   */
  export type ProdutosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutosOrderByWithRelationInput | ProdutosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produtos.
     */
    cursor?: ProdutosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * Produtos create
   */
  export type ProdutosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * The data needed to create a Produtos.
     */
    data: XOR<ProdutosCreateInput, ProdutosUncheckedCreateInput>
  }

  /**
   * Produtos createMany
   */
  export type ProdutosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Produtos.
     */
    data: ProdutosCreateManyInput | ProdutosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Produtos createManyAndReturn
   */
  export type ProdutosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * The data used to create many Produtos.
     */
    data: ProdutosCreateManyInput | ProdutosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produtos update
   */
  export type ProdutosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * The data needed to update a Produtos.
     */
    data: XOR<ProdutosUpdateInput, ProdutosUncheckedUpdateInput>
    /**
     * Choose, which Produtos to update.
     */
    where: ProdutosWhereUniqueInput
  }

  /**
   * Produtos updateMany
   */
  export type ProdutosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutosUpdateManyMutationInput, ProdutosUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutosWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produtos updateManyAndReturn
   */
  export type ProdutosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutosUpdateManyMutationInput, ProdutosUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutosWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produtos upsert
   */
  export type ProdutosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * The filter to search for the Produtos to update in case it exists.
     */
    where: ProdutosWhereUniqueInput
    /**
     * In case the Produtos found by the `where` argument doesn't exist, create a new Produtos with this data.
     */
    create: XOR<ProdutosCreateInput, ProdutosUncheckedCreateInput>
    /**
     * In case the Produtos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProdutosUpdateInput, ProdutosUncheckedUpdateInput>
  }

  /**
   * Produtos delete
   */
  export type ProdutosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    /**
     * Filter which Produtos to delete.
     */
    where: ProdutosWhereUniqueInput
  }

  /**
   * Produtos deleteMany
   */
  export type ProdutosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produtos to delete
     */
    where?: ProdutosWhereInput
    /**
     * Limit how many Produtos to delete.
     */
    limit?: number
  }

  /**
   * Produtos.categoria
   */
  export type Produtos$categoriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    where?: CategoriasWhereInput
  }

  /**
   * Produtos.itensPedidoVenda
   */
  export type Produtos$itensPedidoVendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    where?: ItensPedidoWhereInput
    orderBy?: ItensPedidoOrderByWithRelationInput | ItensPedidoOrderByWithRelationInput[]
    cursor?: ItensPedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItensPedidoScalarFieldEnum | ItensPedidoScalarFieldEnum[]
  }

  /**
   * Produtos without action
   */
  export type ProdutosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
  }


  /**
   * Model Categorias
   */

  export type AggregateCategorias = {
    _count: CategoriasCountAggregateOutputType | null
    _avg: CategoriasAvgAggregateOutputType | null
    _sum: CategoriasSumAggregateOutputType | null
    _min: CategoriasMinAggregateOutputType | null
    _max: CategoriasMaxAggregateOutputType | null
  }

  export type CategoriasAvgAggregateOutputType = {
    id: number | null
  }

  export type CategoriasSumAggregateOutputType = {
    id: number | null
  }

  export type CategoriasMinAggregateOutputType = {
    id: number | null
    descricao: string | null
  }

  export type CategoriasMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
  }

  export type CategoriasCountAggregateOutputType = {
    id: number
    descricao: number
    _all: number
  }


  export type CategoriasAvgAggregateInputType = {
    id?: true
  }

  export type CategoriasSumAggregateInputType = {
    id?: true
  }

  export type CategoriasMinAggregateInputType = {
    id?: true
    descricao?: true
  }

  export type CategoriasMaxAggregateInputType = {
    id?: true
    descricao?: true
  }

  export type CategoriasCountAggregateInputType = {
    id?: true
    descricao?: true
    _all?: true
  }

  export type CategoriasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to aggregate.
     */
    where?: CategoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriasOrderByWithRelationInput | CategoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriasMaxAggregateInputType
  }

  export type GetCategoriasAggregateType<T extends CategoriasAggregateArgs> = {
        [P in keyof T & keyof AggregateCategorias]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategorias[P]>
      : GetScalarType<T[P], AggregateCategorias[P]>
  }




  export type CategoriasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriasWhereInput
    orderBy?: CategoriasOrderByWithAggregationInput | CategoriasOrderByWithAggregationInput[]
    by: CategoriasScalarFieldEnum[] | CategoriasScalarFieldEnum
    having?: CategoriasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriasCountAggregateInputType | true
    _avg?: CategoriasAvgAggregateInputType
    _sum?: CategoriasSumAggregateInputType
    _min?: CategoriasMinAggregateInputType
    _max?: CategoriasMaxAggregateInputType
  }

  export type CategoriasGroupByOutputType = {
    id: number
    descricao: string
    _count: CategoriasCountAggregateOutputType | null
    _avg: CategoriasAvgAggregateOutputType | null
    _sum: CategoriasSumAggregateOutputType | null
    _min: CategoriasMinAggregateOutputType | null
    _max: CategoriasMaxAggregateOutputType | null
  }

  type GetCategoriasGroupByPayload<T extends CategoriasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriasGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriasGroupByOutputType[P]>
        }
      >
    >


  export type CategoriasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    produtos?: boolean | Categorias$produtosArgs<ExtArgs>
    _count?: boolean | CategoriasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categorias"]>

  export type CategoriasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["categorias"]>

  export type CategoriasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["categorias"]>

  export type CategoriasSelectScalar = {
    id?: boolean
    descricao?: boolean
  }

  export type CategoriasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao", ExtArgs["result"]["categorias"]>
  export type CategoriasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | Categorias$produtosArgs<ExtArgs>
    _count?: boolean | CategoriasCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoriasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categorias"
    objects: {
      produtos: Prisma.$ProdutosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
    }, ExtArgs["result"]["categorias"]>
    composites: {}
  }

  type CategoriasGetPayload<S extends boolean | null | undefined | CategoriasDefaultArgs> = $Result.GetResult<Prisma.$CategoriasPayload, S>

  type CategoriasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriasCountAggregateInputType | true
    }

  export interface CategoriasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categorias'], meta: { name: 'Categorias' } }
    /**
     * Find zero or one Categorias that matches the filter.
     * @param {CategoriasFindUniqueArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriasFindUniqueArgs>(args: SelectSubset<T, CategoriasFindUniqueArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categorias that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriasFindUniqueOrThrowArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriasFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasFindFirstArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriasFindFirstArgs>(args?: SelectSubset<T, CategoriasFindFirstArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorias that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasFindFirstOrThrowArgs} args - Arguments to find a Categorias
     * @example
     * // Get one Categorias
     * const categorias = await prisma.categorias.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriasFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriasFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categorias.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categorias.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriasWithIdOnly = await prisma.categorias.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriasFindManyArgs>(args?: SelectSubset<T, CategoriasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categorias.
     * @param {CategoriasCreateArgs} args - Arguments to create a Categorias.
     * @example
     * // Create one Categorias
     * const Categorias = await prisma.categorias.create({
     *   data: {
     *     // ... data to create a Categorias
     *   }
     * })
     * 
     */
    create<T extends CategoriasCreateArgs>(args: SelectSubset<T, CategoriasCreateArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriasCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categorias = await prisma.categorias.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriasCreateManyArgs>(args?: SelectSubset<T, CategoriasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriasCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categorias = await prisma.categorias.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriasWithIdOnly = await prisma.categorias.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriasCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categorias.
     * @param {CategoriasDeleteArgs} args - Arguments to delete one Categorias.
     * @example
     * // Delete one Categorias
     * const Categorias = await prisma.categorias.delete({
     *   where: {
     *     // ... filter to delete one Categorias
     *   }
     * })
     * 
     */
    delete<T extends CategoriasDeleteArgs>(args: SelectSubset<T, CategoriasDeleteArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categorias.
     * @param {CategoriasUpdateArgs} args - Arguments to update one Categorias.
     * @example
     * // Update one Categorias
     * const categorias = await prisma.categorias.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriasUpdateArgs>(args: SelectSubset<T, CategoriasUpdateArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriasDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categorias.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriasDeleteManyArgs>(args?: SelectSubset<T, CategoriasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categorias = await prisma.categorias.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriasUpdateManyArgs>(args: SelectSubset<T, CategoriasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriasUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categorias = await prisma.categorias.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id`
     * const categoriasWithIdOnly = await prisma.categorias.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriasUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categorias.
     * @param {CategoriasUpsertArgs} args - Arguments to update or create a Categorias.
     * @example
     * // Update or create a Categorias
     * const categorias = await prisma.categorias.upsert({
     *   create: {
     *     // ... data to create a Categorias
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categorias we want to update
     *   }
     * })
     */
    upsert<T extends CategoriasUpsertArgs>(args: SelectSubset<T, CategoriasUpsertArgs<ExtArgs>>): Prisma__CategoriasClient<$Result.GetResult<Prisma.$CategoriasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categorias.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriasCountArgs>(
      args?: Subset<T, CategoriasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriasAggregateArgs>(args: Subset<T, CategoriasAggregateArgs>): Prisma.PrismaPromise<GetCategoriasAggregateType<T>>

    /**
     * Group by Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriasGroupByArgs['orderBy'] }
        : { orderBy?: CategoriasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categorias model
   */
  readonly fields: CategoriasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categorias.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produtos<T extends Categorias$produtosArgs<ExtArgs> = {}>(args?: Subset<T, Categorias$produtosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categorias model
   */
  interface CategoriasFieldRefs {
    readonly id: FieldRef<"Categorias", 'Int'>
    readonly descricao: FieldRef<"Categorias", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Categorias findUnique
   */
  export type CategoriasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where: CategoriasWhereUniqueInput
  }

  /**
   * Categorias findUniqueOrThrow
   */
  export type CategoriasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where: CategoriasWhereUniqueInput
  }

  /**
   * Categorias findFirst
   */
  export type CategoriasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriasOrderByWithRelationInput | CategoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriasScalarFieldEnum | CategoriasScalarFieldEnum[]
  }

  /**
   * Categorias findFirstOrThrow
   */
  export type CategoriasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriasOrderByWithRelationInput | CategoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriasScalarFieldEnum | CategoriasScalarFieldEnum[]
  }

  /**
   * Categorias findMany
   */
  export type CategoriasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriasOrderByWithRelationInput | CategoriasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    distinct?: CategoriasScalarFieldEnum | CategoriasScalarFieldEnum[]
  }

  /**
   * Categorias create
   */
  export type CategoriasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * The data needed to create a Categorias.
     */
    data: XOR<CategoriasCreateInput, CategoriasUncheckedCreateInput>
  }

  /**
   * Categorias createMany
   */
  export type CategoriasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriasCreateManyInput | CategoriasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categorias createManyAndReturn
   */
  export type CategoriasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriasCreateManyInput | CategoriasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categorias update
   */
  export type CategoriasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * The data needed to update a Categorias.
     */
    data: XOR<CategoriasUpdateInput, CategoriasUncheckedUpdateInput>
    /**
     * Choose, which Categorias to update.
     */
    where: CategoriasWhereUniqueInput
  }

  /**
   * Categorias updateMany
   */
  export type CategoriasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriasUpdateManyMutationInput, CategoriasUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriasWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categorias updateManyAndReturn
   */
  export type CategoriasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriasUpdateManyMutationInput, CategoriasUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriasWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categorias upsert
   */
  export type CategoriasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * The filter to search for the Categorias to update in case it exists.
     */
    where: CategoriasWhereUniqueInput
    /**
     * In case the Categorias found by the `where` argument doesn't exist, create a new Categorias with this data.
     */
    create: XOR<CategoriasCreateInput, CategoriasUncheckedCreateInput>
    /**
     * In case the Categorias was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriasUpdateInput, CategoriasUncheckedUpdateInput>
  }

  /**
   * Categorias delete
   */
  export type CategoriasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
    /**
     * Filter which Categorias to delete.
     */
    where: CategoriasWhereUniqueInput
  }

  /**
   * Categorias deleteMany
   */
  export type CategoriasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriasWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categorias.produtos
   */
  export type Categorias$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produtos
     */
    select?: ProdutosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produtos
     */
    omit?: ProdutosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutosInclude<ExtArgs> | null
    where?: ProdutosWhereInput
    orderBy?: ProdutosOrderByWithRelationInput | ProdutosOrderByWithRelationInput[]
    cursor?: ProdutosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * Categorias without action
   */
  export type CategoriasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorias
     */
    select?: CategoriasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorias
     */
    omit?: CategoriasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriasInclude<ExtArgs> | null
  }


  /**
   * Model Pedidos
   */

  export type AggregatePedidos = {
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  export type PedidosAvgAggregateOutputType = {
    id: number | null
    idCliente: number | null
    idUsuario: number | null
    valorTotal: Decimal | null
  }

  export type PedidosSumAggregateOutputType = {
    id: number | null
    idCliente: number | null
    idUsuario: number | null
    valorTotal: Decimal | null
  }

  export type PedidosMinAggregateOutputType = {
    id: number | null
    idCliente: number | null
    idUsuario: number | null
    observacao: string | null
    valorTotal: Decimal | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type PedidosMaxAggregateOutputType = {
    id: number | null
    idCliente: number | null
    idUsuario: number | null
    observacao: string | null
    valorTotal: Decimal | null
    data_criacao: Date | null
    data_alteracao: Date | null
  }

  export type PedidosCountAggregateOutputType = {
    id: number
    idCliente: number
    idUsuario: number
    observacao: number
    valorTotal: number
    data_criacao: number
    data_alteracao: number
    _all: number
  }


  export type PedidosAvgAggregateInputType = {
    id?: true
    idCliente?: true
    idUsuario?: true
    valorTotal?: true
  }

  export type PedidosSumAggregateInputType = {
    id?: true
    idCliente?: true
    idUsuario?: true
    valorTotal?: true
  }

  export type PedidosMinAggregateInputType = {
    id?: true
    idCliente?: true
    idUsuario?: true
    observacao?: true
    valorTotal?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type PedidosMaxAggregateInputType = {
    id?: true
    idCliente?: true
    idUsuario?: true
    observacao?: true
    valorTotal?: true
    data_criacao?: true
    data_alteracao?: true
  }

  export type PedidosCountAggregateInputType = {
    id?: true
    idCliente?: true
    idUsuario?: true
    observacao?: true
    valorTotal?: true
    data_criacao?: true
    data_alteracao?: true
    _all?: true
  }

  export type PedidosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to aggregate.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pedidos
    **/
    _count?: true | PedidosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidosMaxAggregateInputType
  }

  export type GetPedidosAggregateType<T extends PedidosAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidos[P]>
      : GetScalarType<T[P], AggregatePedidos[P]>
  }




  export type PedidosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidosWhereInput
    orderBy?: PedidosOrderByWithAggregationInput | PedidosOrderByWithAggregationInput[]
    by: PedidosScalarFieldEnum[] | PedidosScalarFieldEnum
    having?: PedidosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidosCountAggregateInputType | true
    _avg?: PedidosAvgAggregateInputType
    _sum?: PedidosSumAggregateInputType
    _min?: PedidosMinAggregateInputType
    _max?: PedidosMaxAggregateInputType
  }

  export type PedidosGroupByOutputType = {
    id: number
    idCliente: number
    idUsuario: number
    observacao: string | null
    valorTotal: Decimal
    data_criacao: Date
    data_alteracao: Date
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  type GetPedidosGroupByPayload<T extends PedidosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidosGroupByOutputType[P]>
            : GetScalarType<T[P], PedidosGroupByOutputType[P]>
        }
      >
    >


  export type PedidosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCliente?: boolean
    idUsuario?: boolean
    observacao?: boolean
    valorTotal?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    cliente?: boolean | ClientesDefaultArgs<ExtArgs>
    usuario?: boolean | UsuariosDefaultArgs<ExtArgs>
    itensPedidoVenda?: boolean | Pedidos$itensPedidoVendaArgs<ExtArgs>
    _count?: boolean | PedidosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type PedidosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCliente?: boolean
    idUsuario?: boolean
    observacao?: boolean
    valorTotal?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    cliente?: boolean | ClientesDefaultArgs<ExtArgs>
    usuario?: boolean | UsuariosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type PedidosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCliente?: boolean
    idUsuario?: boolean
    observacao?: boolean
    valorTotal?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
    cliente?: boolean | ClientesDefaultArgs<ExtArgs>
    usuario?: boolean | UsuariosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>

  export type PedidosSelectScalar = {
    id?: boolean
    idCliente?: boolean
    idUsuario?: boolean
    observacao?: boolean
    valorTotal?: boolean
    data_criacao?: boolean
    data_alteracao?: boolean
  }

  export type PedidosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idCliente" | "idUsuario" | "observacao" | "valorTotal" | "data_criacao" | "data_alteracao", ExtArgs["result"]["pedidos"]>
  export type PedidosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientesDefaultArgs<ExtArgs>
    usuario?: boolean | UsuariosDefaultArgs<ExtArgs>
    itensPedidoVenda?: boolean | Pedidos$itensPedidoVendaArgs<ExtArgs>
    _count?: boolean | PedidosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PedidosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientesDefaultArgs<ExtArgs>
    usuario?: boolean | UsuariosDefaultArgs<ExtArgs>
  }
  export type PedidosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientesDefaultArgs<ExtArgs>
    usuario?: boolean | UsuariosDefaultArgs<ExtArgs>
  }

  export type $PedidosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pedidos"
    objects: {
      cliente: Prisma.$ClientesPayload<ExtArgs>
      usuario: Prisma.$UsuariosPayload<ExtArgs>
      itensPedidoVenda: Prisma.$ItensPedidoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      idCliente: number
      idUsuario: number
      observacao: string | null
      valorTotal: Prisma.Decimal
      data_criacao: Date
      data_alteracao: Date
    }, ExtArgs["result"]["pedidos"]>
    composites: {}
  }

  type PedidosGetPayload<S extends boolean | null | undefined | PedidosDefaultArgs> = $Result.GetResult<Prisma.$PedidosPayload, S>

  type PedidosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidosCountAggregateInputType | true
    }

  export interface PedidosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedidos'], meta: { name: 'Pedidos' } }
    /**
     * Find zero or one Pedidos that matches the filter.
     * @param {PedidosFindUniqueArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidosFindUniqueArgs>(args: SelectSubset<T, PedidosFindUniqueArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedidos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidosFindUniqueOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidosFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosFindFirstArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidosFindFirstArgs>(args?: SelectSubset<T, PedidosFindFirstArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosFindFirstOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidosFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidosFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedidos.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedidos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidosFindManyArgs>(args?: SelectSubset<T, PedidosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedidos.
     * @param {PedidosCreateArgs} args - Arguments to create a Pedidos.
     * @example
     * // Create one Pedidos
     * const Pedidos = await prisma.pedidos.create({
     *   data: {
     *     // ... data to create a Pedidos
     *   }
     * })
     * 
     */
    create<T extends PedidosCreateArgs>(args: SelectSubset<T, PedidosCreateArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {PedidosCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidosCreateManyArgs>(args?: SelectSubset<T, PedidosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {PedidosCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedidos and only return the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidosCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pedidos.
     * @param {PedidosDeleteArgs} args - Arguments to delete one Pedidos.
     * @example
     * // Delete one Pedidos
     * const Pedidos = await prisma.pedidos.delete({
     *   where: {
     *     // ... filter to delete one Pedidos
     *   }
     * })
     * 
     */
    delete<T extends PedidosDeleteArgs>(args: SelectSubset<T, PedidosDeleteArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedidos.
     * @param {PedidosUpdateArgs} args - Arguments to update one Pedidos.
     * @example
     * // Update one Pedidos
     * const pedidos = await prisma.pedidos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidosUpdateArgs>(args: SelectSubset<T, PedidosUpdateArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {PedidosDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedidos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidosDeleteManyArgs>(args?: SelectSubset<T, PedidosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidosUpdateManyArgs>(args: SelectSubset<T, PedidosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos and returns the data updated in the database.
     * @param {PedidosUpdateManyAndReturnArgs} args - Arguments to update many Pedidos.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pedidos and only return the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PedidosUpdateManyAndReturnArgs>(args: SelectSubset<T, PedidosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pedidos.
     * @param {PedidosUpsertArgs} args - Arguments to update or create a Pedidos.
     * @example
     * // Update or create a Pedidos
     * const pedidos = await prisma.pedidos.upsert({
     *   create: {
     *     // ... data to create a Pedidos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedidos we want to update
     *   }
     * })
     */
    upsert<T extends PedidosUpsertArgs>(args: SelectSubset<T, PedidosUpsertArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedidos.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends PedidosCountArgs>(
      args?: Subset<T, PedidosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidosAggregateArgs>(args: Subset<T, PedidosAggregateArgs>): Prisma.PrismaPromise<GetPedidosAggregateType<T>>

    /**
     * Group by Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidosGroupByArgs['orderBy'] }
        : { orderBy?: PedidosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pedidos model
   */
  readonly fields: PedidosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedidos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClientesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientesDefaultArgs<ExtArgs>>): Prisma__ClientesClient<$Result.GetResult<Prisma.$ClientesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends UsuariosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuariosDefaultArgs<ExtArgs>>): Prisma__UsuariosClient<$Result.GetResult<Prisma.$UsuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    itensPedidoVenda<T extends Pedidos$itensPedidoVendaArgs<ExtArgs> = {}>(args?: Subset<T, Pedidos$itensPedidoVendaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pedidos model
   */
  interface PedidosFieldRefs {
    readonly id: FieldRef<"Pedidos", 'Int'>
    readonly idCliente: FieldRef<"Pedidos", 'Int'>
    readonly idUsuario: FieldRef<"Pedidos", 'Int'>
    readonly observacao: FieldRef<"Pedidos", 'String'>
    readonly valorTotal: FieldRef<"Pedidos", 'Decimal'>
    readonly data_criacao: FieldRef<"Pedidos", 'DateTime'>
    readonly data_alteracao: FieldRef<"Pedidos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pedidos findUnique
   */
  export type PedidosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos findUniqueOrThrow
   */
  export type PedidosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos findFirst
   */
  export type PedidosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Pedidos findFirstOrThrow
   */
  export type PedidosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Pedidos findMany
   */
  export type PedidosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Pedidos create
   */
  export type PedidosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * The data needed to create a Pedidos.
     */
    data: XOR<PedidosCreateInput, PedidosUncheckedCreateInput>
  }

  /**
   * Pedidos createMany
   */
  export type PedidosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidosCreateManyInput | PedidosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedidos createManyAndReturn
   */
  export type PedidosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * The data used to create many Pedidos.
     */
    data: PedidosCreateManyInput | PedidosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pedidos update
   */
  export type PedidosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * The data needed to update a Pedidos.
     */
    data: XOR<PedidosUpdateInput, PedidosUncheckedUpdateInput>
    /**
     * Choose, which Pedidos to update.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos updateMany
   */
  export type PedidosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidosUpdateManyMutationInput, PedidosUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidosWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
  }

  /**
   * Pedidos updateManyAndReturn
   */
  export type PedidosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidosUpdateManyMutationInput, PedidosUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidosWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pedidos upsert
   */
  export type PedidosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * The filter to search for the Pedidos to update in case it exists.
     */
    where: PedidosWhereUniqueInput
    /**
     * In case the Pedidos found by the `where` argument doesn't exist, create a new Pedidos with this data.
     */
    create: XOR<PedidosCreateInput, PedidosUncheckedCreateInput>
    /**
     * In case the Pedidos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidosUpdateInput, PedidosUncheckedUpdateInput>
  }

  /**
   * Pedidos delete
   */
  export type PedidosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter which Pedidos to delete.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos deleteMany
   */
  export type PedidosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidosWhereInput
    /**
     * Limit how many Pedidos to delete.
     */
    limit?: number
  }

  /**
   * Pedidos.itensPedidoVenda
   */
  export type Pedidos$itensPedidoVendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    where?: ItensPedidoWhereInput
    orderBy?: ItensPedidoOrderByWithRelationInput | ItensPedidoOrderByWithRelationInput[]
    cursor?: ItensPedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItensPedidoScalarFieldEnum | ItensPedidoScalarFieldEnum[]
  }

  /**
   * Pedidos without action
   */
  export type PedidosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
  }


  /**
   * Model ItensPedido
   */

  export type AggregateItensPedido = {
    _count: ItensPedidoCountAggregateOutputType | null
    _avg: ItensPedidoAvgAggregateOutputType | null
    _sum: ItensPedidoSumAggregateOutputType | null
    _min: ItensPedidoMinAggregateOutputType | null
    _max: ItensPedidoMaxAggregateOutputType | null
  }

  export type ItensPedidoAvgAggregateOutputType = {
    id: number | null
    idProduto: number | null
    idPedido: number | null
    precoUnitario: Decimal | null
    quantidade: number | null
  }

  export type ItensPedidoSumAggregateOutputType = {
    id: number | null
    idProduto: number | null
    idPedido: number | null
    precoUnitario: Decimal | null
    quantidade: number | null
  }

  export type ItensPedidoMinAggregateOutputType = {
    id: number | null
    idProduto: number | null
    idPedido: number | null
    precoUnitario: Decimal | null
    quantidade: number | null
  }

  export type ItensPedidoMaxAggregateOutputType = {
    id: number | null
    idProduto: number | null
    idPedido: number | null
    precoUnitario: Decimal | null
    quantidade: number | null
  }

  export type ItensPedidoCountAggregateOutputType = {
    id: number
    idProduto: number
    idPedido: number
    precoUnitario: number
    quantidade: number
    _all: number
  }


  export type ItensPedidoAvgAggregateInputType = {
    id?: true
    idProduto?: true
    idPedido?: true
    precoUnitario?: true
    quantidade?: true
  }

  export type ItensPedidoSumAggregateInputType = {
    id?: true
    idProduto?: true
    idPedido?: true
    precoUnitario?: true
    quantidade?: true
  }

  export type ItensPedidoMinAggregateInputType = {
    id?: true
    idProduto?: true
    idPedido?: true
    precoUnitario?: true
    quantidade?: true
  }

  export type ItensPedidoMaxAggregateInputType = {
    id?: true
    idProduto?: true
    idPedido?: true
    precoUnitario?: true
    quantidade?: true
  }

  export type ItensPedidoCountAggregateInputType = {
    id?: true
    idProduto?: true
    idPedido?: true
    precoUnitario?: true
    quantidade?: true
    _all?: true
  }

  export type ItensPedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItensPedido to aggregate.
     */
    where?: ItensPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItensPedidos to fetch.
     */
    orderBy?: ItensPedidoOrderByWithRelationInput | ItensPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItensPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItensPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItensPedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItensPedidos
    **/
    _count?: true | ItensPedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItensPedidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItensPedidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItensPedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItensPedidoMaxAggregateInputType
  }

  export type GetItensPedidoAggregateType<T extends ItensPedidoAggregateArgs> = {
        [P in keyof T & keyof AggregateItensPedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItensPedido[P]>
      : GetScalarType<T[P], AggregateItensPedido[P]>
  }




  export type ItensPedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItensPedidoWhereInput
    orderBy?: ItensPedidoOrderByWithAggregationInput | ItensPedidoOrderByWithAggregationInput[]
    by: ItensPedidoScalarFieldEnum[] | ItensPedidoScalarFieldEnum
    having?: ItensPedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItensPedidoCountAggregateInputType | true
    _avg?: ItensPedidoAvgAggregateInputType
    _sum?: ItensPedidoSumAggregateInputType
    _min?: ItensPedidoMinAggregateInputType
    _max?: ItensPedidoMaxAggregateInputType
  }

  export type ItensPedidoGroupByOutputType = {
    id: number
    idProduto: number
    idPedido: number
    precoUnitario: Decimal
    quantidade: number
    _count: ItensPedidoCountAggregateOutputType | null
    _avg: ItensPedidoAvgAggregateOutputType | null
    _sum: ItensPedidoSumAggregateOutputType | null
    _min: ItensPedidoMinAggregateOutputType | null
    _max: ItensPedidoMaxAggregateOutputType | null
  }

  type GetItensPedidoGroupByPayload<T extends ItensPedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItensPedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItensPedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItensPedidoGroupByOutputType[P]>
            : GetScalarType<T[P], ItensPedidoGroupByOutputType[P]>
        }
      >
    >


  export type ItensPedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idProduto?: boolean
    idPedido?: boolean
    precoUnitario?: boolean
    quantidade?: boolean
    produtos?: boolean | ProdutosDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itensPedido"]>

  export type ItensPedidoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idProduto?: boolean
    idPedido?: boolean
    precoUnitario?: boolean
    quantidade?: boolean
    produtos?: boolean | ProdutosDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itensPedido"]>

  export type ItensPedidoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idProduto?: boolean
    idPedido?: boolean
    precoUnitario?: boolean
    quantidade?: boolean
    produtos?: boolean | ProdutosDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itensPedido"]>

  export type ItensPedidoSelectScalar = {
    id?: boolean
    idProduto?: boolean
    idPedido?: boolean
    precoUnitario?: boolean
    quantidade?: boolean
  }

  export type ItensPedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idProduto" | "idPedido" | "precoUnitario" | "quantidade", ExtArgs["result"]["itensPedido"]>
  export type ItensPedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | ProdutosDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidosDefaultArgs<ExtArgs>
  }
  export type ItensPedidoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | ProdutosDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidosDefaultArgs<ExtArgs>
  }
  export type ItensPedidoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | ProdutosDefaultArgs<ExtArgs>
    pedidos?: boolean | PedidosDefaultArgs<ExtArgs>
  }

  export type $ItensPedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItensPedido"
    objects: {
      produtos: Prisma.$ProdutosPayload<ExtArgs>
      pedidos: Prisma.$PedidosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      idProduto: number
      idPedido: number
      precoUnitario: Prisma.Decimal
      quantidade: number
    }, ExtArgs["result"]["itensPedido"]>
    composites: {}
  }

  type ItensPedidoGetPayload<S extends boolean | null | undefined | ItensPedidoDefaultArgs> = $Result.GetResult<Prisma.$ItensPedidoPayload, S>

  type ItensPedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItensPedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItensPedidoCountAggregateInputType | true
    }

  export interface ItensPedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItensPedido'], meta: { name: 'ItensPedido' } }
    /**
     * Find zero or one ItensPedido that matches the filter.
     * @param {ItensPedidoFindUniqueArgs} args - Arguments to find a ItensPedido
     * @example
     * // Get one ItensPedido
     * const itensPedido = await prisma.itensPedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItensPedidoFindUniqueArgs>(args: SelectSubset<T, ItensPedidoFindUniqueArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItensPedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItensPedidoFindUniqueOrThrowArgs} args - Arguments to find a ItensPedido
     * @example
     * // Get one ItensPedido
     * const itensPedido = await prisma.itensPedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItensPedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, ItensPedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItensPedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItensPedidoFindFirstArgs} args - Arguments to find a ItensPedido
     * @example
     * // Get one ItensPedido
     * const itensPedido = await prisma.itensPedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItensPedidoFindFirstArgs>(args?: SelectSubset<T, ItensPedidoFindFirstArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItensPedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItensPedidoFindFirstOrThrowArgs} args - Arguments to find a ItensPedido
     * @example
     * // Get one ItensPedido
     * const itensPedido = await prisma.itensPedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItensPedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, ItensPedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItensPedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItensPedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItensPedidos
     * const itensPedidos = await prisma.itensPedido.findMany()
     * 
     * // Get first 10 ItensPedidos
     * const itensPedidos = await prisma.itensPedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itensPedidoWithIdOnly = await prisma.itensPedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItensPedidoFindManyArgs>(args?: SelectSubset<T, ItensPedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItensPedido.
     * @param {ItensPedidoCreateArgs} args - Arguments to create a ItensPedido.
     * @example
     * // Create one ItensPedido
     * const ItensPedido = await prisma.itensPedido.create({
     *   data: {
     *     // ... data to create a ItensPedido
     *   }
     * })
     * 
     */
    create<T extends ItensPedidoCreateArgs>(args: SelectSubset<T, ItensPedidoCreateArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItensPedidos.
     * @param {ItensPedidoCreateManyArgs} args - Arguments to create many ItensPedidos.
     * @example
     * // Create many ItensPedidos
     * const itensPedido = await prisma.itensPedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItensPedidoCreateManyArgs>(args?: SelectSubset<T, ItensPedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItensPedidos and returns the data saved in the database.
     * @param {ItensPedidoCreateManyAndReturnArgs} args - Arguments to create many ItensPedidos.
     * @example
     * // Create many ItensPedidos
     * const itensPedido = await prisma.itensPedido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItensPedidos and only return the `id`
     * const itensPedidoWithIdOnly = await prisma.itensPedido.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItensPedidoCreateManyAndReturnArgs>(args?: SelectSubset<T, ItensPedidoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItensPedido.
     * @param {ItensPedidoDeleteArgs} args - Arguments to delete one ItensPedido.
     * @example
     * // Delete one ItensPedido
     * const ItensPedido = await prisma.itensPedido.delete({
     *   where: {
     *     // ... filter to delete one ItensPedido
     *   }
     * })
     * 
     */
    delete<T extends ItensPedidoDeleteArgs>(args: SelectSubset<T, ItensPedidoDeleteArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItensPedido.
     * @param {ItensPedidoUpdateArgs} args - Arguments to update one ItensPedido.
     * @example
     * // Update one ItensPedido
     * const itensPedido = await prisma.itensPedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItensPedidoUpdateArgs>(args: SelectSubset<T, ItensPedidoUpdateArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItensPedidos.
     * @param {ItensPedidoDeleteManyArgs} args - Arguments to filter ItensPedidos to delete.
     * @example
     * // Delete a few ItensPedidos
     * const { count } = await prisma.itensPedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItensPedidoDeleteManyArgs>(args?: SelectSubset<T, ItensPedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItensPedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItensPedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItensPedidos
     * const itensPedido = await prisma.itensPedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItensPedidoUpdateManyArgs>(args: SelectSubset<T, ItensPedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItensPedidos and returns the data updated in the database.
     * @param {ItensPedidoUpdateManyAndReturnArgs} args - Arguments to update many ItensPedidos.
     * @example
     * // Update many ItensPedidos
     * const itensPedido = await prisma.itensPedido.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItensPedidos and only return the `id`
     * const itensPedidoWithIdOnly = await prisma.itensPedido.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItensPedidoUpdateManyAndReturnArgs>(args: SelectSubset<T, ItensPedidoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItensPedido.
     * @param {ItensPedidoUpsertArgs} args - Arguments to update or create a ItensPedido.
     * @example
     * // Update or create a ItensPedido
     * const itensPedido = await prisma.itensPedido.upsert({
     *   create: {
     *     // ... data to create a ItensPedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItensPedido we want to update
     *   }
     * })
     */
    upsert<T extends ItensPedidoUpsertArgs>(args: SelectSubset<T, ItensPedidoUpsertArgs<ExtArgs>>): Prisma__ItensPedidoClient<$Result.GetResult<Prisma.$ItensPedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItensPedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItensPedidoCountArgs} args - Arguments to filter ItensPedidos to count.
     * @example
     * // Count the number of ItensPedidos
     * const count = await prisma.itensPedido.count({
     *   where: {
     *     // ... the filter for the ItensPedidos we want to count
     *   }
     * })
    **/
    count<T extends ItensPedidoCountArgs>(
      args?: Subset<T, ItensPedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItensPedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItensPedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItensPedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItensPedidoAggregateArgs>(args: Subset<T, ItensPedidoAggregateArgs>): Prisma.PrismaPromise<GetItensPedidoAggregateType<T>>

    /**
     * Group by ItensPedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItensPedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItensPedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItensPedidoGroupByArgs['orderBy'] }
        : { orderBy?: ItensPedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItensPedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItensPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItensPedido model
   */
  readonly fields: ItensPedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItensPedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItensPedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produtos<T extends ProdutosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutosDefaultArgs<ExtArgs>>): Prisma__ProdutosClient<$Result.GetResult<Prisma.$ProdutosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pedidos<T extends PedidosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidosDefaultArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItensPedido model
   */
  interface ItensPedidoFieldRefs {
    readonly id: FieldRef<"ItensPedido", 'Int'>
    readonly idProduto: FieldRef<"ItensPedido", 'Int'>
    readonly idPedido: FieldRef<"ItensPedido", 'Int'>
    readonly precoUnitario: FieldRef<"ItensPedido", 'Decimal'>
    readonly quantidade: FieldRef<"ItensPedido", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ItensPedido findUnique
   */
  export type ItensPedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * Filter, which ItensPedido to fetch.
     */
    where: ItensPedidoWhereUniqueInput
  }

  /**
   * ItensPedido findUniqueOrThrow
   */
  export type ItensPedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * Filter, which ItensPedido to fetch.
     */
    where: ItensPedidoWhereUniqueInput
  }

  /**
   * ItensPedido findFirst
   */
  export type ItensPedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * Filter, which ItensPedido to fetch.
     */
    where?: ItensPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItensPedidos to fetch.
     */
    orderBy?: ItensPedidoOrderByWithRelationInput | ItensPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItensPedidos.
     */
    cursor?: ItensPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItensPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItensPedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItensPedidos.
     */
    distinct?: ItensPedidoScalarFieldEnum | ItensPedidoScalarFieldEnum[]
  }

  /**
   * ItensPedido findFirstOrThrow
   */
  export type ItensPedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * Filter, which ItensPedido to fetch.
     */
    where?: ItensPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItensPedidos to fetch.
     */
    orderBy?: ItensPedidoOrderByWithRelationInput | ItensPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItensPedidos.
     */
    cursor?: ItensPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItensPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItensPedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItensPedidos.
     */
    distinct?: ItensPedidoScalarFieldEnum | ItensPedidoScalarFieldEnum[]
  }

  /**
   * ItensPedido findMany
   */
  export type ItensPedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * Filter, which ItensPedidos to fetch.
     */
    where?: ItensPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItensPedidos to fetch.
     */
    orderBy?: ItensPedidoOrderByWithRelationInput | ItensPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItensPedidos.
     */
    cursor?: ItensPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItensPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItensPedidos.
     */
    skip?: number
    distinct?: ItensPedidoScalarFieldEnum | ItensPedidoScalarFieldEnum[]
  }

  /**
   * ItensPedido create
   */
  export type ItensPedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a ItensPedido.
     */
    data: XOR<ItensPedidoCreateInput, ItensPedidoUncheckedCreateInput>
  }

  /**
   * ItensPedido createMany
   */
  export type ItensPedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItensPedidos.
     */
    data: ItensPedidoCreateManyInput | ItensPedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItensPedido createManyAndReturn
   */
  export type ItensPedidoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * The data used to create many ItensPedidos.
     */
    data: ItensPedidoCreateManyInput | ItensPedidoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItensPedido update
   */
  export type ItensPedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a ItensPedido.
     */
    data: XOR<ItensPedidoUpdateInput, ItensPedidoUncheckedUpdateInput>
    /**
     * Choose, which ItensPedido to update.
     */
    where: ItensPedidoWhereUniqueInput
  }

  /**
   * ItensPedido updateMany
   */
  export type ItensPedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItensPedidos.
     */
    data: XOR<ItensPedidoUpdateManyMutationInput, ItensPedidoUncheckedUpdateManyInput>
    /**
     * Filter which ItensPedidos to update
     */
    where?: ItensPedidoWhereInput
    /**
     * Limit how many ItensPedidos to update.
     */
    limit?: number
  }

  /**
   * ItensPedido updateManyAndReturn
   */
  export type ItensPedidoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * The data used to update ItensPedidos.
     */
    data: XOR<ItensPedidoUpdateManyMutationInput, ItensPedidoUncheckedUpdateManyInput>
    /**
     * Filter which ItensPedidos to update
     */
    where?: ItensPedidoWhereInput
    /**
     * Limit how many ItensPedidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItensPedido upsert
   */
  export type ItensPedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the ItensPedido to update in case it exists.
     */
    where: ItensPedidoWhereUniqueInput
    /**
     * In case the ItensPedido found by the `where` argument doesn't exist, create a new ItensPedido with this data.
     */
    create: XOR<ItensPedidoCreateInput, ItensPedidoUncheckedCreateInput>
    /**
     * In case the ItensPedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItensPedidoUpdateInput, ItensPedidoUncheckedUpdateInput>
  }

  /**
   * ItensPedido delete
   */
  export type ItensPedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
    /**
     * Filter which ItensPedido to delete.
     */
    where: ItensPedidoWhereUniqueInput
  }

  /**
   * ItensPedido deleteMany
   */
  export type ItensPedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItensPedidos to delete
     */
    where?: ItensPedidoWhereInput
    /**
     * Limit how many ItensPedidos to delete.
     */
    limit?: number
  }

  /**
   * ItensPedido without action
   */
  export type ItensPedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItensPedido
     */
    select?: ItensPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItensPedido
     */
    omit?: ItensPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItensPedidoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuariosScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    usuario: 'usuario',
    senha: 'senha',
    email: 'email',
    status: 'status',
    data_criacao: 'data_criacao',
    data_alteracao: 'data_alteracao'
  };

  export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum]


  export const ClientesScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    apelido: 'apelido',
    endereco: 'endereco',
    fone: 'fone',
    status: 'status',
    data_criacao: 'data_criacao',
    data_alteracao: 'data_alteracao'
  };

  export type ClientesScalarFieldEnum = (typeof ClientesScalarFieldEnum)[keyof typeof ClientesScalarFieldEnum]


  export const ProdutosScalarFieldEnum: {
    id: 'id',
    idCategoria: 'idCategoria',
    descricao: 'descricao',
    preco: 'preco',
    status: 'status',
    data_criacao: 'data_criacao',
    data_alteracao: 'data_alteracao'
  };

  export type ProdutosScalarFieldEnum = (typeof ProdutosScalarFieldEnum)[keyof typeof ProdutosScalarFieldEnum]


  export const CategoriasScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao'
  };

  export type CategoriasScalarFieldEnum = (typeof CategoriasScalarFieldEnum)[keyof typeof CategoriasScalarFieldEnum]


  export const PedidosScalarFieldEnum: {
    id: 'id',
    idCliente: 'idCliente',
    idUsuario: 'idUsuario',
    observacao: 'observacao',
    valorTotal: 'valorTotal',
    data_criacao: 'data_criacao',
    data_alteracao: 'data_alteracao'
  };

  export type PedidosScalarFieldEnum = (typeof PedidosScalarFieldEnum)[keyof typeof PedidosScalarFieldEnum]


  export const ItensPedidoScalarFieldEnum: {
    id: 'id',
    idProduto: 'idProduto',
    idPedido: 'idPedido',
    precoUnitario: 'precoUnitario',
    quantidade: 'quantidade'
  };

  export type ItensPedidoScalarFieldEnum = (typeof ItensPedidoScalarFieldEnum)[keyof typeof ItensPedidoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuariosWhereInput = {
    AND?: UsuariosWhereInput | UsuariosWhereInput[]
    OR?: UsuariosWhereInput[]
    NOT?: UsuariosWhereInput | UsuariosWhereInput[]
    id?: IntFilter<"Usuarios"> | number
    nome?: StringFilter<"Usuarios"> | string
    usuario?: StringFilter<"Usuarios"> | string
    senha?: StringFilter<"Usuarios"> | string
    email?: StringFilter<"Usuarios"> | string
    status?: BoolFilter<"Usuarios"> | boolean
    data_criacao?: DateTimeFilter<"Usuarios"> | Date | string
    data_alteracao?: DateTimeFilter<"Usuarios"> | Date | string
    Pedidos?: PedidosListRelationFilter
  }

  export type UsuariosOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    usuario?: SortOrder
    senha?: SortOrder
    email?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    Pedidos?: PedidosOrderByRelationAggregateInput
  }

  export type UsuariosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    usuario?: string
    email?: string
    AND?: UsuariosWhereInput | UsuariosWhereInput[]
    OR?: UsuariosWhereInput[]
    NOT?: UsuariosWhereInput | UsuariosWhereInput[]
    nome?: StringFilter<"Usuarios"> | string
    senha?: StringFilter<"Usuarios"> | string
    status?: BoolFilter<"Usuarios"> | boolean
    data_criacao?: DateTimeFilter<"Usuarios"> | Date | string
    data_alteracao?: DateTimeFilter<"Usuarios"> | Date | string
    Pedidos?: PedidosListRelationFilter
  }, "id" | "usuario" | "email">

  export type UsuariosOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    usuario?: SortOrder
    senha?: SortOrder
    email?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    _count?: UsuariosCountOrderByAggregateInput
    _avg?: UsuariosAvgOrderByAggregateInput
    _max?: UsuariosMaxOrderByAggregateInput
    _min?: UsuariosMinOrderByAggregateInput
    _sum?: UsuariosSumOrderByAggregateInput
  }

  export type UsuariosScalarWhereWithAggregatesInput = {
    AND?: UsuariosScalarWhereWithAggregatesInput | UsuariosScalarWhereWithAggregatesInput[]
    OR?: UsuariosScalarWhereWithAggregatesInput[]
    NOT?: UsuariosScalarWhereWithAggregatesInput | UsuariosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuarios"> | number
    nome?: StringWithAggregatesFilter<"Usuarios"> | string
    usuario?: StringWithAggregatesFilter<"Usuarios"> | string
    senha?: StringWithAggregatesFilter<"Usuarios"> | string
    email?: StringWithAggregatesFilter<"Usuarios"> | string
    status?: BoolWithAggregatesFilter<"Usuarios"> | boolean
    data_criacao?: DateTimeWithAggregatesFilter<"Usuarios"> | Date | string
    data_alteracao?: DateTimeWithAggregatesFilter<"Usuarios"> | Date | string
  }

  export type ClientesWhereInput = {
    AND?: ClientesWhereInput | ClientesWhereInput[]
    OR?: ClientesWhereInput[]
    NOT?: ClientesWhereInput | ClientesWhereInput[]
    id?: IntFilter<"Clientes"> | number
    nome?: StringFilter<"Clientes"> | string
    apelido?: StringNullableFilter<"Clientes"> | string | null
    endereco?: StringNullableFilter<"Clientes"> | string | null
    fone?: StringNullableFilter<"Clientes"> | string | null
    status?: BoolFilter<"Clientes"> | boolean
    data_criacao?: DateTimeFilter<"Clientes"> | Date | string
    data_alteracao?: DateTimeFilter<"Clientes"> | Date | string
    Pedidos?: PedidosListRelationFilter
  }

  export type ClientesOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    apelido?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    fone?: SortOrderInput | SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    Pedidos?: PedidosOrderByRelationAggregateInput
  }

  export type ClientesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClientesWhereInput | ClientesWhereInput[]
    OR?: ClientesWhereInput[]
    NOT?: ClientesWhereInput | ClientesWhereInput[]
    nome?: StringFilter<"Clientes"> | string
    apelido?: StringNullableFilter<"Clientes"> | string | null
    endereco?: StringNullableFilter<"Clientes"> | string | null
    fone?: StringNullableFilter<"Clientes"> | string | null
    status?: BoolFilter<"Clientes"> | boolean
    data_criacao?: DateTimeFilter<"Clientes"> | Date | string
    data_alteracao?: DateTimeFilter<"Clientes"> | Date | string
    Pedidos?: PedidosListRelationFilter
  }, "id">

  export type ClientesOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    apelido?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    fone?: SortOrderInput | SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    _count?: ClientesCountOrderByAggregateInput
    _avg?: ClientesAvgOrderByAggregateInput
    _max?: ClientesMaxOrderByAggregateInput
    _min?: ClientesMinOrderByAggregateInput
    _sum?: ClientesSumOrderByAggregateInput
  }

  export type ClientesScalarWhereWithAggregatesInput = {
    AND?: ClientesScalarWhereWithAggregatesInput | ClientesScalarWhereWithAggregatesInput[]
    OR?: ClientesScalarWhereWithAggregatesInput[]
    NOT?: ClientesScalarWhereWithAggregatesInput | ClientesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Clientes"> | number
    nome?: StringWithAggregatesFilter<"Clientes"> | string
    apelido?: StringNullableWithAggregatesFilter<"Clientes"> | string | null
    endereco?: StringNullableWithAggregatesFilter<"Clientes"> | string | null
    fone?: StringNullableWithAggregatesFilter<"Clientes"> | string | null
    status?: BoolWithAggregatesFilter<"Clientes"> | boolean
    data_criacao?: DateTimeWithAggregatesFilter<"Clientes"> | Date | string
    data_alteracao?: DateTimeWithAggregatesFilter<"Clientes"> | Date | string
  }

  export type ProdutosWhereInput = {
    AND?: ProdutosWhereInput | ProdutosWhereInput[]
    OR?: ProdutosWhereInput[]
    NOT?: ProdutosWhereInput | ProdutosWhereInput[]
    id?: IntFilter<"Produtos"> | number
    idCategoria?: IntNullableFilter<"Produtos"> | number | null
    descricao?: StringFilter<"Produtos"> | string
    preco?: DecimalFilter<"Produtos"> | Decimal | DecimalJsLike | number | string
    status?: BoolFilter<"Produtos"> | boolean
    data_criacao?: DateTimeFilter<"Produtos"> | Date | string
    data_alteracao?: DateTimeFilter<"Produtos"> | Date | string
    categoria?: XOR<CategoriasNullableScalarRelationFilter, CategoriasWhereInput> | null
    itensPedidoVenda?: ItensPedidoListRelationFilter
  }

  export type ProdutosOrderByWithRelationInput = {
    id?: SortOrder
    idCategoria?: SortOrderInput | SortOrder
    descricao?: SortOrder
    preco?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    categoria?: CategoriasOrderByWithRelationInput
    itensPedidoVenda?: ItensPedidoOrderByRelationAggregateInput
  }

  export type ProdutosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProdutosWhereInput | ProdutosWhereInput[]
    OR?: ProdutosWhereInput[]
    NOT?: ProdutosWhereInput | ProdutosWhereInput[]
    idCategoria?: IntNullableFilter<"Produtos"> | number | null
    descricao?: StringFilter<"Produtos"> | string
    preco?: DecimalFilter<"Produtos"> | Decimal | DecimalJsLike | number | string
    status?: BoolFilter<"Produtos"> | boolean
    data_criacao?: DateTimeFilter<"Produtos"> | Date | string
    data_alteracao?: DateTimeFilter<"Produtos"> | Date | string
    categoria?: XOR<CategoriasNullableScalarRelationFilter, CategoriasWhereInput> | null
    itensPedidoVenda?: ItensPedidoListRelationFilter
  }, "id">

  export type ProdutosOrderByWithAggregationInput = {
    id?: SortOrder
    idCategoria?: SortOrderInput | SortOrder
    descricao?: SortOrder
    preco?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    _count?: ProdutosCountOrderByAggregateInput
    _avg?: ProdutosAvgOrderByAggregateInput
    _max?: ProdutosMaxOrderByAggregateInput
    _min?: ProdutosMinOrderByAggregateInput
    _sum?: ProdutosSumOrderByAggregateInput
  }

  export type ProdutosScalarWhereWithAggregatesInput = {
    AND?: ProdutosScalarWhereWithAggregatesInput | ProdutosScalarWhereWithAggregatesInput[]
    OR?: ProdutosScalarWhereWithAggregatesInput[]
    NOT?: ProdutosScalarWhereWithAggregatesInput | ProdutosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Produtos"> | number
    idCategoria?: IntNullableWithAggregatesFilter<"Produtos"> | number | null
    descricao?: StringWithAggregatesFilter<"Produtos"> | string
    preco?: DecimalWithAggregatesFilter<"Produtos"> | Decimal | DecimalJsLike | number | string
    status?: BoolWithAggregatesFilter<"Produtos"> | boolean
    data_criacao?: DateTimeWithAggregatesFilter<"Produtos"> | Date | string
    data_alteracao?: DateTimeWithAggregatesFilter<"Produtos"> | Date | string
  }

  export type CategoriasWhereInput = {
    AND?: CategoriasWhereInput | CategoriasWhereInput[]
    OR?: CategoriasWhereInput[]
    NOT?: CategoriasWhereInput | CategoriasWhereInput[]
    id?: IntFilter<"Categorias"> | number
    descricao?: StringFilter<"Categorias"> | string
    produtos?: ProdutosListRelationFilter
  }

  export type CategoriasOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    produtos?: ProdutosOrderByRelationAggregateInput
  }

  export type CategoriasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CategoriasWhereInput | CategoriasWhereInput[]
    OR?: CategoriasWhereInput[]
    NOT?: CategoriasWhereInput | CategoriasWhereInput[]
    descricao?: StringFilter<"Categorias"> | string
    produtos?: ProdutosListRelationFilter
  }, "id">

  export type CategoriasOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    _count?: CategoriasCountOrderByAggregateInput
    _avg?: CategoriasAvgOrderByAggregateInput
    _max?: CategoriasMaxOrderByAggregateInput
    _min?: CategoriasMinOrderByAggregateInput
    _sum?: CategoriasSumOrderByAggregateInput
  }

  export type CategoriasScalarWhereWithAggregatesInput = {
    AND?: CategoriasScalarWhereWithAggregatesInput | CategoriasScalarWhereWithAggregatesInput[]
    OR?: CategoriasScalarWhereWithAggregatesInput[]
    NOT?: CategoriasScalarWhereWithAggregatesInput | CategoriasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Categorias"> | number
    descricao?: StringWithAggregatesFilter<"Categorias"> | string
  }

  export type PedidosWhereInput = {
    AND?: PedidosWhereInput | PedidosWhereInput[]
    OR?: PedidosWhereInput[]
    NOT?: PedidosWhereInput | PedidosWhereInput[]
    id?: IntFilter<"Pedidos"> | number
    idCliente?: IntFilter<"Pedidos"> | number
    idUsuario?: IntFilter<"Pedidos"> | number
    observacao?: StringNullableFilter<"Pedidos"> | string | null
    valorTotal?: DecimalFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFilter<"Pedidos"> | Date | string
    data_alteracao?: DateTimeFilter<"Pedidos"> | Date | string
    cliente?: XOR<ClientesScalarRelationFilter, ClientesWhereInput>
    usuario?: XOR<UsuariosScalarRelationFilter, UsuariosWhereInput>
    itensPedidoVenda?: ItensPedidoListRelationFilter
  }

  export type PedidosOrderByWithRelationInput = {
    id?: SortOrder
    idCliente?: SortOrder
    idUsuario?: SortOrder
    observacao?: SortOrderInput | SortOrder
    valorTotal?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    cliente?: ClientesOrderByWithRelationInput
    usuario?: UsuariosOrderByWithRelationInput
    itensPedidoVenda?: ItensPedidoOrderByRelationAggregateInput
  }

  export type PedidosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PedidosWhereInput | PedidosWhereInput[]
    OR?: PedidosWhereInput[]
    NOT?: PedidosWhereInput | PedidosWhereInput[]
    idCliente?: IntFilter<"Pedidos"> | number
    idUsuario?: IntFilter<"Pedidos"> | number
    observacao?: StringNullableFilter<"Pedidos"> | string | null
    valorTotal?: DecimalFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFilter<"Pedidos"> | Date | string
    data_alteracao?: DateTimeFilter<"Pedidos"> | Date | string
    cliente?: XOR<ClientesScalarRelationFilter, ClientesWhereInput>
    usuario?: XOR<UsuariosScalarRelationFilter, UsuariosWhereInput>
    itensPedidoVenda?: ItensPedidoListRelationFilter
  }, "id">

  export type PedidosOrderByWithAggregationInput = {
    id?: SortOrder
    idCliente?: SortOrder
    idUsuario?: SortOrder
    observacao?: SortOrderInput | SortOrder
    valorTotal?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
    _count?: PedidosCountOrderByAggregateInput
    _avg?: PedidosAvgOrderByAggregateInput
    _max?: PedidosMaxOrderByAggregateInput
    _min?: PedidosMinOrderByAggregateInput
    _sum?: PedidosSumOrderByAggregateInput
  }

  export type PedidosScalarWhereWithAggregatesInput = {
    AND?: PedidosScalarWhereWithAggregatesInput | PedidosScalarWhereWithAggregatesInput[]
    OR?: PedidosScalarWhereWithAggregatesInput[]
    NOT?: PedidosScalarWhereWithAggregatesInput | PedidosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pedidos"> | number
    idCliente?: IntWithAggregatesFilter<"Pedidos"> | number
    idUsuario?: IntWithAggregatesFilter<"Pedidos"> | number
    observacao?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    valorTotal?: DecimalWithAggregatesFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeWithAggregatesFilter<"Pedidos"> | Date | string
    data_alteracao?: DateTimeWithAggregatesFilter<"Pedidos"> | Date | string
  }

  export type ItensPedidoWhereInput = {
    AND?: ItensPedidoWhereInput | ItensPedidoWhereInput[]
    OR?: ItensPedidoWhereInput[]
    NOT?: ItensPedidoWhereInput | ItensPedidoWhereInput[]
    id?: IntFilter<"ItensPedido"> | number
    idProduto?: IntFilter<"ItensPedido"> | number
    idPedido?: IntFilter<"ItensPedido"> | number
    precoUnitario?: DecimalFilter<"ItensPedido"> | Decimal | DecimalJsLike | number | string
    quantidade?: IntFilter<"ItensPedido"> | number
    produtos?: XOR<ProdutosScalarRelationFilter, ProdutosWhereInput>
    pedidos?: XOR<PedidosScalarRelationFilter, PedidosWhereInput>
  }

  export type ItensPedidoOrderByWithRelationInput = {
    id?: SortOrder
    idProduto?: SortOrder
    idPedido?: SortOrder
    precoUnitario?: SortOrder
    quantidade?: SortOrder
    produtos?: ProdutosOrderByWithRelationInput
    pedidos?: PedidosOrderByWithRelationInput
  }

  export type ItensPedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItensPedidoWhereInput | ItensPedidoWhereInput[]
    OR?: ItensPedidoWhereInput[]
    NOT?: ItensPedidoWhereInput | ItensPedidoWhereInput[]
    idProduto?: IntFilter<"ItensPedido"> | number
    idPedido?: IntFilter<"ItensPedido"> | number
    precoUnitario?: DecimalFilter<"ItensPedido"> | Decimal | DecimalJsLike | number | string
    quantidade?: IntFilter<"ItensPedido"> | number
    produtos?: XOR<ProdutosScalarRelationFilter, ProdutosWhereInput>
    pedidos?: XOR<PedidosScalarRelationFilter, PedidosWhereInput>
  }, "id">

  export type ItensPedidoOrderByWithAggregationInput = {
    id?: SortOrder
    idProduto?: SortOrder
    idPedido?: SortOrder
    precoUnitario?: SortOrder
    quantidade?: SortOrder
    _count?: ItensPedidoCountOrderByAggregateInput
    _avg?: ItensPedidoAvgOrderByAggregateInput
    _max?: ItensPedidoMaxOrderByAggregateInput
    _min?: ItensPedidoMinOrderByAggregateInput
    _sum?: ItensPedidoSumOrderByAggregateInput
  }

  export type ItensPedidoScalarWhereWithAggregatesInput = {
    AND?: ItensPedidoScalarWhereWithAggregatesInput | ItensPedidoScalarWhereWithAggregatesInput[]
    OR?: ItensPedidoScalarWhereWithAggregatesInput[]
    NOT?: ItensPedidoScalarWhereWithAggregatesInput | ItensPedidoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ItensPedido"> | number
    idProduto?: IntWithAggregatesFilter<"ItensPedido"> | number
    idPedido?: IntWithAggregatesFilter<"ItensPedido"> | number
    precoUnitario?: DecimalWithAggregatesFilter<"ItensPedido"> | Decimal | DecimalJsLike | number | string
    quantidade?: IntWithAggregatesFilter<"ItensPedido"> | number
  }

  export type UsuariosCreateInput = {
    nome: string
    usuario: string
    senha: string
    email: string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    Pedidos?: PedidosCreateNestedManyWithoutUsuarioInput
  }

  export type UsuariosUncheckedCreateInput = {
    id?: number
    nome: string
    usuario: string
    senha: string
    email: string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    Pedidos?: PedidosUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuariosUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    Pedidos?: PedidosUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuariosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    Pedidos?: PedidosUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuariosCreateManyInput = {
    id?: number
    nome: string
    usuario: string
    senha: string
    email: string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type UsuariosUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuariosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientesCreateInput = {
    nome: string
    apelido?: string | null
    endereco?: string | null
    fone?: string | null
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    Pedidos?: PedidosCreateNestedManyWithoutClienteInput
  }

  export type ClientesUncheckedCreateInput = {
    id?: number
    nome: string
    apelido?: string | null
    endereco?: string | null
    fone?: string | null
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    Pedidos?: PedidosUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClientesUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    Pedidos?: PedidosUpdateManyWithoutClienteNestedInput
  }

  export type ClientesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    Pedidos?: PedidosUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClientesCreateManyInput = {
    id?: number
    nome: string
    apelido?: string | null
    endereco?: string | null
    fone?: string | null
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type ClientesUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProdutosCreateInput = {
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    categoria?: CategoriasCreateNestedOneWithoutProdutosInput
    itensPedidoVenda?: ItensPedidoCreateNestedManyWithoutProdutosInput
  }

  export type ProdutosUncheckedCreateInput = {
    id?: number
    idCategoria?: number | null
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    itensPedidoVenda?: ItensPedidoUncheckedCreateNestedManyWithoutProdutosInput
  }

  export type ProdutosUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriasUpdateOneWithoutProdutosNestedInput
    itensPedidoVenda?: ItensPedidoUpdateManyWithoutProdutosNestedInput
  }

  export type ProdutosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCategoria?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    itensPedidoVenda?: ItensPedidoUncheckedUpdateManyWithoutProdutosNestedInput
  }

  export type ProdutosCreateManyInput = {
    id?: number
    idCategoria?: number | null
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type ProdutosUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProdutosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCategoria?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriasCreateInput = {
    descricao: string
    produtos?: ProdutosCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriasUncheckedCreateInput = {
    id?: number
    descricao: string
    produtos?: ProdutosUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriasUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    produtos?: ProdutosUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    produtos?: ProdutosUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriasCreateManyInput = {
    id?: number
    descricao: string
  }

  export type CategoriasUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
  }

  export type PedidosCreateInput = {
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
    cliente: ClientesCreateNestedOneWithoutPedidosInput
    usuario: UsuariosCreateNestedOneWithoutPedidosInput
    itensPedidoVenda?: ItensPedidoCreateNestedManyWithoutPedidosInput
  }

  export type PedidosUncheckedCreateInput = {
    id?: number
    idCliente: number
    idUsuario: number
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
    itensPedidoVenda?: ItensPedidoUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type PedidosUpdateInput = {
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientesUpdateOneRequiredWithoutPedidosNestedInput
    usuario?: UsuariosUpdateOneRequiredWithoutPedidosNestedInput
    itensPedidoVenda?: ItensPedidoUpdateManyWithoutPedidosNestedInput
  }

  export type PedidosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCliente?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    itensPedidoVenda?: ItensPedidoUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type PedidosCreateManyInput = {
    id?: number
    idCliente: number
    idUsuario: number
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type PedidosUpdateManyMutationInput = {
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCliente?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItensPedidoCreateInput = {
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
    produtos: ProdutosCreateNestedOneWithoutItensPedidoVendaInput
    pedidos: PedidosCreateNestedOneWithoutItensPedidoVendaInput
  }

  export type ItensPedidoUncheckedCreateInput = {
    id?: number
    idProduto: number
    idPedido: number
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
  }

  export type ItensPedidoUpdateInput = {
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtos?: ProdutosUpdateOneRequiredWithoutItensPedidoVendaNestedInput
    pedidos?: PedidosUpdateOneRequiredWithoutItensPedidoVendaNestedInput
  }

  export type ItensPedidoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type ItensPedidoCreateManyInput = {
    id?: number
    idProduto: number
    idPedido: number
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
  }

  export type ItensPedidoUpdateManyMutationInput = {
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type ItensPedidoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PedidosListRelationFilter = {
    every?: PedidosWhereInput
    some?: PedidosWhereInput
    none?: PedidosWhereInput
  }

  export type PedidosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuariosCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    usuario?: SortOrder
    senha?: SortOrder
    email?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type UsuariosAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuariosMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    usuario?: SortOrder
    senha?: SortOrder
    email?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type UsuariosMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    usuario?: SortOrder
    senha?: SortOrder
    email?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type UsuariosSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClientesCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    apelido?: SortOrder
    endereco?: SortOrder
    fone?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type ClientesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClientesMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    apelido?: SortOrder
    endereco?: SortOrder
    fone?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type ClientesMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    apelido?: SortOrder
    endereco?: SortOrder
    fone?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type ClientesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoriasNullableScalarRelationFilter = {
    is?: CategoriasWhereInput | null
    isNot?: CategoriasWhereInput | null
  }

  export type ItensPedidoListRelationFilter = {
    every?: ItensPedidoWhereInput
    some?: ItensPedidoWhereInput
    none?: ItensPedidoWhereInput
  }

  export type ItensPedidoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutosCountOrderByAggregateInput = {
    id?: SortOrder
    idCategoria?: SortOrder
    descricao?: SortOrder
    preco?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type ProdutosAvgOrderByAggregateInput = {
    id?: SortOrder
    idCategoria?: SortOrder
    preco?: SortOrder
  }

  export type ProdutosMaxOrderByAggregateInput = {
    id?: SortOrder
    idCategoria?: SortOrder
    descricao?: SortOrder
    preco?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type ProdutosMinOrderByAggregateInput = {
    id?: SortOrder
    idCategoria?: SortOrder
    descricao?: SortOrder
    preco?: SortOrder
    status?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type ProdutosSumOrderByAggregateInput = {
    id?: SortOrder
    idCategoria?: SortOrder
    preco?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ProdutosListRelationFilter = {
    every?: ProdutosWhereInput
    some?: ProdutosWhereInput
    none?: ProdutosWhereInput
  }

  export type ProdutosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriasCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
  }

  export type CategoriasAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoriasMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
  }

  export type CategoriasMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
  }

  export type CategoriasSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClientesScalarRelationFilter = {
    is?: ClientesWhereInput
    isNot?: ClientesWhereInput
  }

  export type UsuariosScalarRelationFilter = {
    is?: UsuariosWhereInput
    isNot?: UsuariosWhereInput
  }

  export type PedidosCountOrderByAggregateInput = {
    id?: SortOrder
    idCliente?: SortOrder
    idUsuario?: SortOrder
    observacao?: SortOrder
    valorTotal?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type PedidosAvgOrderByAggregateInput = {
    id?: SortOrder
    idCliente?: SortOrder
    idUsuario?: SortOrder
    valorTotal?: SortOrder
  }

  export type PedidosMaxOrderByAggregateInput = {
    id?: SortOrder
    idCliente?: SortOrder
    idUsuario?: SortOrder
    observacao?: SortOrder
    valorTotal?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type PedidosMinOrderByAggregateInput = {
    id?: SortOrder
    idCliente?: SortOrder
    idUsuario?: SortOrder
    observacao?: SortOrder
    valorTotal?: SortOrder
    data_criacao?: SortOrder
    data_alteracao?: SortOrder
  }

  export type PedidosSumOrderByAggregateInput = {
    id?: SortOrder
    idCliente?: SortOrder
    idUsuario?: SortOrder
    valorTotal?: SortOrder
  }

  export type ProdutosScalarRelationFilter = {
    is?: ProdutosWhereInput
    isNot?: ProdutosWhereInput
  }

  export type PedidosScalarRelationFilter = {
    is?: PedidosWhereInput
    isNot?: PedidosWhereInput
  }

  export type ItensPedidoCountOrderByAggregateInput = {
    id?: SortOrder
    idProduto?: SortOrder
    idPedido?: SortOrder
    precoUnitario?: SortOrder
    quantidade?: SortOrder
  }

  export type ItensPedidoAvgOrderByAggregateInput = {
    id?: SortOrder
    idProduto?: SortOrder
    idPedido?: SortOrder
    precoUnitario?: SortOrder
    quantidade?: SortOrder
  }

  export type ItensPedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    idProduto?: SortOrder
    idPedido?: SortOrder
    precoUnitario?: SortOrder
    quantidade?: SortOrder
  }

  export type ItensPedidoMinOrderByAggregateInput = {
    id?: SortOrder
    idProduto?: SortOrder
    idPedido?: SortOrder
    precoUnitario?: SortOrder
    quantidade?: SortOrder
  }

  export type ItensPedidoSumOrderByAggregateInput = {
    id?: SortOrder
    idProduto?: SortOrder
    idPedido?: SortOrder
    precoUnitario?: SortOrder
    quantidade?: SortOrder
  }

  export type PedidosCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PedidosCreateWithoutUsuarioInput, PedidosUncheckedCreateWithoutUsuarioInput> | PedidosCreateWithoutUsuarioInput[] | PedidosUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutUsuarioInput | PedidosCreateOrConnectWithoutUsuarioInput[]
    createMany?: PedidosCreateManyUsuarioInputEnvelope
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
  }

  export type PedidosUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PedidosCreateWithoutUsuarioInput, PedidosUncheckedCreateWithoutUsuarioInput> | PedidosCreateWithoutUsuarioInput[] | PedidosUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutUsuarioInput | PedidosCreateOrConnectWithoutUsuarioInput[]
    createMany?: PedidosCreateManyUsuarioInputEnvelope
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PedidosUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PedidosCreateWithoutUsuarioInput, PedidosUncheckedCreateWithoutUsuarioInput> | PedidosCreateWithoutUsuarioInput[] | PedidosUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutUsuarioInput | PedidosCreateOrConnectWithoutUsuarioInput[]
    upsert?: PedidosUpsertWithWhereUniqueWithoutUsuarioInput | PedidosUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PedidosCreateManyUsuarioInputEnvelope
    set?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    disconnect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    delete?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    update?: PedidosUpdateWithWhereUniqueWithoutUsuarioInput | PedidosUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PedidosUpdateManyWithWhereWithoutUsuarioInput | PedidosUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PedidosUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PedidosCreateWithoutUsuarioInput, PedidosUncheckedCreateWithoutUsuarioInput> | PedidosCreateWithoutUsuarioInput[] | PedidosUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutUsuarioInput | PedidosCreateOrConnectWithoutUsuarioInput[]
    upsert?: PedidosUpsertWithWhereUniqueWithoutUsuarioInput | PedidosUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PedidosCreateManyUsuarioInputEnvelope
    set?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    disconnect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    delete?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    update?: PedidosUpdateWithWhereUniqueWithoutUsuarioInput | PedidosUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PedidosUpdateManyWithWhereWithoutUsuarioInput | PedidosUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
  }

  export type PedidosCreateNestedManyWithoutClienteInput = {
    create?: XOR<PedidosCreateWithoutClienteInput, PedidosUncheckedCreateWithoutClienteInput> | PedidosCreateWithoutClienteInput[] | PedidosUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutClienteInput | PedidosCreateOrConnectWithoutClienteInput[]
    createMany?: PedidosCreateManyClienteInputEnvelope
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
  }

  export type PedidosUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<PedidosCreateWithoutClienteInput, PedidosUncheckedCreateWithoutClienteInput> | PedidosCreateWithoutClienteInput[] | PedidosUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutClienteInput | PedidosCreateOrConnectWithoutClienteInput[]
    createMany?: PedidosCreateManyClienteInputEnvelope
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PedidosUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PedidosCreateWithoutClienteInput, PedidosUncheckedCreateWithoutClienteInput> | PedidosCreateWithoutClienteInput[] | PedidosUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutClienteInput | PedidosCreateOrConnectWithoutClienteInput[]
    upsert?: PedidosUpsertWithWhereUniqueWithoutClienteInput | PedidosUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PedidosCreateManyClienteInputEnvelope
    set?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    disconnect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    delete?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    update?: PedidosUpdateWithWhereUniqueWithoutClienteInput | PedidosUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PedidosUpdateManyWithWhereWithoutClienteInput | PedidosUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
  }

  export type PedidosUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PedidosCreateWithoutClienteInput, PedidosUncheckedCreateWithoutClienteInput> | PedidosCreateWithoutClienteInput[] | PedidosUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutClienteInput | PedidosCreateOrConnectWithoutClienteInput[]
    upsert?: PedidosUpsertWithWhereUniqueWithoutClienteInput | PedidosUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PedidosCreateManyClienteInputEnvelope
    set?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    disconnect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    delete?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    update?: PedidosUpdateWithWhereUniqueWithoutClienteInput | PedidosUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PedidosUpdateManyWithWhereWithoutClienteInput | PedidosUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
  }

  export type CategoriasCreateNestedOneWithoutProdutosInput = {
    create?: XOR<CategoriasCreateWithoutProdutosInput, CategoriasUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: CategoriasCreateOrConnectWithoutProdutosInput
    connect?: CategoriasWhereUniqueInput
  }

  export type ItensPedidoCreateNestedManyWithoutProdutosInput = {
    create?: XOR<ItensPedidoCreateWithoutProdutosInput, ItensPedidoUncheckedCreateWithoutProdutosInput> | ItensPedidoCreateWithoutProdutosInput[] | ItensPedidoUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutProdutosInput | ItensPedidoCreateOrConnectWithoutProdutosInput[]
    createMany?: ItensPedidoCreateManyProdutosInputEnvelope
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
  }

  export type ItensPedidoUncheckedCreateNestedManyWithoutProdutosInput = {
    create?: XOR<ItensPedidoCreateWithoutProdutosInput, ItensPedidoUncheckedCreateWithoutProdutosInput> | ItensPedidoCreateWithoutProdutosInput[] | ItensPedidoUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutProdutosInput | ItensPedidoCreateOrConnectWithoutProdutosInput[]
    createMany?: ItensPedidoCreateManyProdutosInputEnvelope
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CategoriasUpdateOneWithoutProdutosNestedInput = {
    create?: XOR<CategoriasCreateWithoutProdutosInput, CategoriasUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: CategoriasCreateOrConnectWithoutProdutosInput
    upsert?: CategoriasUpsertWithoutProdutosInput
    disconnect?: CategoriasWhereInput | boolean
    delete?: CategoriasWhereInput | boolean
    connect?: CategoriasWhereUniqueInput
    update?: XOR<XOR<CategoriasUpdateToOneWithWhereWithoutProdutosInput, CategoriasUpdateWithoutProdutosInput>, CategoriasUncheckedUpdateWithoutProdutosInput>
  }

  export type ItensPedidoUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<ItensPedidoCreateWithoutProdutosInput, ItensPedidoUncheckedCreateWithoutProdutosInput> | ItensPedidoCreateWithoutProdutosInput[] | ItensPedidoUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutProdutosInput | ItensPedidoCreateOrConnectWithoutProdutosInput[]
    upsert?: ItensPedidoUpsertWithWhereUniqueWithoutProdutosInput | ItensPedidoUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: ItensPedidoCreateManyProdutosInputEnvelope
    set?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    disconnect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    delete?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    update?: ItensPedidoUpdateWithWhereUniqueWithoutProdutosInput | ItensPedidoUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: ItensPedidoUpdateManyWithWhereWithoutProdutosInput | ItensPedidoUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: ItensPedidoScalarWhereInput | ItensPedidoScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ItensPedidoUncheckedUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<ItensPedidoCreateWithoutProdutosInput, ItensPedidoUncheckedCreateWithoutProdutosInput> | ItensPedidoCreateWithoutProdutosInput[] | ItensPedidoUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutProdutosInput | ItensPedidoCreateOrConnectWithoutProdutosInput[]
    upsert?: ItensPedidoUpsertWithWhereUniqueWithoutProdutosInput | ItensPedidoUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: ItensPedidoCreateManyProdutosInputEnvelope
    set?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    disconnect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    delete?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    update?: ItensPedidoUpdateWithWhereUniqueWithoutProdutosInput | ItensPedidoUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: ItensPedidoUpdateManyWithWhereWithoutProdutosInput | ItensPedidoUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: ItensPedidoScalarWhereInput | ItensPedidoScalarWhereInput[]
  }

  export type ProdutosCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProdutosCreateWithoutCategoriaInput, ProdutosUncheckedCreateWithoutCategoriaInput> | ProdutosCreateWithoutCategoriaInput[] | ProdutosUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutosCreateOrConnectWithoutCategoriaInput | ProdutosCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProdutosCreateManyCategoriaInputEnvelope
    connect?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
  }

  export type ProdutosUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProdutosCreateWithoutCategoriaInput, ProdutosUncheckedCreateWithoutCategoriaInput> | ProdutosCreateWithoutCategoriaInput[] | ProdutosUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutosCreateOrConnectWithoutCategoriaInput | ProdutosCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProdutosCreateManyCategoriaInputEnvelope
    connect?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
  }

  export type ProdutosUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProdutosCreateWithoutCategoriaInput, ProdutosUncheckedCreateWithoutCategoriaInput> | ProdutosCreateWithoutCategoriaInput[] | ProdutosUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutosCreateOrConnectWithoutCategoriaInput | ProdutosCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProdutosUpsertWithWhereUniqueWithoutCategoriaInput | ProdutosUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProdutosCreateManyCategoriaInputEnvelope
    set?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    disconnect?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    delete?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    connect?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    update?: ProdutosUpdateWithWhereUniqueWithoutCategoriaInput | ProdutosUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProdutosUpdateManyWithWhereWithoutCategoriaInput | ProdutosUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProdutosScalarWhereInput | ProdutosScalarWhereInput[]
  }

  export type ProdutosUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProdutosCreateWithoutCategoriaInput, ProdutosUncheckedCreateWithoutCategoriaInput> | ProdutosCreateWithoutCategoriaInput[] | ProdutosUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProdutosCreateOrConnectWithoutCategoriaInput | ProdutosCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProdutosUpsertWithWhereUniqueWithoutCategoriaInput | ProdutosUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProdutosCreateManyCategoriaInputEnvelope
    set?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    disconnect?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    delete?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    connect?: ProdutosWhereUniqueInput | ProdutosWhereUniqueInput[]
    update?: ProdutosUpdateWithWhereUniqueWithoutCategoriaInput | ProdutosUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProdutosUpdateManyWithWhereWithoutCategoriaInput | ProdutosUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProdutosScalarWhereInput | ProdutosScalarWhereInput[]
  }

  export type ClientesCreateNestedOneWithoutPedidosInput = {
    create?: XOR<ClientesCreateWithoutPedidosInput, ClientesUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: ClientesCreateOrConnectWithoutPedidosInput
    connect?: ClientesWhereUniqueInput
  }

  export type UsuariosCreateNestedOneWithoutPedidosInput = {
    create?: XOR<UsuariosCreateWithoutPedidosInput, UsuariosUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: UsuariosCreateOrConnectWithoutPedidosInput
    connect?: UsuariosWhereUniqueInput
  }

  export type ItensPedidoCreateNestedManyWithoutPedidosInput = {
    create?: XOR<ItensPedidoCreateWithoutPedidosInput, ItensPedidoUncheckedCreateWithoutPedidosInput> | ItensPedidoCreateWithoutPedidosInput[] | ItensPedidoUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutPedidosInput | ItensPedidoCreateOrConnectWithoutPedidosInput[]
    createMany?: ItensPedidoCreateManyPedidosInputEnvelope
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
  }

  export type ItensPedidoUncheckedCreateNestedManyWithoutPedidosInput = {
    create?: XOR<ItensPedidoCreateWithoutPedidosInput, ItensPedidoUncheckedCreateWithoutPedidosInput> | ItensPedidoCreateWithoutPedidosInput[] | ItensPedidoUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutPedidosInput | ItensPedidoCreateOrConnectWithoutPedidosInput[]
    createMany?: ItensPedidoCreateManyPedidosInputEnvelope
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
  }

  export type ClientesUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<ClientesCreateWithoutPedidosInput, ClientesUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: ClientesCreateOrConnectWithoutPedidosInput
    upsert?: ClientesUpsertWithoutPedidosInput
    connect?: ClientesWhereUniqueInput
    update?: XOR<XOR<ClientesUpdateToOneWithWhereWithoutPedidosInput, ClientesUpdateWithoutPedidosInput>, ClientesUncheckedUpdateWithoutPedidosInput>
  }

  export type UsuariosUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<UsuariosCreateWithoutPedidosInput, UsuariosUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: UsuariosCreateOrConnectWithoutPedidosInput
    upsert?: UsuariosUpsertWithoutPedidosInput
    connect?: UsuariosWhereUniqueInput
    update?: XOR<XOR<UsuariosUpdateToOneWithWhereWithoutPedidosInput, UsuariosUpdateWithoutPedidosInput>, UsuariosUncheckedUpdateWithoutPedidosInput>
  }

  export type ItensPedidoUpdateManyWithoutPedidosNestedInput = {
    create?: XOR<ItensPedidoCreateWithoutPedidosInput, ItensPedidoUncheckedCreateWithoutPedidosInput> | ItensPedidoCreateWithoutPedidosInput[] | ItensPedidoUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutPedidosInput | ItensPedidoCreateOrConnectWithoutPedidosInput[]
    upsert?: ItensPedidoUpsertWithWhereUniqueWithoutPedidosInput | ItensPedidoUpsertWithWhereUniqueWithoutPedidosInput[]
    createMany?: ItensPedidoCreateManyPedidosInputEnvelope
    set?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    disconnect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    delete?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    update?: ItensPedidoUpdateWithWhereUniqueWithoutPedidosInput | ItensPedidoUpdateWithWhereUniqueWithoutPedidosInput[]
    updateMany?: ItensPedidoUpdateManyWithWhereWithoutPedidosInput | ItensPedidoUpdateManyWithWhereWithoutPedidosInput[]
    deleteMany?: ItensPedidoScalarWhereInput | ItensPedidoScalarWhereInput[]
  }

  export type ItensPedidoUncheckedUpdateManyWithoutPedidosNestedInput = {
    create?: XOR<ItensPedidoCreateWithoutPedidosInput, ItensPedidoUncheckedCreateWithoutPedidosInput> | ItensPedidoCreateWithoutPedidosInput[] | ItensPedidoUncheckedCreateWithoutPedidosInput[]
    connectOrCreate?: ItensPedidoCreateOrConnectWithoutPedidosInput | ItensPedidoCreateOrConnectWithoutPedidosInput[]
    upsert?: ItensPedidoUpsertWithWhereUniqueWithoutPedidosInput | ItensPedidoUpsertWithWhereUniqueWithoutPedidosInput[]
    createMany?: ItensPedidoCreateManyPedidosInputEnvelope
    set?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    disconnect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    delete?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    connect?: ItensPedidoWhereUniqueInput | ItensPedidoWhereUniqueInput[]
    update?: ItensPedidoUpdateWithWhereUniqueWithoutPedidosInput | ItensPedidoUpdateWithWhereUniqueWithoutPedidosInput[]
    updateMany?: ItensPedidoUpdateManyWithWhereWithoutPedidosInput | ItensPedidoUpdateManyWithWhereWithoutPedidosInput[]
    deleteMany?: ItensPedidoScalarWhereInput | ItensPedidoScalarWhereInput[]
  }

  export type ProdutosCreateNestedOneWithoutItensPedidoVendaInput = {
    create?: XOR<ProdutosCreateWithoutItensPedidoVendaInput, ProdutosUncheckedCreateWithoutItensPedidoVendaInput>
    connectOrCreate?: ProdutosCreateOrConnectWithoutItensPedidoVendaInput
    connect?: ProdutosWhereUniqueInput
  }

  export type PedidosCreateNestedOneWithoutItensPedidoVendaInput = {
    create?: XOR<PedidosCreateWithoutItensPedidoVendaInput, PedidosUncheckedCreateWithoutItensPedidoVendaInput>
    connectOrCreate?: PedidosCreateOrConnectWithoutItensPedidoVendaInput
    connect?: PedidosWhereUniqueInput
  }

  export type ProdutosUpdateOneRequiredWithoutItensPedidoVendaNestedInput = {
    create?: XOR<ProdutosCreateWithoutItensPedidoVendaInput, ProdutosUncheckedCreateWithoutItensPedidoVendaInput>
    connectOrCreate?: ProdutosCreateOrConnectWithoutItensPedidoVendaInput
    upsert?: ProdutosUpsertWithoutItensPedidoVendaInput
    connect?: ProdutosWhereUniqueInput
    update?: XOR<XOR<ProdutosUpdateToOneWithWhereWithoutItensPedidoVendaInput, ProdutosUpdateWithoutItensPedidoVendaInput>, ProdutosUncheckedUpdateWithoutItensPedidoVendaInput>
  }

  export type PedidosUpdateOneRequiredWithoutItensPedidoVendaNestedInput = {
    create?: XOR<PedidosCreateWithoutItensPedidoVendaInput, PedidosUncheckedCreateWithoutItensPedidoVendaInput>
    connectOrCreate?: PedidosCreateOrConnectWithoutItensPedidoVendaInput
    upsert?: PedidosUpsertWithoutItensPedidoVendaInput
    connect?: PedidosWhereUniqueInput
    update?: XOR<XOR<PedidosUpdateToOneWithWhereWithoutItensPedidoVendaInput, PedidosUpdateWithoutItensPedidoVendaInput>, PedidosUncheckedUpdateWithoutItensPedidoVendaInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type PedidosCreateWithoutUsuarioInput = {
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
    cliente: ClientesCreateNestedOneWithoutPedidosInput
    itensPedidoVenda?: ItensPedidoCreateNestedManyWithoutPedidosInput
  }

  export type PedidosUncheckedCreateWithoutUsuarioInput = {
    id?: number
    idCliente: number
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
    itensPedidoVenda?: ItensPedidoUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type PedidosCreateOrConnectWithoutUsuarioInput = {
    where: PedidosWhereUniqueInput
    create: XOR<PedidosCreateWithoutUsuarioInput, PedidosUncheckedCreateWithoutUsuarioInput>
  }

  export type PedidosCreateManyUsuarioInputEnvelope = {
    data: PedidosCreateManyUsuarioInput | PedidosCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type PedidosUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: PedidosWhereUniqueInput
    update: XOR<PedidosUpdateWithoutUsuarioInput, PedidosUncheckedUpdateWithoutUsuarioInput>
    create: XOR<PedidosCreateWithoutUsuarioInput, PedidosUncheckedCreateWithoutUsuarioInput>
  }

  export type PedidosUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: PedidosWhereUniqueInput
    data: XOR<PedidosUpdateWithoutUsuarioInput, PedidosUncheckedUpdateWithoutUsuarioInput>
  }

  export type PedidosUpdateManyWithWhereWithoutUsuarioInput = {
    where: PedidosScalarWhereInput
    data: XOR<PedidosUpdateManyMutationInput, PedidosUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type PedidosScalarWhereInput = {
    AND?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
    OR?: PedidosScalarWhereInput[]
    NOT?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
    id?: IntFilter<"Pedidos"> | number
    idCliente?: IntFilter<"Pedidos"> | number
    idUsuario?: IntFilter<"Pedidos"> | number
    observacao?: StringNullableFilter<"Pedidos"> | string | null
    valorTotal?: DecimalFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFilter<"Pedidos"> | Date | string
    data_alteracao?: DateTimeFilter<"Pedidos"> | Date | string
  }

  export type PedidosCreateWithoutClienteInput = {
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
    usuario: UsuariosCreateNestedOneWithoutPedidosInput
    itensPedidoVenda?: ItensPedidoCreateNestedManyWithoutPedidosInput
  }

  export type PedidosUncheckedCreateWithoutClienteInput = {
    id?: number
    idUsuario: number
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
    itensPedidoVenda?: ItensPedidoUncheckedCreateNestedManyWithoutPedidosInput
  }

  export type PedidosCreateOrConnectWithoutClienteInput = {
    where: PedidosWhereUniqueInput
    create: XOR<PedidosCreateWithoutClienteInput, PedidosUncheckedCreateWithoutClienteInput>
  }

  export type PedidosCreateManyClienteInputEnvelope = {
    data: PedidosCreateManyClienteInput | PedidosCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type PedidosUpsertWithWhereUniqueWithoutClienteInput = {
    where: PedidosWhereUniqueInput
    update: XOR<PedidosUpdateWithoutClienteInput, PedidosUncheckedUpdateWithoutClienteInput>
    create: XOR<PedidosCreateWithoutClienteInput, PedidosUncheckedCreateWithoutClienteInput>
  }

  export type PedidosUpdateWithWhereUniqueWithoutClienteInput = {
    where: PedidosWhereUniqueInput
    data: XOR<PedidosUpdateWithoutClienteInput, PedidosUncheckedUpdateWithoutClienteInput>
  }

  export type PedidosUpdateManyWithWhereWithoutClienteInput = {
    where: PedidosScalarWhereInput
    data: XOR<PedidosUpdateManyMutationInput, PedidosUncheckedUpdateManyWithoutClienteInput>
  }

  export type CategoriasCreateWithoutProdutosInput = {
    descricao: string
  }

  export type CategoriasUncheckedCreateWithoutProdutosInput = {
    id?: number
    descricao: string
  }

  export type CategoriasCreateOrConnectWithoutProdutosInput = {
    where: CategoriasWhereUniqueInput
    create: XOR<CategoriasCreateWithoutProdutosInput, CategoriasUncheckedCreateWithoutProdutosInput>
  }

  export type ItensPedidoCreateWithoutProdutosInput = {
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
    pedidos: PedidosCreateNestedOneWithoutItensPedidoVendaInput
  }

  export type ItensPedidoUncheckedCreateWithoutProdutosInput = {
    id?: number
    idPedido: number
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
  }

  export type ItensPedidoCreateOrConnectWithoutProdutosInput = {
    where: ItensPedidoWhereUniqueInput
    create: XOR<ItensPedidoCreateWithoutProdutosInput, ItensPedidoUncheckedCreateWithoutProdutosInput>
  }

  export type ItensPedidoCreateManyProdutosInputEnvelope = {
    data: ItensPedidoCreateManyProdutosInput | ItensPedidoCreateManyProdutosInput[]
    skipDuplicates?: boolean
  }

  export type CategoriasUpsertWithoutProdutosInput = {
    update: XOR<CategoriasUpdateWithoutProdutosInput, CategoriasUncheckedUpdateWithoutProdutosInput>
    create: XOR<CategoriasCreateWithoutProdutosInput, CategoriasUncheckedCreateWithoutProdutosInput>
    where?: CategoriasWhereInput
  }

  export type CategoriasUpdateToOneWithWhereWithoutProdutosInput = {
    where?: CategoriasWhereInput
    data: XOR<CategoriasUpdateWithoutProdutosInput, CategoriasUncheckedUpdateWithoutProdutosInput>
  }

  export type CategoriasUpdateWithoutProdutosInput = {
    descricao?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriasUncheckedUpdateWithoutProdutosInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
  }

  export type ItensPedidoUpsertWithWhereUniqueWithoutProdutosInput = {
    where: ItensPedidoWhereUniqueInput
    update: XOR<ItensPedidoUpdateWithoutProdutosInput, ItensPedidoUncheckedUpdateWithoutProdutosInput>
    create: XOR<ItensPedidoCreateWithoutProdutosInput, ItensPedidoUncheckedCreateWithoutProdutosInput>
  }

  export type ItensPedidoUpdateWithWhereUniqueWithoutProdutosInput = {
    where: ItensPedidoWhereUniqueInput
    data: XOR<ItensPedidoUpdateWithoutProdutosInput, ItensPedidoUncheckedUpdateWithoutProdutosInput>
  }

  export type ItensPedidoUpdateManyWithWhereWithoutProdutosInput = {
    where: ItensPedidoScalarWhereInput
    data: XOR<ItensPedidoUpdateManyMutationInput, ItensPedidoUncheckedUpdateManyWithoutProdutosInput>
  }

  export type ItensPedidoScalarWhereInput = {
    AND?: ItensPedidoScalarWhereInput | ItensPedidoScalarWhereInput[]
    OR?: ItensPedidoScalarWhereInput[]
    NOT?: ItensPedidoScalarWhereInput | ItensPedidoScalarWhereInput[]
    id?: IntFilter<"ItensPedido"> | number
    idProduto?: IntFilter<"ItensPedido"> | number
    idPedido?: IntFilter<"ItensPedido"> | number
    precoUnitario?: DecimalFilter<"ItensPedido"> | Decimal | DecimalJsLike | number | string
    quantidade?: IntFilter<"ItensPedido"> | number
  }

  export type ProdutosCreateWithoutCategoriaInput = {
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    itensPedidoVenda?: ItensPedidoCreateNestedManyWithoutProdutosInput
  }

  export type ProdutosUncheckedCreateWithoutCategoriaInput = {
    id?: number
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    itensPedidoVenda?: ItensPedidoUncheckedCreateNestedManyWithoutProdutosInput
  }

  export type ProdutosCreateOrConnectWithoutCategoriaInput = {
    where: ProdutosWhereUniqueInput
    create: XOR<ProdutosCreateWithoutCategoriaInput, ProdutosUncheckedCreateWithoutCategoriaInput>
  }

  export type ProdutosCreateManyCategoriaInputEnvelope = {
    data: ProdutosCreateManyCategoriaInput | ProdutosCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type ProdutosUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: ProdutosWhereUniqueInput
    update: XOR<ProdutosUpdateWithoutCategoriaInput, ProdutosUncheckedUpdateWithoutCategoriaInput>
    create: XOR<ProdutosCreateWithoutCategoriaInput, ProdutosUncheckedCreateWithoutCategoriaInput>
  }

  export type ProdutosUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: ProdutosWhereUniqueInput
    data: XOR<ProdutosUpdateWithoutCategoriaInput, ProdutosUncheckedUpdateWithoutCategoriaInput>
  }

  export type ProdutosUpdateManyWithWhereWithoutCategoriaInput = {
    where: ProdutosScalarWhereInput
    data: XOR<ProdutosUpdateManyMutationInput, ProdutosUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type ProdutosScalarWhereInput = {
    AND?: ProdutosScalarWhereInput | ProdutosScalarWhereInput[]
    OR?: ProdutosScalarWhereInput[]
    NOT?: ProdutosScalarWhereInput | ProdutosScalarWhereInput[]
    id?: IntFilter<"Produtos"> | number
    idCategoria?: IntNullableFilter<"Produtos"> | number | null
    descricao?: StringFilter<"Produtos"> | string
    preco?: DecimalFilter<"Produtos"> | Decimal | DecimalJsLike | number | string
    status?: BoolFilter<"Produtos"> | boolean
    data_criacao?: DateTimeFilter<"Produtos"> | Date | string
    data_alteracao?: DateTimeFilter<"Produtos"> | Date | string
  }

  export type ClientesCreateWithoutPedidosInput = {
    nome: string
    apelido?: string | null
    endereco?: string | null
    fone?: string | null
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type ClientesUncheckedCreateWithoutPedidosInput = {
    id?: number
    nome: string
    apelido?: string | null
    endereco?: string | null
    fone?: string | null
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type ClientesCreateOrConnectWithoutPedidosInput = {
    where: ClientesWhereUniqueInput
    create: XOR<ClientesCreateWithoutPedidosInput, ClientesUncheckedCreateWithoutPedidosInput>
  }

  export type UsuariosCreateWithoutPedidosInput = {
    nome: string
    usuario: string
    senha: string
    email: string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type UsuariosUncheckedCreateWithoutPedidosInput = {
    id?: number
    nome: string
    usuario: string
    senha: string
    email: string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type UsuariosCreateOrConnectWithoutPedidosInput = {
    where: UsuariosWhereUniqueInput
    create: XOR<UsuariosCreateWithoutPedidosInput, UsuariosUncheckedCreateWithoutPedidosInput>
  }

  export type ItensPedidoCreateWithoutPedidosInput = {
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
    produtos: ProdutosCreateNestedOneWithoutItensPedidoVendaInput
  }

  export type ItensPedidoUncheckedCreateWithoutPedidosInput = {
    id?: number
    idProduto: number
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
  }

  export type ItensPedidoCreateOrConnectWithoutPedidosInput = {
    where: ItensPedidoWhereUniqueInput
    create: XOR<ItensPedidoCreateWithoutPedidosInput, ItensPedidoUncheckedCreateWithoutPedidosInput>
  }

  export type ItensPedidoCreateManyPedidosInputEnvelope = {
    data: ItensPedidoCreateManyPedidosInput | ItensPedidoCreateManyPedidosInput[]
    skipDuplicates?: boolean
  }

  export type ClientesUpsertWithoutPedidosInput = {
    update: XOR<ClientesUpdateWithoutPedidosInput, ClientesUncheckedUpdateWithoutPedidosInput>
    create: XOR<ClientesCreateWithoutPedidosInput, ClientesUncheckedCreateWithoutPedidosInput>
    where?: ClientesWhereInput
  }

  export type ClientesUpdateToOneWithWhereWithoutPedidosInput = {
    where?: ClientesWhereInput
    data: XOR<ClientesUpdateWithoutPedidosInput, ClientesUncheckedUpdateWithoutPedidosInput>
  }

  export type ClientesUpdateWithoutPedidosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientesUncheckedUpdateWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuariosUpsertWithoutPedidosInput = {
    update: XOR<UsuariosUpdateWithoutPedidosInput, UsuariosUncheckedUpdateWithoutPedidosInput>
    create: XOR<UsuariosCreateWithoutPedidosInput, UsuariosUncheckedCreateWithoutPedidosInput>
    where?: UsuariosWhereInput
  }

  export type UsuariosUpdateToOneWithWhereWithoutPedidosInput = {
    where?: UsuariosWhereInput
    data: XOR<UsuariosUpdateWithoutPedidosInput, UsuariosUncheckedUpdateWithoutPedidosInput>
  }

  export type UsuariosUpdateWithoutPedidosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuariosUncheckedUpdateWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    usuario?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItensPedidoUpsertWithWhereUniqueWithoutPedidosInput = {
    where: ItensPedidoWhereUniqueInput
    update: XOR<ItensPedidoUpdateWithoutPedidosInput, ItensPedidoUncheckedUpdateWithoutPedidosInput>
    create: XOR<ItensPedidoCreateWithoutPedidosInput, ItensPedidoUncheckedCreateWithoutPedidosInput>
  }

  export type ItensPedidoUpdateWithWhereUniqueWithoutPedidosInput = {
    where: ItensPedidoWhereUniqueInput
    data: XOR<ItensPedidoUpdateWithoutPedidosInput, ItensPedidoUncheckedUpdateWithoutPedidosInput>
  }

  export type ItensPedidoUpdateManyWithWhereWithoutPedidosInput = {
    where: ItensPedidoScalarWhereInput
    data: XOR<ItensPedidoUpdateManyMutationInput, ItensPedidoUncheckedUpdateManyWithoutPedidosInput>
  }

  export type ProdutosCreateWithoutItensPedidoVendaInput = {
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
    categoria?: CategoriasCreateNestedOneWithoutProdutosInput
  }

  export type ProdutosUncheckedCreateWithoutItensPedidoVendaInput = {
    id?: number
    idCategoria?: number | null
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type ProdutosCreateOrConnectWithoutItensPedidoVendaInput = {
    where: ProdutosWhereUniqueInput
    create: XOR<ProdutosCreateWithoutItensPedidoVendaInput, ProdutosUncheckedCreateWithoutItensPedidoVendaInput>
  }

  export type PedidosCreateWithoutItensPedidoVendaInput = {
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
    cliente: ClientesCreateNestedOneWithoutPedidosInput
    usuario: UsuariosCreateNestedOneWithoutPedidosInput
  }

  export type PedidosUncheckedCreateWithoutItensPedidoVendaInput = {
    id?: number
    idCliente: number
    idUsuario: number
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type PedidosCreateOrConnectWithoutItensPedidoVendaInput = {
    where: PedidosWhereUniqueInput
    create: XOR<PedidosCreateWithoutItensPedidoVendaInput, PedidosUncheckedCreateWithoutItensPedidoVendaInput>
  }

  export type ProdutosUpsertWithoutItensPedidoVendaInput = {
    update: XOR<ProdutosUpdateWithoutItensPedidoVendaInput, ProdutosUncheckedUpdateWithoutItensPedidoVendaInput>
    create: XOR<ProdutosCreateWithoutItensPedidoVendaInput, ProdutosUncheckedCreateWithoutItensPedidoVendaInput>
    where?: ProdutosWhereInput
  }

  export type ProdutosUpdateToOneWithWhereWithoutItensPedidoVendaInput = {
    where?: ProdutosWhereInput
    data: XOR<ProdutosUpdateWithoutItensPedidoVendaInput, ProdutosUncheckedUpdateWithoutItensPedidoVendaInput>
  }

  export type ProdutosUpdateWithoutItensPedidoVendaInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriasUpdateOneWithoutProdutosNestedInput
  }

  export type ProdutosUncheckedUpdateWithoutItensPedidoVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCategoria?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosUpsertWithoutItensPedidoVendaInput = {
    update: XOR<PedidosUpdateWithoutItensPedidoVendaInput, PedidosUncheckedUpdateWithoutItensPedidoVendaInput>
    create: XOR<PedidosCreateWithoutItensPedidoVendaInput, PedidosUncheckedCreateWithoutItensPedidoVendaInput>
    where?: PedidosWhereInput
  }

  export type PedidosUpdateToOneWithWhereWithoutItensPedidoVendaInput = {
    where?: PedidosWhereInput
    data: XOR<PedidosUpdateWithoutItensPedidoVendaInput, PedidosUncheckedUpdateWithoutItensPedidoVendaInput>
  }

  export type PedidosUpdateWithoutItensPedidoVendaInput = {
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientesUpdateOneRequiredWithoutPedidosNestedInput
    usuario?: UsuariosUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type PedidosUncheckedUpdateWithoutItensPedidoVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCliente?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosCreateManyUsuarioInput = {
    id?: number
    idCliente: number
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type PedidosUpdateWithoutUsuarioInput = {
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientesUpdateOneRequiredWithoutPedidosNestedInput
    itensPedidoVenda?: ItensPedidoUpdateManyWithoutPedidosNestedInput
  }

  export type PedidosUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCliente?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    itensPedidoVenda?: ItensPedidoUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type PedidosUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    idCliente?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosCreateManyClienteInput = {
    id?: number
    idUsuario: number
    observacao?: string | null
    valorTotal: Decimal | DecimalJsLike | number | string
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type PedidosUpdateWithoutClienteInput = {
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuariosUpdateOneRequiredWithoutPedidosNestedInput
    itensPedidoVenda?: ItensPedidoUpdateManyWithoutPedidosNestedInput
  }

  export type PedidosUncheckedUpdateWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    itensPedidoVenda?: ItensPedidoUncheckedUpdateManyWithoutPedidosNestedInput
  }

  export type PedidosUncheckedUpdateManyWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItensPedidoCreateManyProdutosInput = {
    id?: number
    idPedido: number
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
  }

  export type ItensPedidoUpdateWithoutProdutosInput = {
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidosUpdateOneRequiredWithoutItensPedidoVendaNestedInput
  }

  export type ItensPedidoUncheckedUpdateWithoutProdutosInput = {
    id?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type ItensPedidoUncheckedUpdateManyWithoutProdutosInput = {
    id?: IntFieldUpdateOperationsInput | number
    idPedido?: IntFieldUpdateOperationsInput | number
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type ProdutosCreateManyCategoriaInput = {
    id?: number
    descricao: string
    preco?: Decimal | DecimalJsLike | number | string
    status?: boolean
    data_criacao?: Date | string
    data_alteracao?: Date | string
  }

  export type ProdutosUpdateWithoutCategoriaInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    itensPedidoVenda?: ItensPedidoUpdateManyWithoutProdutosNestedInput
  }

  export type ProdutosUncheckedUpdateWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
    itensPedidoVenda?: ItensPedidoUncheckedUpdateManyWithoutProdutosNestedInput
  }

  export type ProdutosUncheckedUpdateManyWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    preco?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: BoolFieldUpdateOperationsInput | boolean
    data_criacao?: DateTimeFieldUpdateOperationsInput | Date | string
    data_alteracao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItensPedidoCreateManyPedidosInput = {
    id?: number
    idProduto: number
    precoUnitario: Decimal | DecimalJsLike | number | string
    quantidade: number
  }

  export type ItensPedidoUpdateWithoutPedidosInput = {
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtos?: ProdutosUpdateOneRequiredWithoutItensPedidoVendaNestedInput
  }

  export type ItensPedidoUncheckedUpdateWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type ItensPedidoUncheckedUpdateManyWithoutPedidosInput = {
    id?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    precoUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}