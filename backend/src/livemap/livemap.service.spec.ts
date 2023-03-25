import { Test, TestingModule } from '@nestjs/testing';
import { LivemapService } from './livemap.service';

describe('LivemapService', () => {
  let service: LivemapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivemapService],
    }).compile();

    service = module.get<LivemapService>(LivemapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
