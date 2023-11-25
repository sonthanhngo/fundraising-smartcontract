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
      .select('-reviews -updates -__v');
    return res;
  }
  async createCampaign(campaign: CampaignDto) {
    const res = await this.model.create(campaign);
    return res;
  }
  // async getCampaignById(id: string) {
  //   const res = await this.model.find({ smartContractId: id });
  //   return res;
  // }

  async acceptCampaign(id: string) {
    const res = await this.model.updateOne(
      { smartContractId: id },
      { status: 2 },
    );
    return res;
  }

  async declineCampaign(id: string) {
    const res = await this.model.updateOne(
      { smartContractId: id },
      { status: 0 },
    );
    return res;
  }

  async getCampaignReviews(id: string) {
    const res = await this.model
      .find({ smartContractId: id })
      .select('reviews -_id');
    return res == undefined ? 'no reviews' : res[0].reviews;
  }

  async getCampaignUpdates(id: string) {
    const res = await this.model
      .find({ smartContractId: id })
      .select('updates -_id');
    return res == undefined ? 'no updates' : res[0].updates;
  }

  async createReview(id: string, review: ReviewDto) {
    const res = await this.model.updateOne(
      { smartContractId: id },
      { $push: { reviews: review } },
    );
    return res;
  }

  async createUpdate(id: string, update: UpdateDto) {
    const res = await this.model.updateOne(
      { smartContractId: id },
      { $push: { updates: update } },
    );
    return res;
  }
}
