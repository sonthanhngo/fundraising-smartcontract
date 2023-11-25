import { apiSlice } from './slice';

export const rtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateGetById: builder.query({
      query: (id) => ({ url: `/campaign/${id}/update`, method: 'GET' }),
    }),
    updateCreateById: builder.mutation({
      query: (id, update) => ({
        url: `/campaign/${id}/update`,
        method: 'POST',
        body: update,
      }),
    }),
  }),
});

export const { useUpdateGetByIdQuery, useUpdateCreateByIdMutation } = rtkApi;
