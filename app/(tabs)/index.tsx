import { ThemedView } from '@/components/themed-view';
import { Progress, ProgressPoint } from '@/components/ui/progress';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="bg-background px-5">
      <Progress>
        <ProgressPoint />
        <ProgressPoint />
        <ProgressPoint />
      </Progress>
      <View style={styles.stepContainer}></View>
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
    </View>
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
