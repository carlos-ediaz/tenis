import { z } from "zod";
import escape from "validator/lib/escape.js";

export const TournSchema = z
  .object({
    tourname: z
      .string()
      .trim()
      .transform(function (value) {
        return escape(value);
      }),
    startsAt: z.string().datetime(),
    duration: z.number(),
  })
  .strict();

export const validateCreate = function (data) {
  return TournSchema.safeParseAsync(data);
};
export const fields = [
  ...Object.keys(TournSchema.shape),
  "id",
  "tourname",
  "startsAt",
];
