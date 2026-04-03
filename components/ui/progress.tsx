import { cn } from '@/lib/utils';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';

const Progress = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <View className={cn('flex flex-row justify-between', className)}>
      <View className="h-0.5 w-full top-8 bg-[#23262C] absolute" />
      {children}
    </View>
  );
};

const ProgressPoint = ({
  children,
  label,
  variant = 'default',
}: {
  children?: React.ReactNode;
  label?: string;
  variant?: 'active' | 'inactive' | 'default';
}) => {
  useFonts({
    'Lexend-Regular': require('../../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Bold': require('../../assets/fonts/Lexend-Bold.ttf'),
    'Lexend-ExtraBold': require('../../assets/fonts/Lexend-ExtraBold.ttf'),
    'Lexend-ExtraLight': require('../../assets/fonts/Lexend-ExtraLight.ttf'),
    'Lexend-SemiBold': require('../../assets/fonts/Lexend-SemiBold.ttf'),
    'Lexend-Medium': require('../../assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Light': require('../../assets/fonts/Lexend-Light.ttf'),
    'Lexend-Thin': require('../../assets/fonts/Lexend-Thin.ttf'),
  });
  return (
    <View className="size-20 flex items-center gap-2 flex-col bg-background">
      <View
        className={cn(
          'bg-primary outline-4 outline-solid outline-background shadow-primary size-10 rounded-full',
          variant === 'inactive' && 'bg-muted',
          variant === 'active' && 'shadow-primary shadow-[0_0_16px]/60',
        )}>
        {children}
      </View>
      {label && (
        <Text
          className={cn(
            'tracking-wider uppercase text-[10px] font-lexend-bold',
            variant === 'inactive' ? 'text-white/50' : 'text-primary',
          )}>
          {label}
        </Text>
      )}
    </View>
  );
};

export { Progress, ProgressPoint };
