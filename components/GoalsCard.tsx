import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Colors from '@/utilities/color';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface GoalsCardProps {
    weeklyGoal: number;
    onManageGoalsPress: (weeklyGoal: number) => void;
}

const GoalsCard: React.FC<GoalsCardProps> = ({ weeklyGoal, onManageGoalsPress }) => {
    // Mock data - could be props in a real app
    const workoutsRemaining = 1;
    const weeklyStreak = 1;
    const completedWorkouts = 1;

    // Calculate progress percentage for the circle
    const progressPercentage = weeklyGoal > 0
        ? Math.min(100, (completedWorkouts / weeklyGoal) * 100)
        : 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Goals</Text>
                <Text style={styles.subtitle}>Hey champ, one final push!</Text>
            </View>

            <View style={styles.content}>
                {/* Progress Circle */}
                <View style={styles.progressContainer}>
                    <AnimatedCircularProgress
                        size={140}
                        width={15}
                        fill={progressPercentage}
                        tintColor={Colors.PURPLE}
                        backgroundColor={Colors.WHITE}
                        rotation={0}
                        lineCap="round"
                    >
                        {() => (
                            <View style={styles.progressTextContainer}>
                                <Text style={styles.progressNumber}>{workoutsRemaining}</Text>
                                <Text style={styles.progressLabel}>
                                    workout{workoutsRemaining !== 1 ? 's' : ''}{'\n'}remaining
                                </Text>
                            </View>
                        )}
                    </AnimatedCircularProgress>
                </View>

                {/* Info Cards */}
                <View style={styles.infoCardsContainer}>
                    {/* Weekly Workout Goal Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardTitle}>Weekly Workout Goal</Text>
                        <View style={styles.infoCardContent}>
                            <Ionicons name="calendar-outline" size={18} color={Colors.GREEN} />
                            <Text style={styles.infoCardValue}>{weeklyGoal}</Text>
                        </View>
                    </View>

                    {/* Weekly Streak Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardTitle}>Weekly Streak</Text>
                        <View style={styles.infoCardContent}>
                            <MaterialCommunityIcons name="fire" size={18} color={Colors.ORANGE} />
                            <Text style={styles.infoCardValue}>{weeklyStreak}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Manage Goals Button */}
            <TouchableOpacity
                style={styles.manageButton}
                onPress={() => {
                    console.log('Manage Goals button pressed');
                    onManageGoalsPress(weeklyGoal);
                }}
            >
                <Text style={styles.manageButtonText}>Manage Goals</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.WHITE,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.LIGHT_BLUE,
        marginTop: 2,
        fontWeight: '600',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    progressContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressNumber: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.WHITE,
        textAlign: 'center',
    },
    progressLabel: {
        fontSize: 12,
        color: Colors.WHITE,
        textAlign: 'center',
    },
    infoCardsContainer: {
        flex: 1,
        marginLeft: 8,
    },
    infoCard: {
        backgroundColor: Colors.DEEP_BLUE,
        borderColor: Colors.LIGHT_BLUE,
        borderWidth: 1,
        borderRadius: 12,
        padding: 8,
        marginBottom: 6,
    },
    infoCardTitle: {
        fontSize: 15,
        color: Colors.WHITE,
        marginBottom: 2,
    },
    infoCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoCardValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.WHITE,
        marginLeft: 8,
    },
    manageButton: {
        backgroundColor: Colors.PURPLE,
        borderRadius: 12,
        paddingVertical: 8,
        alignItems: 'center',
        marginHorizontal: 100,
        justifyContent: 'center',
    },
    manageButtonText: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: '600',
    },
});

export default GoalsCard;