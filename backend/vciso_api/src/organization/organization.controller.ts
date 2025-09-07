import { Controller, Get, HttpStatus, UseGuards, Req, Res } from '@nestjs/common';
import { JwtAuthGuard} from "../auth/JwtAuthGuard";
import { OrganizationService } from "./organization.service";

@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Get()
    async hasOrganization(@Req() req, @Res() res){
        console.log("organziations")
        // console.log(req.user.userId)
        const userId = req.user.userId;
        const org_service = await this.organizationService.findOrganizationsByUserId(userId)

        console.log(org_service)

        return res.status(HttpStatus.OK).json({
            organizations: org_service
        });
    }
}


