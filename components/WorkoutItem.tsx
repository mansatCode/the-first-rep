import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/utilities/color';

// Workout Item Props Interface
export interface WorkoutItemProps {
    title: string;
    date: string;
    duration: string;
    weight: string;
    prs?: number;
    onPress?: () => void;
}

// Reusable Workout Component
const WorkoutItem: React.FC<WorkoutItemProps> = ({
    title,
    date,
    duration,
    weight,
    prs,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.workoutCard} onPress={onPress}>
            <View style={styles.workoutContent}>
                <View>
                    <Text style={styles.workoutTitle}>{title}</Text>
                    <Text style={styles.workoutDate}>{date}</Text>

                    <View style={styles.workoutStats}>
                        {/* Duration */}
                        <View style={styles.statItem}>
                            <Ionicons name="time-outline" size={14} color={Colors.WHITE} />
                            <Text style={styles.statText}>{duration}</Text>
                        </View>

                        {/* Weight */}
                        <View style={styles.statItem}>
                            <MaterialCommunityIcons name="weight" size={14} color={Colors.WHITE} />
                            <Text style={styles.statText}>{weight}</Text>
                        </View>

                        {/* PRs if available */}
                        {prs !== undefined && (
                            <View style={styles.statItem}>
                                <Ionicons name="trophy-outline" size={14} color={Colors.WHITE} />
                                <Text style={styles.statText}>{prs} PRs</Text>
                            </View>
                        )}
                    </View>
                </View>

                <Ionicons name="chevron-forward" size={20} color={Colors.WHITE} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
        marginRight: 16,
    },
    statText: {
        fontSize: 16,
        color: Colors.WHITE,
        marginLeft: 8,
    },
});

export default WorkoutItem;