import { PreviewService } from './preview.service';
import { TempGeneratePhoto } from './entities/temp-generate-photo.entity';

const repoMock = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
});

const notificationMock = () => ({
  sendMessageToSubscribers: jest.fn(),
});

describe('PreviewService', () => {
  let service: PreviewService;
  let repo: ReturnType<typeof repoMock>;
  let notify: ReturnType<typeof notificationMock>;

  beforeEach(() => {
    repo = repoMock();
    notify = notificationMock();
    service = new PreviewService({} as any, repo as any, notify as any);
    jest.spyOn<any, any>(service as any, 'generateStarterPack').mockResolvedValue({
      file_name: 'name.png',
      file_path: '/tmp/name.png',
    });
    process.env.API_URL = 'http://localhost';
  });

  it('create should save photo and return data', async () => {
    repo.create.mockReturnValue({} as TempGeneratePhoto);
    repo.save.mockResolvedValue({ id: 1, file_name: 'name.png', file_path: '/tmp/name.png' });

    const file: Express.Multer.File = {
      buffer: Buffer.from('1'),
      mimetype: 'image/png',
      originalname: 'test.png',
      size: 10,
      fieldname: '',
      stream: null,
      destination: '',
      encoding: '7bit',
      filename: '',
      path: '',
    } as any;

    const result = await service.create(file);
    expect(repo.save).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.data.url).toBe('http://localhost/preview/temp-photos/1');
  });

  it('create should fail with wrong mime', async () => {
    const file: Express.Multer.File = {
      buffer: Buffer.from('1'),
      mimetype: 'text/plain',
      originalname: 'test.txt',
      size: 10,
      fieldname: '',
      stream: null,
      destination: '',
      encoding: '7bit',
      filename: '',
      path: '',
    } as any;

    const result = await service.create(file);
    expect(result.success).toBe(false);
  });

  it('getTempPhoto should return url', async () => {
    repo.findOne.mockResolvedValue({ id: 1, file_name: 'name.png' });
    const result = await service.getTempPhoto(1);
    expect(result.success).toBe(true);
    expect(result.data.url_image).toBe('http://localhost/uploads/temp-photos/name.png');
  });

  it('getTempPhoto should handle not found', async () => {
    repo.findOne.mockResolvedValue(undefined);
    const result = await service.getTempPhoto(1);
    expect(result.success).toBe(false);
  });

  it('getLatestPhotos should map photos', async () => {
    const photos = [
      { id: 1, file_name: 'name.png', created_at: new Date() },
    ];
    repo.find.mockResolvedValue(photos);
    const res = await service.getLatestPhotos(1);
    expect(res[0]).toMatchObject({
      id: 1,
      title: 'name.png',
      imageUrl: 'http://localhost/uploads/temp-photos/name.png',
    });
  });
});
