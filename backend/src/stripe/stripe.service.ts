import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    this.startStripe();
  }

  private async startStripe() {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is not configured');
      }
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-11-20.acacia',
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Stripe initialization error: ${error.message}`,
      );
    }
  }

  async createLink(orderId: number) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: '3D Starter Pack',
                description: `Order #${orderId}\nYou will receive a physical 3D-printed model of yourself based on the generated image, along with three custom items featured in the same picture. Perfect for collectors, gifts, or personal branding. Everything is handled from image to print — you just provide a photo.`,
              },
              unit_amount: 5000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/thanks-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel-payment`,
        metadata: {
          orderId: orderId.toString(),
        },
      });
  
      return session.url;
    } catch (error) {
      throw new InternalServerErrorException(
        `Payment link creation error: ${error.message}`,
      );
    }
  }

  async deactivateLink(stripeTransactionLinkId: string) {
    try {
      if (!stripeTransactionLinkId) {
        throw new BadRequestException('Transaction ID is required');
      }
      await this.stripe.paymentLinks.update(stripeTransactionLinkId, {
        active: false,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Link deactivation error: ${error.message}`,
      );
    }
  }

  private async updateOrderStatus(orderId: string, status: string) {
    const order = await this.orderRepository.findOne({
      where: { id: Number(orderId) }
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    await this.orderRepository.update(order.id, {
      status_payment: status
    });
  }

  async acceptPayment(session: Stripe.Checkout.Session) {
    try {
      if (!session || !session.metadata?.orderId) {
        throw new BadRequestException('Invalid session data');
      }

      await this.updateOrderStatus(session.metadata.orderId, 'paid');
    } catch (error) {
      throw new InternalServerErrorException(
        `Payment acceptance error: ${error.message}`,
      );
    }
  }

  async rejectPayment(session: Stripe.Checkout.Session) {
    try {
      if (!session || !session.metadata?.orderId) {
        throw new BadRequestException('Invalid session data');
      }

      await this.updateOrderStatus(session.metadata.orderId, 'failed');
    } catch (error) {
      throw new InternalServerErrorException(
        `Payment rejection error: ${error.message}`,
      );
    }
  }

  async handleWebhook(signature: string, payload: Buffer) {
    try {
      if (!signature || !payload) {
        throw new BadRequestException('Missing webhook signature or payload');
      }

      if (!process.env.STRIPE_WEBHOOK_SECRET) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
      }

      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        await this.acceptPayment(session);
      } else if (event.type === 'checkout.session.async_payment_failed') {
        const session = event.data.object as Stripe.Checkout.Session;
        await this.rejectPayment(session);
      }

      return { received: true };
    } catch (error) {
      console.error(`Webhook error: ${error.message}`);
      throw new InternalServerErrorException(`Webhook error: ${error.message}`);
    }
  }
}
