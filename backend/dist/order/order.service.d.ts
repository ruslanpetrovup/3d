import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { StripeService } from '../stripe/stripe.service';
export declare class OrderService {
    private orderRepository;
    private stripeService;
    constructor(orderRepository: Repository<Order>, stripeService: StripeService);
    create(createOrderDto: CreateOrderDto): Promise<{
        success: boolean;
        order: Order;
        paymentUrl: string;
    }>;
}
