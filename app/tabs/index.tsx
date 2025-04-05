import Colors from '@/utilities/color';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import LessonCard, { Lesson } from '../../components/LessonCard';
import DumbbellSvg from '../../assets/images/dumbbell.svg';
import GoalsCard from '../../components/GoalsCard';
import { useNavigation } from '@react-navigation/native';

export default function Page() {
  const navigation = useNavigation();
  const [showManageGoals, setShowManageGoals] = useState(false);

  // Sample lessons data with read status
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'The benefits of strength training',
      isRead: false,
      icon: <MaterialCommunityIcons name="lightning-bolt" size={20} color={Colors.WHITE} />,
    },
    {
      id: '2',
      title: 'What is progressive overload?',
      isRead: false,
      icon: <MaterialCommunityIcons name="sigma" size={20} color={Colors.WHITE} />,
    },
    {
      id: '3',
      title: 'How often should I strength train?',
      isRead: false,
      icon: <Ionicons name="time-outline" size={20} color={Colors.WHITE} />,
    },
  ]);

  // Handle lesson press - toggle read status
  const handleLessonPress = (id: string) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, isRead: !lesson.isRead } : lesson
      )
    );
  };

  // Handle manage goals press
  const handleManageGoalsPress = () => {
    setShowManageGoals(true);
    navigation.navigate('manageGoals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Quote Section */}
        <TouchableOpacity style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            Placeholder Quote
          </Text>
          <Text style={styles.quoteAuthor}>Author</Text>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <DumbbellSvg width={28} height={17} />
          </View>
        </TouchableOpacity>

        {/* Lessons Section */}
        <View style={styles.lessonsSection}>
          <Text style={styles.sectionTitle}>Lessons</Text>

          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onPress={() => handleLessonPress(lesson.id)}
            />
          ))}
        </View>

        {/* Goals Section */}
        <GoalsCard onManageGoalsPress={handleManageGoalsPress} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
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
  quoteContainer: {
    padding: 16,
    backgroundColor: Colors.DARK_BLUE,
    borderRadius: 12,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.LIGHT_BLUE,
    fontWeight: '600',
    marginBottom: 4,
  },
  quoteIcon: {
    marginTop: 2,
  },
  lessonsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.DARK_BLUE,
    borderRadius: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.WHITE,
    marginBottom: 12,
    marginLeft: 4,
  },
});