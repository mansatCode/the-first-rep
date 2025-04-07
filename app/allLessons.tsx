import React from 'react';
import { Stack } from 'expo-router';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utilities/color';
import LessonCard from '@/components/LessonCard';

const allLessons = () => {
    // Handler function for when a lesson card is pressed
    const handleLessonPress = (title: string) => {
        console.log(title);
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
                <LessonCard
                    title="The benefits of strength training"
                    icon={<Ionicons name="flash" size={24} color={Colors.WHITE} />}
                    onPress={() => handleLessonPress("The benefits of strength training")}
                />

                <LessonCard
                    title="What is progressive overload?"
                    icon={<Ionicons name="calculator-outline" size={24} color={Colors.WHITE} />}
                    onPress={() => handleLessonPress("What is progressive overload?")}
                />

                <LessonCard
                    title="How often should I strength train?"
                    icon={<Ionicons name="time-outline" size={24} color={Colors.WHITE} />}
                    onPress={() => handleLessonPress("How often should I strength train?")}
                />
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