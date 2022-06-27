export const PROTOCOL = process.env.API_PROTOCOL;
export const DOMAIN = process.env.API_DOMAIN;
export const PORT = process.env.API_PORT;
export const TEMPLATE = process.env.HOST_TEMPLATE;
export const { HOST_URL } = process.env;

export default {
  API: {
    URL: `${PROTOCOL}://${DOMAIN}`,
  },
  TEMPLATE_URL: TEMPLATE,
  HOST_URL,
};
