import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
export declare class StripeService {
    private orderRepository;
    private stripe;
    constructor(orderRepository: Repository<Order>);
    private startStripe;
    createLink(orderId: number): Promise<string>;
    deactivateLink(stripeTransactionLinkId: string): Promise<void>;
    private updateOrderStatus;
    acceptPayment(session: Stripe.Checkout.Session): Promise<void>;
    rejectPayment(session: Stripe.Checkout.Session): Promise<void>;
    handleWebhook(signature: string, payload: Buffer): Promise<{
        received: boolean;
    }>;
}
