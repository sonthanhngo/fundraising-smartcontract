import { apiSlice } from './slice';

export const addTagTypes = ['review'] as const;
export const rtkApi = apiSlice
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      reviewGetAllByCampaignId: builder.query<
        ReviewGetAllByCampaignIdResponseDto,
        ReviewGetAllByCampaignIdArgs
      >({
        query: (args) => ({
          url: `/campaign/${args.id}/review`,
          method: 'GET',
        }),
        providesTags: ['review'],
      }),
      reviewCreateByCampaignId: builder.mutation<
        ReviewCreateByCampaignIdResponseDto,
        ReviewCreateByCampaignIdArgs
      >({
        query: (args) => ({
          url: `/campaign/${args.id}/review`,
          method: 'POST',
          body: args.body,
        }),
        invalidatesTags: ['review'],
      }),
    }),
  });

export const {
  useReviewGetAllByCampaignIdQuery,
  useReviewCreateByCampaignIdMutation,
} = rtkApi;

export type Review = {
  address: string;
  review: string;
  amount: number;
};

type ReviewGetAllByCampaignIdResponseDto = Review[];
type ReviewGetAllByCampaignIdArgs = { id: string };

type ReviewCreateByCampaignIdResponseDto = Review;
type ReviewCreateByCampaignIdArgs = { id: string; body: Review };
