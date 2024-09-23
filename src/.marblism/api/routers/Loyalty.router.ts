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

        createMany: procedure.input($Schema.LoyaltyInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).loyalty.createMany(input as any))),

        create: procedure.input($Schema.LoyaltyInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).loyalty.create(input as any))),

        deleteMany: procedure.input($Schema.LoyaltyInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).loyalty.deleteMany(input as any))),

        delete: procedure.input($Schema.LoyaltyInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).loyalty.delete(input as any))),

        findFirst: procedure.input($Schema.LoyaltyInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).loyalty.findFirst(input as any))),

        findMany: procedure.input($Schema.LoyaltyInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).loyalty.findMany(input as any))),

        findUnique: procedure.input($Schema.LoyaltyInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).loyalty.findUnique(input as any))),

        updateMany: procedure.input($Schema.LoyaltyInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).loyalty.updateMany(input as any))),

        update: procedure.input($Schema.LoyaltyInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).loyalty.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.LoyaltyCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LoyaltyCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LoyaltyCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LoyaltyCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.LoyaltyCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LoyaltyCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LoyaltyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LoyaltyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LoyaltyCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LoyaltyCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LoyaltyGetPayload<T>, Context>) => Promise<Prisma.LoyaltyGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.LoyaltyDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LoyaltyDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LoyaltyDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LoyaltyDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.LoyaltyDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LoyaltyDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LoyaltyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LoyaltyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LoyaltyDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LoyaltyDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LoyaltyGetPayload<T>, Context>) => Promise<Prisma.LoyaltyGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.LoyaltyFindFirstArgs, TData = Prisma.LoyaltyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.LoyaltyFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LoyaltyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LoyaltyFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LoyaltyFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LoyaltyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LoyaltyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.LoyaltyFindManyArgs, TData = Array<Prisma.LoyaltyGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.LoyaltyFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.LoyaltyGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LoyaltyFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LoyaltyFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.LoyaltyGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.LoyaltyGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.LoyaltyFindUniqueArgs, TData = Prisma.LoyaltyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.LoyaltyFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LoyaltyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LoyaltyFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LoyaltyFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LoyaltyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LoyaltyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.LoyaltyUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LoyaltyUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LoyaltyUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LoyaltyUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.LoyaltyUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LoyaltyUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LoyaltyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LoyaltyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LoyaltyUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LoyaltyUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LoyaltyGetPayload<T>, Context>) => Promise<Prisma.LoyaltyGetPayload<T>>
            };

    };
}
