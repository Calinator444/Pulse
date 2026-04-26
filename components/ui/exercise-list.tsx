import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useResolveClassNames } from 'uniwind';

import { cn } from '@/lib/utils';
import { Image } from 'expo-image';
import { Pressable, PressableProps, Text, View } from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';

const ExerciseList = ({ children }: { children?: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-6 transition-transform rounded-lg bg-neutral overflow-hidden">
        <View className="absolute grayscale mask-top from-transparent t inset-0 mask-b-from-0% h-40 overflow-hidden w-full">
          <Image
            style={{
              position: 'absolute',
              top: 1 / 2,
              left: 1 / 2,
              height: 160,
              opacity: 0.4,
              width: '100%',
            }}
            source={require('@/assets/images/barbell.png')}
          />
        </View>
        <View className="h-30 justify-end">
          <Text className="text-white font-lexend-bold uppercase text-xl">
            Romanian Deadlift
          </Text>
          <Text className="uppercase bg-secondary-alt/30 tracking-widest self-start py-0.5 px-2 rounded-md font-lexend-semiBold text-xs text-secondary">
            Legs
          </Text>
        </View>
        <View className="flex flex-row *:uppercase *:font-lexend-bold p-3 *:text-neutral-text *:text-xs">
          <Text className="flex-1">set</Text>
          <Text className="flex-2">weight</Text>
          <Text className="flex-2">reps</Text>
          <Text className="flex-2">Target</Text>

          {/* I may not need this? */}
          <View className="flex-1" />
        </View>
        <View className="gap-4">{children}</View>
      </View>
    </GestureHandlerRootView>
  );
};

const DeleteAction = () => {
  return (
    <Pressable className="bg-red-500 rounded-lg items-center justify-center px-5 ml-2">
      <MaterialIcons name="delete" size={22} color="white" />
      <Text className="text-white font-lexend-bold text-xs mt-1">Delete</Text>
    </Pressable>
  );
};

const ExerciseListItem = ({
  index,
  rpe,
  reps,
  weight,
  done = false,
  onCompleteChanged,
  onDelete,
}: {
  index: number;
  rpe: number;
  reps: number;
  done: boolean;
  weight: number;
  animate?: boolean;
  onCompleteChanged?: (value: boolean) => void;
  onDelete?: () => void;
}) => {
  const checkboxStyles = useResolveClassNames('flex bg-neutral-foreground');
  return (
    <Swipeable
      renderRightActions={() => <DeleteAction />}
      onSwipeableOpen={(direction) => {
        if (direction === 'right') {
          onDelete?.();
        }
      }}
      overshootRight={false}>
      <View
        className={cn(
          `flex p-3 bg-neutral-foreground transition-all rounded-lg flex-row animate-enter`,
          done && '**:text-neutral-border',
        )}>
        <View className="flex basis-7/8 flex-row">
          <View
            className={cn(
              'absolute h-px origin-left inset-x-0 top-1/2 -translate-y-1/2 z-1 transition-transform bg-neutral-text',
              done ? 'scale-x-100' : 'scale-x-0',
            )}
          />
          <Text className="text-primary flex-1 font-lexend-bold">
            0{index + 1}
          </Text>
          <Text className="text-white flex-2 font-lexend-bold">{weight}</Text>
          <Text className="text-white flex-2 font-lexend-bold">{reps}</Text>
          <Text className="text-tertiary flex-2 font-lexend-bold">
            RPE {rpe}
          </Text>
        </View>
        <Checkbox
          onCheckedChange={(val) => onCompleteChanged?.(val)}
          className="top-1/2 absolute -translate-y-1/2 right-2"
          checked={done}
        />
      </View>
    </Swipeable>
  );
};

const ExerciseListButton = (props: PressableProps) => {
  return (
    <Pressable
      {...props}
      className="border-2 rounded-md border-neutral-border border-dashed p-4">
      <Text className="uppercase flex items-center font-lexend-semiBold text-[12px] gap-2 justify-center text-neutral-text">
        <MaterialCommunityIcons size={20} name="plus" />
        Add Set
      </Text>
    </Pressable>
  );
};

const Checkbox = ({
  checked,
  className,
  onCheckedChange,
}: {
  checked?: boolean;
  className?: string;
  onCheckedChange?: (value: boolean) => void;
}) => {
  const button = useResolveClassNames(
    'text-background absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  );

  return (
    <Pressable
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        'size-5 z-10 border border-neutral-text rounded-md',
        checked && 'bg-neutral-text',
        className,
      )}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}>
      {checked && (
        <MaterialCommunityIcons
          name="check"
          style={button}
          size={18}
          color=""
        />
      )}
    </Pressable>
  );
};

export { ExerciseList, ExerciseListButton, ExerciseListItem };
