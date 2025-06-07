import { InternalServerErrorException } from '@nestjs/common';
import { StripeService } from './stripe.service';

const mockStripe = {
  checkout: { sessions: { create: jest.fn() } },
  paymentLinks: { update: jest.fn() },
  webhooks: { constructEvent: jest.fn() },
};

jest.mock('stripe', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => mockStripe),
  };
});

describe('StripeService', () => {
  const orderRepo = {
    findOne: jest.fn(),
    update: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = 'key';
  });

  it('createLink should return url', async () => {
    mockStripe.checkout.sessions.create.mockResolvedValue({ url: 'u' });
    const service = new StripeService(orderRepo);
    const url = await service.createLink(1);
    expect(mockStripe.checkout.sessions.create).toHaveBeenCalled();
    expect(url).toBe('u');
  });

  it('deactivateLink should call update', async () => {
    const service = new StripeService(orderRepo);
    await service.deactivateLink('id');
    expect(mockStripe.paymentLinks.update).toHaveBeenCalledWith('id', { active: false });
  });

  it('acceptPayment should update order status', async () => {
    const service = new StripeService(orderRepo);
    const spy = jest.spyOn<any, any>(service as any, 'updateOrderStatus').mockResolvedValue(undefined);
    await service.acceptPayment({ metadata: { orderId: '1' } } as any);
    expect(spy).toHaveBeenCalledWith('1', 'paid');
  });

  it('rejectPayment should update order status', async () => {
    const service = new StripeService(orderRepo);
    const spy = jest.spyOn<any, any>(service as any, 'updateOrderStatus').mockResolvedValue(undefined);
    await service.rejectPayment({ metadata: { orderId: '1' } } as any);
    expect(spy).toHaveBeenCalledWith('1', 'failed');
  });

  it('handleWebhook should process event', async () => {
    process.env.STRIPE_WEBHOOK_SECRET = 'secret';
    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: { object: { metadata: { orderId: '1' } } },
    });
    const service = new StripeService(orderRepo);
    jest.spyOn(service, 'acceptPayment').mockResolvedValue(undefined);
    const result = await service.handleWebhook('sig', Buffer.from(''));
    expect(result).toEqual({ received: true });
    expect(service.acceptPayment).toHaveBeenCalled();
  });

  it('startStripe throws without key', () => {
    delete process.env.STRIPE_SECRET_KEY;
    expect(() => new StripeService(orderRepo)).toThrow(InternalServerErrorException);
  });
});
