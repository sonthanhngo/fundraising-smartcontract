import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { CampaignService } from './campaign.service';
@Controller('campaign')
export class CampaignController {
  constructor(private service: CampaignService) {}
  @Get()
  async getCampaigns() {
    return this.service.getCampaigns();
  }

  @Post()
  createCampaign(@Body() body) {
    return this.service.createCampaign(body);
  }

  @Patch(':id/verify')
  verifyCampaign(@Param('id') id: string) {
    return this.service.verifyCampaign(id);
  }

  @Get(':id/review')
  getCampaignReviews(@Param('id') id: string) {
    return this.service.getCampaignReviews(id);
  }

  @Post(':id/review')
  createReview(@Param('id') id: string, @Body() body) {
    return this.service.createReview(id, body);
  }

  @Get(':id/update')
  getCampaignUpdates(@Param('id') id: string) {
    return this.service.getCampaignUpdates(id);
  }

  @Post(':id/update')
  createUpdate(@Param('id') id: string, @Body() body) {
    return this.service.createUpdate(id, body);
  }
}
