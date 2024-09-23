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

        createMany: procedure.input($Schema.ReviewInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).review.createMany(input as any))),

        create: procedure.input($Schema.ReviewInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).review.create(input as any))),

        deleteMany: procedure.input($Schema.ReviewInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).review.deleteMany(input as any))),

        delete: procedure.input($Schema.ReviewInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).review.delete(input as any))),

        findFirst: procedure.input($Schema.ReviewInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).review.findFirst(input as any))),

        findMany: procedure.input($Schema.ReviewInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).review.findMany(input as any))),

        findUnique: procedure.input($Schema.ReviewInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).review.findUnique(input as any))),

        updateMany: procedure.input($Schema.ReviewInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).review.updateMany(input as any))),

        update: procedure.input($Schema.ReviewInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).review.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ReviewCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ReviewCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReviewGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReviewGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReviewGetPayload<T>, Context>) => Promise<Prisma.ReviewGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ReviewDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ReviewDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReviewGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReviewGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReviewGetPayload<T>, Context>) => Promise<Prisma.ReviewGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ReviewFindFirstArgs, TData = Prisma.ReviewGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ReviewFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ReviewGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReviewFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ReviewFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ReviewGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ReviewGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ReviewFindManyArgs, TData = Array<Prisma.ReviewGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ReviewFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ReviewGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReviewFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ReviewFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ReviewGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ReviewGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ReviewFindUniqueArgs, TData = Prisma.ReviewGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ReviewFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ReviewGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReviewFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ReviewFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ReviewGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ReviewGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ReviewUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ReviewUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReviewGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReviewGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReviewGetPayload<T>, Context>) => Promise<Prisma.ReviewGetPayload<T>>
            };

    };
}
