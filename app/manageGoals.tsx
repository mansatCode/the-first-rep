import React from 'react';
import { Stack } from 'expo-router';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import Colors from '@/utilities/color';

const manageGoals = () => {
    // Mock data
    const workoutsPerWeek = 0;

    const handlePress = () => {
        console.log('ManageGoalsScreen pressed');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.DEEP_BLUE },
                    headerTitleStyle: { color: Colors.WHITE, fontSize: 16 },
                    headerTintColor: Colors.WHITE,
                    title: "Manage Goals"
                }}
            />

            {/* Workouts Per Week Setting */}
            <TouchableOpacity
                style={styles.settingItem}
                onPress={handlePress}
            >
                <Text style={styles.settingLabel}>Workouts / Week</Text>
                <Text style={styles.settingValue}>{workoutsPerWeek}</Text>
            </TouchableOpacity>


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
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 12,
        marginBottom: 8,
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
    },
    settingLabel: {
        fontSize: 16,
        color: Colors.WHITE,
    },
    settingValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.GREEN,
    },
});

export default manageGoals;