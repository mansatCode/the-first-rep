import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utilities/color';

// Workout Item Props Interface
export interface WorkoutItemProps {
    title: string;
    date: string;
    duration: string;
    onPress?: () => void;
}

// Reusable Workout Component
const WorkoutItem: React.FC<WorkoutItemProps> = ({
    title,
    date,
    duration,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.workoutCard} onPress={onPress}>
            <View style={styles.workoutContent}>
                <View style={styles.row}>
                    <Text style={styles.workoutTitle}>{title}</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.WHITE} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.workoutDate}>{date}</Text>
                    <View style={styles.statItem}>
                        <Ionicons name="time-outline" size={18} color={Colors.WHITE} />
                        <Text style={styles.statText}>{duration}</Text>
                    </View>
                </View>


            </View>
        </TouchableOpacity>
    );
};

// Styles
const styles = StyleSheet.create({
    workoutCard: {
        marginBottom: 10,
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
    },
    workoutContent: {
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    workoutTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.WHITE,
        marginBottom: 4,
    },
    workoutDate: {
        fontSize: 16,
        color: Colors.LIGHT_BLUE,
        marginBottom: 8,
    },
    workoutStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    statText: {
        fontSize: 16,
        color: Colors.WHITE,
        marginLeft: 8,
    },
});

export default WorkoutItem;