import { StyleSheet } from 'react-native-unistyles';

const mainTheme = {
  colors: {
    primary: '#aa12ff',
    onSecondary: (opacity: number = 1) => `rgba(0, 227, 253, ${opacity})`,
    secondary: (opacity: number = 1) => `rgba(0, 104, 117, ${opacity})`,
    neutral: '#171a1f',
  },
  sizes: {
    text: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 18,
      xl: 24,
    },
  },
  gap: (v: number) => v * 8,
};

const appThemes = {
  main: mainTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: 'main',
  },
  breakpoints,
  themes: appThemes,
});
