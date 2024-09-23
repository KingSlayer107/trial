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

        createMany: procedure.input($Schema.AdInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ad.createMany(input as any))),

        create: procedure.input($Schema.AdInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ad.create(input as any))),

        deleteMany: procedure.input($Schema.AdInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ad.deleteMany(input as any))),

        delete: procedure.input($Schema.AdInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ad.delete(input as any))),

        findFirst: procedure.input($Schema.AdInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).ad.findFirst(input as any))),

        findMany: procedure.input($Schema.AdInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).ad.findMany(input as any))),

        findUnique: procedure.input($Schema.AdInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).ad.findUnique(input as any))),

        updateMany: procedure.input($Schema.AdInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ad.updateMany(input as any))),

        update: procedure.input($Schema.AdInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ad.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AdCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AdCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AdCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AdCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AdCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AdCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AdGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AdGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AdCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AdCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AdGetPayload<T>, Context>) => Promise<Prisma.AdGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AdDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AdDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AdDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AdDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AdDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AdDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AdGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AdGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AdDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AdDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AdGetPayload<T>, Context>) => Promise<Prisma.AdGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AdFindFirstArgs, TData = Prisma.AdGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AdFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AdGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AdFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AdFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AdGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AdGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AdFindManyArgs, TData = Array<Prisma.AdGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.AdFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AdGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AdFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AdFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AdGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AdGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AdFindUniqueArgs, TData = Prisma.AdGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AdFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AdGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AdFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AdFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AdGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AdGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AdUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AdUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AdUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AdUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AdUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AdUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AdGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AdGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AdUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AdUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AdGetPayload<T>, Context>) => Promise<Prisma.AdGetPayload<T>>
            };

    };
}
