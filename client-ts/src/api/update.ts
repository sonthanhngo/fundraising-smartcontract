import { apiSlice } from './slice';

export const addTagTypes = ['update'] as const;
export const rtkApi = apiSlice
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      updateGetAllByCampaignId: builder.query<
        UpdateGetAllByCampaignIdResponseDto,
        UpdateGetAllByCampaignIdArgs
      >({
        query: (args) => ({
          url: `/campaign/${args.id}/update`,
          method: 'GET',
        }),
        providesTags: ['update'],
      }),
      updateCreateByCampaignId: builder.mutation<
        UpdateCreateByCampaignIdResponseDto,
        UpdateCreateByCampaignIdArgs
      >({
        query: (args) => ({
          url: `/campaign/${args.id}/update`,
          method: 'POST',
          body: args.body,
        }),
        invalidatesTags: ['update'],
      }),
    }),
  });

export const {
  useUpdateGetAllByCampaignIdQuery,
  useUpdateCreateByCampaignIdMutation,
} = rtkApi;

type Update = {
  date: number;
  update: string;
};

type UpdateGetAllByCampaignIdResponseDto = Update[];
type UpdateGetAllByCampaignIdArgs = { id: string };

type UpdateCreateByCampaignIdResponseDto = Update;
type UpdateCreateByCampaignIdArgs = { id: string; body: Omit<Update, 'date'> };
