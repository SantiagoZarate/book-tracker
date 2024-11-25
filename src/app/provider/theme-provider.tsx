'use client';

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';

export function ThemeProvider({ children, ...args }: ThemeProviderProps) {
  return <NextThemesProvider {...args}>{children}</NextThemesProvider>;
}
