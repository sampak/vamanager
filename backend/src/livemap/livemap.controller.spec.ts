import { Test, TestingModule } from '@nestjs/testing';
import { LivemapController } from './livemap.controller';

describe('LivemapController', () => {
  let controller: LivemapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivemapController],
    }).compile();

    controller = module.get<LivemapController>(LivemapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
