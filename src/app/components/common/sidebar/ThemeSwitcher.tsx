'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../../ui/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return theme === 'light' ? (
    <Button onClick={() => setTheme('dark')}>
      <SunIcon />
    </Button>
  ) : (
    <Button onClick={() => setTheme('light')}>
      <MoonIcon />
    </Button>
  );
}
