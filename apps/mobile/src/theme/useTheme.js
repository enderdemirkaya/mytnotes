import { useColorScheme } from 'react-native';

const palettes = {
  light: {
    background: '#ffffff',
    surface: '#f2f2f7',
    border: '#c6c6c8',
    text: '#000000',
    textSecondary: '#3c3c43',
    tint: '#007aff',
    danger: '#ff3b30',
    placeholder: '#8e8e93',
  },
  dark: {
    background: '#000000',
    surface: '#1c1c1e',
    border: '#38383a',
    text: '#ffffff',
    textSecondary: '#ebebf5',
    tint: '#0a84ff',
    danger: '#ff453a',
    placeholder: '#8e8e93',
  },
};

export function useTheme() {
  const isDark = useColorScheme() === 'dark';
  return { colors: palettes[isDark ? 'dark' : 'light'], isDark };
}
