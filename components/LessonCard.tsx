import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utilities/color';

// Define the Lesson interface
export interface Lesson {
    id: string;
    title: string;
    isRead: boolean;
    icon: React.ReactNode;
}

// LessonCard Props interface
export interface LessonCardProps {
    lesson: Lesson;
    onPress: () => void;
}

// Lesson Card Component
const LessonCard: React.FC<LessonCardProps> = ({ lesson, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.lessonCard,
                lesson.isRead ? styles.lessonCardRead : null,
            ]}
            onPress={onPress}
        >
            <View style={styles.lessonContent}>
                {lesson.icon}
                <Text style={styles.lessonTitle}>{lesson.title}</Text>

                {/* Right icon - check if read, chevron if not */}
                {lesson.isRead ? (
                    <Ionicons name="checkmark" size={22} color={Colors.WHITE} />
                ) : (
                    <Ionicons name="chevron-forward" size={20} color={Colors.WHITE} />
                )}
            </View>
        </TouchableOpacity>
    );
};

// Styles
const styles = StyleSheet.create({
    lessonCard: {
        backgroundColor: Colors.DARK_BLUE,
        borderColor: Colors.LIGHT_BLUE,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 8,
    },
    lessonCardRead: {
        backgroundColor: Colors.CHECKED_GREEN,
    },
    lessonContent: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    lessonTitle: {
        flex: 1,
        fontSize: 15,
        color: Colors.WHITE,
        marginLeft: 12,
    },
});

export default LessonCard;