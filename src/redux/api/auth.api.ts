import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: (params) => ({
        method: "GET",
        url: "/auth/me",
        params,
      }),
      providesTags: ["AUTH"],
    }),
    sendOtp: build.mutation({
      query: (body) => ({
        method: "POST",
        url: "/auth/send-otp",
        body,
      }),
    }),
    verifyOtp: build.mutation({
      query: (body) => ({
        method: "POST",
        url: "/auth/verify-otp",
        body,
      }),
    }),
    registerAuth: build.mutation({
      query: (body) => ({
        method: "POST",
        url: "/auth/register",
        body,
      }),
    }),

    loginAuth: build.mutation({
      query: (body) => ({
        method: "POST",
        url: "/auth/login",
        body,
      }),
    }),

    getMe: build.query({
      query: (params) => ({
        method: "GET",
        url: "/auth/me",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterAuthMutation,
  useLoginAuthMutation,
  useGetMeQuery,
} = extendedApi;
