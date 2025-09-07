import { Test, TestingModule } from '@nestjs/testing';
import { ReportFindingService } from './report_finding.service';

describe('ReportFindingService', () => {
  let service: ReportFindingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportFindingService],
    }).compile();

    service = module.get<ReportFindingService>(ReportFindingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
