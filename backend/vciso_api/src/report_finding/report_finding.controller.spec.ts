import { Test, TestingModule } from '@nestjs/testing';
import { ReportFindingController } from './report_finding.controller';

describe('ReportFindingController', () => {
  let controller: ReportFindingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportFindingController],
    }).compile();

    controller = module.get<ReportFindingController>(ReportFindingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
