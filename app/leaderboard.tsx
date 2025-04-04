import React from 'react';
import { Stack } from 'expo-router';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image
} from 'react-native';
import Colors from '@/utilities/color';
import FlowersSvg from '../assets/images/flowers.svg';
import GoldSvg from '../assets/images/gold.svg';
import SilverSvg from '../assets/images/silver.svg';
import BronzeSvg from '../assets/images/bronze.svg';
import DumbbellSvg from '../assets/images/dumbbell.svg';

const leaderboard = () => {
    // Mock data for the leaderboard
    const leaderboardData = [
        { id: 1, name: 'Victoria Park Pure Gym', score: 345, medal: 'gold' },
        { id: 2, name: 'Team Bath Gym', score: 230, medal: 'silver' },
        { id: 3, name: 'Bath Fitness First', score: 46, medal: 'bronze' },
    ];

    // User's gym data
    const userGym = {
        name: 'Spring Wharf Pure Gym',
        score: 18
    };

    // Render medal icon based on position
    interface LeaderboardItem {
        id: number;
        name: string;
        score: number;
        medal: 'gold' | 'silver' | 'bronze';
    }

    interface UserGym {
        name: string;
        score: number;
    }

    const renderMedal = (medal: 'gold' | 'silver' | 'bronze'): JSX.Element | null => {
        if (medal === 'gold') {
            return (
                <GoldSvg width={30} height={36} />
            );
        } else if (medal === 'silver') {
            return (
                <SilverSvg width={30} height={36} />
            );
        } else if (medal === 'bronze') {
            return (
                <BronzeSvg width={30} height={36} />
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.DEEP_BLUE },
                    headerTitleStyle: { color: Colors.WHITE, fontSize: 16 },
                    headerTintColor: Colors.WHITE,
                    title: "Leaderboard"
                }}
            />

            {/* City Title */}
            <Text style={styles.cityTitle}>City of Bath</Text>

            {/* Leaderboard List */}
            <View style={styles.leaderboardContainer}>
                {leaderboardData.map((item) => (
                    <View key={item.id} style={styles.leaderboardItem}>
                        {renderMedal(item.medal)}
                        <Text style={styles.gymName}>{item.name}</Text>
                        <Text style={styles.score}>{item.score}</Text>
                    </View>
                ))}
            </View>

            {/* User's Gym Section */}
            <View style={styles.userGymSection}>
                <Text style={styles.userGymLabel}>Your Gym</Text>
                <Text style={styles.userGymName}>{userGym.name}</Text>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>Score </Text>
                    <Text style={styles.userScore}>{userGym.score}</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                    <DumbbellSvg width={28} height={17} />
                </View>
            </View>

            {/* Bottom Illustration */}
            <FlowersSvg width={400} height={250} marginTop={10} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEEP_BLUE,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    cityTitle: {
        color: Colors.WHITE,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    leaderboardContainer: {
        backgroundColor: Colors.DARK_BLUE,
        marginBottom: 24,
        padding: 10,
        borderRadius: 12,
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DARK_BLUE,
        borderColor: Colors.LIGHT_BLUE,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
    },
    medalCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    goldMedal: {
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
    },
    silverMedal: {
        backgroundColor: 'rgba(192, 192, 192, 0.2)',
    },
    bronzeMedal: {
        backgroundColor: 'rgba(205, 127, 50, 0.2)',
    },
    medalText: {
        fontSize: 16,
    },
    gymName: {
        color: 'white',
        fontSize: 16,
        flex: 1,
        marginLeft: 12,
    },
    score: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userGymSection: {
        marginBottom: 24,
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
        padding: 10,
    },
    userGymLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    userGymBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 16,
    },
    userGymName: {
        backgroundColor: Colors.DEEP_BLUE,
        color: Colors.WHITE,
        fontSize: 16,
        borderRadius: 12,
        paddingVertical: 10,
        marginBottom: 8,
        textAlign: 'center',
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    scoreLabel: {
        color: Colors.WHITE,
        fontSize: 16,
    },
    userScore: {
        color: Colors.GREEN,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default leaderboard;