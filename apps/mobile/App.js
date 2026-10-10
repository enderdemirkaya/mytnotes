import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StudioScreen } from './src/screens/StudioScreen';
import { useTheme } from './src/theme/useTheme';

function AppNavigation() {
  const { colors, isDark } = useTheme();
  const scheme = useColorScheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
      primary: colors.tint,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <StudioScreen />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}
