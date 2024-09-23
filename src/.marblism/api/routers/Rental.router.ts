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

        createMany: procedure.input($Schema.RentalInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rental.createMany(input as any))),

        create: procedure.input($Schema.RentalInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rental.create(input as any))),

        deleteMany: procedure.input($Schema.RentalInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rental.deleteMany(input as any))),

        delete: procedure.input($Schema.RentalInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rental.delete(input as any))),

        findFirst: procedure.input($Schema.RentalInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).rental.findFirst(input as any))),

        findMany: procedure.input($Schema.RentalInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).rental.findMany(input as any))),

        findUnique: procedure.input($Schema.RentalInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).rental.findUnique(input as any))),

        updateMany: procedure.input($Schema.RentalInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rental.updateMany(input as any))),

        update: procedure.input($Schema.RentalInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rental.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.RentalCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RentalCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RentalCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RentalCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.RentalCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RentalCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RentalGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RentalGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RentalCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RentalCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RentalGetPayload<T>, Context>) => Promise<Prisma.RentalGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.RentalDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RentalDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RentalDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RentalDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.RentalDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RentalDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RentalGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RentalGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RentalDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RentalDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RentalGetPayload<T>, Context>) => Promise<Prisma.RentalGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.RentalFindFirstArgs, TData = Prisma.RentalGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RentalFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RentalGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RentalFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RentalFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RentalGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RentalGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.RentalFindManyArgs, TData = Array<Prisma.RentalGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.RentalFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.RentalGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RentalFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RentalFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.RentalGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.RentalGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.RentalFindUniqueArgs, TData = Prisma.RentalGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RentalFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RentalGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RentalFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RentalFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RentalGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RentalGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.RentalUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RentalUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RentalUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RentalUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.RentalUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RentalUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RentalGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RentalGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RentalUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RentalUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RentalGetPayload<T>, Context>) => Promise<Prisma.RentalGetPayload<T>>
            };

    };
}
