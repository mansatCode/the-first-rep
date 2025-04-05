import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Modal,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/utilities/color';
import { useGoals } from '../contexts/GoalsContext';

const manageGoals = () => {
    const navigation = useNavigation();
    const { weeklyGoal, setWeeklyGoal, isLoading } = useGoals();

    console.log("ManageGoals screen: Current weeklyGoal from context:", weeklyGoal);

    // State for modal visibility and local workouts value
    const [modalVisible, setModalVisible] = useState(false);
    const [localWorkoutsPerWeek, setLocalWorkoutsPerWeek] = useState(weeklyGoal);

    // Initialize local state from context
    useEffect(() => {
        console.log("ManageGoals: Context weeklyGoal changed to", weeklyGoal);
        setLocalWorkoutsPerWeek(weeklyGoal);
    }, [weeklyGoal]);

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleWorkoutSelection = (number: number) => {
        console.log("Selected new workout count:", number);
        setLocalWorkoutsPerWeek(number);
        setModalVisible(false);
    };

    const handleSave = () => {
        console.log("Save clicked, updating weekly goal from", weeklyGoal, "to", localWorkoutsPerWeek);

        // Update the context value
        setWeeklyGoal(localWorkoutsPerWeek);

        // Navigate back
        navigation.goBack();
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
                <Text style={styles.settingValue}>{localWorkoutsPerWeek}</Text>
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
                                        localWorkoutsPerWeek === item && styles.selectedOptionButton
                                    ]}
                                    onPress={() => handleWorkoutSelection(item)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        localWorkoutsPerWeek === item && styles.selectedOptionText
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
    debugContainer: {
        padding: 12,
        marginBottom: 8,
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.LIGHT_BLUE,
    },
    debugText: {
        fontSize: 14,
        color: Colors.WHITE,
        textAlign: 'center',
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