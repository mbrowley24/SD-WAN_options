import { Body, Controller, Delete, Get, HttpStatus, Post, Patch, Param, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/JwtAuthGuard";
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { OrganizationService } from "../organization/organization.service";
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService,
              private readonly organizationService: OrganizationService,
              ) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  async dashboard(@Req() req, @Res() res) {


    const userId: string = req.user._id;

    const organizations = await this.organizationService.findOrganizationMetaDataByUserId(userId);
    
    return res.status(HttpStatus.OK).json({
      organizations: organizations,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
