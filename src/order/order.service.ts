import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private stripeService: StripeService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
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
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}
