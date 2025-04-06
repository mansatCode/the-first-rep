import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import Colors from '@/utilities/color';
import FloatingActionButton from '../components/FloatingActionButton';
import TimePickerDialog from '../components/TimePickerDialog';
import ReminderItem from '../components/ReminderItem';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for our reminder objects
interface Reminder {
    id: string;
    time: {
        hour: number;
        minute: number;
    };
    initialDay?: string;
    title?: string;
    selectedDays?: string[];
    isEnabled?: boolean;
    notificationIds?: string[];
}

// AsyncStorage key
const STORAGE_KEY = '@reminders_data';

export default function setReminders() {
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedHour, setSelectedHour] = useState(new Date().getHours());
    const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
    // Add state for storing reminders
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load reminders from AsyncStorage on mount
    useEffect(() => {
        loadReminders();

        // Configure notification handler
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    }, []);

    // Load reminders from AsyncStorage
    const loadReminders = async () => {
        try {
            setIsLoading(true);
            const savedReminders = await AsyncStorage.getItem(STORAGE_KEY);

            if (savedReminders !== null) {
                const parsedReminders = JSON.parse(savedReminders) as Reminder[];
                setReminders(parsedReminders);
            } else {
                console.log('No saved reminders found');
            }
        } catch (error) {
            console.error('Failed to load reminders:', error);
            Alert.alert(
                'Error',
                'Failed to load your reminders. Please restart the app.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Save reminders to AsyncStorage
    const saveReminders = async (updatedReminders: Reminder[] = reminders) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReminders));
            return true;
        } catch (error) {
            console.error('Failed to save reminders:', error);
            Alert.alert(
                'Error',
                'Failed to save your reminders. Please try again.',
                [{ text: 'OK' }]
            );
            return false;
        }
    };

    const handleButtonPress = () => {
        console.log("Floating Action Button pressed");
        setTimePickerVisible(true);
    };

    const handleTimeConfirm = async (hour: number, minute: number) => {
        setSelectedHour(hour);
        setSelectedMinute(minute);
        console.log(`Time selected: ${hour}:${minute}`);

        // Create a new reminder with no days selected
        const newReminder: Reminder = {
            id: Date.now().toString(), // Simple unique ID
            time: {
                hour,
                minute
            },
            title: "Reminder",
            selectedDays: [], // No days selected initially
            isEnabled: true,
            notificationIds: []
        };

        // Add the new reminder to the list and save
        const updatedReminders = [...reminders, newReminder];
        setReminders(updatedReminders);
        await saveReminders(updatedReminders);
    };

    const handleReminderDelete = async (id: string) => {
        console.log(`Deleting reminder with id: ${id}`);
        const updatedReminders = reminders.filter(reminder => reminder.id !== id);
        setReminders(updatedReminders);
        await saveReminders(updatedReminders);
    };

    const handleReminderUpdate = async (id: string, updatedData: Partial<Reminder>) => {
        console.log(`Updating reminder with id: ${id}`, updatedData);

        // Create updated reminders array
        const updatedReminders = reminders.map(reminder =>
            reminder.id === id
                ? { ...reminder, ...updatedData }
                : reminder
        );

        // Update state
        setReminders(updatedReminders);

        // Persist to storage immediately
        await saveReminders(updatedReminders);
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

            <ScrollView style={styles.remindersList}>
                {reminders.map(reminder => (
                    <ReminderItem
                        key={reminder.id}
                        id={reminder.id}
                        time={reminder.time}
                        onDelete={handleReminderDelete}
                        initialDay={reminder.initialDay}
                        notificationIds={reminder.notificationIds}
                        onUpdate={handleReminderUpdate}
                        title={reminder.title}
                        selectedDays={reminder.selectedDays}
                        isEnabled={reminder.isEnabled}
                    />
                ))}
            </ScrollView>

            <FloatingActionButton onPress={handleButtonPress} />

            <TimePickerDialog
                visible={timePickerVisible}
                onClose={() => setTimePickerVisible(false)}
                onConfirm={handleTimeConfirm}
                initialHour={selectedHour}
                initialMinute={selectedMinute}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEEP_BLUE,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    remindersList: {
        flex: 1,
    }
});