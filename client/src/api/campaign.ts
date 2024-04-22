import { apiSlice } from './slice';
export const addTagTypes = ['campaigns'] as const;
export const rtkApi = apiSlice
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      campaignGetAll: builder.query<
        CampaignGetAllResponseDto,
        CampaignGetAllArgs
      >({
        query: () => ({ url: '/campaign', method: 'GET' }),
        transformResponse: (campaigns: CampaignFromServer[]) => {
          const formattedCampaigns: Campaign[] = campaigns.map((campaign) => {
            const { _id, ...rest } = campaign;
            return {
              ...rest,
              id: _id,
            };
          });
          return formattedCampaigns;
        },
        providesTags: ['campaigns'],
      }),
      campaignCreate: builder.mutation<
        CampaignCreateResponseDto,
        CampaignCreateArgs
      >({
        query: (args) => ({
          url: '/campaign',
          method: 'POST',
          body: args.body,
        }),
        invalidatesTags: ['campaigns'],
      }),
      campaignAccept: builder.mutation<
        CampaignAcceptResponseDto,
        CampaignAcceptArgs
      >({
        query: (args) => ({
          url: `/campaign/${args.id}/accept`,
          method: 'PATCH',
        }),
        invalidatesTags: ['campaigns'],
      }),
      campaignDecline: builder.mutation<
        CampaignDeclineResponseDto,
        CampaignDeclineArgs
      >({
        query: (args) => ({
          url: `/campaign/${args.id}/decline`,
          method: 'DELETE',
        }),
        invalidatesTags: ['campaigns'],
      }),
    }),
  });

export const {
  useCampaignGetAllQuery,
  useCampaignCreateMutation,
  useCampaignAcceptMutation,
  useCampaignDeclineMutation,
} = rtkApi;

export type Campaign = {
  owner: string;
  ownerName: string;
  title: string;
  description: string;
  target: number;
  timeCreated: number;
  deadline: number;
  images: string[];
  id: string;
};

type CampaignFromServer = {
  owner: string;
  ownerName: string;
  title: string;
  description: string;
  target: number;
  timeCreated: number;
  deadline: number;
  images: string[];
  _id: string;
};
type CampaignGetAllArgs = void;
type CampaignGetAllResponseDto = Campaign[];

type CampaignCreateResponseDto = Campaign;
type CampaignCreateRequestDto = Omit<Campaign, 'timeCreated' | 'id'>;
type CampaignCreateArgs = {
  body: CampaignCreateRequestDto;
};

type CampaignAcceptResponseDto = string;
type CampaignAcceptArgs = { id: string };

type CampaignDeclineResponseDto = string;
type CampaignDeclineArgs = { id: string };
