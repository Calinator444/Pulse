import { ThemedView } from '@/components/themed-view';
import AddButton from '@/components/ui/add-button';
import EditCard from '@/components/ui/card';

import {
  ExerciseList,
  ExerciseListButton,
  ExerciseListItem,
  ExerciseListNewItem,
} from '@/components/ui/exercise-list';
import { Progress, ProgressPoint } from '@/components/ui/progress';
import { supabase } from '@/utils/supabase';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Set = {
  key: string;
  rpe: number;
  reps: number;
  weight: number;
  done: boolean;
};

export default function HomeScreen() {
  const [addingItems, setAddingItems] = React.useState<{ key: string }[]>([]);
  const [sets, setSets] = React.useState<Set[]>([
    { key: crypto.randomUUID(), rpe: 8, reps: 10, weight: 80, done: false },
    { key: crypto.randomUUID(), rpe: 8, reps: 10, weight: 80, done: false },
    { key: crypto.randomUUID(), rpe: 8, reps: 10, weight: 80, done: false },
  ]);
  useEffect(() => {
    const getTodos = async () => {
      let result = await supabase.from('workouts').select('id, sets (rpe) ');
      console.log('Result:', result);
    };

    getTodos();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background ">
        <ScrollView contentContainerClassName="gap-8 p-5" className="">
          <Image
            source={require('../../assets/images/pulse-logo.png')}
            style={{ width: 109, height: 32 }}
          />
          <Progress className="mt-8">
            <ProgressPoint label="details">
              <Text className="text-primary-foreground left-1/2 top-1/2 -translate-x-1/2 absolute -translate-y-1/2">
                <MaterialIcons name="check" size={18} color="black" />
              </Text>
            </ProgressPoint>
            <ProgressPoint variant="active" label="exercises">
              <Text className="text-primary-foreground left-1/2 top-1/2 -translate-x-1/2 absolute -translate-y-1/2">
                <MaterialCommunityIcons name="flag-outline" size={18} />
              </Text>
            </ProgressPoint>
            <ProgressPoint variant="inactive" label="finish">
              <Text className="text-white/50 left-1/2 top-1/2 -translate-x-1/2 absolute -translate-y-1/2">
                <MaterialCommunityIcons name="flag-outline" size={18} />
              </Text>
            </ProgressPoint>
          </Progress>
          <View>
            <Text className="font-lexend-extraBold text-2xl uppercase text-white">
              Add exercises
            </Text>
            <Text className="text-muted-alt font-lexend-extraLight text-sm">
              Structure your workout with precision sets and metrics.
            </Text>
          </View>

          <EditCard
            title="Hypertrophy Chest & Triceps"
            subTitle="Current template"
          />
          <ExerciseList>
            {sets.map(({ key, ...set }, index) => (
              <ExerciseListItem
                index={index}
                key={key}
                {...set}
                onCompleteChanged={(val) =>
                  setSets([
                    ...sets.slice(0, index),
                    { ...set, done: val, key },
                    ...sets.slice(index + 1),
                  ])
                }
                onDelete={() => setSets(sets.filter((s) => s.key !== key))}
              />
            ))}

            {addingItems.map((item, index) => (
              <ExerciseListNewItem
                key={item.key}
                index={sets.length + index}
                onSave={({ weight, reps, rpe }) => {
                  setSets([
                    ...sets,
                    {
                      key: crypto.randomUUID(),
                      rpe,
                      reps,
                      weight,
                      done: false,
                    },
                  ]);
                  setAddingItems([]);
                }}
                onCancel={() => setAddingItems([])}
              />
            ))}
            <ExerciseListButton
              onPress={() =>
                setAddingItems([...addingItems, { key: crypto.randomUUID() }])
              }
            />
          </ExerciseList>

          <AddButton label="add next exercise"></AddButton>

          <ThemedView style={styles.stepContainer}>
            <Link href="/modal">
              <Link.Trigger></Link.Trigger>
              <Link.Preview />
              <Link.Menu>
                <Link.MenuAction
                  title="Action"
                  icon="cube"
                  onPress={() => alert('Action pressed')}
                />
                <Link.MenuAction
                  title="Share"
                  icon="square.and.arrow.up"
                  onPress={() => alert('Share pressed')}
                />
                <Link.Menu title="More" icon="ellipsis">
                  <Link.MenuAction
                    title="Delete"
                    icon="trash"
                    destructive
                    onPress={() => alert('Delete pressed')}
                  />
                </Link.Menu>
              </Link.Menu>
            </Link>
          </ThemedView>

          {/* <View className="flex-row gap-2">
            <TextInput
              value={newTask}
              onChangeText={setNewTask}
              placeholder="New todo..."
              placeholderTextColor="#666"
              className="flex-1 bg-white/10 rounded-lg px-4 py-3 text-white font-lexend-extraLight"
            />
            <Pressable
              onPress={addTodo}
              className="bg-white rounded-lg px-4 justify-center">
              <Text className="text-black font-lexend-extraBold text-sm">
                Add
              </Text>
            </Pressable>
          </View> */}

          {/* {todos.length > 0 ? (
            <View>
              <Text className="font-lexend-extraBold text-xl uppercase text-white mb-2">
                Todos
              </Text>
              {todos.map((item) => (
                <Text
                  key={item.id}
                  className="text-white font-lexend-extraLight text-sm mb-1">
                  {item.task}
                </Text>
              ))}
            </View>
          ) : (
            <Text className="text-white">No Todos yet</Text>
          )} */}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
