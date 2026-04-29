import { StyleSheet } from 'react-native-unistyles';

const mainTheme = {
  colors: {
    primary: '#aa12ff',
    onSecondary: (opacity: number = 1) => `rgba(0, 227, 253, ${opacity})`,
    secondary: (opacity: number = 1) => `rgba(0, 104, 117, ${opacity})`,

    surface: (opacity: number = 1) => `rgba(23, 26, 31, ${opacity})`,
    onSurface: (opacity: number = 1) => `rgba(116, 117, 122, ${opacity})`,
    neutral: '#171a1f',
  },
  fonts: {
    lexend: 'Lexend-Regular',
    lexendBold: 'Lexend-Bold',
    lexendExtraBold: 'Lexend-ExtraBold',
    lexendExtraLight: 'Lexend-ExtraLight',
    lexendSemiBold: 'Lexend-SemiBold',
    lexendMedium: 'Lexend-Medium',
    lexendLight: 'Lexend-Light',
    lexendThin: 'Lexend-Thin',
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
