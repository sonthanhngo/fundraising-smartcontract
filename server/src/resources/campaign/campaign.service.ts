import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, Review, Update } from './campaign.schema';
import { Model } from 'mongoose';
import { CampaignDto } from './dtos/campaign.dto';
import { ReviewDto } from './dtos/review.dto';
import { UpdateDto } from './dtos/update.dto';
@Injectable()
export class CampaignService {
  constructor(@InjectModel(Campaign.name) private model: Model<Campaign>) {}

  async getCampaigns() {
    const res = await this.model
      .find({ isVerified: false })
      .select('-reviews -updates -isVerified -__v ');
    return res;
  }
  async createCampaign(campaign: CampaignDto) {
    const res = await this.model.create({
      ...campaign,
      timeCreated: Date.now(),
    });
    return res;
  }

  async acceptCampaign(id: string) {
    const campaign = await this.model.findOne({ _id: id, isVerified: false });
    if (campaign) {
      await this.model.updateOne({ _id: id }, { isVerified: true });
      return 'ok';
    }
    return 'campaign not exist| campaign already verified';
  }

  async declineCampaign(id: string) {
    const campaign = await this.model.findOne({
      _id: id,
    });
    if (campaign) {
      await this.model.deleteOne({ _id: id });
      return 'ok';
    }
    return 'campaign not exist| campaign already declined';
  }

  async getCampaignReviews(id: string) {
    const res = await this.model.find({ _id: id }).select('reviews -_id');
    return res == undefined ? [] : res[0].reviews;
  }

  async getCampaignUpdates(id: string) {
    const res = await this.model.find({ _id: id }).select('updates -_id');
    return res == undefined ? [] : res[0].updates;
  }

  async createReview(id: string, reviewDto: ReviewDto) {
    const review: Review = reviewDto;
    const res = await this.model.updateOne(
      { _id: id },
      { $push: { reviews: review } },
    );
    return res.acknowledged === true ? review : 'error';
  }

  async createUpdate(id: string, updateDto: UpdateDto) {
    const update: Update = { ...updateDto, date: Date.now() };
    const res = await this.model.updateOne(
      { _id: id },
      { $push: { updates: update } },
    );
    return res.acknowledged === true ? update : 'error';
  }
}
