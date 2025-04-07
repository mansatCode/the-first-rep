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
import LessonCard from '../../components/LessonCard';
import DumbbellSvg from '../../assets/images/dumbbell.svg';
import GoalsCard from '../../components/GoalsCard';
import { useNavigation } from '@react-navigation/native';

export default function Page() {
  const navigation = useNavigation();
  const [showManageGoals, setShowManageGoals] = useState(false);

  const handleLessonPress = () => {
    navigation.navigate('allLessons');
  };

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
          <LessonCard
            title='View all'
            icon={<Ionicons name="book" size={20} color={Colors.WHITE} />}
            onPress={() => handleLessonPress()}
          />
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