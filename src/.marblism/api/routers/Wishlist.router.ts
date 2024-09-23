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

        createMany: procedure.input($Schema.WishlistInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wishlist.createMany(input as any))),

        create: procedure.input($Schema.WishlistInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wishlist.create(input as any))),

        deleteMany: procedure.input($Schema.WishlistInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wishlist.deleteMany(input as any))),

        delete: procedure.input($Schema.WishlistInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wishlist.delete(input as any))),

        findFirst: procedure.input($Schema.WishlistInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).wishlist.findFirst(input as any))),

        findMany: procedure.input($Schema.WishlistInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).wishlist.findMany(input as any))),

        findUnique: procedure.input($Schema.WishlistInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).wishlist.findUnique(input as any))),

        updateMany: procedure.input($Schema.WishlistInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wishlist.updateMany(input as any))),

        update: procedure.input($Schema.WishlistInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).wishlist.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.WishlistCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WishlistCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WishlistCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WishlistCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.WishlistCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WishlistCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WishlistGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WishlistGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WishlistCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WishlistCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WishlistGetPayload<T>, Context>) => Promise<Prisma.WishlistGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.WishlistDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WishlistDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WishlistDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WishlistDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.WishlistDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WishlistDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WishlistGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WishlistGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WishlistDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WishlistDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WishlistGetPayload<T>, Context>) => Promise<Prisma.WishlistGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.WishlistFindFirstArgs, TData = Prisma.WishlistGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WishlistFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WishlistGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WishlistFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WishlistFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WishlistGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WishlistGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.WishlistFindManyArgs, TData = Array<Prisma.WishlistGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.WishlistFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.WishlistGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WishlistFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WishlistFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.WishlistGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.WishlistGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.WishlistFindUniqueArgs, TData = Prisma.WishlistGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WishlistFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WishlistGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WishlistFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WishlistFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WishlistGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WishlistGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.WishlistUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WishlistUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WishlistUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WishlistUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.WishlistUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WishlistUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WishlistGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WishlistGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WishlistUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WishlistUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WishlistGetPayload<T>, Context>) => Promise<Prisma.WishlistGetPayload<T>>
            };

    };
}
