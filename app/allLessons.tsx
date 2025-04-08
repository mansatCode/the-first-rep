import React from 'react';
import { Stack, useRouter } from 'expo-router';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utilities/color';
import LessonCard from '@/components/LessonCard';
import { LESSONS } from '@/constants/lessonData';

const allLessons = () => {
    const router = useRouter();

    // Handler function for when a lesson card is pressed
    const handleLessonPress = (id: string) => {
        router.push(`/lesson/${id}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.DEEP_BLUE },
                    headerTitleStyle: { color: Colors.WHITE, fontSize: 16 },
                    headerTintColor: Colors.WHITE,
                    title: "Lessons"
                }}
            />

            <ScrollView style={styles.scrollContainer}>
                {LESSONS.map((lesson) => (
                    <LessonCard
                        key={lesson.id}
                        title={lesson.title}
                        icon={<Ionicons
                            name={lesson.icon.name as any}
                            size={lesson.icon.size}
                            color={lesson.icon.color}
                        />}
                        onPress={() => handleLessonPress(lesson.id)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEEP_BLUE,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    scrollContainer: {
        flex: 1,
        marginTop: 8,
    }
});

export default allLessons;