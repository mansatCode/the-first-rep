import Colors from '@/utilities/color';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';
import YogaSvg from '../../assets/images/yoga.svg';

// Import the WorkoutItem component
import WorkoutItem from '@/components/WorkoutItem';
import useHealthData from '@/hooks/useHealthData';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Helper function to format duration from seconds to "Xh Ym" format
const formatDuration = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}hr ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export default function Page() {
  const [date, setDate] = useState(new Date());
  const { exerciseSessions } = useHealthData(date);

  return (
    <SafeAreaView style={styles.container}>
      {exerciseSessions ? (
        <ScrollView style={styles.content}>
          {exerciseSessions.map(session => (
            <WorkoutItem
              key={session.id}
              title={session.title || "Workout"}
              date={formatDate(session.startTimestamp)}
              duration={formatDuration(session.duration)}
              onPress={() => console.log(`Pressed: ${session.title}`)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <YogaSvg height={300} width={300} />
          <Text style={styles.noDataText}>No workout history found</Text>
          <Text style={styles.noDataSubText}>
            Try connecting your fitness tracker or logging a workout in Health Connect. Remember, only workouts from the past week are shown!
          </Text>
        </View>
      )}
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 100,
  },
  noDataText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  noDataSubText: {
    color: Colors.LIGHT_BLUE,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
});