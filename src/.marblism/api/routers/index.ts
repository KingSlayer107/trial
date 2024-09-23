/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createShopRouter from "./Shop.router";
import createProductRouter from "./Product.router";
import createRentalRouter from "./Rental.router";
import createReviewRouter from "./Review.router";
import createDiscountRouter from "./Discount.router";
import createAdRouter from "./Ad.router";
import createLoyaltyRouter from "./Loyalty.router";
import createWishlistRouter from "./Wishlist.router";
import createNotificationRouter from "./Notification.router";
import createUserRouter from "./User.router";
import createPushNotificationRouter from "./PushNotification.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as ShopClientType } from "./Shop.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as RentalClientType } from "./Rental.router";
import { ClientType as ReviewClientType } from "./Review.router";
import { ClientType as DiscountClientType } from "./Discount.router";
import { ClientType as AdClientType } from "./Ad.router";
import { ClientType as LoyaltyClientType } from "./Loyalty.router";
import { ClientType as WishlistClientType } from "./Wishlist.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as PushNotificationClientType } from "./PushNotification.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        shop: createShopRouter(router, procedure),
        product: createProductRouter(router, procedure),
        rental: createRentalRouter(router, procedure),
        review: createReviewRouter(router, procedure),
        discount: createDiscountRouter(router, procedure),
        ad: createAdRouter(router, procedure),
        loyalty: createLoyaltyRouter(router, procedure),
        wishlist: createWishlistRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        user: createUserRouter(router, procedure),
        pushNotification: createPushNotificationRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    shop: ShopClientType<AppRouter>;
    product: ProductClientType<AppRouter>;
    rental: RentalClientType<AppRouter>;
    review: ReviewClientType<AppRouter>;
    discount: DiscountClientType<AppRouter>;
    ad: AdClientType<AppRouter>;
    loyalty: LoyaltyClientType<AppRouter>;
    wishlist: WishlistClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    pushNotification: PushNotificationClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
