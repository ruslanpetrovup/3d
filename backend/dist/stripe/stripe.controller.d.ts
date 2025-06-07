import { StripeService } from './stripe.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    handleWebhook(signature: string, request: any): Promise<{
        received: boolean;
    }>;
}
