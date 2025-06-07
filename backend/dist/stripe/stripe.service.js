"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stripe_1 = require("stripe");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../order/entities/order.entity");
let StripeService = class StripeService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        this.startStripe();
    }
    async startStripe() {
        try {
            if (!process.env.STRIPE_SECRET_KEY) {
                throw new Error('STRIPE_SECRET_KEY is not configured');
            }
            this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2024-11-20.acacia',
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Stripe initialization error: ${error.message}`);
        }
    }
    async createLink(orderId) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Custom Doll Order',
                                description: `Order #${orderId}`,
                            },
                            unit_amount: 9900,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,
                metadata: {
                    orderId: orderId.toString(),
                },
            });
            return session.url;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Payment link creation error: ${error.message}`);
        }
    }
    async deactivateLink(stripeTransactionLinkId) {
        try {
            if (!stripeTransactionLinkId) {
                throw new common_1.BadRequestException('Transaction ID is required');
            }
            await this.stripe.paymentLinks.update(stripeTransactionLinkId, {
                active: false,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Link deactivation error: ${error.message}`);
        }
    }
    async updateOrderStatus(orderId, status) {
        const order = await this.orderRepository.findOne({
            where: { id: Number(orderId) }
        });
        if (!order) {
            throw new common_1.BadRequestException('Order not found');
        }
        await this.orderRepository.update(order.id, {
            status_payment: status
        });
    }
    async acceptPayment(session) {
        try {
            if (!session || !session.metadata?.orderId) {
                throw new common_1.BadRequestException('Invalid session data');
            }
            await this.updateOrderStatus(session.metadata.orderId, 'paid');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Payment acceptance error: ${error.message}`);
        }
    }
    async rejectPayment(session) {
        try {
            if (!session || !session.metadata?.orderId) {
                throw new common_1.BadRequestException('Invalid session data');
            }
            await this.updateOrderStatus(session.metadata.orderId, 'failed');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Payment rejection error: ${error.message}`);
        }
    }
    async handleWebhook(signature, payload) {
        try {
            if (!signature || !payload) {
                throw new common_1.BadRequestException('Missing webhook signature or payload');
            }
            if (!process.env.STRIPE_WEBHOOK_SECRET) {
                throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
            }
            const event = this.stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;
                await this.acceptPayment(session);
            }
            else if (event.type === 'checkout.session.async_payment_failed') {
                const session = event.data.object;
                await this.rejectPayment(session);
            }
            return { received: true };
        }
        catch (error) {
            console.error(`Webhook error: ${error.message}`);
            throw new common_1.InternalServerErrorException(`Webhook error: ${error.message}`);
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StripeService);
//# sourceMappingURL=stripe.service.js.map