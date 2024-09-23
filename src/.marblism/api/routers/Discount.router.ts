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

        createMany: procedure.input($Schema.DiscountInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discount.createMany(input as any))),

        create: procedure.input($Schema.DiscountInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discount.create(input as any))),

        deleteMany: procedure.input($Schema.DiscountInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discount.deleteMany(input as any))),

        delete: procedure.input($Schema.DiscountInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discount.delete(input as any))),

        findFirst: procedure.input($Schema.DiscountInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).discount.findFirst(input as any))),

        findMany: procedure.input($Schema.DiscountInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).discount.findMany(input as any))),

        findUnique: procedure.input($Schema.DiscountInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).discount.findUnique(input as any))),

        updateMany: procedure.input($Schema.DiscountInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discount.updateMany(input as any))),

        update: procedure.input($Schema.DiscountInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discount.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DiscountCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscountCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscountCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscountCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DiscountCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscountCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DiscountGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DiscountGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscountCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscountCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DiscountGetPayload<T>, Context>) => Promise<Prisma.DiscountGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DiscountDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscountDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscountDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscountDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DiscountDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscountDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DiscountGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DiscountGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscountDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscountDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DiscountGetPayload<T>, Context>) => Promise<Prisma.DiscountGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DiscountFindFirstArgs, TData = Prisma.DiscountGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DiscountFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DiscountGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DiscountFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DiscountFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DiscountGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DiscountGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DiscountFindManyArgs, TData = Array<Prisma.DiscountGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.DiscountFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DiscountGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DiscountFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DiscountFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DiscountGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DiscountGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DiscountFindUniqueArgs, TData = Prisma.DiscountGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DiscountFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DiscountGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DiscountFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DiscountFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DiscountGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DiscountGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DiscountUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscountUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscountUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscountUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DiscountUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscountUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DiscountGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DiscountGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscountUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscountUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DiscountGetPayload<T>, Context>) => Promise<Prisma.DiscountGetPayload<T>>
            };

    };
}
