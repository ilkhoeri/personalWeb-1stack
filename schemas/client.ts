import * as z from "zod";

export const AddressSchema = z.object({
  village: z.string().min(0).optional(),
  subdistrict: z.string().min(0).optional(),
  district: z.string().min(0).optional(),
  province: z.string().min(0).optional(),
  zipcode: z.string().min(0).optional(),
  country: z.string().min(0).optional(),
});

export const SocmedSchema = z.object({
  siteName: z.string().min(1),
  siteUrl: z
    .string()
    .min(13)
    .refine((data) => data.startsWith("https://"), {
      message: 'link must start with "https://"',
    }),
  imageUrl: z.string().min(0).optional(),
});
