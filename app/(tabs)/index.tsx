import { ThemedView } from '@/components/themed-view';
import EditCard from '@/components/ui/card';
import { ExerciseList, ExerciseListItem } from '@/components/ui/exercise-list';
import { Progress, ProgressPoint } from '@/components/ui/progress';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="bg-background flex flex-col gap-3 min-h-full p-5">
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
      <Text className="font-lexend-extraBold text-2xl uppercase text-white">
        Add exercises
      </Text>
      <Text className="text-muted-alt font-lexend-extraLight text-sm">
        Structure your workout with precision sets and reps.
      </Text>
      <View style={styles.stepContainer}></View>

      <EditCard
        title="Hypertrophy Chest & Triceps"
        subTitle="Current template"
      />
      <ExerciseList>
        <ExerciseListItem />
        <ExerciseListItem />
        <ExerciseListItem />
      </ExerciseList>

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
    </ScrollView>
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
