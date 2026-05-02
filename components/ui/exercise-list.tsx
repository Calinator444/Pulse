import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  Sortable,
  SortableItem,
  SortableRenderItemProps,
} from 'react-native-reanimated-dnd';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useResolveClassNames } from 'uniwind';

import { Set } from '@/lib/types';
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

const styles = StyleSheet.create((theme) => ({
  badge: {
    includeFontPadding: false,
    paddingVertical: theme.gap(0.5),
    tracking: 20,
    paddingHorizontal: theme.gap(1),
    borderRadius: theme.gap(0.5),
    backgroundColor: theme.colors.secondary(0.3),
    backgroundTransparency: 0.3,
    backgroundBlendMode: 'overlay',
    letterSpacing: 1.5,
    backgroundOpacity: 0,
    color: theme.colors.onSecondary(),
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  addButtonContents: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: theme.gap(0.5),
    color: theme.colors.onSurface(),
  },
  addButtonText: {
    textTransform: 'uppercase',
    fontSize: 12,
    includeFontPadding: false,
    letterSpacing: 1,
    fontFamily: theme.fonts.lexendSemiBold,
    color: theme.colors.onSurface(),
  },
  addButtonIcon: {
    fontSize: 15,
    strokeWidth: 2,
  },
}));

const ExerciseList = ({
  items,
  onDrop,
  onDragStart,
  onAddSet,
}: {
  children?: React.ReactNode;

  onDragStart?: (id: string, position: number) => void;
  onDrop: (id: string, position: number) => void;
  items: Set[];
  onAddSet: (values: { weight: number; reps: number; rpe: number }) => void;
}) => {
  const { theme } = useUnistyles();
  return (
    <View className="transition-transform p-6 rounded-lg bg-neutral overflow-hidden">
      <Image
        style={{
          position: 'absolute',
          inset: 0,
          height: 168,
          opacity: 0.4,
        }}
        contentFit="cover"
        source={require('@/assets/images/barbell.png')}
      />
      <LinearGradient
        style={{
          position: 'absolute',
          inset: 0,
          height: 168,
        }}
        colors={['transparent', theme.colors.neutral]}></LinearGradient>
      <View className="h-30 justify-end">
        <Text className="text-white font-lexend-bold uppercase text-xl">
          Romanian Deadlift
        </Text>
        <Text style={styles.badge}>Legs</Text>
      </View>
      <View className="flex flex-row *: p-3 **: *:s">
        <Text className="flex-1/5 text-xs text-neutral-text font-lexend-bold uppercase">
          set
        </Text>
        <Text className="flex-1/5 text-xs text-neutral-text  font-lexend-bold uppercase">
          weight
        </Text>
        <Text className="flex-1/5 text-xs text-neutral-text font-lexend-bold uppercase">
          reps
        </Text>
        <Text className="flex-2/5 text-xs text-neutral-text font-lexend-bold uppercase">
          Target
        </Text>
      </View>
      <View className="gap-4">
        <ExerciseListSortable
          onDragStart={onDragStart}
          onDrop={onDrop}
          items={items}
        />
        <ExerciseListButton
          onPress={() => onAddSet({ weight: 0, reps: 0, rpe: 0 })}
        />
      </View>
    </View>
  );
};

const DeleteAction = () => {
  return (
    <Pressable className="bg-red-500 w-20 rounded-lg items-center justify-center">
      <MaterialIcons name="delete" size={22} color="white" />
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
}: Set & {
  index: number;
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
      enabled={true}
      renderRightActions={() => <DeleteAction />}
      onSwipeableOpen={(direction) => {
        if (direction === 'right') {
          onDelete?.();
        }
      }}>
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
    <Swipeable
      renderRightActions={() => <DeleteAction />}
      onSwipeableOpen={(direction) => {
        if (direction === 'right') {
          onCancel();
        }
      }}
      overshootRight={false}>
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
    </Swipeable>
  );
};

const ExerciseListButton = (props: PressableProps) => {
  return (
    <Pressable
      {...props}
      className="border-2 rounded-md border-neutral-border border-dashed p-5">
      <View style={styles.addButtonContents}>
        <MaterialCommunityIcons
          style={[styles.addButtonText, styles.addButtonIcon]}
          size={20}
          name="plus"
        />
        <Text className="" style={[styles.addButtonText]}>
          Add Set
        </Text>
      </View>
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
        <MaterialCommunityIcons name="check" style={button} size={18} />
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

const ExerciseListSortable = ({
  onDragStart,
  onDrop,
  items,
}: {
  onDragStart?: (id: string, position: number) => void;
  onDrop?: (id: string, position: number) => void;
  items: Set[];
}) => {
  const renderItem = useCallback(
    (props: SortableRenderItemProps<Set>) => {
      const {
        item,
        id,
        positions,
        lowerBound,
        autoScrollDirection,
        itemsCount,
        itemHeight,
      } = props;

      return (
        <SortableItem
          key={id}
          id={id}
          data={item}
          positions={positions}
          lowerBound={lowerBound}
          autoScrollDirection={autoScrollDirection}
          itemsCount={itemsCount}
          itemHeight={itemHeight}
          containerHeight={1200}
          onMove={(currentId, from, to) => {
            console.log(`Item ${currentId} moved from ${from} to ${to}`);
          }}
          onDragStart={(id, position) => {
            console.log();
            if (onDragStart) {
              onDragStart(id, position);
            }
          }}
          onDrop={(id, position) => {
            if (onDrop) {
              onDrop(id, position);
            }
          }}>
          <ExerciseListItem
            id={item.id}
            index={item.index}
            rpe={item.rpe}
            weight={item.weight}
            reps={item.reps}
            done={item.done}
          />
        </SortableItem>
      );
    },
    [onDragStart, onDrop],
  );

  return (
    <Sortable
      data={items}
      itemKeyExtractor={(item) => item.id}
      renderItem={renderItem}
      itemHeight={45}
    />
  );
};
