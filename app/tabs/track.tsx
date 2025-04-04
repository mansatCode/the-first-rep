import Colors from '@/utilities/color';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';

// Import the WorkoutItem component
import WorkoutItem, { WorkoutItemProps } from '@/components/WorkoutItem';

export default function Page() {
  // Sample workout data
  const workouts = [
    {
      id: '1',
      title: 'Back and Bis',
      date: '17 September 2025',
      duration: '1hr 3m',
      weight: '7,989 kg',
      prs: 2,
    },
    {
      id: '2',
      title: 'Chest Day',
      date: '14 September 2025',
      duration: '1hr 7m',
      weight: '5,490 kg',
      prs: undefined,
    },
    {
      id: '3',
      title: 'Shoulder Workout',
      date: '10 September 2025',
      duration: '1hr 3m',
      weight: '3,000 kg',
      prs: 1,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Workout List */}
      <ScrollView style={styles.content}>
        {workouts.map(workout => (
          <WorkoutItem
            key={workout.id}
            title={workout.title}
            date={workout.date}
            duration={workout.duration}
            weight={workout.weight}
            prs={workout.prs}
            onPress={() => console.log(`Selected workout: ${workout.title}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEEP_BLUE,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  content: {
    flex: 1,
  },
});
