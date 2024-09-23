/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.ShopInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).shop.createMany(input as any))),

        create: procedure.input($Schema.ShopInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).shop.create(input as any))),

        deleteMany: procedure.input($Schema.ShopInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).shop.deleteMany(input as any))),

        delete: procedure.input($Schema.ShopInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).shop.delete(input as any))),

        findFirst: procedure.input($Schema.ShopInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).shop.findFirst(input as any))),

        findMany: procedure.input($Schema.ShopInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).shop.findMany(input as any))),

        findUnique: procedure.input($Schema.ShopInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).shop.findUnique(input as any))),

        updateMany: procedure.input($Schema.ShopInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).shop.updateMany(input as any))),

        update: procedure.input($Schema.ShopInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).shop.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ShopCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ShopCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ShopCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ShopCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ShopCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ShopCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ShopGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ShopGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ShopCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ShopCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ShopGetPayload<T>, Context>) => Promise<Prisma.ShopGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ShopDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ShopDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ShopDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ShopDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ShopDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ShopDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ShopGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ShopGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ShopDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ShopDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ShopGetPayload<T>, Context>) => Promise<Prisma.ShopGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ShopFindFirstArgs, TData = Prisma.ShopGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ShopFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ShopGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ShopFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ShopFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ShopGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ShopGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ShopFindManyArgs, TData = Array<Prisma.ShopGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ShopFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ShopGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ShopFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ShopFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ShopGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ShopGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ShopFindUniqueArgs, TData = Prisma.ShopGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ShopFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ShopGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ShopFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ShopFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ShopGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ShopGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ShopUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ShopUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ShopUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ShopUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ShopUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ShopUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ShopGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ShopGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ShopUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ShopUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ShopGetPayload<T>, Context>) => Promise<Prisma.ShopGetPayload<T>>
            };

    };
}
