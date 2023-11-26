import { apiSlice } from './slice';

export const rtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateGetById: builder.query({
      query: (id) => ({ url: `/campaign/${id}/update`, method: 'GET' }),
    }),
    updateCreateById: builder.mutation({
      query: (args) => ({
        url: `/campaign/${args.id}/update`,
        method: 'POST',
        body: args.body,
      }),
    }),
  }),
});

export const { useUpdateGetByIdQuery, useUpdateCreateByIdMutation } = rtkApi;
