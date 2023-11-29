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
      providesTags: ['campaigns'],
    }),
    campaignCreate: builder.mutation({
      query: (args) => ({
        url: '/campaign',
        method: 'POST',
        body: args.body,
      }),
      invalidatesTags: ['campaigns'],
    }),
    campaignAccept: builder.mutation({
      query: (args) => ({
        url: `/campaign/${args.id}/accept`,
        method: 'PATCH',
      }),
      invalidatesTags: ['campaigns'],
    }),
    campaignDecline: builder.mutation({
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
