import { notFound } from 'next/navigation';

export const locales = ['en'];
export const defaultLocale = 'en';

export default function i18nMiddleware() {
  // Minimal plugin config for next-intl; routes default to 'en'.
  return {
    getRequestConfig: async () => ({
      locale: defaultLocale,
      messages: {},
    }),
    locales,
    defaultLocale,
    localeDetection: false,
    onError: () => notFound(),
  };
}


