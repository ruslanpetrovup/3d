import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
});

const mockStripeService = () => ({
  createLink: jest.fn(),
});

describe('OrderService', () => {
  let service: OrderService;
  let repo: ReturnType<typeof mockRepository>;
  let stripe: ReturnType<typeof mockStripeService>;

  beforeEach(() => {
    repo = mockRepository();
    stripe = mockStripeService();
    service = new OrderService(repo as any, stripe as any);
  });

  it('should create order and return payment url', async () => {
    const dto: CreateOrderDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@test.com',
      photo_id: '1',
      shipping_address: 'addr',
    };
    const order = { id: 1, ...dto, status_order: 'pending', status_payment: 'unpaid' };
    repo.create.mockReturnValue(order);
    repo.save.mockResolvedValue(order);
    stripe.createLink.mockResolvedValue('url');

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith({
      ...dto,
      status_order: 'pending',
      status_payment: 'unpaid',
    });
    expect(stripe.createLink).toHaveBeenCalledWith(order.id);
    expect(result).toEqual({ success: true, order, paymentUrl: 'url' });
  });

  it('should throw error when repository fails', async () => {
    const dto: CreateOrderDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@test.com',
      photo_id: '1',
      shipping_address: 'addr',
    };
    repo.create.mockReturnValue(dto);
    repo.save.mockRejectedValue(new Error('fail'));
    await expect(service.create(dto)).rejects.toThrow('fail');
  });
});
