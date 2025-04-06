import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/utilities/color';

interface FloatingActionButtonProps {
    onPress: () => void;
}

export default function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
    return (
        <TouchableOpacity
            style={styles.fab}
            onPress={onPress}
        >
            <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
});