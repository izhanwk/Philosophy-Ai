
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model otps
 * 
 */
export type otps = $Result.DefaultSelection<Prisma.$otpsPayload>
/**
 * Model otphistory
 * 
 */
export type otphistory = $Result.DefaultSelection<Prisma.$otphistoryPayload>
/**
 * Model otptries
 * 
 */
export type otptries = $Result.DefaultSelection<Prisma.$otptriesPayload>
/**
 * Model philosophers
 * 
 */
export type philosophers = $Result.DefaultSelection<Prisma.$philosophersPayload>
/**
 * Model chats
 * 
 */
export type chats = $Result.DefaultSelection<Prisma.$chatsPayload>
/**
 * Model chatmessages
 * 
 */
export type chatmessages = $Result.DefaultSelection<Prisma.$chatmessagesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
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
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otps`: Exposes CRUD operations for the **otps** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Otps
    * const otps = await prisma.otps.findMany()
    * ```
    */
  get otps(): Prisma.otpsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otphistory`: Exposes CRUD operations for the **otphistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Otphistories
    * const otphistories = await prisma.otphistory.findMany()
    * ```
    */
  get otphistory(): Prisma.otphistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otptries`: Exposes CRUD operations for the **otptries** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Otptries
    * const otptries = await prisma.otptries.findMany()
    * ```
    */
  get otptries(): Prisma.otptriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.philosophers`: Exposes CRUD operations for the **philosophers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Philosophers
    * const philosophers = await prisma.philosophers.findMany()
    * ```
    */
  get philosophers(): Prisma.philosophersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chats`: Exposes CRUD operations for the **chats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chats.findMany()
    * ```
    */
  get chats(): Prisma.chatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatmessages`: Exposes CRUD operations for the **chatmessages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chatmessages
    * const chatmessages = await prisma.chatmessages.findMany()
    * ```
    */
  get chatmessages(): Prisma.chatmessagesDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    users: 'users',
    otps: 'otps',
    otphistory: 'otphistory',
    otptries: 'otptries',
    philosophers: 'philosophers',
    chats: 'chats',
    chatmessages: 'chatmessages'
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
      modelProps: "users" | "otps" | "otphistory" | "otptries" | "philosophers" | "chats" | "chatmessages"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      otps: {
        payload: Prisma.$otpsPayload<ExtArgs>
        fields: Prisma.otpsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.otpsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.otpsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload>
          }
          findFirst: {
            args: Prisma.otpsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.otpsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload>
          }
          findMany: {
            args: Prisma.otpsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload>[]
          }
          create: {
            args: Prisma.otpsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload>
          }
          createMany: {
            args: Prisma.otpsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.otpsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload>
          }
          update: {
            args: Prisma.otpsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload>
          }
          deleteMany: {
            args: Prisma.otpsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.otpsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.otpsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otpsPayload>
          }
          aggregate: {
            args: Prisma.OtpsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtps>
          }
          groupBy: {
            args: Prisma.otpsGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpsGroupByOutputType>[]
          }
          count: {
            args: Prisma.otpsCountArgs<ExtArgs>
            result: $Utils.Optional<OtpsCountAggregateOutputType> | number
          }
        }
      }
      otphistory: {
        payload: Prisma.$otphistoryPayload<ExtArgs>
        fields: Prisma.otphistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.otphistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.otphistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload>
          }
          findFirst: {
            args: Prisma.otphistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.otphistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload>
          }
          findMany: {
            args: Prisma.otphistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload>[]
          }
          create: {
            args: Prisma.otphistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload>
          }
          createMany: {
            args: Prisma.otphistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.otphistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload>
          }
          update: {
            args: Prisma.otphistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload>
          }
          deleteMany: {
            args: Prisma.otphistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.otphistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.otphistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otphistoryPayload>
          }
          aggregate: {
            args: Prisma.OtphistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtphistory>
          }
          groupBy: {
            args: Prisma.otphistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtphistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.otphistoryCountArgs<ExtArgs>
            result: $Utils.Optional<OtphistoryCountAggregateOutputType> | number
          }
        }
      }
      otptries: {
        payload: Prisma.$otptriesPayload<ExtArgs>
        fields: Prisma.otptriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.otptriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.otptriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload>
          }
          findFirst: {
            args: Prisma.otptriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.otptriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload>
          }
          findMany: {
            args: Prisma.otptriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload>[]
          }
          create: {
            args: Prisma.otptriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload>
          }
          createMany: {
            args: Prisma.otptriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.otptriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload>
          }
          update: {
            args: Prisma.otptriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload>
          }
          deleteMany: {
            args: Prisma.otptriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.otptriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.otptriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$otptriesPayload>
          }
          aggregate: {
            args: Prisma.OtptriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtptries>
          }
          groupBy: {
            args: Prisma.otptriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtptriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.otptriesCountArgs<ExtArgs>
            result: $Utils.Optional<OtptriesCountAggregateOutputType> | number
          }
        }
      }
      philosophers: {
        payload: Prisma.$philosophersPayload<ExtArgs>
        fields: Prisma.philosophersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.philosophersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.philosophersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload>
          }
          findFirst: {
            args: Prisma.philosophersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.philosophersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload>
          }
          findMany: {
            args: Prisma.philosophersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload>[]
          }
          create: {
            args: Prisma.philosophersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload>
          }
          createMany: {
            args: Prisma.philosophersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.philosophersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload>
          }
          update: {
            args: Prisma.philosophersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload>
          }
          deleteMany: {
            args: Prisma.philosophersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.philosophersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.philosophersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$philosophersPayload>
          }
          aggregate: {
            args: Prisma.PhilosophersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhilosophers>
          }
          groupBy: {
            args: Prisma.philosophersGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhilosophersGroupByOutputType>[]
          }
          count: {
            args: Prisma.philosophersCountArgs<ExtArgs>
            result: $Utils.Optional<PhilosophersCountAggregateOutputType> | number
          }
        }
      }
      chats: {
        payload: Prisma.$chatsPayload<ExtArgs>
        fields: Prisma.chatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload>
          }
          findFirst: {
            args: Prisma.chatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload>
          }
          findMany: {
            args: Prisma.chatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload>[]
          }
          create: {
            args: Prisma.chatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload>
          }
          createMany: {
            args: Prisma.chatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.chatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload>
          }
          update: {
            args: Prisma.chatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload>
          }
          deleteMany: {
            args: Prisma.chatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.chatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatsPayload>
          }
          aggregate: {
            args: Prisma.ChatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChats>
          }
          groupBy: {
            args: Prisma.chatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.chatsCountArgs<ExtArgs>
            result: $Utils.Optional<ChatsCountAggregateOutputType> | number
          }
        }
      }
      chatmessages: {
        payload: Prisma.$chatmessagesPayload<ExtArgs>
        fields: Prisma.chatmessagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chatmessagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chatmessagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload>
          }
          findFirst: {
            args: Prisma.chatmessagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chatmessagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload>
          }
          findMany: {
            args: Prisma.chatmessagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload>[]
          }
          create: {
            args: Prisma.chatmessagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload>
          }
          createMany: {
            args: Prisma.chatmessagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.chatmessagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload>
          }
          update: {
            args: Prisma.chatmessagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload>
          }
          deleteMany: {
            args: Prisma.chatmessagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chatmessagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.chatmessagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatmessagesPayload>
          }
          aggregate: {
            args: Prisma.ChatmessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatmessages>
          }
          groupBy: {
            args: Prisma.chatmessagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatmessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.chatmessagesCountArgs<ExtArgs>
            result: $Utils.Optional<ChatmessagesCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    users?: usersOmit
    otps?: otpsOmit
    otphistory?: otphistoryOmit
    otptries?: otptriesOmit
    philosophers?: philosophersOmit
    chats?: chatsOmit
    chatmessages?: chatmessagesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    chats: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | UsersCountOutputTypeCountChatsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatsWhereInput
  }


  /**
   * Count Type OtpsCountOutputType
   */

  export type OtpsCountOutputType = {
    otphistory: number
  }

  export type OtpsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    otphistory?: boolean | OtpsCountOutputTypeCountOtphistoryArgs
  }

  // Custom InputTypes
  /**
   * OtpsCountOutputType without action
   */
  export type OtpsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpsCountOutputType
     */
    select?: OtpsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OtpsCountOutputType without action
   */
  export type OtpsCountOutputTypeCountOtphistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: otphistoryWhereInput
  }


  /**
   * Count Type PhilosophersCountOutputType
   */

  export type PhilosophersCountOutputType = {
    chats: number
  }

  export type PhilosophersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | PhilosophersCountOutputTypeCountChatsArgs
  }

  // Custom InputTypes
  /**
   * PhilosophersCountOutputType without action
   */
  export type PhilosophersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhilosophersCountOutputType
     */
    select?: PhilosophersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PhilosophersCountOutputType without action
   */
  export type PhilosophersCountOutputTypeCountChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatsWhereInput
  }


  /**
   * Count Type ChatsCountOutputType
   */

  export type ChatsCountOutputType = {
    messages: number
  }

  export type ChatsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatsCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ChatsCountOutputType without action
   */
  export type ChatsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatsCountOutputType
     */
    select?: ChatsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatsCountOutputType without action
   */
  export type ChatsCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatmessagesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    idusers: number | null
  }

  export type UsersSumAggregateOutputType = {
    idusers: number | null
  }

  export type UsersMinAggregateOutputType = {
    idusers: number | null
    email: string | null
    password: string | null
    google_id: string | null
    createdAt: Date | null
    name: string | null
  }

  export type UsersMaxAggregateOutputType = {
    idusers: number | null
    email: string | null
    password: string | null
    google_id: string | null
    createdAt: Date | null
    name: string | null
  }

  export type UsersCountAggregateOutputType = {
    idusers: number
    email: number
    password: number
    google_id: number
    createdAt: number
    name: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    idusers?: true
  }

  export type UsersSumAggregateInputType = {
    idusers?: true
  }

  export type UsersMinAggregateInputType = {
    idusers?: true
    email?: true
    password?: true
    google_id?: true
    createdAt?: true
    name?: true
  }

  export type UsersMaxAggregateInputType = {
    idusers?: true
    email?: true
    password?: true
    google_id?: true
    createdAt?: true
    name?: true
  }

  export type UsersCountAggregateInputType = {
    idusers?: true
    email?: true
    password?: true
    google_id?: true
    createdAt?: true
    name?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    idusers: number
    email: string
    password: string | null
    google_id: string | null
    createdAt: Date
    name: string | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idusers?: boolean
    email?: boolean
    password?: boolean
    google_id?: boolean
    createdAt?: boolean
    name?: boolean
    chats?: boolean | users$chatsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    idusers?: boolean
    email?: boolean
    password?: boolean
    google_id?: boolean
    createdAt?: boolean
    name?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idusers" | "email" | "password" | "google_id" | "createdAt" | "name", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | users$chatsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      chats: Prisma.$chatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idusers: number
      email: string
      password: string | null
      google_id: string | null
      createdAt: Date
      name: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `idusers`
     * const usersWithIdusersOnly = await prisma.users.findMany({ select: { idusers: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chats<T extends users$chatsArgs<ExtArgs> = {}>(args?: Subset<T, users$chatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly idusers: FieldRef<"users", 'Int'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly google_id: FieldRef<"users", 'String'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly name: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.chats
   */
  export type users$chatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    where?: chatsWhereInput
    orderBy?: chatsOrderByWithRelationInput | chatsOrderByWithRelationInput[]
    cursor?: chatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model otps
   */

  export type AggregateOtps = {
    _count: OtpsCountAggregateOutputType | null
    _avg: OtpsAvgAggregateOutputType | null
    _sum: OtpsSumAggregateOutputType | null
    _min: OtpsMinAggregateOutputType | null
    _max: OtpsMaxAggregateOutputType | null
  }

  export type OtpsAvgAggregateOutputType = {
    id: number | null
  }

  export type OtpsSumAggregateOutputType = {
    id: number | null
  }

  export type OtpsMinAggregateOutputType = {
    id: number | null
    email: string | null
    otp: string | null
    created_at: Date | null
    password_purpose: boolean | null
  }

  export type OtpsMaxAggregateOutputType = {
    id: number | null
    email: string | null
    otp: string | null
    created_at: Date | null
    password_purpose: boolean | null
  }

  export type OtpsCountAggregateOutputType = {
    id: number
    email: number
    otp: number
    created_at: number
    password_purpose: number
    _all: number
  }


  export type OtpsAvgAggregateInputType = {
    id?: true
  }

  export type OtpsSumAggregateInputType = {
    id?: true
  }

  export type OtpsMinAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    created_at?: true
    password_purpose?: true
  }

  export type OtpsMaxAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    created_at?: true
    password_purpose?: true
  }

  export type OtpsCountAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    created_at?: true
    password_purpose?: true
    _all?: true
  }

  export type OtpsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which otps to aggregate.
     */
    where?: otpsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otps to fetch.
     */
    orderBy?: otpsOrderByWithRelationInput | otpsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: otpsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned otps
    **/
    _count?: true | OtpsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtpsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtpsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpsMaxAggregateInputType
  }

  export type GetOtpsAggregateType<T extends OtpsAggregateArgs> = {
        [P in keyof T & keyof AggregateOtps]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtps[P]>
      : GetScalarType<T[P], AggregateOtps[P]>
  }




  export type otpsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: otpsWhereInput
    orderBy?: otpsOrderByWithAggregationInput | otpsOrderByWithAggregationInput[]
    by: OtpsScalarFieldEnum[] | OtpsScalarFieldEnum
    having?: otpsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpsCountAggregateInputType | true
    _avg?: OtpsAvgAggregateInputType
    _sum?: OtpsSumAggregateInputType
    _min?: OtpsMinAggregateInputType
    _max?: OtpsMaxAggregateInputType
  }

  export type OtpsGroupByOutputType = {
    id: number
    email: string
    otp: string
    created_at: Date
    password_purpose: boolean
    _count: OtpsCountAggregateOutputType | null
    _avg: OtpsAvgAggregateOutputType | null
    _sum: OtpsSumAggregateOutputType | null
    _min: OtpsMinAggregateOutputType | null
    _max: OtpsMaxAggregateOutputType | null
  }

  type GetOtpsGroupByPayload<T extends otpsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpsGroupByOutputType[P]>
            : GetScalarType<T[P], OtpsGroupByOutputType[P]>
        }
      >
    >


  export type otpsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    otp?: boolean
    created_at?: boolean
    password_purpose?: boolean
    otphistory?: boolean | otps$otphistoryArgs<ExtArgs>
    _count?: boolean | OtpsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otps"]>



  export type otpsSelectScalar = {
    id?: boolean
    email?: boolean
    otp?: boolean
    created_at?: boolean
    password_purpose?: boolean
  }

  export type otpsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "otp" | "created_at" | "password_purpose", ExtArgs["result"]["otps"]>
  export type otpsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    otphistory?: boolean | otps$otphistoryArgs<ExtArgs>
    _count?: boolean | OtpsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $otpsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "otps"
    objects: {
      otphistory: Prisma.$otphistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      otp: string
      created_at: Date
      password_purpose: boolean
    }, ExtArgs["result"]["otps"]>
    composites: {}
  }

  type otpsGetPayload<S extends boolean | null | undefined | otpsDefaultArgs> = $Result.GetResult<Prisma.$otpsPayload, S>

  type otpsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<otpsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpsCountAggregateInputType | true
    }

  export interface otpsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['otps'], meta: { name: 'otps' } }
    /**
     * Find zero or one Otps that matches the filter.
     * @param {otpsFindUniqueArgs} args - Arguments to find a Otps
     * @example
     * // Get one Otps
     * const otps = await prisma.otps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends otpsFindUniqueArgs>(args: SelectSubset<T, otpsFindUniqueArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Otps that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {otpsFindUniqueOrThrowArgs} args - Arguments to find a Otps
     * @example
     * // Get one Otps
     * const otps = await prisma.otps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends otpsFindUniqueOrThrowArgs>(args: SelectSubset<T, otpsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otpsFindFirstArgs} args - Arguments to find a Otps
     * @example
     * // Get one Otps
     * const otps = await prisma.otps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends otpsFindFirstArgs>(args?: SelectSubset<T, otpsFindFirstArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otps that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otpsFindFirstOrThrowArgs} args - Arguments to find a Otps
     * @example
     * // Get one Otps
     * const otps = await prisma.otps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends otpsFindFirstOrThrowArgs>(args?: SelectSubset<T, otpsFindFirstOrThrowArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Otps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otpsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Otps
     * const otps = await prisma.otps.findMany()
     * 
     * // Get first 10 Otps
     * const otps = await prisma.otps.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpsWithIdOnly = await prisma.otps.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends otpsFindManyArgs>(args?: SelectSubset<T, otpsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Otps.
     * @param {otpsCreateArgs} args - Arguments to create a Otps.
     * @example
     * // Create one Otps
     * const Otps = await prisma.otps.create({
     *   data: {
     *     // ... data to create a Otps
     *   }
     * })
     * 
     */
    create<T extends otpsCreateArgs>(args: SelectSubset<T, otpsCreateArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Otps.
     * @param {otpsCreateManyArgs} args - Arguments to create many Otps.
     * @example
     * // Create many Otps
     * const otps = await prisma.otps.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends otpsCreateManyArgs>(args?: SelectSubset<T, otpsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Otps.
     * @param {otpsDeleteArgs} args - Arguments to delete one Otps.
     * @example
     * // Delete one Otps
     * const Otps = await prisma.otps.delete({
     *   where: {
     *     // ... filter to delete one Otps
     *   }
     * })
     * 
     */
    delete<T extends otpsDeleteArgs>(args: SelectSubset<T, otpsDeleteArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Otps.
     * @param {otpsUpdateArgs} args - Arguments to update one Otps.
     * @example
     * // Update one Otps
     * const otps = await prisma.otps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends otpsUpdateArgs>(args: SelectSubset<T, otpsUpdateArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Otps.
     * @param {otpsDeleteManyArgs} args - Arguments to filter Otps to delete.
     * @example
     * // Delete a few Otps
     * const { count } = await prisma.otps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends otpsDeleteManyArgs>(args?: SelectSubset<T, otpsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otpsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Otps
     * const otps = await prisma.otps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends otpsUpdateManyArgs>(args: SelectSubset<T, otpsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Otps.
     * @param {otpsUpsertArgs} args - Arguments to update or create a Otps.
     * @example
     * // Update or create a Otps
     * const otps = await prisma.otps.upsert({
     *   create: {
     *     // ... data to create a Otps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Otps we want to update
     *   }
     * })
     */
    upsert<T extends otpsUpsertArgs>(args: SelectSubset<T, otpsUpsertArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otpsCountArgs} args - Arguments to filter Otps to count.
     * @example
     * // Count the number of Otps
     * const count = await prisma.otps.count({
     *   where: {
     *     // ... the filter for the Otps we want to count
     *   }
     * })
    **/
    count<T extends otpsCountArgs>(
      args?: Subset<T, otpsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OtpsAggregateArgs>(args: Subset<T, OtpsAggregateArgs>): Prisma.PrismaPromise<GetOtpsAggregateType<T>>

    /**
     * Group by Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otpsGroupByArgs} args - Group by arguments.
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
      T extends otpsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: otpsGroupByArgs['orderBy'] }
        : { orderBy?: otpsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, otpsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the otps model
   */
  readonly fields: otpsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for otps.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__otpsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    otphistory<T extends otps$otphistoryArgs<ExtArgs> = {}>(args?: Subset<T, otps$otphistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the otps model
   */
  interface otpsFieldRefs {
    readonly id: FieldRef<"otps", 'Int'>
    readonly email: FieldRef<"otps", 'String'>
    readonly otp: FieldRef<"otps", 'String'>
    readonly created_at: FieldRef<"otps", 'DateTime'>
    readonly password_purpose: FieldRef<"otps", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * otps findUnique
   */
  export type otpsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * Filter, which otps to fetch.
     */
    where: otpsWhereUniqueInput
  }

  /**
   * otps findUniqueOrThrow
   */
  export type otpsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * Filter, which otps to fetch.
     */
    where: otpsWhereUniqueInput
  }

  /**
   * otps findFirst
   */
  export type otpsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * Filter, which otps to fetch.
     */
    where?: otpsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otps to fetch.
     */
    orderBy?: otpsOrderByWithRelationInput | otpsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for otps.
     */
    cursor?: otpsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of otps.
     */
    distinct?: OtpsScalarFieldEnum | OtpsScalarFieldEnum[]
  }

  /**
   * otps findFirstOrThrow
   */
  export type otpsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * Filter, which otps to fetch.
     */
    where?: otpsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otps to fetch.
     */
    orderBy?: otpsOrderByWithRelationInput | otpsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for otps.
     */
    cursor?: otpsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of otps.
     */
    distinct?: OtpsScalarFieldEnum | OtpsScalarFieldEnum[]
  }

  /**
   * otps findMany
   */
  export type otpsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * Filter, which otps to fetch.
     */
    where?: otpsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otps to fetch.
     */
    orderBy?: otpsOrderByWithRelationInput | otpsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing otps.
     */
    cursor?: otpsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otps.
     */
    skip?: number
    distinct?: OtpsScalarFieldEnum | OtpsScalarFieldEnum[]
  }

  /**
   * otps create
   */
  export type otpsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * The data needed to create a otps.
     */
    data: XOR<otpsCreateInput, otpsUncheckedCreateInput>
  }

  /**
   * otps createMany
   */
  export type otpsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many otps.
     */
    data: otpsCreateManyInput | otpsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * otps update
   */
  export type otpsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * The data needed to update a otps.
     */
    data: XOR<otpsUpdateInput, otpsUncheckedUpdateInput>
    /**
     * Choose, which otps to update.
     */
    where: otpsWhereUniqueInput
  }

  /**
   * otps updateMany
   */
  export type otpsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update otps.
     */
    data: XOR<otpsUpdateManyMutationInput, otpsUncheckedUpdateManyInput>
    /**
     * Filter which otps to update
     */
    where?: otpsWhereInput
    /**
     * Limit how many otps to update.
     */
    limit?: number
  }

  /**
   * otps upsert
   */
  export type otpsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * The filter to search for the otps to update in case it exists.
     */
    where: otpsWhereUniqueInput
    /**
     * In case the otps found by the `where` argument doesn't exist, create a new otps with this data.
     */
    create: XOR<otpsCreateInput, otpsUncheckedCreateInput>
    /**
     * In case the otps was found with the provided `where` argument, update it with this data.
     */
    update: XOR<otpsUpdateInput, otpsUncheckedUpdateInput>
  }

  /**
   * otps delete
   */
  export type otpsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    /**
     * Filter which otps to delete.
     */
    where: otpsWhereUniqueInput
  }

  /**
   * otps deleteMany
   */
  export type otpsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which otps to delete
     */
    where?: otpsWhereInput
    /**
     * Limit how many otps to delete.
     */
    limit?: number
  }

  /**
   * otps.otphistory
   */
  export type otps$otphistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    where?: otphistoryWhereInput
    orderBy?: otphistoryOrderByWithRelationInput | otphistoryOrderByWithRelationInput[]
    cursor?: otphistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OtphistoryScalarFieldEnum | OtphistoryScalarFieldEnum[]
  }

  /**
   * otps without action
   */
  export type otpsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
  }


  /**
   * Model otphistory
   */

  export type AggregateOtphistory = {
    _count: OtphistoryCountAggregateOutputType | null
    _avg: OtphistoryAvgAggregateOutputType | null
    _sum: OtphistorySumAggregateOutputType | null
    _min: OtphistoryMinAggregateOutputType | null
    _max: OtphistoryMaxAggregateOutputType | null
  }

  export type OtphistoryAvgAggregateOutputType = {
    id: number | null
    otp_id: number | null
  }

  export type OtphistorySumAggregateOutputType = {
    id: number | null
    otp_id: number | null
  }

  export type OtphistoryMinAggregateOutputType = {
    id: number | null
    otp_id: number | null
    email: string | null
    created_at: Date | null
    password_purpose: boolean | null
  }

  export type OtphistoryMaxAggregateOutputType = {
    id: number | null
    otp_id: number | null
    email: string | null
    created_at: Date | null
    password_purpose: boolean | null
  }

  export type OtphistoryCountAggregateOutputType = {
    id: number
    otp_id: number
    email: number
    created_at: number
    password_purpose: number
    _all: number
  }


  export type OtphistoryAvgAggregateInputType = {
    id?: true
    otp_id?: true
  }

  export type OtphistorySumAggregateInputType = {
    id?: true
    otp_id?: true
  }

  export type OtphistoryMinAggregateInputType = {
    id?: true
    otp_id?: true
    email?: true
    created_at?: true
    password_purpose?: true
  }

  export type OtphistoryMaxAggregateInputType = {
    id?: true
    otp_id?: true
    email?: true
    created_at?: true
    password_purpose?: true
  }

  export type OtphistoryCountAggregateInputType = {
    id?: true
    otp_id?: true
    email?: true
    created_at?: true
    password_purpose?: true
    _all?: true
  }

  export type OtphistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which otphistory to aggregate.
     */
    where?: otphistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otphistories to fetch.
     */
    orderBy?: otphistoryOrderByWithRelationInput | otphistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: otphistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otphistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otphistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned otphistories
    **/
    _count?: true | OtphistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtphistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtphistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtphistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtphistoryMaxAggregateInputType
  }

  export type GetOtphistoryAggregateType<T extends OtphistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateOtphistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtphistory[P]>
      : GetScalarType<T[P], AggregateOtphistory[P]>
  }




  export type otphistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: otphistoryWhereInput
    orderBy?: otphistoryOrderByWithAggregationInput | otphistoryOrderByWithAggregationInput[]
    by: OtphistoryScalarFieldEnum[] | OtphistoryScalarFieldEnum
    having?: otphistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtphistoryCountAggregateInputType | true
    _avg?: OtphistoryAvgAggregateInputType
    _sum?: OtphistorySumAggregateInputType
    _min?: OtphistoryMinAggregateInputType
    _max?: OtphistoryMaxAggregateInputType
  }

  export type OtphistoryGroupByOutputType = {
    id: number
    otp_id: number | null
    email: string
    created_at: Date
    password_purpose: boolean
    _count: OtphistoryCountAggregateOutputType | null
    _avg: OtphistoryAvgAggregateOutputType | null
    _sum: OtphistorySumAggregateOutputType | null
    _min: OtphistoryMinAggregateOutputType | null
    _max: OtphistoryMaxAggregateOutputType | null
  }

  type GetOtphistoryGroupByPayload<T extends otphistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtphistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtphistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtphistoryGroupByOutputType[P]>
            : GetScalarType<T[P], OtphistoryGroupByOutputType[P]>
        }
      >
    >


  export type otphistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    otp_id?: boolean
    email?: boolean
    created_at?: boolean
    password_purpose?: boolean
    otps?: boolean | otphistory$otpsArgs<ExtArgs>
  }, ExtArgs["result"]["otphistory"]>



  export type otphistorySelectScalar = {
    id?: boolean
    otp_id?: boolean
    email?: boolean
    created_at?: boolean
    password_purpose?: boolean
  }

  export type otphistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "otp_id" | "email" | "created_at" | "password_purpose", ExtArgs["result"]["otphistory"]>
  export type otphistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    otps?: boolean | otphistory$otpsArgs<ExtArgs>
  }

  export type $otphistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "otphistory"
    objects: {
      otps: Prisma.$otpsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      otp_id: number | null
      email: string
      created_at: Date
      password_purpose: boolean
    }, ExtArgs["result"]["otphistory"]>
    composites: {}
  }

  type otphistoryGetPayload<S extends boolean | null | undefined | otphistoryDefaultArgs> = $Result.GetResult<Prisma.$otphistoryPayload, S>

  type otphistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<otphistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtphistoryCountAggregateInputType | true
    }

  export interface otphistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['otphistory'], meta: { name: 'otphistory' } }
    /**
     * Find zero or one Otphistory that matches the filter.
     * @param {otphistoryFindUniqueArgs} args - Arguments to find a Otphistory
     * @example
     * // Get one Otphistory
     * const otphistory = await prisma.otphistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends otphistoryFindUniqueArgs>(args: SelectSubset<T, otphistoryFindUniqueArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Otphistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {otphistoryFindUniqueOrThrowArgs} args - Arguments to find a Otphistory
     * @example
     * // Get one Otphistory
     * const otphistory = await prisma.otphistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends otphistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, otphistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otphistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otphistoryFindFirstArgs} args - Arguments to find a Otphistory
     * @example
     * // Get one Otphistory
     * const otphistory = await prisma.otphistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends otphistoryFindFirstArgs>(args?: SelectSubset<T, otphistoryFindFirstArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otphistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otphistoryFindFirstOrThrowArgs} args - Arguments to find a Otphistory
     * @example
     * // Get one Otphistory
     * const otphistory = await prisma.otphistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends otphistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, otphistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Otphistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otphistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Otphistories
     * const otphistories = await prisma.otphistory.findMany()
     * 
     * // Get first 10 Otphistories
     * const otphistories = await prisma.otphistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otphistoryWithIdOnly = await prisma.otphistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends otphistoryFindManyArgs>(args?: SelectSubset<T, otphistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Otphistory.
     * @param {otphistoryCreateArgs} args - Arguments to create a Otphistory.
     * @example
     * // Create one Otphistory
     * const Otphistory = await prisma.otphistory.create({
     *   data: {
     *     // ... data to create a Otphistory
     *   }
     * })
     * 
     */
    create<T extends otphistoryCreateArgs>(args: SelectSubset<T, otphistoryCreateArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Otphistories.
     * @param {otphistoryCreateManyArgs} args - Arguments to create many Otphistories.
     * @example
     * // Create many Otphistories
     * const otphistory = await prisma.otphistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends otphistoryCreateManyArgs>(args?: SelectSubset<T, otphistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Otphistory.
     * @param {otphistoryDeleteArgs} args - Arguments to delete one Otphistory.
     * @example
     * // Delete one Otphistory
     * const Otphistory = await prisma.otphistory.delete({
     *   where: {
     *     // ... filter to delete one Otphistory
     *   }
     * })
     * 
     */
    delete<T extends otphistoryDeleteArgs>(args: SelectSubset<T, otphistoryDeleteArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Otphistory.
     * @param {otphistoryUpdateArgs} args - Arguments to update one Otphistory.
     * @example
     * // Update one Otphistory
     * const otphistory = await prisma.otphistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends otphistoryUpdateArgs>(args: SelectSubset<T, otphistoryUpdateArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Otphistories.
     * @param {otphistoryDeleteManyArgs} args - Arguments to filter Otphistories to delete.
     * @example
     * // Delete a few Otphistories
     * const { count } = await prisma.otphistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends otphistoryDeleteManyArgs>(args?: SelectSubset<T, otphistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otphistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otphistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Otphistories
     * const otphistory = await prisma.otphistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends otphistoryUpdateManyArgs>(args: SelectSubset<T, otphistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Otphistory.
     * @param {otphistoryUpsertArgs} args - Arguments to update or create a Otphistory.
     * @example
     * // Update or create a Otphistory
     * const otphistory = await prisma.otphistory.upsert({
     *   create: {
     *     // ... data to create a Otphistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Otphistory we want to update
     *   }
     * })
     */
    upsert<T extends otphistoryUpsertArgs>(args: SelectSubset<T, otphistoryUpsertArgs<ExtArgs>>): Prisma__otphistoryClient<$Result.GetResult<Prisma.$otphistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Otphistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otphistoryCountArgs} args - Arguments to filter Otphistories to count.
     * @example
     * // Count the number of Otphistories
     * const count = await prisma.otphistory.count({
     *   where: {
     *     // ... the filter for the Otphistories we want to count
     *   }
     * })
    **/
    count<T extends otphistoryCountArgs>(
      args?: Subset<T, otphistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtphistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Otphistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtphistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OtphistoryAggregateArgs>(args: Subset<T, OtphistoryAggregateArgs>): Prisma.PrismaPromise<GetOtphistoryAggregateType<T>>

    /**
     * Group by Otphistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otphistoryGroupByArgs} args - Group by arguments.
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
      T extends otphistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: otphistoryGroupByArgs['orderBy'] }
        : { orderBy?: otphistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, otphistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtphistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the otphistory model
   */
  readonly fields: otphistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for otphistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__otphistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    otps<T extends otphistory$otpsArgs<ExtArgs> = {}>(args?: Subset<T, otphistory$otpsArgs<ExtArgs>>): Prisma__otpsClient<$Result.GetResult<Prisma.$otpsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the otphistory model
   */
  interface otphistoryFieldRefs {
    readonly id: FieldRef<"otphistory", 'Int'>
    readonly otp_id: FieldRef<"otphistory", 'Int'>
    readonly email: FieldRef<"otphistory", 'String'>
    readonly created_at: FieldRef<"otphistory", 'DateTime'>
    readonly password_purpose: FieldRef<"otphistory", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * otphistory findUnique
   */
  export type otphistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * Filter, which otphistory to fetch.
     */
    where: otphistoryWhereUniqueInput
  }

  /**
   * otphistory findUniqueOrThrow
   */
  export type otphistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * Filter, which otphistory to fetch.
     */
    where: otphistoryWhereUniqueInput
  }

  /**
   * otphistory findFirst
   */
  export type otphistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * Filter, which otphistory to fetch.
     */
    where?: otphistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otphistories to fetch.
     */
    orderBy?: otphistoryOrderByWithRelationInput | otphistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for otphistories.
     */
    cursor?: otphistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otphistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otphistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of otphistories.
     */
    distinct?: OtphistoryScalarFieldEnum | OtphistoryScalarFieldEnum[]
  }

  /**
   * otphistory findFirstOrThrow
   */
  export type otphistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * Filter, which otphistory to fetch.
     */
    where?: otphistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otphistories to fetch.
     */
    orderBy?: otphistoryOrderByWithRelationInput | otphistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for otphistories.
     */
    cursor?: otphistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otphistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otphistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of otphistories.
     */
    distinct?: OtphistoryScalarFieldEnum | OtphistoryScalarFieldEnum[]
  }

  /**
   * otphistory findMany
   */
  export type otphistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * Filter, which otphistories to fetch.
     */
    where?: otphistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otphistories to fetch.
     */
    orderBy?: otphistoryOrderByWithRelationInput | otphistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing otphistories.
     */
    cursor?: otphistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otphistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otphistories.
     */
    skip?: number
    distinct?: OtphistoryScalarFieldEnum | OtphistoryScalarFieldEnum[]
  }

  /**
   * otphistory create
   */
  export type otphistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a otphistory.
     */
    data: XOR<otphistoryCreateInput, otphistoryUncheckedCreateInput>
  }

  /**
   * otphistory createMany
   */
  export type otphistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many otphistories.
     */
    data: otphistoryCreateManyInput | otphistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * otphistory update
   */
  export type otphistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a otphistory.
     */
    data: XOR<otphistoryUpdateInput, otphistoryUncheckedUpdateInput>
    /**
     * Choose, which otphistory to update.
     */
    where: otphistoryWhereUniqueInput
  }

  /**
   * otphistory updateMany
   */
  export type otphistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update otphistories.
     */
    data: XOR<otphistoryUpdateManyMutationInput, otphistoryUncheckedUpdateManyInput>
    /**
     * Filter which otphistories to update
     */
    where?: otphistoryWhereInput
    /**
     * Limit how many otphistories to update.
     */
    limit?: number
  }

  /**
   * otphistory upsert
   */
  export type otphistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the otphistory to update in case it exists.
     */
    where: otphistoryWhereUniqueInput
    /**
     * In case the otphistory found by the `where` argument doesn't exist, create a new otphistory with this data.
     */
    create: XOR<otphistoryCreateInput, otphistoryUncheckedCreateInput>
    /**
     * In case the otphistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<otphistoryUpdateInput, otphistoryUncheckedUpdateInput>
  }

  /**
   * otphistory delete
   */
  export type otphistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
    /**
     * Filter which otphistory to delete.
     */
    where: otphistoryWhereUniqueInput
  }

  /**
   * otphistory deleteMany
   */
  export type otphistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which otphistories to delete
     */
    where?: otphistoryWhereInput
    /**
     * Limit how many otphistories to delete.
     */
    limit?: number
  }

  /**
   * otphistory.otps
   */
  export type otphistory$otpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otps
     */
    select?: otpsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otps
     */
    omit?: otpsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otpsInclude<ExtArgs> | null
    where?: otpsWhereInput
  }

  /**
   * otphistory without action
   */
  export type otphistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otphistory
     */
    select?: otphistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the otphistory
     */
    omit?: otphistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: otphistoryInclude<ExtArgs> | null
  }


  /**
   * Model otptries
   */

  export type AggregateOtptries = {
    _count: OtptriesCountAggregateOutputType | null
    _avg: OtptriesAvgAggregateOutputType | null
    _sum: OtptriesSumAggregateOutputType | null
    _min: OtptriesMinAggregateOutputType | null
    _max: OtptriesMaxAggregateOutputType | null
  }

  export type OtptriesAvgAggregateOutputType = {
    id_otptries: number | null
  }

  export type OtptriesSumAggregateOutputType = {
    id_otptries: number | null
  }

  export type OtptriesMinAggregateOutputType = {
    id_otptries: number | null
    email: string | null
    created_at: Date | null
    password_purpose: boolean | null
  }

  export type OtptriesMaxAggregateOutputType = {
    id_otptries: number | null
    email: string | null
    created_at: Date | null
    password_purpose: boolean | null
  }

  export type OtptriesCountAggregateOutputType = {
    id_otptries: number
    email: number
    created_at: number
    password_purpose: number
    _all: number
  }


  export type OtptriesAvgAggregateInputType = {
    id_otptries?: true
  }

  export type OtptriesSumAggregateInputType = {
    id_otptries?: true
  }

  export type OtptriesMinAggregateInputType = {
    id_otptries?: true
    email?: true
    created_at?: true
    password_purpose?: true
  }

  export type OtptriesMaxAggregateInputType = {
    id_otptries?: true
    email?: true
    created_at?: true
    password_purpose?: true
  }

  export type OtptriesCountAggregateInputType = {
    id_otptries?: true
    email?: true
    created_at?: true
    password_purpose?: true
    _all?: true
  }

  export type OtptriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which otptries to aggregate.
     */
    where?: otptriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otptries to fetch.
     */
    orderBy?: otptriesOrderByWithRelationInput | otptriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: otptriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otptries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otptries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned otptries
    **/
    _count?: true | OtptriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtptriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtptriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtptriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtptriesMaxAggregateInputType
  }

  export type GetOtptriesAggregateType<T extends OtptriesAggregateArgs> = {
        [P in keyof T & keyof AggregateOtptries]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtptries[P]>
      : GetScalarType<T[P], AggregateOtptries[P]>
  }




  export type otptriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: otptriesWhereInput
    orderBy?: otptriesOrderByWithAggregationInput | otptriesOrderByWithAggregationInput[]
    by: OtptriesScalarFieldEnum[] | OtptriesScalarFieldEnum
    having?: otptriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtptriesCountAggregateInputType | true
    _avg?: OtptriesAvgAggregateInputType
    _sum?: OtptriesSumAggregateInputType
    _min?: OtptriesMinAggregateInputType
    _max?: OtptriesMaxAggregateInputType
  }

  export type OtptriesGroupByOutputType = {
    id_otptries: number
    email: string
    created_at: Date
    password_purpose: boolean
    _count: OtptriesCountAggregateOutputType | null
    _avg: OtptriesAvgAggregateOutputType | null
    _sum: OtptriesSumAggregateOutputType | null
    _min: OtptriesMinAggregateOutputType | null
    _max: OtptriesMaxAggregateOutputType | null
  }

  type GetOtptriesGroupByPayload<T extends otptriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtptriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtptriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtptriesGroupByOutputType[P]>
            : GetScalarType<T[P], OtptriesGroupByOutputType[P]>
        }
      >
    >


  export type otptriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_otptries?: boolean
    email?: boolean
    created_at?: boolean
    password_purpose?: boolean
  }, ExtArgs["result"]["otptries"]>



  export type otptriesSelectScalar = {
    id_otptries?: boolean
    email?: boolean
    created_at?: boolean
    password_purpose?: boolean
  }

  export type otptriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_otptries" | "email" | "created_at" | "password_purpose", ExtArgs["result"]["otptries"]>

  export type $otptriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "otptries"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_otptries: number
      email: string
      created_at: Date
      password_purpose: boolean
    }, ExtArgs["result"]["otptries"]>
    composites: {}
  }

  type otptriesGetPayload<S extends boolean | null | undefined | otptriesDefaultArgs> = $Result.GetResult<Prisma.$otptriesPayload, S>

  type otptriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<otptriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtptriesCountAggregateInputType | true
    }

  export interface otptriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['otptries'], meta: { name: 'otptries' } }
    /**
     * Find zero or one Otptries that matches the filter.
     * @param {otptriesFindUniqueArgs} args - Arguments to find a Otptries
     * @example
     * // Get one Otptries
     * const otptries = await prisma.otptries.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends otptriesFindUniqueArgs>(args: SelectSubset<T, otptriesFindUniqueArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Otptries that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {otptriesFindUniqueOrThrowArgs} args - Arguments to find a Otptries
     * @example
     * // Get one Otptries
     * const otptries = await prisma.otptries.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends otptriesFindUniqueOrThrowArgs>(args: SelectSubset<T, otptriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otptries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otptriesFindFirstArgs} args - Arguments to find a Otptries
     * @example
     * // Get one Otptries
     * const otptries = await prisma.otptries.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends otptriesFindFirstArgs>(args?: SelectSubset<T, otptriesFindFirstArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otptries that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otptriesFindFirstOrThrowArgs} args - Arguments to find a Otptries
     * @example
     * // Get one Otptries
     * const otptries = await prisma.otptries.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends otptriesFindFirstOrThrowArgs>(args?: SelectSubset<T, otptriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Otptries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otptriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Otptries
     * const otptries = await prisma.otptries.findMany()
     * 
     * // Get first 10 Otptries
     * const otptries = await prisma.otptries.findMany({ take: 10 })
     * 
     * // Only select the `id_otptries`
     * const otptriesWithId_otptriesOnly = await prisma.otptries.findMany({ select: { id_otptries: true } })
     * 
     */
    findMany<T extends otptriesFindManyArgs>(args?: SelectSubset<T, otptriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Otptries.
     * @param {otptriesCreateArgs} args - Arguments to create a Otptries.
     * @example
     * // Create one Otptries
     * const Otptries = await prisma.otptries.create({
     *   data: {
     *     // ... data to create a Otptries
     *   }
     * })
     * 
     */
    create<T extends otptriesCreateArgs>(args: SelectSubset<T, otptriesCreateArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Otptries.
     * @param {otptriesCreateManyArgs} args - Arguments to create many Otptries.
     * @example
     * // Create many Otptries
     * const otptries = await prisma.otptries.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends otptriesCreateManyArgs>(args?: SelectSubset<T, otptriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Otptries.
     * @param {otptriesDeleteArgs} args - Arguments to delete one Otptries.
     * @example
     * // Delete one Otptries
     * const Otptries = await prisma.otptries.delete({
     *   where: {
     *     // ... filter to delete one Otptries
     *   }
     * })
     * 
     */
    delete<T extends otptriesDeleteArgs>(args: SelectSubset<T, otptriesDeleteArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Otptries.
     * @param {otptriesUpdateArgs} args - Arguments to update one Otptries.
     * @example
     * // Update one Otptries
     * const otptries = await prisma.otptries.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends otptriesUpdateArgs>(args: SelectSubset<T, otptriesUpdateArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Otptries.
     * @param {otptriesDeleteManyArgs} args - Arguments to filter Otptries to delete.
     * @example
     * // Delete a few Otptries
     * const { count } = await prisma.otptries.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends otptriesDeleteManyArgs>(args?: SelectSubset<T, otptriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otptries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otptriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Otptries
     * const otptries = await prisma.otptries.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends otptriesUpdateManyArgs>(args: SelectSubset<T, otptriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Otptries.
     * @param {otptriesUpsertArgs} args - Arguments to update or create a Otptries.
     * @example
     * // Update or create a Otptries
     * const otptries = await prisma.otptries.upsert({
     *   create: {
     *     // ... data to create a Otptries
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Otptries we want to update
     *   }
     * })
     */
    upsert<T extends otptriesUpsertArgs>(args: SelectSubset<T, otptriesUpsertArgs<ExtArgs>>): Prisma__otptriesClient<$Result.GetResult<Prisma.$otptriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Otptries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otptriesCountArgs} args - Arguments to filter Otptries to count.
     * @example
     * // Count the number of Otptries
     * const count = await prisma.otptries.count({
     *   where: {
     *     // ... the filter for the Otptries we want to count
     *   }
     * })
    **/
    count<T extends otptriesCountArgs>(
      args?: Subset<T, otptriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtptriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Otptries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtptriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OtptriesAggregateArgs>(args: Subset<T, OtptriesAggregateArgs>): Prisma.PrismaPromise<GetOtptriesAggregateType<T>>

    /**
     * Group by Otptries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {otptriesGroupByArgs} args - Group by arguments.
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
      T extends otptriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: otptriesGroupByArgs['orderBy'] }
        : { orderBy?: otptriesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, otptriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtptriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the otptries model
   */
  readonly fields: otptriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for otptries.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__otptriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the otptries model
   */
  interface otptriesFieldRefs {
    readonly id_otptries: FieldRef<"otptries", 'Int'>
    readonly email: FieldRef<"otptries", 'String'>
    readonly created_at: FieldRef<"otptries", 'DateTime'>
    readonly password_purpose: FieldRef<"otptries", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * otptries findUnique
   */
  export type otptriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * Filter, which otptries to fetch.
     */
    where: otptriesWhereUniqueInput
  }

  /**
   * otptries findUniqueOrThrow
   */
  export type otptriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * Filter, which otptries to fetch.
     */
    where: otptriesWhereUniqueInput
  }

  /**
   * otptries findFirst
   */
  export type otptriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * Filter, which otptries to fetch.
     */
    where?: otptriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otptries to fetch.
     */
    orderBy?: otptriesOrderByWithRelationInput | otptriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for otptries.
     */
    cursor?: otptriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otptries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otptries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of otptries.
     */
    distinct?: OtptriesScalarFieldEnum | OtptriesScalarFieldEnum[]
  }

  /**
   * otptries findFirstOrThrow
   */
  export type otptriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * Filter, which otptries to fetch.
     */
    where?: otptriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otptries to fetch.
     */
    orderBy?: otptriesOrderByWithRelationInput | otptriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for otptries.
     */
    cursor?: otptriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otptries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otptries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of otptries.
     */
    distinct?: OtptriesScalarFieldEnum | OtptriesScalarFieldEnum[]
  }

  /**
   * otptries findMany
   */
  export type otptriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * Filter, which otptries to fetch.
     */
    where?: otptriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of otptries to fetch.
     */
    orderBy?: otptriesOrderByWithRelationInput | otptriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing otptries.
     */
    cursor?: otptriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` otptries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` otptries.
     */
    skip?: number
    distinct?: OtptriesScalarFieldEnum | OtptriesScalarFieldEnum[]
  }

  /**
   * otptries create
   */
  export type otptriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * The data needed to create a otptries.
     */
    data: XOR<otptriesCreateInput, otptriesUncheckedCreateInput>
  }

  /**
   * otptries createMany
   */
  export type otptriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many otptries.
     */
    data: otptriesCreateManyInput | otptriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * otptries update
   */
  export type otptriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * The data needed to update a otptries.
     */
    data: XOR<otptriesUpdateInput, otptriesUncheckedUpdateInput>
    /**
     * Choose, which otptries to update.
     */
    where: otptriesWhereUniqueInput
  }

  /**
   * otptries updateMany
   */
  export type otptriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update otptries.
     */
    data: XOR<otptriesUpdateManyMutationInput, otptriesUncheckedUpdateManyInput>
    /**
     * Filter which otptries to update
     */
    where?: otptriesWhereInput
    /**
     * Limit how many otptries to update.
     */
    limit?: number
  }

  /**
   * otptries upsert
   */
  export type otptriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * The filter to search for the otptries to update in case it exists.
     */
    where: otptriesWhereUniqueInput
    /**
     * In case the otptries found by the `where` argument doesn't exist, create a new otptries with this data.
     */
    create: XOR<otptriesCreateInput, otptriesUncheckedCreateInput>
    /**
     * In case the otptries was found with the provided `where` argument, update it with this data.
     */
    update: XOR<otptriesUpdateInput, otptriesUncheckedUpdateInput>
  }

  /**
   * otptries delete
   */
  export type otptriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
    /**
     * Filter which otptries to delete.
     */
    where: otptriesWhereUniqueInput
  }

  /**
   * otptries deleteMany
   */
  export type otptriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which otptries to delete
     */
    where?: otptriesWhereInput
    /**
     * Limit how many otptries to delete.
     */
    limit?: number
  }

  /**
   * otptries without action
   */
  export type otptriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the otptries
     */
    select?: otptriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the otptries
     */
    omit?: otptriesOmit<ExtArgs> | null
  }


  /**
   * Model philosophers
   */

  export type AggregatePhilosophers = {
    _count: PhilosophersCountAggregateOutputType | null
    _avg: PhilosophersAvgAggregateOutputType | null
    _sum: PhilosophersSumAggregateOutputType | null
    _min: PhilosophersMinAggregateOutputType | null
    _max: PhilosophersMaxAggregateOutputType | null
  }

  export type PhilosophersAvgAggregateOutputType = {
    id: number | null
  }

  export type PhilosophersSumAggregateOutputType = {
    id: number | null
  }

  export type PhilosophersMinAggregateOutputType = {
    id: number | null
    name: string | null
    image_url: string | null
    description: string | null
    style_prompt: string | null
  }

  export type PhilosophersMaxAggregateOutputType = {
    id: number | null
    name: string | null
    image_url: string | null
    description: string | null
    style_prompt: string | null
  }

  export type PhilosophersCountAggregateOutputType = {
    id: number
    name: number
    image_url: number
    description: number
    style_prompt: number
    _all: number
  }


  export type PhilosophersAvgAggregateInputType = {
    id?: true
  }

  export type PhilosophersSumAggregateInputType = {
    id?: true
  }

  export type PhilosophersMinAggregateInputType = {
    id?: true
    name?: true
    image_url?: true
    description?: true
    style_prompt?: true
  }

  export type PhilosophersMaxAggregateInputType = {
    id?: true
    name?: true
    image_url?: true
    description?: true
    style_prompt?: true
  }

  export type PhilosophersCountAggregateInputType = {
    id?: true
    name?: true
    image_url?: true
    description?: true
    style_prompt?: true
    _all?: true
  }

  export type PhilosophersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which philosophers to aggregate.
     */
    where?: philosophersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of philosophers to fetch.
     */
    orderBy?: philosophersOrderByWithRelationInput | philosophersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: philosophersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` philosophers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` philosophers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned philosophers
    **/
    _count?: true | PhilosophersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhilosophersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhilosophersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhilosophersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhilosophersMaxAggregateInputType
  }

  export type GetPhilosophersAggregateType<T extends PhilosophersAggregateArgs> = {
        [P in keyof T & keyof AggregatePhilosophers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhilosophers[P]>
      : GetScalarType<T[P], AggregatePhilosophers[P]>
  }




  export type philosophersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: philosophersWhereInput
    orderBy?: philosophersOrderByWithAggregationInput | philosophersOrderByWithAggregationInput[]
    by: PhilosophersScalarFieldEnum[] | PhilosophersScalarFieldEnum
    having?: philosophersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhilosophersCountAggregateInputType | true
    _avg?: PhilosophersAvgAggregateInputType
    _sum?: PhilosophersSumAggregateInputType
    _min?: PhilosophersMinAggregateInputType
    _max?: PhilosophersMaxAggregateInputType
  }

  export type PhilosophersGroupByOutputType = {
    id: number
    name: string
    image_url: string
    description: string
    style_prompt: string | null
    _count: PhilosophersCountAggregateOutputType | null
    _avg: PhilosophersAvgAggregateOutputType | null
    _sum: PhilosophersSumAggregateOutputType | null
    _min: PhilosophersMinAggregateOutputType | null
    _max: PhilosophersMaxAggregateOutputType | null
  }

  type GetPhilosophersGroupByPayload<T extends philosophersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhilosophersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhilosophersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhilosophersGroupByOutputType[P]>
            : GetScalarType<T[P], PhilosophersGroupByOutputType[P]>
        }
      >
    >


  export type philosophersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image_url?: boolean
    description?: boolean
    style_prompt?: boolean
    chats?: boolean | philosophers$chatsArgs<ExtArgs>
    _count?: boolean | PhilosophersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["philosophers"]>



  export type philosophersSelectScalar = {
    id?: boolean
    name?: boolean
    image_url?: boolean
    description?: boolean
    style_prompt?: boolean
  }

  export type philosophersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "image_url" | "description" | "style_prompt", ExtArgs["result"]["philosophers"]>
  export type philosophersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | philosophers$chatsArgs<ExtArgs>
    _count?: boolean | PhilosophersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $philosophersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "philosophers"
    objects: {
      chats: Prisma.$chatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      image_url: string
      description: string
      style_prompt: string | null
    }, ExtArgs["result"]["philosophers"]>
    composites: {}
  }

  type philosophersGetPayload<S extends boolean | null | undefined | philosophersDefaultArgs> = $Result.GetResult<Prisma.$philosophersPayload, S>

  type philosophersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<philosophersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhilosophersCountAggregateInputType | true
    }

  export interface philosophersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['philosophers'], meta: { name: 'philosophers' } }
    /**
     * Find zero or one Philosophers that matches the filter.
     * @param {philosophersFindUniqueArgs} args - Arguments to find a Philosophers
     * @example
     * // Get one Philosophers
     * const philosophers = await prisma.philosophers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends philosophersFindUniqueArgs>(args: SelectSubset<T, philosophersFindUniqueArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Philosophers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {philosophersFindUniqueOrThrowArgs} args - Arguments to find a Philosophers
     * @example
     * // Get one Philosophers
     * const philosophers = await prisma.philosophers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends philosophersFindUniqueOrThrowArgs>(args: SelectSubset<T, philosophersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Philosophers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {philosophersFindFirstArgs} args - Arguments to find a Philosophers
     * @example
     * // Get one Philosophers
     * const philosophers = await prisma.philosophers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends philosophersFindFirstArgs>(args?: SelectSubset<T, philosophersFindFirstArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Philosophers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {philosophersFindFirstOrThrowArgs} args - Arguments to find a Philosophers
     * @example
     * // Get one Philosophers
     * const philosophers = await prisma.philosophers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends philosophersFindFirstOrThrowArgs>(args?: SelectSubset<T, philosophersFindFirstOrThrowArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Philosophers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {philosophersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Philosophers
     * const philosophers = await prisma.philosophers.findMany()
     * 
     * // Get first 10 Philosophers
     * const philosophers = await prisma.philosophers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const philosophersWithIdOnly = await prisma.philosophers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends philosophersFindManyArgs>(args?: SelectSubset<T, philosophersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Philosophers.
     * @param {philosophersCreateArgs} args - Arguments to create a Philosophers.
     * @example
     * // Create one Philosophers
     * const Philosophers = await prisma.philosophers.create({
     *   data: {
     *     // ... data to create a Philosophers
     *   }
     * })
     * 
     */
    create<T extends philosophersCreateArgs>(args: SelectSubset<T, philosophersCreateArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Philosophers.
     * @param {philosophersCreateManyArgs} args - Arguments to create many Philosophers.
     * @example
     * // Create many Philosophers
     * const philosophers = await prisma.philosophers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends philosophersCreateManyArgs>(args?: SelectSubset<T, philosophersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Philosophers.
     * @param {philosophersDeleteArgs} args - Arguments to delete one Philosophers.
     * @example
     * // Delete one Philosophers
     * const Philosophers = await prisma.philosophers.delete({
     *   where: {
     *     // ... filter to delete one Philosophers
     *   }
     * })
     * 
     */
    delete<T extends philosophersDeleteArgs>(args: SelectSubset<T, philosophersDeleteArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Philosophers.
     * @param {philosophersUpdateArgs} args - Arguments to update one Philosophers.
     * @example
     * // Update one Philosophers
     * const philosophers = await prisma.philosophers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends philosophersUpdateArgs>(args: SelectSubset<T, philosophersUpdateArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Philosophers.
     * @param {philosophersDeleteManyArgs} args - Arguments to filter Philosophers to delete.
     * @example
     * // Delete a few Philosophers
     * const { count } = await prisma.philosophers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends philosophersDeleteManyArgs>(args?: SelectSubset<T, philosophersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Philosophers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {philosophersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Philosophers
     * const philosophers = await prisma.philosophers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends philosophersUpdateManyArgs>(args: SelectSubset<T, philosophersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Philosophers.
     * @param {philosophersUpsertArgs} args - Arguments to update or create a Philosophers.
     * @example
     * // Update or create a Philosophers
     * const philosophers = await prisma.philosophers.upsert({
     *   create: {
     *     // ... data to create a Philosophers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Philosophers we want to update
     *   }
     * })
     */
    upsert<T extends philosophersUpsertArgs>(args: SelectSubset<T, philosophersUpsertArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Philosophers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {philosophersCountArgs} args - Arguments to filter Philosophers to count.
     * @example
     * // Count the number of Philosophers
     * const count = await prisma.philosophers.count({
     *   where: {
     *     // ... the filter for the Philosophers we want to count
     *   }
     * })
    **/
    count<T extends philosophersCountArgs>(
      args?: Subset<T, philosophersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhilosophersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Philosophers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhilosophersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhilosophersAggregateArgs>(args: Subset<T, PhilosophersAggregateArgs>): Prisma.PrismaPromise<GetPhilosophersAggregateType<T>>

    /**
     * Group by Philosophers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {philosophersGroupByArgs} args - Group by arguments.
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
      T extends philosophersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: philosophersGroupByArgs['orderBy'] }
        : { orderBy?: philosophersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, philosophersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhilosophersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the philosophers model
   */
  readonly fields: philosophersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for philosophers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__philosophersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chats<T extends philosophers$chatsArgs<ExtArgs> = {}>(args?: Subset<T, philosophers$chatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the philosophers model
   */
  interface philosophersFieldRefs {
    readonly id: FieldRef<"philosophers", 'Int'>
    readonly name: FieldRef<"philosophers", 'String'>
    readonly image_url: FieldRef<"philosophers", 'String'>
    readonly description: FieldRef<"philosophers", 'String'>
    readonly style_prompt: FieldRef<"philosophers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * philosophers findUnique
   */
  export type philosophersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * Filter, which philosophers to fetch.
     */
    where: philosophersWhereUniqueInput
  }

  /**
   * philosophers findUniqueOrThrow
   */
  export type philosophersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * Filter, which philosophers to fetch.
     */
    where: philosophersWhereUniqueInput
  }

  /**
   * philosophers findFirst
   */
  export type philosophersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * Filter, which philosophers to fetch.
     */
    where?: philosophersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of philosophers to fetch.
     */
    orderBy?: philosophersOrderByWithRelationInput | philosophersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for philosophers.
     */
    cursor?: philosophersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` philosophers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` philosophers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of philosophers.
     */
    distinct?: PhilosophersScalarFieldEnum | PhilosophersScalarFieldEnum[]
  }

  /**
   * philosophers findFirstOrThrow
   */
  export type philosophersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * Filter, which philosophers to fetch.
     */
    where?: philosophersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of philosophers to fetch.
     */
    orderBy?: philosophersOrderByWithRelationInput | philosophersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for philosophers.
     */
    cursor?: philosophersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` philosophers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` philosophers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of philosophers.
     */
    distinct?: PhilosophersScalarFieldEnum | PhilosophersScalarFieldEnum[]
  }

  /**
   * philosophers findMany
   */
  export type philosophersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * Filter, which philosophers to fetch.
     */
    where?: philosophersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of philosophers to fetch.
     */
    orderBy?: philosophersOrderByWithRelationInput | philosophersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing philosophers.
     */
    cursor?: philosophersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` philosophers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` philosophers.
     */
    skip?: number
    distinct?: PhilosophersScalarFieldEnum | PhilosophersScalarFieldEnum[]
  }

  /**
   * philosophers create
   */
  export type philosophersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * The data needed to create a philosophers.
     */
    data: XOR<philosophersCreateInput, philosophersUncheckedCreateInput>
  }

  /**
   * philosophers createMany
   */
  export type philosophersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many philosophers.
     */
    data: philosophersCreateManyInput | philosophersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * philosophers update
   */
  export type philosophersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * The data needed to update a philosophers.
     */
    data: XOR<philosophersUpdateInput, philosophersUncheckedUpdateInput>
    /**
     * Choose, which philosophers to update.
     */
    where: philosophersWhereUniqueInput
  }

  /**
   * philosophers updateMany
   */
  export type philosophersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update philosophers.
     */
    data: XOR<philosophersUpdateManyMutationInput, philosophersUncheckedUpdateManyInput>
    /**
     * Filter which philosophers to update
     */
    where?: philosophersWhereInput
    /**
     * Limit how many philosophers to update.
     */
    limit?: number
  }

  /**
   * philosophers upsert
   */
  export type philosophersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * The filter to search for the philosophers to update in case it exists.
     */
    where: philosophersWhereUniqueInput
    /**
     * In case the philosophers found by the `where` argument doesn't exist, create a new philosophers with this data.
     */
    create: XOR<philosophersCreateInput, philosophersUncheckedCreateInput>
    /**
     * In case the philosophers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<philosophersUpdateInput, philosophersUncheckedUpdateInput>
  }

  /**
   * philosophers delete
   */
  export type philosophersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
    /**
     * Filter which philosophers to delete.
     */
    where: philosophersWhereUniqueInput
  }

  /**
   * philosophers deleteMany
   */
  export type philosophersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which philosophers to delete
     */
    where?: philosophersWhereInput
    /**
     * Limit how many philosophers to delete.
     */
    limit?: number
  }

  /**
   * philosophers.chats
   */
  export type philosophers$chatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    where?: chatsWhereInput
    orderBy?: chatsOrderByWithRelationInput | chatsOrderByWithRelationInput[]
    cursor?: chatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * philosophers without action
   */
  export type philosophersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the philosophers
     */
    select?: philosophersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the philosophers
     */
    omit?: philosophersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: philosophersInclude<ExtArgs> | null
  }


  /**
   * Model chats
   */

  export type AggregateChats = {
    _count: ChatsCountAggregateOutputType | null
    _avg: ChatsAvgAggregateOutputType | null
    _sum: ChatsSumAggregateOutputType | null
    _min: ChatsMinAggregateOutputType | null
    _max: ChatsMaxAggregateOutputType | null
  }

  export type ChatsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    philosopher_id: number | null
  }

  export type ChatsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    philosopher_id: number | null
  }

  export type ChatsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    philosopher_id: number | null
    created_at: Date | null
  }

  export type ChatsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    philosopher_id: number | null
    created_at: Date | null
  }

  export type ChatsCountAggregateOutputType = {
    id: number
    user_id: number
    philosopher_id: number
    created_at: number
    _all: number
  }


  export type ChatsAvgAggregateInputType = {
    id?: true
    user_id?: true
    philosopher_id?: true
  }

  export type ChatsSumAggregateInputType = {
    id?: true
    user_id?: true
    philosopher_id?: true
  }

  export type ChatsMinAggregateInputType = {
    id?: true
    user_id?: true
    philosopher_id?: true
    created_at?: true
  }

  export type ChatsMaxAggregateInputType = {
    id?: true
    user_id?: true
    philosopher_id?: true
    created_at?: true
  }

  export type ChatsCountAggregateInputType = {
    id?: true
    user_id?: true
    philosopher_id?: true
    created_at?: true
    _all?: true
  }

  export type ChatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chats to aggregate.
     */
    where?: chatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatsOrderByWithRelationInput | chatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chats
    **/
    _count?: true | ChatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatsMaxAggregateInputType
  }

  export type GetChatsAggregateType<T extends ChatsAggregateArgs> = {
        [P in keyof T & keyof AggregateChats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChats[P]>
      : GetScalarType<T[P], AggregateChats[P]>
  }




  export type chatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatsWhereInput
    orderBy?: chatsOrderByWithAggregationInput | chatsOrderByWithAggregationInput[]
    by: ChatsScalarFieldEnum[] | ChatsScalarFieldEnum
    having?: chatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatsCountAggregateInputType | true
    _avg?: ChatsAvgAggregateInputType
    _sum?: ChatsSumAggregateInputType
    _min?: ChatsMinAggregateInputType
    _max?: ChatsMaxAggregateInputType
  }

  export type ChatsGroupByOutputType = {
    id: number
    user_id: number
    philosopher_id: number
    created_at: Date
    _count: ChatsCountAggregateOutputType | null
    _avg: ChatsAvgAggregateOutputType | null
    _sum: ChatsSumAggregateOutputType | null
    _min: ChatsMinAggregateOutputType | null
    _max: ChatsMaxAggregateOutputType | null
  }

  type GetChatsGroupByPayload<T extends chatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatsGroupByOutputType[P]>
            : GetScalarType<T[P], ChatsGroupByOutputType[P]>
        }
      >
    >


  export type chatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    philosopher_id?: boolean
    created_at?: boolean
    messages?: boolean | chats$messagesArgs<ExtArgs>
    philosopher?: boolean | philosophersDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | ChatsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chats"]>



  export type chatsSelectScalar = {
    id?: boolean
    user_id?: boolean
    philosopher_id?: boolean
    created_at?: boolean
  }

  export type chatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "philosopher_id" | "created_at", ExtArgs["result"]["chats"]>
  export type chatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | chats$messagesArgs<ExtArgs>
    philosopher?: boolean | philosophersDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | ChatsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $chatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chats"
    objects: {
      messages: Prisma.$chatmessagesPayload<ExtArgs>[]
      philosopher: Prisma.$philosophersPayload<ExtArgs>
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      philosopher_id: number
      created_at: Date
    }, ExtArgs["result"]["chats"]>
    composites: {}
  }

  type chatsGetPayload<S extends boolean | null | undefined | chatsDefaultArgs> = $Result.GetResult<Prisma.$chatsPayload, S>

  type chatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatsCountAggregateInputType | true
    }

  export interface chatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chats'], meta: { name: 'chats' } }
    /**
     * Find zero or one Chats that matches the filter.
     * @param {chatsFindUniqueArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chatsFindUniqueArgs>(args: SelectSubset<T, chatsFindUniqueArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chatsFindUniqueOrThrowArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chatsFindUniqueOrThrowArgs>(args: SelectSubset<T, chatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatsFindFirstArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chatsFindFirstArgs>(args?: SelectSubset<T, chatsFindFirstArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatsFindFirstOrThrowArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chatsFindFirstOrThrowArgs>(args?: SelectSubset<T, chatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chats.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatsWithIdOnly = await prisma.chats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends chatsFindManyArgs>(args?: SelectSubset<T, chatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chats.
     * @param {chatsCreateArgs} args - Arguments to create a Chats.
     * @example
     * // Create one Chats
     * const Chats = await prisma.chats.create({
     *   data: {
     *     // ... data to create a Chats
     *   }
     * })
     * 
     */
    create<T extends chatsCreateArgs>(args: SelectSubset<T, chatsCreateArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chats.
     * @param {chatsCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chats = await prisma.chats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chatsCreateManyArgs>(args?: SelectSubset<T, chatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Chats.
     * @param {chatsDeleteArgs} args - Arguments to delete one Chats.
     * @example
     * // Delete one Chats
     * const Chats = await prisma.chats.delete({
     *   where: {
     *     // ... filter to delete one Chats
     *   }
     * })
     * 
     */
    delete<T extends chatsDeleteArgs>(args: SelectSubset<T, chatsDeleteArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chats.
     * @param {chatsUpdateArgs} args - Arguments to update one Chats.
     * @example
     * // Update one Chats
     * const chats = await prisma.chats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chatsUpdateArgs>(args: SelectSubset<T, chatsUpdateArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chats.
     * @param {chatsDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chatsDeleteManyArgs>(args?: SelectSubset<T, chatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chats = await prisma.chats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chatsUpdateManyArgs>(args: SelectSubset<T, chatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Chats.
     * @param {chatsUpsertArgs} args - Arguments to update or create a Chats.
     * @example
     * // Update or create a Chats
     * const chats = await prisma.chats.upsert({
     *   create: {
     *     // ... data to create a Chats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chats we want to update
     *   }
     * })
     */
    upsert<T extends chatsUpsertArgs>(args: SelectSubset<T, chatsUpsertArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatsCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chats.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends chatsCountArgs>(
      args?: Subset<T, chatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatsAggregateArgs>(args: Subset<T, ChatsAggregateArgs>): Prisma.PrismaPromise<GetChatsAggregateType<T>>

    /**
     * Group by Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatsGroupByArgs} args - Group by arguments.
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
      T extends chatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chatsGroupByArgs['orderBy'] }
        : { orderBy?: chatsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, chatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chats model
   */
  readonly fields: chatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends chats$messagesArgs<ExtArgs> = {}>(args?: Subset<T, chats$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    philosopher<T extends philosophersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, philosophersDefaultArgs<ExtArgs>>): Prisma__philosophersClient<$Result.GetResult<Prisma.$philosophersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the chats model
   */
  interface chatsFieldRefs {
    readonly id: FieldRef<"chats", 'Int'>
    readonly user_id: FieldRef<"chats", 'Int'>
    readonly philosopher_id: FieldRef<"chats", 'Int'>
    readonly created_at: FieldRef<"chats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * chats findUnique
   */
  export type chatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * Filter, which chats to fetch.
     */
    where: chatsWhereUniqueInput
  }

  /**
   * chats findUniqueOrThrow
   */
  export type chatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * Filter, which chats to fetch.
     */
    where: chatsWhereUniqueInput
  }

  /**
   * chats findFirst
   */
  export type chatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * Filter, which chats to fetch.
     */
    where?: chatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatsOrderByWithRelationInput | chatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chats.
     */
    cursor?: chatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chats.
     */
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * chats findFirstOrThrow
   */
  export type chatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * Filter, which chats to fetch.
     */
    where?: chatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatsOrderByWithRelationInput | chatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chats.
     */
    cursor?: chatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chats.
     */
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * chats findMany
   */
  export type chatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * Filter, which chats to fetch.
     */
    where?: chatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatsOrderByWithRelationInput | chatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chats.
     */
    cursor?: chatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * chats create
   */
  export type chatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * The data needed to create a chats.
     */
    data: XOR<chatsCreateInput, chatsUncheckedCreateInput>
  }

  /**
   * chats createMany
   */
  export type chatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chats.
     */
    data: chatsCreateManyInput | chatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chats update
   */
  export type chatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * The data needed to update a chats.
     */
    data: XOR<chatsUpdateInput, chatsUncheckedUpdateInput>
    /**
     * Choose, which chats to update.
     */
    where: chatsWhereUniqueInput
  }

  /**
   * chats updateMany
   */
  export type chatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chats.
     */
    data: XOR<chatsUpdateManyMutationInput, chatsUncheckedUpdateManyInput>
    /**
     * Filter which chats to update
     */
    where?: chatsWhereInput
    /**
     * Limit how many chats to update.
     */
    limit?: number
  }

  /**
   * chats upsert
   */
  export type chatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * The filter to search for the chats to update in case it exists.
     */
    where: chatsWhereUniqueInput
    /**
     * In case the chats found by the `where` argument doesn't exist, create a new chats with this data.
     */
    create: XOR<chatsCreateInput, chatsUncheckedCreateInput>
    /**
     * In case the chats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chatsUpdateInput, chatsUncheckedUpdateInput>
  }

  /**
   * chats delete
   */
  export type chatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
    /**
     * Filter which chats to delete.
     */
    where: chatsWhereUniqueInput
  }

  /**
   * chats deleteMany
   */
  export type chatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chats to delete
     */
    where?: chatsWhereInput
    /**
     * Limit how many chats to delete.
     */
    limit?: number
  }

  /**
   * chats.messages
   */
  export type chats$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    where?: chatmessagesWhereInput
    orderBy?: chatmessagesOrderByWithRelationInput | chatmessagesOrderByWithRelationInput[]
    cursor?: chatmessagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatmessagesScalarFieldEnum | ChatmessagesScalarFieldEnum[]
  }

  /**
   * chats without action
   */
  export type chatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chats
     */
    select?: chatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chats
     */
    omit?: chatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatsInclude<ExtArgs> | null
  }


  /**
   * Model chatmessages
   */

  export type AggregateChatmessages = {
    _count: ChatmessagesCountAggregateOutputType | null
    _avg: ChatmessagesAvgAggregateOutputType | null
    _sum: ChatmessagesSumAggregateOutputType | null
    _min: ChatmessagesMinAggregateOutputType | null
    _max: ChatmessagesMaxAggregateOutputType | null
  }

  export type ChatmessagesAvgAggregateOutputType = {
    id: number | null
    chat_id: number | null
  }

  export type ChatmessagesSumAggregateOutputType = {
    id: number | null
    chat_id: number | null
  }

  export type ChatmessagesMinAggregateOutputType = {
    id: number | null
    chat_id: number | null
    role: string | null
    content: string | null
    created_at: Date | null
  }

  export type ChatmessagesMaxAggregateOutputType = {
    id: number | null
    chat_id: number | null
    role: string | null
    content: string | null
    created_at: Date | null
  }

  export type ChatmessagesCountAggregateOutputType = {
    id: number
    chat_id: number
    role: number
    content: number
    created_at: number
    _all: number
  }


  export type ChatmessagesAvgAggregateInputType = {
    id?: true
    chat_id?: true
  }

  export type ChatmessagesSumAggregateInputType = {
    id?: true
    chat_id?: true
  }

  export type ChatmessagesMinAggregateInputType = {
    id?: true
    chat_id?: true
    role?: true
    content?: true
    created_at?: true
  }

  export type ChatmessagesMaxAggregateInputType = {
    id?: true
    chat_id?: true
    role?: true
    content?: true
    created_at?: true
  }

  export type ChatmessagesCountAggregateInputType = {
    id?: true
    chat_id?: true
    role?: true
    content?: true
    created_at?: true
    _all?: true
  }

  export type ChatmessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chatmessages to aggregate.
     */
    where?: chatmessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chatmessages to fetch.
     */
    orderBy?: chatmessagesOrderByWithRelationInput | chatmessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chatmessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chatmessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chatmessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chatmessages
    **/
    _count?: true | ChatmessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatmessagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatmessagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatmessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatmessagesMaxAggregateInputType
  }

  export type GetChatmessagesAggregateType<T extends ChatmessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateChatmessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatmessages[P]>
      : GetScalarType<T[P], AggregateChatmessages[P]>
  }




  export type chatmessagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatmessagesWhereInput
    orderBy?: chatmessagesOrderByWithAggregationInput | chatmessagesOrderByWithAggregationInput[]
    by: ChatmessagesScalarFieldEnum[] | ChatmessagesScalarFieldEnum
    having?: chatmessagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatmessagesCountAggregateInputType | true
    _avg?: ChatmessagesAvgAggregateInputType
    _sum?: ChatmessagesSumAggregateInputType
    _min?: ChatmessagesMinAggregateInputType
    _max?: ChatmessagesMaxAggregateInputType
  }

  export type ChatmessagesGroupByOutputType = {
    id: number
    chat_id: number
    role: string
    content: string
    created_at: Date
    _count: ChatmessagesCountAggregateOutputType | null
    _avg: ChatmessagesAvgAggregateOutputType | null
    _sum: ChatmessagesSumAggregateOutputType | null
    _min: ChatmessagesMinAggregateOutputType | null
    _max: ChatmessagesMaxAggregateOutputType | null
  }

  type GetChatmessagesGroupByPayload<T extends chatmessagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatmessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatmessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatmessagesGroupByOutputType[P]>
            : GetScalarType<T[P], ChatmessagesGroupByOutputType[P]>
        }
      >
    >


  export type chatmessagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chat_id?: boolean
    role?: boolean
    content?: boolean
    created_at?: boolean
    chat?: boolean | chatsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatmessages"]>



  export type chatmessagesSelectScalar = {
    id?: boolean
    chat_id?: boolean
    role?: boolean
    content?: boolean
    created_at?: boolean
  }

  export type chatmessagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chat_id" | "role" | "content" | "created_at", ExtArgs["result"]["chatmessages"]>
  export type chatmessagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | chatsDefaultArgs<ExtArgs>
  }

  export type $chatmessagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chatmessages"
    objects: {
      chat: Prisma.$chatsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      chat_id: number
      role: string
      content: string
      created_at: Date
    }, ExtArgs["result"]["chatmessages"]>
    composites: {}
  }

  type chatmessagesGetPayload<S extends boolean | null | undefined | chatmessagesDefaultArgs> = $Result.GetResult<Prisma.$chatmessagesPayload, S>

  type chatmessagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chatmessagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatmessagesCountAggregateInputType | true
    }

  export interface chatmessagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chatmessages'], meta: { name: 'chatmessages' } }
    /**
     * Find zero or one Chatmessages that matches the filter.
     * @param {chatmessagesFindUniqueArgs} args - Arguments to find a Chatmessages
     * @example
     * // Get one Chatmessages
     * const chatmessages = await prisma.chatmessages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chatmessagesFindUniqueArgs>(args: SelectSubset<T, chatmessagesFindUniqueArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chatmessages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chatmessagesFindUniqueOrThrowArgs} args - Arguments to find a Chatmessages
     * @example
     * // Get one Chatmessages
     * const chatmessages = await prisma.chatmessages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chatmessagesFindUniqueOrThrowArgs>(args: SelectSubset<T, chatmessagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chatmessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatmessagesFindFirstArgs} args - Arguments to find a Chatmessages
     * @example
     * // Get one Chatmessages
     * const chatmessages = await prisma.chatmessages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chatmessagesFindFirstArgs>(args?: SelectSubset<T, chatmessagesFindFirstArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chatmessages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatmessagesFindFirstOrThrowArgs} args - Arguments to find a Chatmessages
     * @example
     * // Get one Chatmessages
     * const chatmessages = await prisma.chatmessages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chatmessagesFindFirstOrThrowArgs>(args?: SelectSubset<T, chatmessagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chatmessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatmessagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chatmessages
     * const chatmessages = await prisma.chatmessages.findMany()
     * 
     * // Get first 10 Chatmessages
     * const chatmessages = await prisma.chatmessages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatmessagesWithIdOnly = await prisma.chatmessages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends chatmessagesFindManyArgs>(args?: SelectSubset<T, chatmessagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chatmessages.
     * @param {chatmessagesCreateArgs} args - Arguments to create a Chatmessages.
     * @example
     * // Create one Chatmessages
     * const Chatmessages = await prisma.chatmessages.create({
     *   data: {
     *     // ... data to create a Chatmessages
     *   }
     * })
     * 
     */
    create<T extends chatmessagesCreateArgs>(args: SelectSubset<T, chatmessagesCreateArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chatmessages.
     * @param {chatmessagesCreateManyArgs} args - Arguments to create many Chatmessages.
     * @example
     * // Create many Chatmessages
     * const chatmessages = await prisma.chatmessages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chatmessagesCreateManyArgs>(args?: SelectSubset<T, chatmessagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Chatmessages.
     * @param {chatmessagesDeleteArgs} args - Arguments to delete one Chatmessages.
     * @example
     * // Delete one Chatmessages
     * const Chatmessages = await prisma.chatmessages.delete({
     *   where: {
     *     // ... filter to delete one Chatmessages
     *   }
     * })
     * 
     */
    delete<T extends chatmessagesDeleteArgs>(args: SelectSubset<T, chatmessagesDeleteArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chatmessages.
     * @param {chatmessagesUpdateArgs} args - Arguments to update one Chatmessages.
     * @example
     * // Update one Chatmessages
     * const chatmessages = await prisma.chatmessages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chatmessagesUpdateArgs>(args: SelectSubset<T, chatmessagesUpdateArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chatmessages.
     * @param {chatmessagesDeleteManyArgs} args - Arguments to filter Chatmessages to delete.
     * @example
     * // Delete a few Chatmessages
     * const { count } = await prisma.chatmessages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chatmessagesDeleteManyArgs>(args?: SelectSubset<T, chatmessagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chatmessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatmessagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chatmessages
     * const chatmessages = await prisma.chatmessages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chatmessagesUpdateManyArgs>(args: SelectSubset<T, chatmessagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Chatmessages.
     * @param {chatmessagesUpsertArgs} args - Arguments to update or create a Chatmessages.
     * @example
     * // Update or create a Chatmessages
     * const chatmessages = await prisma.chatmessages.upsert({
     *   create: {
     *     // ... data to create a Chatmessages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chatmessages we want to update
     *   }
     * })
     */
    upsert<T extends chatmessagesUpsertArgs>(args: SelectSubset<T, chatmessagesUpsertArgs<ExtArgs>>): Prisma__chatmessagesClient<$Result.GetResult<Prisma.$chatmessagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chatmessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatmessagesCountArgs} args - Arguments to filter Chatmessages to count.
     * @example
     * // Count the number of Chatmessages
     * const count = await prisma.chatmessages.count({
     *   where: {
     *     // ... the filter for the Chatmessages we want to count
     *   }
     * })
    **/
    count<T extends chatmessagesCountArgs>(
      args?: Subset<T, chatmessagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatmessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chatmessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatmessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatmessagesAggregateArgs>(args: Subset<T, ChatmessagesAggregateArgs>): Prisma.PrismaPromise<GetChatmessagesAggregateType<T>>

    /**
     * Group by Chatmessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatmessagesGroupByArgs} args - Group by arguments.
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
      T extends chatmessagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chatmessagesGroupByArgs['orderBy'] }
        : { orderBy?: chatmessagesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, chatmessagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatmessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chatmessages model
   */
  readonly fields: chatmessagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chatmessages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chatmessagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends chatsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, chatsDefaultArgs<ExtArgs>>): Prisma__chatsClient<$Result.GetResult<Prisma.$chatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the chatmessages model
   */
  interface chatmessagesFieldRefs {
    readonly id: FieldRef<"chatmessages", 'Int'>
    readonly chat_id: FieldRef<"chatmessages", 'Int'>
    readonly role: FieldRef<"chatmessages", 'String'>
    readonly content: FieldRef<"chatmessages", 'String'>
    readonly created_at: FieldRef<"chatmessages", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * chatmessages findUnique
   */
  export type chatmessagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * Filter, which chatmessages to fetch.
     */
    where: chatmessagesWhereUniqueInput
  }

  /**
   * chatmessages findUniqueOrThrow
   */
  export type chatmessagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * Filter, which chatmessages to fetch.
     */
    where: chatmessagesWhereUniqueInput
  }

  /**
   * chatmessages findFirst
   */
  export type chatmessagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * Filter, which chatmessages to fetch.
     */
    where?: chatmessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chatmessages to fetch.
     */
    orderBy?: chatmessagesOrderByWithRelationInput | chatmessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chatmessages.
     */
    cursor?: chatmessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chatmessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chatmessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chatmessages.
     */
    distinct?: ChatmessagesScalarFieldEnum | ChatmessagesScalarFieldEnum[]
  }

  /**
   * chatmessages findFirstOrThrow
   */
  export type chatmessagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * Filter, which chatmessages to fetch.
     */
    where?: chatmessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chatmessages to fetch.
     */
    orderBy?: chatmessagesOrderByWithRelationInput | chatmessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chatmessages.
     */
    cursor?: chatmessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chatmessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chatmessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chatmessages.
     */
    distinct?: ChatmessagesScalarFieldEnum | ChatmessagesScalarFieldEnum[]
  }

  /**
   * chatmessages findMany
   */
  export type chatmessagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * Filter, which chatmessages to fetch.
     */
    where?: chatmessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chatmessages to fetch.
     */
    orderBy?: chatmessagesOrderByWithRelationInput | chatmessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chatmessages.
     */
    cursor?: chatmessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chatmessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chatmessages.
     */
    skip?: number
    distinct?: ChatmessagesScalarFieldEnum | ChatmessagesScalarFieldEnum[]
  }

  /**
   * chatmessages create
   */
  export type chatmessagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * The data needed to create a chatmessages.
     */
    data: XOR<chatmessagesCreateInput, chatmessagesUncheckedCreateInput>
  }

  /**
   * chatmessages createMany
   */
  export type chatmessagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chatmessages.
     */
    data: chatmessagesCreateManyInput | chatmessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chatmessages update
   */
  export type chatmessagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * The data needed to update a chatmessages.
     */
    data: XOR<chatmessagesUpdateInput, chatmessagesUncheckedUpdateInput>
    /**
     * Choose, which chatmessages to update.
     */
    where: chatmessagesWhereUniqueInput
  }

  /**
   * chatmessages updateMany
   */
  export type chatmessagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chatmessages.
     */
    data: XOR<chatmessagesUpdateManyMutationInput, chatmessagesUncheckedUpdateManyInput>
    /**
     * Filter which chatmessages to update
     */
    where?: chatmessagesWhereInput
    /**
     * Limit how many chatmessages to update.
     */
    limit?: number
  }

  /**
   * chatmessages upsert
   */
  export type chatmessagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * The filter to search for the chatmessages to update in case it exists.
     */
    where: chatmessagesWhereUniqueInput
    /**
     * In case the chatmessages found by the `where` argument doesn't exist, create a new chatmessages with this data.
     */
    create: XOR<chatmessagesCreateInput, chatmessagesUncheckedCreateInput>
    /**
     * In case the chatmessages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chatmessagesUpdateInput, chatmessagesUncheckedUpdateInput>
  }

  /**
   * chatmessages delete
   */
  export type chatmessagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
    /**
     * Filter which chatmessages to delete.
     */
    where: chatmessagesWhereUniqueInput
  }

  /**
   * chatmessages deleteMany
   */
  export type chatmessagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chatmessages to delete
     */
    where?: chatmessagesWhereInput
    /**
     * Limit how many chatmessages to delete.
     */
    limit?: number
  }

  /**
   * chatmessages without action
   */
  export type chatmessagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chatmessages
     */
    select?: chatmessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chatmessages
     */
    omit?: chatmessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatmessagesInclude<ExtArgs> | null
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


  export const UsersScalarFieldEnum: {
    idusers: 'idusers',
    email: 'email',
    password: 'password',
    google_id: 'google_id',
    createdAt: 'createdAt',
    name: 'name'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const OtpsScalarFieldEnum: {
    id: 'id',
    email: 'email',
    otp: 'otp',
    created_at: 'created_at',
    password_purpose: 'password_purpose'
  };

  export type OtpsScalarFieldEnum = (typeof OtpsScalarFieldEnum)[keyof typeof OtpsScalarFieldEnum]


  export const OtphistoryScalarFieldEnum: {
    id: 'id',
    otp_id: 'otp_id',
    email: 'email',
    created_at: 'created_at',
    password_purpose: 'password_purpose'
  };

  export type OtphistoryScalarFieldEnum = (typeof OtphistoryScalarFieldEnum)[keyof typeof OtphistoryScalarFieldEnum]


  export const OtptriesScalarFieldEnum: {
    id_otptries: 'id_otptries',
    email: 'email',
    created_at: 'created_at',
    password_purpose: 'password_purpose'
  };

  export type OtptriesScalarFieldEnum = (typeof OtptriesScalarFieldEnum)[keyof typeof OtptriesScalarFieldEnum]


  export const PhilosophersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    image_url: 'image_url',
    description: 'description',
    style_prompt: 'style_prompt'
  };

  export type PhilosophersScalarFieldEnum = (typeof PhilosophersScalarFieldEnum)[keyof typeof PhilosophersScalarFieldEnum]


  export const ChatsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    philosopher_id: 'philosopher_id',
    created_at: 'created_at'
  };

  export type ChatsScalarFieldEnum = (typeof ChatsScalarFieldEnum)[keyof typeof ChatsScalarFieldEnum]


  export const ChatmessagesScalarFieldEnum: {
    id: 'id',
    chat_id: 'chat_id',
    role: 'role',
    content: 'content',
    created_at: 'created_at'
  };

  export type ChatmessagesScalarFieldEnum = (typeof ChatmessagesScalarFieldEnum)[keyof typeof ChatmessagesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const usersOrderByRelevanceFieldEnum: {
    email: 'email',
    password: 'password',
    google_id: 'google_id',
    name: 'name'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  export const otpsOrderByRelevanceFieldEnum: {
    email: 'email',
    otp: 'otp'
  };

  export type otpsOrderByRelevanceFieldEnum = (typeof otpsOrderByRelevanceFieldEnum)[keyof typeof otpsOrderByRelevanceFieldEnum]


  export const otphistoryOrderByRelevanceFieldEnum: {
    email: 'email'
  };

  export type otphistoryOrderByRelevanceFieldEnum = (typeof otphistoryOrderByRelevanceFieldEnum)[keyof typeof otphistoryOrderByRelevanceFieldEnum]


  export const otptriesOrderByRelevanceFieldEnum: {
    email: 'email'
  };

  export type otptriesOrderByRelevanceFieldEnum = (typeof otptriesOrderByRelevanceFieldEnum)[keyof typeof otptriesOrderByRelevanceFieldEnum]


  export const philosophersOrderByRelevanceFieldEnum: {
    name: 'name',
    image_url: 'image_url',
    description: 'description',
    style_prompt: 'style_prompt'
  };

  export type philosophersOrderByRelevanceFieldEnum = (typeof philosophersOrderByRelevanceFieldEnum)[keyof typeof philosophersOrderByRelevanceFieldEnum]


  export const chatmessagesOrderByRelevanceFieldEnum: {
    role: 'role',
    content: 'content'
  };

  export type chatmessagesOrderByRelevanceFieldEnum = (typeof chatmessagesOrderByRelevanceFieldEnum)[keyof typeof chatmessagesOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    idusers?: IntFilter<"users"> | number
    email?: StringFilter<"users"> | string
    password?: StringNullableFilter<"users"> | string | null
    google_id?: StringNullableFilter<"users"> | string | null
    createdAt?: DateTimeFilter<"users"> | Date | string
    name?: StringNullableFilter<"users"> | string | null
    chats?: ChatsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    idusers?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    name?: SortOrderInput | SortOrder
    chats?: chatsOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    idusers?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringNullableFilter<"users"> | string | null
    google_id?: StringNullableFilter<"users"> | string | null
    createdAt?: DateTimeFilter<"users"> | Date | string
    name?: StringNullableFilter<"users"> | string | null
    chats?: ChatsListRelationFilter
  }, "idusers" | "idusers" | "email">

  export type usersOrderByWithAggregationInput = {
    idusers?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    idusers?: IntWithAggregatesFilter<"users"> | number
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringNullableWithAggregatesFilter<"users"> | string | null
    google_id?: StringNullableWithAggregatesFilter<"users"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    name?: StringNullableWithAggregatesFilter<"users"> | string | null
  }

  export type otpsWhereInput = {
    AND?: otpsWhereInput | otpsWhereInput[]
    OR?: otpsWhereInput[]
    NOT?: otpsWhereInput | otpsWhereInput[]
    id?: IntFilter<"otps"> | number
    email?: StringFilter<"otps"> | string
    otp?: StringFilter<"otps"> | string
    created_at?: DateTimeFilter<"otps"> | Date | string
    password_purpose?: BoolFilter<"otps"> | boolean
    otphistory?: OtphistoryListRelationFilter
  }

  export type otpsOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
    otphistory?: otphistoryOrderByRelationAggregateInput
    _relevance?: otpsOrderByRelevanceInput
  }

  export type otpsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: otpsWhereInput | otpsWhereInput[]
    OR?: otpsWhereInput[]
    NOT?: otpsWhereInput | otpsWhereInput[]
    email?: StringFilter<"otps"> | string
    otp?: StringFilter<"otps"> | string
    created_at?: DateTimeFilter<"otps"> | Date | string
    password_purpose?: BoolFilter<"otps"> | boolean
    otphistory?: OtphistoryListRelationFilter
  }, "id">

  export type otpsOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
    _count?: otpsCountOrderByAggregateInput
    _avg?: otpsAvgOrderByAggregateInput
    _max?: otpsMaxOrderByAggregateInput
    _min?: otpsMinOrderByAggregateInput
    _sum?: otpsSumOrderByAggregateInput
  }

  export type otpsScalarWhereWithAggregatesInput = {
    AND?: otpsScalarWhereWithAggregatesInput | otpsScalarWhereWithAggregatesInput[]
    OR?: otpsScalarWhereWithAggregatesInput[]
    NOT?: otpsScalarWhereWithAggregatesInput | otpsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"otps"> | number
    email?: StringWithAggregatesFilter<"otps"> | string
    otp?: StringWithAggregatesFilter<"otps"> | string
    created_at?: DateTimeWithAggregatesFilter<"otps"> | Date | string
    password_purpose?: BoolWithAggregatesFilter<"otps"> | boolean
  }

  export type otphistoryWhereInput = {
    AND?: otphistoryWhereInput | otphistoryWhereInput[]
    OR?: otphistoryWhereInput[]
    NOT?: otphistoryWhereInput | otphistoryWhereInput[]
    id?: IntFilter<"otphistory"> | number
    otp_id?: IntNullableFilter<"otphistory"> | number | null
    email?: StringFilter<"otphistory"> | string
    created_at?: DateTimeFilter<"otphistory"> | Date | string
    password_purpose?: BoolFilter<"otphistory"> | boolean
    otps?: XOR<OtpsNullableScalarRelationFilter, otpsWhereInput> | null
  }

  export type otphistoryOrderByWithRelationInput = {
    id?: SortOrder
    otp_id?: SortOrderInput | SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
    otps?: otpsOrderByWithRelationInput
    _relevance?: otphistoryOrderByRelevanceInput
  }

  export type otphistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: otphistoryWhereInput | otphistoryWhereInput[]
    OR?: otphistoryWhereInput[]
    NOT?: otphistoryWhereInput | otphistoryWhereInput[]
    otp_id?: IntNullableFilter<"otphistory"> | number | null
    email?: StringFilter<"otphistory"> | string
    created_at?: DateTimeFilter<"otphistory"> | Date | string
    password_purpose?: BoolFilter<"otphistory"> | boolean
    otps?: XOR<OtpsNullableScalarRelationFilter, otpsWhereInput> | null
  }, "id">

  export type otphistoryOrderByWithAggregationInput = {
    id?: SortOrder
    otp_id?: SortOrderInput | SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
    _count?: otphistoryCountOrderByAggregateInput
    _avg?: otphistoryAvgOrderByAggregateInput
    _max?: otphistoryMaxOrderByAggregateInput
    _min?: otphistoryMinOrderByAggregateInput
    _sum?: otphistorySumOrderByAggregateInput
  }

  export type otphistoryScalarWhereWithAggregatesInput = {
    AND?: otphistoryScalarWhereWithAggregatesInput | otphistoryScalarWhereWithAggregatesInput[]
    OR?: otphistoryScalarWhereWithAggregatesInput[]
    NOT?: otphistoryScalarWhereWithAggregatesInput | otphistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"otphistory"> | number
    otp_id?: IntNullableWithAggregatesFilter<"otphistory"> | number | null
    email?: StringWithAggregatesFilter<"otphistory"> | string
    created_at?: DateTimeWithAggregatesFilter<"otphistory"> | Date | string
    password_purpose?: BoolWithAggregatesFilter<"otphistory"> | boolean
  }

  export type otptriesWhereInput = {
    AND?: otptriesWhereInput | otptriesWhereInput[]
    OR?: otptriesWhereInput[]
    NOT?: otptriesWhereInput | otptriesWhereInput[]
    id_otptries?: IntFilter<"otptries"> | number
    email?: StringFilter<"otptries"> | string
    created_at?: DateTimeFilter<"otptries"> | Date | string
    password_purpose?: BoolFilter<"otptries"> | boolean
  }

  export type otptriesOrderByWithRelationInput = {
    id_otptries?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
    _relevance?: otptriesOrderByRelevanceInput
  }

  export type otptriesWhereUniqueInput = Prisma.AtLeast<{
    id_otptries?: number
    AND?: otptriesWhereInput | otptriesWhereInput[]
    OR?: otptriesWhereInput[]
    NOT?: otptriesWhereInput | otptriesWhereInput[]
    email?: StringFilter<"otptries"> | string
    created_at?: DateTimeFilter<"otptries"> | Date | string
    password_purpose?: BoolFilter<"otptries"> | boolean
  }, "id_otptries">

  export type otptriesOrderByWithAggregationInput = {
    id_otptries?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
    _count?: otptriesCountOrderByAggregateInput
    _avg?: otptriesAvgOrderByAggregateInput
    _max?: otptriesMaxOrderByAggregateInput
    _min?: otptriesMinOrderByAggregateInput
    _sum?: otptriesSumOrderByAggregateInput
  }

  export type otptriesScalarWhereWithAggregatesInput = {
    AND?: otptriesScalarWhereWithAggregatesInput | otptriesScalarWhereWithAggregatesInput[]
    OR?: otptriesScalarWhereWithAggregatesInput[]
    NOT?: otptriesScalarWhereWithAggregatesInput | otptriesScalarWhereWithAggregatesInput[]
    id_otptries?: IntWithAggregatesFilter<"otptries"> | number
    email?: StringWithAggregatesFilter<"otptries"> | string
    created_at?: DateTimeWithAggregatesFilter<"otptries"> | Date | string
    password_purpose?: BoolWithAggregatesFilter<"otptries"> | boolean
  }

  export type philosophersWhereInput = {
    AND?: philosophersWhereInput | philosophersWhereInput[]
    OR?: philosophersWhereInput[]
    NOT?: philosophersWhereInput | philosophersWhereInput[]
    id?: IntFilter<"philosophers"> | number
    name?: StringFilter<"philosophers"> | string
    image_url?: StringFilter<"philosophers"> | string
    description?: StringFilter<"philosophers"> | string
    style_prompt?: StringNullableFilter<"philosophers"> | string | null
    chats?: ChatsListRelationFilter
  }

  export type philosophersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    style_prompt?: SortOrderInput | SortOrder
    chats?: chatsOrderByRelationAggregateInput
    _relevance?: philosophersOrderByRelevanceInput
  }

  export type philosophersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: philosophersWhereInput | philosophersWhereInput[]
    OR?: philosophersWhereInput[]
    NOT?: philosophersWhereInput | philosophersWhereInput[]
    image_url?: StringFilter<"philosophers"> | string
    description?: StringFilter<"philosophers"> | string
    style_prompt?: StringNullableFilter<"philosophers"> | string | null
    chats?: ChatsListRelationFilter
  }, "id" | "name">

  export type philosophersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    style_prompt?: SortOrderInput | SortOrder
    _count?: philosophersCountOrderByAggregateInput
    _avg?: philosophersAvgOrderByAggregateInput
    _max?: philosophersMaxOrderByAggregateInput
    _min?: philosophersMinOrderByAggregateInput
    _sum?: philosophersSumOrderByAggregateInput
  }

  export type philosophersScalarWhereWithAggregatesInput = {
    AND?: philosophersScalarWhereWithAggregatesInput | philosophersScalarWhereWithAggregatesInput[]
    OR?: philosophersScalarWhereWithAggregatesInput[]
    NOT?: philosophersScalarWhereWithAggregatesInput | philosophersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"philosophers"> | number
    name?: StringWithAggregatesFilter<"philosophers"> | string
    image_url?: StringWithAggregatesFilter<"philosophers"> | string
    description?: StringWithAggregatesFilter<"philosophers"> | string
    style_prompt?: StringNullableWithAggregatesFilter<"philosophers"> | string | null
  }

  export type chatsWhereInput = {
    AND?: chatsWhereInput | chatsWhereInput[]
    OR?: chatsWhereInput[]
    NOT?: chatsWhereInput | chatsWhereInput[]
    id?: IntFilter<"chats"> | number
    user_id?: IntFilter<"chats"> | number
    philosopher_id?: IntFilter<"chats"> | number
    created_at?: DateTimeFilter<"chats"> | Date | string
    messages?: ChatmessagesListRelationFilter
    philosopher?: XOR<PhilosophersScalarRelationFilter, philosophersWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type chatsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    philosopher_id?: SortOrder
    created_at?: SortOrder
    messages?: chatmessagesOrderByRelationAggregateInput
    philosopher?: philosophersOrderByWithRelationInput
    user?: usersOrderByWithRelationInput
  }

  export type chatsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: chatsWhereInput | chatsWhereInput[]
    OR?: chatsWhereInput[]
    NOT?: chatsWhereInput | chatsWhereInput[]
    user_id?: IntFilter<"chats"> | number
    philosopher_id?: IntFilter<"chats"> | number
    created_at?: DateTimeFilter<"chats"> | Date | string
    messages?: ChatmessagesListRelationFilter
    philosopher?: XOR<PhilosophersScalarRelationFilter, philosophersWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type chatsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    philosopher_id?: SortOrder
    created_at?: SortOrder
    _count?: chatsCountOrderByAggregateInput
    _avg?: chatsAvgOrderByAggregateInput
    _max?: chatsMaxOrderByAggregateInput
    _min?: chatsMinOrderByAggregateInput
    _sum?: chatsSumOrderByAggregateInput
  }

  export type chatsScalarWhereWithAggregatesInput = {
    AND?: chatsScalarWhereWithAggregatesInput | chatsScalarWhereWithAggregatesInput[]
    OR?: chatsScalarWhereWithAggregatesInput[]
    NOT?: chatsScalarWhereWithAggregatesInput | chatsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"chats"> | number
    user_id?: IntWithAggregatesFilter<"chats"> | number
    philosopher_id?: IntWithAggregatesFilter<"chats"> | number
    created_at?: DateTimeWithAggregatesFilter<"chats"> | Date | string
  }

  export type chatmessagesWhereInput = {
    AND?: chatmessagesWhereInput | chatmessagesWhereInput[]
    OR?: chatmessagesWhereInput[]
    NOT?: chatmessagesWhereInput | chatmessagesWhereInput[]
    id?: IntFilter<"chatmessages"> | number
    chat_id?: IntFilter<"chatmessages"> | number
    role?: StringFilter<"chatmessages"> | string
    content?: StringFilter<"chatmessages"> | string
    created_at?: DateTimeFilter<"chatmessages"> | Date | string
    chat?: XOR<ChatsScalarRelationFilter, chatsWhereInput>
  }

  export type chatmessagesOrderByWithRelationInput = {
    id?: SortOrder
    chat_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    chat?: chatsOrderByWithRelationInput
    _relevance?: chatmessagesOrderByRelevanceInput
  }

  export type chatmessagesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: chatmessagesWhereInput | chatmessagesWhereInput[]
    OR?: chatmessagesWhereInput[]
    NOT?: chatmessagesWhereInput | chatmessagesWhereInput[]
    chat_id?: IntFilter<"chatmessages"> | number
    role?: StringFilter<"chatmessages"> | string
    content?: StringFilter<"chatmessages"> | string
    created_at?: DateTimeFilter<"chatmessages"> | Date | string
    chat?: XOR<ChatsScalarRelationFilter, chatsWhereInput>
  }, "id">

  export type chatmessagesOrderByWithAggregationInput = {
    id?: SortOrder
    chat_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    _count?: chatmessagesCountOrderByAggregateInput
    _avg?: chatmessagesAvgOrderByAggregateInput
    _max?: chatmessagesMaxOrderByAggregateInput
    _min?: chatmessagesMinOrderByAggregateInput
    _sum?: chatmessagesSumOrderByAggregateInput
  }

  export type chatmessagesScalarWhereWithAggregatesInput = {
    AND?: chatmessagesScalarWhereWithAggregatesInput | chatmessagesScalarWhereWithAggregatesInput[]
    OR?: chatmessagesScalarWhereWithAggregatesInput[]
    NOT?: chatmessagesScalarWhereWithAggregatesInput | chatmessagesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"chatmessages"> | number
    chat_id?: IntWithAggregatesFilter<"chatmessages"> | number
    role?: StringWithAggregatesFilter<"chatmessages"> | string
    content?: StringWithAggregatesFilter<"chatmessages"> | string
    created_at?: DateTimeWithAggregatesFilter<"chatmessages"> | Date | string
  }

  export type usersCreateInput = {
    email: string
    password?: string | null
    google_id?: string | null
    createdAt: Date | string
    name?: string | null
    chats?: chatsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    idusers?: number
    email: string
    password?: string | null
    google_id?: string | null
    createdAt: Date | string
    name?: string | null
    chats?: chatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    chats?: chatsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    idusers?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    chats?: chatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    idusers?: number
    email: string
    password?: string | null
    google_id?: string | null
    createdAt: Date | string
    name?: string | null
  }

  export type usersUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    idusers?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type otpsCreateInput = {
    email: string
    otp: string
    created_at?: Date | string
    password_purpose?: boolean
    otphistory?: otphistoryCreateNestedManyWithoutOtpsInput
  }

  export type otpsUncheckedCreateInput = {
    id?: number
    email: string
    otp: string
    created_at?: Date | string
    password_purpose?: boolean
    otphistory?: otphistoryUncheckedCreateNestedManyWithoutOtpsInput
  }

  export type otpsUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
    otphistory?: otphistoryUpdateManyWithoutOtpsNestedInput
  }

  export type otpsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
    otphistory?: otphistoryUncheckedUpdateManyWithoutOtpsNestedInput
  }

  export type otpsCreateManyInput = {
    id?: number
    email: string
    otp: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otpsUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otpsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otphistoryCreateInput = {
    email: string
    created_at?: Date | string
    password_purpose?: boolean
    otps?: otpsCreateNestedOneWithoutOtphistoryInput
  }

  export type otphistoryUncheckedCreateInput = {
    id?: number
    otp_id?: number | null
    email: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otphistoryUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
    otps?: otpsUpdateOneWithoutOtphistoryNestedInput
  }

  export type otphistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    otp_id?: NullableIntFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otphistoryCreateManyInput = {
    id?: number
    otp_id?: number | null
    email: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otphistoryUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otphistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    otp_id?: NullableIntFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otptriesCreateInput = {
    email: string
    created_at: Date | string
    password_purpose?: boolean
  }

  export type otptriesUncheckedCreateInput = {
    id_otptries?: number
    email: string
    created_at: Date | string
    password_purpose?: boolean
  }

  export type otptriesUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otptriesUncheckedUpdateInput = {
    id_otptries?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otptriesCreateManyInput = {
    id_otptries?: number
    email: string
    created_at: Date | string
    password_purpose?: boolean
  }

  export type otptriesUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otptriesUncheckedUpdateManyInput = {
    id_otptries?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type philosophersCreateInput = {
    name: string
    image_url: string
    description: string
    style_prompt?: string | null
    chats?: chatsCreateNestedManyWithoutPhilosopherInput
  }

  export type philosophersUncheckedCreateInput = {
    id?: number
    name: string
    image_url: string
    description: string
    style_prompt?: string | null
    chats?: chatsUncheckedCreateNestedManyWithoutPhilosopherInput
  }

  export type philosophersUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    style_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    chats?: chatsUpdateManyWithoutPhilosopherNestedInput
  }

  export type philosophersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    style_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    chats?: chatsUncheckedUpdateManyWithoutPhilosopherNestedInput
  }

  export type philosophersCreateManyInput = {
    id?: number
    name: string
    image_url: string
    description: string
    style_prompt?: string | null
  }

  export type philosophersUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    style_prompt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type philosophersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    style_prompt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type chatsCreateInput = {
    created_at?: Date | string
    messages?: chatmessagesCreateNestedManyWithoutChatInput
    philosopher: philosophersCreateNestedOneWithoutChatsInput
    user: usersCreateNestedOneWithoutChatsInput
  }

  export type chatsUncheckedCreateInput = {
    id?: number
    user_id: number
    philosopher_id: number
    created_at?: Date | string
    messages?: chatmessagesUncheckedCreateNestedManyWithoutChatInput
  }

  export type chatsUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: chatmessagesUpdateManyWithoutChatNestedInput
    philosopher?: philosophersUpdateOneRequiredWithoutChatsNestedInput
    user?: usersUpdateOneRequiredWithoutChatsNestedInput
  }

  export type chatsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    philosopher_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: chatmessagesUncheckedUpdateManyWithoutChatNestedInput
  }

  export type chatsCreateManyInput = {
    id?: number
    user_id: number
    philosopher_id: number
    created_at?: Date | string
  }

  export type chatsUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    philosopher_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatmessagesCreateInput = {
    role: string
    content: string
    created_at?: Date | string
    chat: chatsCreateNestedOneWithoutMessagesInput
  }

  export type chatmessagesUncheckedCreateInput = {
    id?: number
    chat_id: number
    role: string
    content: string
    created_at?: Date | string
  }

  export type chatmessagesUpdateInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: chatsUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type chatmessagesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    chat_id?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatmessagesCreateManyInput = {
    id?: number
    chat_id: number
    role: string
    content: string
    created_at?: Date | string
  }

  export type chatmessagesUpdateManyMutationInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatmessagesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    chat_id?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChatsListRelationFilter = {
    every?: chatsWhereInput
    some?: chatsWhereInput
    none?: chatsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type chatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    idusers?: SortOrder
    email?: SortOrder
    password?: SortOrder
    google_id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    idusers?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    idusers?: SortOrder
    email?: SortOrder
    password?: SortOrder
    google_id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    idusers?: SortOrder
    email?: SortOrder
    password?: SortOrder
    google_id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    idusers?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OtphistoryListRelationFilter = {
    every?: otphistoryWhereInput
    some?: otphistoryWhereInput
    none?: otphistoryWhereInput
  }

  export type otphistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type otpsOrderByRelevanceInput = {
    fields: otpsOrderByRelevanceFieldEnum | otpsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type otpsCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otpsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type otpsMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otpsMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otpsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type OtpsNullableScalarRelationFilter = {
    is?: otpsWhereInput | null
    isNot?: otpsWhereInput | null
  }

  export type otphistoryOrderByRelevanceInput = {
    fields: otphistoryOrderByRelevanceFieldEnum | otphistoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type otphistoryCountOrderByAggregateInput = {
    id?: SortOrder
    otp_id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otphistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    otp_id?: SortOrder
  }

  export type otphistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    otp_id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otphistoryMinOrderByAggregateInput = {
    id?: SortOrder
    otp_id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otphistorySumOrderByAggregateInput = {
    id?: SortOrder
    otp_id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type otptriesOrderByRelevanceInput = {
    fields: otptriesOrderByRelevanceFieldEnum | otptriesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type otptriesCountOrderByAggregateInput = {
    id_otptries?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otptriesAvgOrderByAggregateInput = {
    id_otptries?: SortOrder
  }

  export type otptriesMaxOrderByAggregateInput = {
    id_otptries?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otptriesMinOrderByAggregateInput = {
    id_otptries?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    password_purpose?: SortOrder
  }

  export type otptriesSumOrderByAggregateInput = {
    id_otptries?: SortOrder
  }

  export type philosophersOrderByRelevanceInput = {
    fields: philosophersOrderByRelevanceFieldEnum | philosophersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type philosophersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    style_prompt?: SortOrder
  }

  export type philosophersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type philosophersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    style_prompt?: SortOrder
  }

  export type philosophersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    style_prompt?: SortOrder
  }

  export type philosophersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChatmessagesListRelationFilter = {
    every?: chatmessagesWhereInput
    some?: chatmessagesWhereInput
    none?: chatmessagesWhereInput
  }

  export type PhilosophersScalarRelationFilter = {
    is?: philosophersWhereInput
    isNot?: philosophersWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type chatmessagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type chatsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    philosopher_id?: SortOrder
    created_at?: SortOrder
  }

  export type chatsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    philosopher_id?: SortOrder
  }

  export type chatsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    philosopher_id?: SortOrder
    created_at?: SortOrder
  }

  export type chatsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    philosopher_id?: SortOrder
    created_at?: SortOrder
  }

  export type chatsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    philosopher_id?: SortOrder
  }

  export type ChatsScalarRelationFilter = {
    is?: chatsWhereInput
    isNot?: chatsWhereInput
  }

  export type chatmessagesOrderByRelevanceInput = {
    fields: chatmessagesOrderByRelevanceFieldEnum | chatmessagesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type chatmessagesCountOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chatmessagesAvgOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
  }

  export type chatmessagesMaxOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chatmessagesMinOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chatmessagesSumOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
  }

  export type chatsCreateNestedManyWithoutUserInput = {
    create?: XOR<chatsCreateWithoutUserInput, chatsUncheckedCreateWithoutUserInput> | chatsCreateWithoutUserInput[] | chatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutUserInput | chatsCreateOrConnectWithoutUserInput[]
    createMany?: chatsCreateManyUserInputEnvelope
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
  }

  export type chatsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<chatsCreateWithoutUserInput, chatsUncheckedCreateWithoutUserInput> | chatsCreateWithoutUserInput[] | chatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutUserInput | chatsCreateOrConnectWithoutUserInput[]
    createMany?: chatsCreateManyUserInputEnvelope
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type chatsUpdateManyWithoutUserNestedInput = {
    create?: XOR<chatsCreateWithoutUserInput, chatsUncheckedCreateWithoutUserInput> | chatsCreateWithoutUserInput[] | chatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutUserInput | chatsCreateOrConnectWithoutUserInput[]
    upsert?: chatsUpsertWithWhereUniqueWithoutUserInput | chatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: chatsCreateManyUserInputEnvelope
    set?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    disconnect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    delete?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    update?: chatsUpdateWithWhereUniqueWithoutUserInput | chatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: chatsUpdateManyWithWhereWithoutUserInput | chatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: chatsScalarWhereInput | chatsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type chatsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<chatsCreateWithoutUserInput, chatsUncheckedCreateWithoutUserInput> | chatsCreateWithoutUserInput[] | chatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutUserInput | chatsCreateOrConnectWithoutUserInput[]
    upsert?: chatsUpsertWithWhereUniqueWithoutUserInput | chatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: chatsCreateManyUserInputEnvelope
    set?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    disconnect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    delete?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    update?: chatsUpdateWithWhereUniqueWithoutUserInput | chatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: chatsUpdateManyWithWhereWithoutUserInput | chatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: chatsScalarWhereInput | chatsScalarWhereInput[]
  }

  export type otphistoryCreateNestedManyWithoutOtpsInput = {
    create?: XOR<otphistoryCreateWithoutOtpsInput, otphistoryUncheckedCreateWithoutOtpsInput> | otphistoryCreateWithoutOtpsInput[] | otphistoryUncheckedCreateWithoutOtpsInput[]
    connectOrCreate?: otphistoryCreateOrConnectWithoutOtpsInput | otphistoryCreateOrConnectWithoutOtpsInput[]
    createMany?: otphistoryCreateManyOtpsInputEnvelope
    connect?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
  }

  export type otphistoryUncheckedCreateNestedManyWithoutOtpsInput = {
    create?: XOR<otphistoryCreateWithoutOtpsInput, otphistoryUncheckedCreateWithoutOtpsInput> | otphistoryCreateWithoutOtpsInput[] | otphistoryUncheckedCreateWithoutOtpsInput[]
    connectOrCreate?: otphistoryCreateOrConnectWithoutOtpsInput | otphistoryCreateOrConnectWithoutOtpsInput[]
    createMany?: otphistoryCreateManyOtpsInputEnvelope
    connect?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type otphistoryUpdateManyWithoutOtpsNestedInput = {
    create?: XOR<otphistoryCreateWithoutOtpsInput, otphistoryUncheckedCreateWithoutOtpsInput> | otphistoryCreateWithoutOtpsInput[] | otphistoryUncheckedCreateWithoutOtpsInput[]
    connectOrCreate?: otphistoryCreateOrConnectWithoutOtpsInput | otphistoryCreateOrConnectWithoutOtpsInput[]
    upsert?: otphistoryUpsertWithWhereUniqueWithoutOtpsInput | otphistoryUpsertWithWhereUniqueWithoutOtpsInput[]
    createMany?: otphistoryCreateManyOtpsInputEnvelope
    set?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    disconnect?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    delete?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    connect?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    update?: otphistoryUpdateWithWhereUniqueWithoutOtpsInput | otphistoryUpdateWithWhereUniqueWithoutOtpsInput[]
    updateMany?: otphistoryUpdateManyWithWhereWithoutOtpsInput | otphistoryUpdateManyWithWhereWithoutOtpsInput[]
    deleteMany?: otphistoryScalarWhereInput | otphistoryScalarWhereInput[]
  }

  export type otphistoryUncheckedUpdateManyWithoutOtpsNestedInput = {
    create?: XOR<otphistoryCreateWithoutOtpsInput, otphistoryUncheckedCreateWithoutOtpsInput> | otphistoryCreateWithoutOtpsInput[] | otphistoryUncheckedCreateWithoutOtpsInput[]
    connectOrCreate?: otphistoryCreateOrConnectWithoutOtpsInput | otphistoryCreateOrConnectWithoutOtpsInput[]
    upsert?: otphistoryUpsertWithWhereUniqueWithoutOtpsInput | otphistoryUpsertWithWhereUniqueWithoutOtpsInput[]
    createMany?: otphistoryCreateManyOtpsInputEnvelope
    set?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    disconnect?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    delete?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    connect?: otphistoryWhereUniqueInput | otphistoryWhereUniqueInput[]
    update?: otphistoryUpdateWithWhereUniqueWithoutOtpsInput | otphistoryUpdateWithWhereUniqueWithoutOtpsInput[]
    updateMany?: otphistoryUpdateManyWithWhereWithoutOtpsInput | otphistoryUpdateManyWithWhereWithoutOtpsInput[]
    deleteMany?: otphistoryScalarWhereInput | otphistoryScalarWhereInput[]
  }

  export type otpsCreateNestedOneWithoutOtphistoryInput = {
    create?: XOR<otpsCreateWithoutOtphistoryInput, otpsUncheckedCreateWithoutOtphistoryInput>
    connectOrCreate?: otpsCreateOrConnectWithoutOtphistoryInput
    connect?: otpsWhereUniqueInput
  }

  export type otpsUpdateOneWithoutOtphistoryNestedInput = {
    create?: XOR<otpsCreateWithoutOtphistoryInput, otpsUncheckedCreateWithoutOtphistoryInput>
    connectOrCreate?: otpsCreateOrConnectWithoutOtphistoryInput
    upsert?: otpsUpsertWithoutOtphistoryInput
    disconnect?: otpsWhereInput | boolean
    delete?: otpsWhereInput | boolean
    connect?: otpsWhereUniqueInput
    update?: XOR<XOR<otpsUpdateToOneWithWhereWithoutOtphistoryInput, otpsUpdateWithoutOtphistoryInput>, otpsUncheckedUpdateWithoutOtphistoryInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type chatsCreateNestedManyWithoutPhilosopherInput = {
    create?: XOR<chatsCreateWithoutPhilosopherInput, chatsUncheckedCreateWithoutPhilosopherInput> | chatsCreateWithoutPhilosopherInput[] | chatsUncheckedCreateWithoutPhilosopherInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutPhilosopherInput | chatsCreateOrConnectWithoutPhilosopherInput[]
    createMany?: chatsCreateManyPhilosopherInputEnvelope
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
  }

  export type chatsUncheckedCreateNestedManyWithoutPhilosopherInput = {
    create?: XOR<chatsCreateWithoutPhilosopherInput, chatsUncheckedCreateWithoutPhilosopherInput> | chatsCreateWithoutPhilosopherInput[] | chatsUncheckedCreateWithoutPhilosopherInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutPhilosopherInput | chatsCreateOrConnectWithoutPhilosopherInput[]
    createMany?: chatsCreateManyPhilosopherInputEnvelope
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
  }

  export type chatsUpdateManyWithoutPhilosopherNestedInput = {
    create?: XOR<chatsCreateWithoutPhilosopherInput, chatsUncheckedCreateWithoutPhilosopherInput> | chatsCreateWithoutPhilosopherInput[] | chatsUncheckedCreateWithoutPhilosopherInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutPhilosopherInput | chatsCreateOrConnectWithoutPhilosopherInput[]
    upsert?: chatsUpsertWithWhereUniqueWithoutPhilosopherInput | chatsUpsertWithWhereUniqueWithoutPhilosopherInput[]
    createMany?: chatsCreateManyPhilosopherInputEnvelope
    set?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    disconnect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    delete?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    update?: chatsUpdateWithWhereUniqueWithoutPhilosopherInput | chatsUpdateWithWhereUniqueWithoutPhilosopherInput[]
    updateMany?: chatsUpdateManyWithWhereWithoutPhilosopherInput | chatsUpdateManyWithWhereWithoutPhilosopherInput[]
    deleteMany?: chatsScalarWhereInput | chatsScalarWhereInput[]
  }

  export type chatsUncheckedUpdateManyWithoutPhilosopherNestedInput = {
    create?: XOR<chatsCreateWithoutPhilosopherInput, chatsUncheckedCreateWithoutPhilosopherInput> | chatsCreateWithoutPhilosopherInput[] | chatsUncheckedCreateWithoutPhilosopherInput[]
    connectOrCreate?: chatsCreateOrConnectWithoutPhilosopherInput | chatsCreateOrConnectWithoutPhilosopherInput[]
    upsert?: chatsUpsertWithWhereUniqueWithoutPhilosopherInput | chatsUpsertWithWhereUniqueWithoutPhilosopherInput[]
    createMany?: chatsCreateManyPhilosopherInputEnvelope
    set?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    disconnect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    delete?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    connect?: chatsWhereUniqueInput | chatsWhereUniqueInput[]
    update?: chatsUpdateWithWhereUniqueWithoutPhilosopherInput | chatsUpdateWithWhereUniqueWithoutPhilosopherInput[]
    updateMany?: chatsUpdateManyWithWhereWithoutPhilosopherInput | chatsUpdateManyWithWhereWithoutPhilosopherInput[]
    deleteMany?: chatsScalarWhereInput | chatsScalarWhereInput[]
  }

  export type chatmessagesCreateNestedManyWithoutChatInput = {
    create?: XOR<chatmessagesCreateWithoutChatInput, chatmessagesUncheckedCreateWithoutChatInput> | chatmessagesCreateWithoutChatInput[] | chatmessagesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: chatmessagesCreateOrConnectWithoutChatInput | chatmessagesCreateOrConnectWithoutChatInput[]
    createMany?: chatmessagesCreateManyChatInputEnvelope
    connect?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
  }

  export type philosophersCreateNestedOneWithoutChatsInput = {
    create?: XOR<philosophersCreateWithoutChatsInput, philosophersUncheckedCreateWithoutChatsInput>
    connectOrCreate?: philosophersCreateOrConnectWithoutChatsInput
    connect?: philosophersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutChatsInput = {
    create?: XOR<usersCreateWithoutChatsInput, usersUncheckedCreateWithoutChatsInput>
    connectOrCreate?: usersCreateOrConnectWithoutChatsInput
    connect?: usersWhereUniqueInput
  }

  export type chatmessagesUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<chatmessagesCreateWithoutChatInput, chatmessagesUncheckedCreateWithoutChatInput> | chatmessagesCreateWithoutChatInput[] | chatmessagesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: chatmessagesCreateOrConnectWithoutChatInput | chatmessagesCreateOrConnectWithoutChatInput[]
    createMany?: chatmessagesCreateManyChatInputEnvelope
    connect?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
  }

  export type chatmessagesUpdateManyWithoutChatNestedInput = {
    create?: XOR<chatmessagesCreateWithoutChatInput, chatmessagesUncheckedCreateWithoutChatInput> | chatmessagesCreateWithoutChatInput[] | chatmessagesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: chatmessagesCreateOrConnectWithoutChatInput | chatmessagesCreateOrConnectWithoutChatInput[]
    upsert?: chatmessagesUpsertWithWhereUniqueWithoutChatInput | chatmessagesUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: chatmessagesCreateManyChatInputEnvelope
    set?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    disconnect?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    delete?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    connect?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    update?: chatmessagesUpdateWithWhereUniqueWithoutChatInput | chatmessagesUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: chatmessagesUpdateManyWithWhereWithoutChatInput | chatmessagesUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: chatmessagesScalarWhereInput | chatmessagesScalarWhereInput[]
  }

  export type philosophersUpdateOneRequiredWithoutChatsNestedInput = {
    create?: XOR<philosophersCreateWithoutChatsInput, philosophersUncheckedCreateWithoutChatsInput>
    connectOrCreate?: philosophersCreateOrConnectWithoutChatsInput
    upsert?: philosophersUpsertWithoutChatsInput
    connect?: philosophersWhereUniqueInput
    update?: XOR<XOR<philosophersUpdateToOneWithWhereWithoutChatsInput, philosophersUpdateWithoutChatsInput>, philosophersUncheckedUpdateWithoutChatsInput>
  }

  export type usersUpdateOneRequiredWithoutChatsNestedInput = {
    create?: XOR<usersCreateWithoutChatsInput, usersUncheckedCreateWithoutChatsInput>
    connectOrCreate?: usersCreateOrConnectWithoutChatsInput
    upsert?: usersUpsertWithoutChatsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutChatsInput, usersUpdateWithoutChatsInput>, usersUncheckedUpdateWithoutChatsInput>
  }

  export type chatmessagesUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<chatmessagesCreateWithoutChatInput, chatmessagesUncheckedCreateWithoutChatInput> | chatmessagesCreateWithoutChatInput[] | chatmessagesUncheckedCreateWithoutChatInput[]
    connectOrCreate?: chatmessagesCreateOrConnectWithoutChatInput | chatmessagesCreateOrConnectWithoutChatInput[]
    upsert?: chatmessagesUpsertWithWhereUniqueWithoutChatInput | chatmessagesUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: chatmessagesCreateManyChatInputEnvelope
    set?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    disconnect?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    delete?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    connect?: chatmessagesWhereUniqueInput | chatmessagesWhereUniqueInput[]
    update?: chatmessagesUpdateWithWhereUniqueWithoutChatInput | chatmessagesUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: chatmessagesUpdateManyWithWhereWithoutChatInput | chatmessagesUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: chatmessagesScalarWhereInput | chatmessagesScalarWhereInput[]
  }

  export type chatsCreateNestedOneWithoutMessagesInput = {
    create?: XOR<chatsCreateWithoutMessagesInput, chatsUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: chatsCreateOrConnectWithoutMessagesInput
    connect?: chatsWhereUniqueInput
  }

  export type chatsUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<chatsCreateWithoutMessagesInput, chatsUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: chatsCreateOrConnectWithoutMessagesInput
    upsert?: chatsUpsertWithoutMessagesInput
    connect?: chatsWhereUniqueInput
    update?: XOR<XOR<chatsUpdateToOneWithWhereWithoutMessagesInput, chatsUpdateWithoutMessagesInput>, chatsUncheckedUpdateWithoutMessagesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type chatsCreateWithoutUserInput = {
    created_at?: Date | string
    messages?: chatmessagesCreateNestedManyWithoutChatInput
    philosopher: philosophersCreateNestedOneWithoutChatsInput
  }

  export type chatsUncheckedCreateWithoutUserInput = {
    id?: number
    philosopher_id: number
    created_at?: Date | string
    messages?: chatmessagesUncheckedCreateNestedManyWithoutChatInput
  }

  export type chatsCreateOrConnectWithoutUserInput = {
    where: chatsWhereUniqueInput
    create: XOR<chatsCreateWithoutUserInput, chatsUncheckedCreateWithoutUserInput>
  }

  export type chatsCreateManyUserInputEnvelope = {
    data: chatsCreateManyUserInput | chatsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type chatsUpsertWithWhereUniqueWithoutUserInput = {
    where: chatsWhereUniqueInput
    update: XOR<chatsUpdateWithoutUserInput, chatsUncheckedUpdateWithoutUserInput>
    create: XOR<chatsCreateWithoutUserInput, chatsUncheckedCreateWithoutUserInput>
  }

  export type chatsUpdateWithWhereUniqueWithoutUserInput = {
    where: chatsWhereUniqueInput
    data: XOR<chatsUpdateWithoutUserInput, chatsUncheckedUpdateWithoutUserInput>
  }

  export type chatsUpdateManyWithWhereWithoutUserInput = {
    where: chatsScalarWhereInput
    data: XOR<chatsUpdateManyMutationInput, chatsUncheckedUpdateManyWithoutUserInput>
  }

  export type chatsScalarWhereInput = {
    AND?: chatsScalarWhereInput | chatsScalarWhereInput[]
    OR?: chatsScalarWhereInput[]
    NOT?: chatsScalarWhereInput | chatsScalarWhereInput[]
    id?: IntFilter<"chats"> | number
    user_id?: IntFilter<"chats"> | number
    philosopher_id?: IntFilter<"chats"> | number
    created_at?: DateTimeFilter<"chats"> | Date | string
  }

  export type otphistoryCreateWithoutOtpsInput = {
    email: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otphistoryUncheckedCreateWithoutOtpsInput = {
    id?: number
    email: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otphistoryCreateOrConnectWithoutOtpsInput = {
    where: otphistoryWhereUniqueInput
    create: XOR<otphistoryCreateWithoutOtpsInput, otphistoryUncheckedCreateWithoutOtpsInput>
  }

  export type otphistoryCreateManyOtpsInputEnvelope = {
    data: otphistoryCreateManyOtpsInput | otphistoryCreateManyOtpsInput[]
    skipDuplicates?: boolean
  }

  export type otphistoryUpsertWithWhereUniqueWithoutOtpsInput = {
    where: otphistoryWhereUniqueInput
    update: XOR<otphistoryUpdateWithoutOtpsInput, otphistoryUncheckedUpdateWithoutOtpsInput>
    create: XOR<otphistoryCreateWithoutOtpsInput, otphistoryUncheckedCreateWithoutOtpsInput>
  }

  export type otphistoryUpdateWithWhereUniqueWithoutOtpsInput = {
    where: otphistoryWhereUniqueInput
    data: XOR<otphistoryUpdateWithoutOtpsInput, otphistoryUncheckedUpdateWithoutOtpsInput>
  }

  export type otphistoryUpdateManyWithWhereWithoutOtpsInput = {
    where: otphistoryScalarWhereInput
    data: XOR<otphistoryUpdateManyMutationInput, otphistoryUncheckedUpdateManyWithoutOtpsInput>
  }

  export type otphistoryScalarWhereInput = {
    AND?: otphistoryScalarWhereInput | otphistoryScalarWhereInput[]
    OR?: otphistoryScalarWhereInput[]
    NOT?: otphistoryScalarWhereInput | otphistoryScalarWhereInput[]
    id?: IntFilter<"otphistory"> | number
    otp_id?: IntNullableFilter<"otphistory"> | number | null
    email?: StringFilter<"otphistory"> | string
    created_at?: DateTimeFilter<"otphistory"> | Date | string
    password_purpose?: BoolFilter<"otphistory"> | boolean
  }

  export type otpsCreateWithoutOtphistoryInput = {
    email: string
    otp: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otpsUncheckedCreateWithoutOtphistoryInput = {
    id?: number
    email: string
    otp: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otpsCreateOrConnectWithoutOtphistoryInput = {
    where: otpsWhereUniqueInput
    create: XOR<otpsCreateWithoutOtphistoryInput, otpsUncheckedCreateWithoutOtphistoryInput>
  }

  export type otpsUpsertWithoutOtphistoryInput = {
    update: XOR<otpsUpdateWithoutOtphistoryInput, otpsUncheckedUpdateWithoutOtphistoryInput>
    create: XOR<otpsCreateWithoutOtphistoryInput, otpsUncheckedCreateWithoutOtphistoryInput>
    where?: otpsWhereInput
  }

  export type otpsUpdateToOneWithWhereWithoutOtphistoryInput = {
    where?: otpsWhereInput
    data: XOR<otpsUpdateWithoutOtphistoryInput, otpsUncheckedUpdateWithoutOtphistoryInput>
  }

  export type otpsUpdateWithoutOtphistoryInput = {
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otpsUncheckedUpdateWithoutOtphistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type chatsCreateWithoutPhilosopherInput = {
    created_at?: Date | string
    messages?: chatmessagesCreateNestedManyWithoutChatInput
    user: usersCreateNestedOneWithoutChatsInput
  }

  export type chatsUncheckedCreateWithoutPhilosopherInput = {
    id?: number
    user_id: number
    created_at?: Date | string
    messages?: chatmessagesUncheckedCreateNestedManyWithoutChatInput
  }

  export type chatsCreateOrConnectWithoutPhilosopherInput = {
    where: chatsWhereUniqueInput
    create: XOR<chatsCreateWithoutPhilosopherInput, chatsUncheckedCreateWithoutPhilosopherInput>
  }

  export type chatsCreateManyPhilosopherInputEnvelope = {
    data: chatsCreateManyPhilosopherInput | chatsCreateManyPhilosopherInput[]
    skipDuplicates?: boolean
  }

  export type chatsUpsertWithWhereUniqueWithoutPhilosopherInput = {
    where: chatsWhereUniqueInput
    update: XOR<chatsUpdateWithoutPhilosopherInput, chatsUncheckedUpdateWithoutPhilosopherInput>
    create: XOR<chatsCreateWithoutPhilosopherInput, chatsUncheckedCreateWithoutPhilosopherInput>
  }

  export type chatsUpdateWithWhereUniqueWithoutPhilosopherInput = {
    where: chatsWhereUniqueInput
    data: XOR<chatsUpdateWithoutPhilosopherInput, chatsUncheckedUpdateWithoutPhilosopherInput>
  }

  export type chatsUpdateManyWithWhereWithoutPhilosopherInput = {
    where: chatsScalarWhereInput
    data: XOR<chatsUpdateManyMutationInput, chatsUncheckedUpdateManyWithoutPhilosopherInput>
  }

  export type chatmessagesCreateWithoutChatInput = {
    role: string
    content: string
    created_at?: Date | string
  }

  export type chatmessagesUncheckedCreateWithoutChatInput = {
    id?: number
    role: string
    content: string
    created_at?: Date | string
  }

  export type chatmessagesCreateOrConnectWithoutChatInput = {
    where: chatmessagesWhereUniqueInput
    create: XOR<chatmessagesCreateWithoutChatInput, chatmessagesUncheckedCreateWithoutChatInput>
  }

  export type chatmessagesCreateManyChatInputEnvelope = {
    data: chatmessagesCreateManyChatInput | chatmessagesCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type philosophersCreateWithoutChatsInput = {
    name: string
    image_url: string
    description: string
    style_prompt?: string | null
  }

  export type philosophersUncheckedCreateWithoutChatsInput = {
    id?: number
    name: string
    image_url: string
    description: string
    style_prompt?: string | null
  }

  export type philosophersCreateOrConnectWithoutChatsInput = {
    where: philosophersWhereUniqueInput
    create: XOR<philosophersCreateWithoutChatsInput, philosophersUncheckedCreateWithoutChatsInput>
  }

  export type usersCreateWithoutChatsInput = {
    email: string
    password?: string | null
    google_id?: string | null
    createdAt: Date | string
    name?: string | null
  }

  export type usersUncheckedCreateWithoutChatsInput = {
    idusers?: number
    email: string
    password?: string | null
    google_id?: string | null
    createdAt: Date | string
    name?: string | null
  }

  export type usersCreateOrConnectWithoutChatsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutChatsInput, usersUncheckedCreateWithoutChatsInput>
  }

  export type chatmessagesUpsertWithWhereUniqueWithoutChatInput = {
    where: chatmessagesWhereUniqueInput
    update: XOR<chatmessagesUpdateWithoutChatInput, chatmessagesUncheckedUpdateWithoutChatInput>
    create: XOR<chatmessagesCreateWithoutChatInput, chatmessagesUncheckedCreateWithoutChatInput>
  }

  export type chatmessagesUpdateWithWhereUniqueWithoutChatInput = {
    where: chatmessagesWhereUniqueInput
    data: XOR<chatmessagesUpdateWithoutChatInput, chatmessagesUncheckedUpdateWithoutChatInput>
  }

  export type chatmessagesUpdateManyWithWhereWithoutChatInput = {
    where: chatmessagesScalarWhereInput
    data: XOR<chatmessagesUpdateManyMutationInput, chatmessagesUncheckedUpdateManyWithoutChatInput>
  }

  export type chatmessagesScalarWhereInput = {
    AND?: chatmessagesScalarWhereInput | chatmessagesScalarWhereInput[]
    OR?: chatmessagesScalarWhereInput[]
    NOT?: chatmessagesScalarWhereInput | chatmessagesScalarWhereInput[]
    id?: IntFilter<"chatmessages"> | number
    chat_id?: IntFilter<"chatmessages"> | number
    role?: StringFilter<"chatmessages"> | string
    content?: StringFilter<"chatmessages"> | string
    created_at?: DateTimeFilter<"chatmessages"> | Date | string
  }

  export type philosophersUpsertWithoutChatsInput = {
    update: XOR<philosophersUpdateWithoutChatsInput, philosophersUncheckedUpdateWithoutChatsInput>
    create: XOR<philosophersCreateWithoutChatsInput, philosophersUncheckedCreateWithoutChatsInput>
    where?: philosophersWhereInput
  }

  export type philosophersUpdateToOneWithWhereWithoutChatsInput = {
    where?: philosophersWhereInput
    data: XOR<philosophersUpdateWithoutChatsInput, philosophersUncheckedUpdateWithoutChatsInput>
  }

  export type philosophersUpdateWithoutChatsInput = {
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    style_prompt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type philosophersUncheckedUpdateWithoutChatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    style_prompt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUpsertWithoutChatsInput = {
    update: XOR<usersUpdateWithoutChatsInput, usersUncheckedUpdateWithoutChatsInput>
    create: XOR<usersCreateWithoutChatsInput, usersUncheckedCreateWithoutChatsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutChatsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutChatsInput, usersUncheckedUpdateWithoutChatsInput>
  }

  export type usersUpdateWithoutChatsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateWithoutChatsInput = {
    idusers?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type chatsCreateWithoutMessagesInput = {
    created_at?: Date | string
    philosopher: philosophersCreateNestedOneWithoutChatsInput
    user: usersCreateNestedOneWithoutChatsInput
  }

  export type chatsUncheckedCreateWithoutMessagesInput = {
    id?: number
    user_id: number
    philosopher_id: number
    created_at?: Date | string
  }

  export type chatsCreateOrConnectWithoutMessagesInput = {
    where: chatsWhereUniqueInput
    create: XOR<chatsCreateWithoutMessagesInput, chatsUncheckedCreateWithoutMessagesInput>
  }

  export type chatsUpsertWithoutMessagesInput = {
    update: XOR<chatsUpdateWithoutMessagesInput, chatsUncheckedUpdateWithoutMessagesInput>
    create: XOR<chatsCreateWithoutMessagesInput, chatsUncheckedCreateWithoutMessagesInput>
    where?: chatsWhereInput
  }

  export type chatsUpdateToOneWithWhereWithoutMessagesInput = {
    where?: chatsWhereInput
    data: XOR<chatsUpdateWithoutMessagesInput, chatsUncheckedUpdateWithoutMessagesInput>
  }

  export type chatsUpdateWithoutMessagesInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    philosopher?: philosophersUpdateOneRequiredWithoutChatsNestedInput
    user?: usersUpdateOneRequiredWithoutChatsNestedInput
  }

  export type chatsUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    philosopher_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatsCreateManyUserInput = {
    id?: number
    philosopher_id: number
    created_at?: Date | string
  }

  export type chatsUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: chatmessagesUpdateManyWithoutChatNestedInput
    philosopher?: philosophersUpdateOneRequiredWithoutChatsNestedInput
  }

  export type chatsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    philosopher_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: chatmessagesUncheckedUpdateManyWithoutChatNestedInput
  }

  export type chatsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    philosopher_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type otphistoryCreateManyOtpsInput = {
    id?: number
    email: string
    created_at?: Date | string
    password_purpose?: boolean
  }

  export type otphistoryUpdateWithoutOtpsInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otphistoryUncheckedUpdateWithoutOtpsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type otphistoryUncheckedUpdateManyWithoutOtpsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    password_purpose?: BoolFieldUpdateOperationsInput | boolean
  }

  export type chatsCreateManyPhilosopherInput = {
    id?: number
    user_id: number
    created_at?: Date | string
  }

  export type chatsUpdateWithoutPhilosopherInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: chatmessagesUpdateManyWithoutChatNestedInput
    user?: usersUpdateOneRequiredWithoutChatsNestedInput
  }

  export type chatsUncheckedUpdateWithoutPhilosopherInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: chatmessagesUncheckedUpdateManyWithoutChatNestedInput
  }

  export type chatsUncheckedUpdateManyWithoutPhilosopherInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatmessagesCreateManyChatInput = {
    id?: number
    role: string
    content: string
    created_at?: Date | string
  }

  export type chatmessagesUpdateWithoutChatInput = {
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatmessagesUncheckedUpdateWithoutChatInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatmessagesUncheckedUpdateManyWithoutChatInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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