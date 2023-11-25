import { apiSlice } from './slice';

export const rtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    campaignGetAll: builder.query({
      query: () => ({ url: '/campaign', method: 'GET' }),
    }),
    campaignCreate: builder.mutation({
      query: (campaign) => ({
        url: '/campaign',
        method: 'POST',
        body: campaign,
      }),
    }),
    campaignAccept: builder.mutation({
      query: (id) => ({
        url: `/campaign/${id}/accept`,
        method: 'PATCH',
      }),
    }),
    campaignDecline: builder.mutation({
      query: (id) => ({
        url: `/campaign/${id}/decline`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useCampaignGetAllQuery,
  useCampaignCreateMutation,
  useCampaignAcceptMutation,
  useCampaignDeclineMutation,
} = rtkApi;
