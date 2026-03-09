import { Test, TestingModule } from '@nestjs/testing';
import { SavedCollegesController } from './saved-colleges.controller';

describe('SavedCollegesController', () => {
  let controller: SavedCollegesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedCollegesController],
    }).compile();

    controller = module.get<SavedCollegesController>(SavedCollegesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
