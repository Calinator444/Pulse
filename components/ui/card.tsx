import { Text, View } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const EditCard = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <View className="border-l-2 flex flex-row items-center bg-foreground rounded-lg p-5 overflow-hidden">
      <View className="absolute inset-0 border-l-4  border-primary" />
      <View className="flex gap-2 flex-1">
        <Text className="text-primary font-lexend-bold text-xs tracking-widest uppercase">
          {subTitle}
        </Text>
        <Text className="text-white font-lexend text-lg">{title}</Text>
      </View>
      <Text className="text-muted-alt">
        <MaterialCommunityIcons name="pencil-outline" size={22} />
      </Text>
    </View>
  );
};

export default EditCard;
