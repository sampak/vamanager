import { Test, TestingModule } from '@nestjs/testing';
import { PirepsController } from './pireps.controller';

describe('PirepsController', () => {
  let controller: PirepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PirepsController],
    }).compile();

    controller = module.get<PirepsController>(PirepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
