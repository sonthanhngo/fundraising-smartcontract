import { apiSlice } from './slice';

export const rtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    campaignGetAll: builder.query({
      query: () => ({ url: '/campaign', method: 'GET' }),
      transformResponse: (responses) => {
        const parsedRes = responses.map((response) => ({
          ...response,
          deadline: Number(response.deadline),
          timeCreated: Number(response.timeCreated),
        }));
        return parsedRes;
      },
    }),
    campaignCreate: builder.mutation({
      query: (args) => ({
        url: '/campaign',
        method: 'POST',
        body: args.body,
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
