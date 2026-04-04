import { Image } from 'expo-image';
import { Text, View } from 'react-native';
const ExerciseList = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="p-6 rounded-lg bg-neutral overflow-hidden">
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

const ExerciseListItem = () => {
  return (
    <View className="flex p-3 bg-neutral-foreground rounded-lg *:flex-1 flex-row">
      <Text className="text-primary font-lexend-bold">01</Text>
      <Text className="text-white font-lexend-bold">80</Text>
      <Text className="text-white font-lexend-bold">10</Text>
      <Text className="text-tertiary font-lexend-bold">RPE 8</Text>
    </View>
  );
};

export { ExerciseList, ExerciseListItem };
