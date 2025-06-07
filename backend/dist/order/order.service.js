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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const stripe_service_1 = require("../stripe/stripe.service");
let OrderService = class OrderService {
    constructor(orderRepository, stripeService) {
        this.orderRepository = orderRepository;
        this.stripeService = stripeService;
    }
    async create(createOrderDto) {
        try {
            const order = this.orderRepository.create({
                ...createOrderDto,
                status_order: 'pending',
                status_payment: 'unpaid',
            });
            await this.orderRepository.save(order);
            const paymentUrl = await this.stripeService.createLink(order.id);
            return {
                success: true,
                order: order,
                paymentUrl: paymentUrl,
            };
        }
        catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        stripe_service_1.StripeService])
], OrderService);
//# sourceMappingURL=order.service.js.map