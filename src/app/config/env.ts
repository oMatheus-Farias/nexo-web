import z from 'zod';

const schema = z.object({
  VITE_BASE_API_URL: z.url(),
});

const parsedEnv = schema.parse(import.meta.env);

export const env = {
  api: {
    url: parsedEnv.VITE_BASE_API_URL,
  },
};
