import { Test, TestingModule } from '@nestjs/testing';
import { SvgGeneratorService } from './svg-generator.service';

describe('SvgGeneratorService', () => {
  let service: SvgGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SvgGeneratorService],
    }).compile();

    service = module.get<SvgGeneratorService>(SvgGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
