import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utilities/color';

// LessonCard Props interface
export interface LessonCardProps {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
}

// Lesson Card Component
const LessonCard: React.FC<LessonCardProps> = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.lessonCard}
            onPress={onPress}
        >
            <View style={styles.lessonContent}>
                {icon}
                <Text style={styles.lessonTitle}>{title}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.WHITE} />
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