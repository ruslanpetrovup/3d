import { Controller, Post, Headers, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('payment')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    @ApiExcludeEndpoint()
    @Post('webhook')
    async handleWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() request
    ) {
        return this.stripeService.handleWebhook(signature, request.body);
    }
}