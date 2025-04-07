import React from 'react';
import { Stack } from 'expo-router';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import Colors from '@/utilities/color';

const lessons = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.DEEP_BLUE },
                    headerTitleStyle: { color: Colors.WHITE, fontSize: 16 },
                    headerTintColor: Colors.WHITE,
                    title: "Leaderboard"
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
});

export default lessons;