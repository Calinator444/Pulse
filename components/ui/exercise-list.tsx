import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useLayoutEffect, useState } from 'react';
import { useResolveClassNames } from 'uniwind';

import { cn } from '@/lib/utils';
import { Image } from 'expo-image';
import {
  Button,
  Pressable,
  PressableProps,
  Text,
  TextInput,
  View,
} from 'react-native';
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
          <Text className="flex-1/5">set</Text>
          <Text className="flex-1/5">weight</Text>
          <Text className="flex-1/5">reps</Text>
          <Text className="flex-2/5">Target</Text>
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
  const finalTextBoxRef = React.useRef<Text | null>(null);

  const containerRef = React.useRef<View | null>(null);
  const [strokeWidth, setStrokeWidth] = useState(0);

  useLayoutEffect(() => {
    finalTextBoxRef.current?.measureInWindow((tx, ty, tw) => {
      containerRef.current?.measureInWindow((cx, cy, cw) => {
        const endOfTextBox = tx + tw;
        const endOfContainer = cx + cw;
        const distanceTextBoxContainerEnd = endOfContainer - endOfTextBox;
        const finalWidth = cw - distanceTextBoxContainerEnd - 4;
        setStrokeWidth(finalWidth);
      });
    });
  }, []);
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
        ref={containerRef}
        className={cn(
          `flex p-3 bg-neutral-foreground transition-all rounded-lg flex-row animate-enter`,
          done && '**:text-neutral-border',
        )}>
        <View
          style={{
            width: done ? strokeWidth : 0,
          }}
          className={cn(
            'absolute h-px origin-left left-2 top-1/2 -translate-y-1/2 z-1 transition-all bg-neutral-text',
          )}
        />
        <Text className="text-primary flex-1 font-lexend-bold">
          0{index + 1}
        </Text>
        <Text className="text-white flex-1 font-lexend-bold">{weight}</Text>
        <Text className="text-white flex-1 font-lexend-bold">{reps}</Text>
        <View className="flex-1 flex items-start">
          <Text
            ref={finalTextBoxRef}
            className="text-tertiary font-lexend-bold">
            RPE {rpe}
          </Text>
        </View>
        <View className="flex-1 items-end">
          <Checkbox
            onCheckedChange={(val) => onCompleteChanged?.(val)}
            className="grow"
            checked={done}
          />
        </View>
      </View>
    </Swipeable>
  );
};

const ExerciseListNewItem = ({
  index,
  onSave,
  onCancel,
}: {
  index: number;
  onSave: (values: { weight: number; reps: number; rpe: number }) => void;
  onCancel: () => void;
}) => {
  const [weight, setWeight] = React.useState('');
  const [reps, setReps] = React.useState('');
  const [rpe, setRpe] = React.useState('');

  return (
    <View className="flex flex-1 flex-row p-3 items-center bg-neutral-foreground rounded-lg ">
      <Text className="text-primary w-full flex-1/5 font-lexend-bold">
        0{index + 1}
      </Text>

      <View className="flex-1/5">
        <TextInput
          className="text-white w-8 border border-neutral-border overflow-hidden flex-1/5 font-lexend-bold bg-neutral rounded"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View className="flex-1/5 flex items-start">
        <TextInput
          className="text-white w-8 font-lexend-bold bg-neutral border border-neutral-border rounded"
          keyboardType="numeric"
          value={reps}
          onChangeText={setReps}
        />
      </View>
      <View className="flex-1/5 flex items-start">
        <TextInput
          className="w-8 border border-neutral-border font-lexend-bold bg-neutral rounded"
          keyboardType="numeric"
          value={rpe}
          onChangeText={setRpe}
        />
      </View>
      <View className="flex-1/5">
        <Button title="add" />
      </View>
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

export {
  ExerciseList,
  ExerciseListButton,
  ExerciseListItem,
  ExerciseListNewItem
};

