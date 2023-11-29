import { apiSlice } from './slice';

export const rtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateGetById: builder.query({
      query: (args) => ({ url: `/campaign/${args.id}/update`, method: 'GET' }),
      providesTags: ['update'],
    }),
    updateCreateById: builder.mutation({
      query: (args) => ({
        url: `/campaign/${args.id}/update`,
        method: 'POST',
        body: args.body,
      }),
      invalidatesTags: ['update'],
    }),
  }),
});

export const { useUpdateGetByIdQuery, useUpdateCreateByIdMutation } = rtkApi;
