import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignDto } from './dtos/campaign.dto';
import { UpdateDto } from './dtos/update.dto';
import { ReviewDto } from './dtos/review.dto';
@Controller('campaign')
export class CampaignController {
  constructor(private service: CampaignService) {}
  @Get()
  getCampaigns() {
    return this.service.getCampaigns();
  }

  @Post()
  createCampaign(@Body(new ValidationPipe()) campaignDto: CampaignDto) {
    console.log(campaignDto);
    return this.service.createCampaign(campaignDto);
  }

  @Patch(':id/accept')
  acceptCampaign(@Param('id') id: string) {
    return this.service.acceptCampaign(id);
  }

  @Delete(':id/decline')
  declineCampaign(@Param('id') id: string) {
    return this.service.declineCampaign(id);
  }

  @Get(':id/review')
  getCampaignReviews(@Param('id') id: string) {
    return this.service.getCampaignReviews(id);
  }

  @Post(':id/review')
  createReview(
    @Param('id') id: string,
    @Body(new ValidationPipe()) reviewDto: ReviewDto,
  ) {
    console.log(reviewDto);
    return this.service.createReview(id, reviewDto);
  }

  @Get(':id/update')
  getCampaignUpdates(@Param('id') id: string) {
    return this.service.getCampaignUpdates(id);
  }

  @Post(':id/update')
  createUpdate(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateDto: UpdateDto,
  ) {
    console.log(updateDto);
    return this.service.createUpdate(id, updateDto);
  }
}
