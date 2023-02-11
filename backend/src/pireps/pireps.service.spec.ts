import { Test, TestingModule } from '@nestjs/testing';
import { PirepsService } from './pireps.service';

describe('PirepsService', () => {
  let service: PirepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PirepsService],
    }).compile();

    service = module.get<PirepsService>(PirepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
