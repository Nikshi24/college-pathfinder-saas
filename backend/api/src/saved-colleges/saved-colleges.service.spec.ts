import { Test, TestingModule } from '@nestjs/testing';
import { SavedCollegesService } from './saved-colleges.service';

describe('SavedCollegesService', () => {
  let service: SavedCollegesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedCollegesService],
    }).compile();

    service = module.get<SavedCollegesService>(SavedCollegesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
