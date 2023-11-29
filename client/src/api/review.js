import { apiSlice } from './slice';

export const rtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reviewGetById: builder.query({
      query: (args) => ({ url: `/campaign/${args.id}/review`, method: 'GET' }),
      providesTags: ['review'],
    }),
    reviewCreateById: builder.mutation({
      query: (args) => ({
        url: `/campaign/${args.id}/review`,
        method: 'POST',
        body: args.body,
      }),
      invalidatesTags: ['review'],
    }),
  }),
});

export const { useReviewGetByIdQuery, useReviewCreateByIdMutation } = rtkApi;
