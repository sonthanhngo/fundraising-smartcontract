import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from './campaign.schema';
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
      .select('-reviews -updates -__v ');
    return res;
  }
  async createCampaign(campaign: CampaignDto) {
    console.log(campaign);
    const res = await this.model.create({
      ...campaign,
      timeCreated: Date.now() + 7 * 3600 * 1000,
    });
    return res;
  }
  // async getCampaignById(id: string) {
  //   const res = await this.model.find({ smartContractId: id });
  //   return res;
  // }

  async acceptCampaign(id: string) {
    const res = await this.model.updateOne({ _id: id }, { isVerified: true });
    return res;
  }

  async declineCampaign(id: string) {
    const res = await this.model.deleteOne({ _id: id });
    return res;
  }

  async getCampaignReviews(id: string) {
    const res = await this.model.find({ _id: id }).select('reviews -_id');
    return res == undefined ? 'no reviews' : res[0].reviews;
  }

  async getCampaignUpdates(id: string) {
    const res = await this.model.find({ _id: id }).select('updates -_id');
    return res == undefined ? 'no updates' : res[0].updates;
  }

  async createReview(id: string, review: ReviewDto) {
    const res = await this.model.updateOne(
      { _id: id },
      { $push: { reviews: review } },
    );
    return res;
  }

  async createUpdate(id: string, update: UpdateDto) {
    const res = await this.model.updateOne(
      { _id: id },
      { $push: { updates: { ...update, date: Date.now() + 7 * 3600 * 1000 } } },
    );
    return res;
  }
}
