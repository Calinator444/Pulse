import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import { Pressable, PressableProps, Text, View } from 'react-native';

const ExerciseList = ({ children }: { children?: React.ReactNode }) => {
  return (
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
          barbell bench press
        </Text>
        <Text className="uppercase bg-secondary-alt/30 tracking-widest self-start py-0.5 px-2 rounded-md font-lexend-semiBold text-xs text-secondary">
          Chest / compound
        </Text>
      </View>
      <View className="flex flex-row *:uppercase *:font-lexend-bold p-3 *:text-neutral-text *:text-xs">
        <Text className="flex-1">set</Text>
        <Text className="flex-1">weight</Text>
        <Text className="flex-1">reps</Text>
        <Text className="flex-1">Target</Text>
      </View>
      <View className="gap-4">{children}</View>
    </View>
  );
};

const ExerciseListItem = ({
  index,
  rpe,
  reps,
  weight,
}: {
  index: number;
  rpe: number;
  reps: number;
  weight: number;
  animate?: boolean;
}) => {
  return (
    <View
      className={`flex p-3 bg-neutral-foreground rounded-lg *:flex-1 flex-row animate-enter`}>
      <Text className="text-primary font-lexend-bold">0{index + 1}</Text>
      <Text className="text-white font-lexend-bold">{weight}</Text>
      <Text className="text-white font-lexend-bold">{reps}</Text>
      <Text className="text-tertiary font-lexend-bold">RPE {rpe}</Text>
    </View>
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

export { ExerciseList, ExerciseListButton, ExerciseListItem };
