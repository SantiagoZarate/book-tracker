'use client';

import { useTheme } from 'next-themes';
import { Button } from '../../ui/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  return theme === 'light' ? (
    <Button onClick={() => setTheme('dark')}>change theme</Button>
  ) : (
    <Button onClick={() => setTheme('light')}>change theme</Button>
  );
}
