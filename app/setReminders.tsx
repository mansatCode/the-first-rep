import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import Colors from '@/utilities/color';
import FloatingActionButton from '@/components/FloatingActionButton';

export default function setReminders() {
    const handleButtonPress = () => {
        console.log("Floating Action Button pressed");
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.DEEP_BLUE },
                    headerTitleStyle: { color: Colors.WHITE, fontSize: 16 },
                    headerTintColor: Colors.WHITE,
                    title: "Reminders"
                }}
            />

            <FloatingActionButton onPress={handleButtonPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEEP_BLUE,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.PURPLE,
        justifyContent: 'center',
        alignItems: 'center',
        right: 25,
        bottom: 80,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    fabIcon: {
        fontSize: 24,
        color: Colors.WHITE,
        fontWeight: 'bold',
    }
})