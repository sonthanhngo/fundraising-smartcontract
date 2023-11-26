import { apiSlice } from './slice';

export const rtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reviewGetById: builder.query({
      query: (id) => ({ url: `/campaign/${id}/review`, method: 'GET' }),
    }),
    reviewCreateById: builder.mutation({
      query: (id, review) => ({
        url: `/campaign/${id}/review`,
        method: 'POST',
        body: review,
      }),
    }),
  }),
});

export const { useReviewGetByIdQuery, useReviewCreateByIdMutation } = rtkApi;
