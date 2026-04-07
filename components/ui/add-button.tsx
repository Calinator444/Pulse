import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Text, View } from 'react-native';

const AddButton = ({ label }: { label?: string }) => {
  return (
    <View className="bg-neutral border border-neutral-foreground gap-3 rounded-xl p-5 items-center">
      <View className="p-2 rounded-full size-12 relative bg-neutral-foreground">
        <MaterialIcons
          name="add-circle"
          size={24}
          className="text-neutral-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </View>
      {label && (
        <Text className="text-muted-alt text-[12px] font-lexend-bold uppercase">
          {label}
        </Text>
      )}
    </View>
  );
};

export default AddButton;
