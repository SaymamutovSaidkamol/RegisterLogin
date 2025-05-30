import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getRegions: build.query({
      query: (params) => ({
        method: "GET",
        url: "/region",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRegionsQuery,
} = extendedApi;
