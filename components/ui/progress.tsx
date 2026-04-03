import { View } from 'react-native';

const Progress = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="flex flex-row justify-between">
      <View className="h-0.5 w-full bottom-[35%] bg-[#23262C] absolute" />
      {children}
    </View>
  );
};

const ProgressPoint = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="size-12 bg-background">
      <View className="bg-[#00AFFE] outline-3 shadow-[0_0_10px] outline-solid outline-background shadow-[#00AFFE] size-4/5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </View>
    </View>
  );
};

export { Progress, ProgressPoint };
