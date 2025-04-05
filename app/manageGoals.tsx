import React, { useState } from 'react';
import { Stack } from 'expo-router';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Modal,
    View,
} from 'react-native';
import Colors from '@/utilities/color';

const manageGoals = () => {
    // State for workout count and modal visibility
    const [workoutsPerWeek, setWorkoutsPerWeek] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleWorkoutSelection = (number: number) => {
        setWorkoutsPerWeek(number);
        setModalVisible(false);
    };

    const handleSave = () => {
        console.log("Save clicked");
    };

    // Generate options 1-7 for workout selection
    const workoutOptions = Array.from({ length: 7 }, (_, i) => i + 1);

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

            {/* Workout Selection Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select target workouts per week</Text>

                        <View style={styles.optionsContainer}>
                            {workoutOptions.map(item => (
                                <TouchableOpacity
                                    key={item.toString()}
                                    style={[
                                        styles.optionButton,
                                        workoutsPerWeek === item && styles.selectedOptionButton
                                    ]}
                                    onPress={() => handleWorkoutSelection(item)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        workoutsPerWeek === item && styles.selectedOptionText
                                    ]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Save Button */}
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
            >
                <Text style={styles.saveButtonText}>Save</Text>
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    optionButton: {
        width: 50,
        height: 50,
        margin: 8,
        backgroundColor: Colors.DEEP_BLUE,
        borderColor: Colors.LIGHT_BLUE,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedOptionButton: {
        backgroundColor: Colors.GREEN,
        borderColor: Colors.LIGHT_BLUE,
    },
    optionText: {
        fontSize: 16,
        color: Colors.WHITE,
    },
    selectedOptionText: {
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.LIGHT_BLUE,
        borderRadius: 8,
    },
    cancelText: {
        fontSize: 16,
        color: Colors.WHITE,
    },
    saveButton: {
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginHorizontal: 100,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
});

export default manageGoals;