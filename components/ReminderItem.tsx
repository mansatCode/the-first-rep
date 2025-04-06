import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Colors from '@/utilities/color';
import * as Notifications from 'expo-notifications';
import TimePickerDialog from './TimePickerDialog';

interface ReminderItemProps {
    id: string;
    time: {
        hour: number;
        minute: number;
    };
    onDelete: (id: string) => void;
    initialDay?: string;
    notificationIds?: string[];
    onUpdate: (id: string, updatedData: any) => void;
    title?: string;
    selectedDays?: string[];
    isEnabled?: boolean;
}

// Configure notification settings
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function ReminderItem({
    id,
    time,
    onDelete,
    initialDay,
    notificationIds = [],
    onUpdate,
    title: initialTitle = "Reminder",
    selectedDays: initialSelectedDays = [],
    isEnabled: initialIsEnabled = true
}: ReminderItemProps) {
    const [isEnabled, setIsEnabled] = useState(initialIsEnabled);
    const [selectedDays, setSelectedDays] = useState<string[]>(initialSelectedDays);
    const [title, setTitle] = useState(initialTitle);
    const [reminderTime, setReminderTime] = useState(time);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [savedNotificationIds, setSavedNotificationIds] = useState<string[]>(notificationIds);
    const [isUpdating, setIsUpdating] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const titleInputRef = useRef<TextInput>(null);

    // Map day abbreviations to full names and weekday numbers (1-7 where 1 is Sunday)
    const dayMap: { [key: string]: { name: string, weekday: number } } = {
        'M': { name: 'Mon', weekday: 2 },   // Monday is 2
        'T': { name: 'Tue', weekday: 3 },   // Tuesday is 3
        'W': { name: 'Wed', weekday: 4 },   // Wednesday is 4
        'Th': { name: 'Thu', weekday: 5 },  // Thursday is 5
        'F': { name: 'Fri', weekday: 6 },   // Friday is 6
        'S': { name: 'Sat', weekday: 7 },   // Saturday is 7
        'Su': { name: 'Sun', weekday: 1 },  // Sunday is 1
    };

    const days = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

    // Update local state when props change
    useEffect(() => {
        if (initialTitle !== title) setTitle(initialTitle);
        if (initialSelectedDays && JSON.stringify(initialSelectedDays) !== JSON.stringify(selectedDays)) {
            setSelectedDays(initialSelectedDays);
        }
        if (initialIsEnabled !== isEnabled) setIsEnabled(initialIsEnabled);
        if (notificationIds && JSON.stringify(notificationIds) !== JSON.stringify(savedNotificationIds)) {
            setSavedNotificationIds(notificationIds);
        }
        if (time && (time.hour !== reminderTime.hour || time.minute !== reminderTime.minute)) {
            setReminderTime(time);
        }
    }, [initialTitle, initialSelectedDays, initialIsEnabled, notificationIds, time]);

    // Request notification permissions
    useEffect(() => {
        (async () => {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'You need to grant notification permissions to set reminders.',
                    [{ text: 'OK' }]
                );
            }
        })();
    }, []);

    // Update all notifications based on current settings
    const updateAllNotifications = async (shouldBeEnabled: boolean) => {
        if (isUpdating) return false; // Prevent multiple simultaneous updates

        try {
            setIsUpdating(true);

            // Cancel all existing notifications
            await cancelPreviousNotifications();

            // Only schedule new ones if we should be enabled and days are selected
            if (shouldBeEnabled && selectedDays.length > 0) {
                // Schedule new notifications for each selected day
                const newNotificationIds: string[] = [];

                for (const day of selectedDays) {
                    const weekday = dayMap[day].weekday;
                    const notificationId = await scheduleNotificationForDay(weekday);
                    if (notificationId) {
                        newNotificationIds.push(notificationId);
                    }
                }

                // Update the saved notification IDs
                setSavedNotificationIds(newNotificationIds);

                // Persist to storage with enabled state
                await onUpdate(id, {
                    title,
                    time: reminderTime,
                    selectedDays,
                    isEnabled: true,
                    notificationIds: newNotificationIds
                });

                console.log(`Updated ${newNotificationIds.length} notifications for reminder ${id}`);
                return true;
            } else {
                // Just persist the disabled state
                setSavedNotificationIds([]);
                await onUpdate(id, {
                    title,
                    time: reminderTime,
                    selectedDays,
                    isEnabled: false,
                    notificationIds: []
                });

                if (!shouldBeEnabled) {
                    console.log(`Disabled all notifications for reminder ${id}`);
                } else if (selectedDays.length === 0) {
                    console.log(`No days selected for reminder ${id}`);
                }
                return shouldBeEnabled === false; // Return true only if we meant to disable
            }
        } catch (error) {
            console.error('Error updating notifications:', error);
            Alert.alert(
                'Error',
                'Failed to update notifications. Please try again.',
                [{ text: 'OK' }]
            );
            return false;
        } finally {
            setIsUpdating(false);
        }
    };

    // Toggle switch and handle notifications accordingly
    const toggleSwitch = async () => {
        const newEnabledValue = !isEnabled;
        console.log(`Attempting to change reminder ${id} toggle to: ${newEnabledValue}`);

        // If trying to enable but no days are selected, show message and don't proceed
        if (newEnabledValue && selectedDays.length === 0) {
            Alert.alert(
                'No Days Selected',
                'Please select at least one day for this reminder.',
                [{ text: 'OK' }]
            );
            return;
        }

        // Update local state immediately for responsive UI
        setIsEnabled(newEnabledValue);

        // Then update all notifications based on new state
        const success = await updateAllNotifications(newEnabledValue);

        // If updating notifications failed and we were trying to enable,
        // revert the UI state to reflect the actual state
        if (!success && newEnabledValue) {
            setIsEnabled(false);
        }
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDayPress = async (day: string) => {
        console.log(`Day ${day} pressed for reminder ${id}`);
        let newSelectedDays;

        if (selectedDays.includes(day)) {
            // Allow deselecting all days
            newSelectedDays = selectedDays.filter(d => d !== day);
        } else {
            newSelectedDays = [...selectedDays, day];
        }

        // Update local state
        setSelectedDays(newSelectedDays);

        // If reminder is enabled, update notifications immediately
        if (isEnabled) {
            try {
                setIsUpdating(true);

                // If we removed a day, we need to cancel all and recreate
                // If we added a day, we just need to add one more notification
                if (newSelectedDays.length < selectedDays.length) {
                    // We removed a day, do a full update
                    await cancelPreviousNotifications();

                    // If no days left, disable the reminder
                    if (newSelectedDays.length === 0) {
                        setIsEnabled(false);
                        await onUpdate(id, {
                            selectedDays: newSelectedDays,
                            isEnabled: false,
                            notificationIds: []
                        });
                    } else {
                        // Reschedule all remaining days
                        const newNotificationIds: string[] = [];
                        for (const d of newSelectedDays) {
                            const weekday = dayMap[d].weekday;
                            const notificationId = await scheduleNotificationForDay(weekday);
                            if (notificationId) {
                                newNotificationIds.push(notificationId);
                            }
                        }

                        setSavedNotificationIds(newNotificationIds);

                        // Persist to storage
                        await onUpdate(id, {
                            selectedDays: newSelectedDays,
                            notificationIds: newNotificationIds
                        });
                    }
                } else {
                    // We added a day, just add one more notification
                    const weekday = dayMap[day].weekday;
                    const notificationId = await scheduleNotificationForDay(weekday);

                    if (notificationId) {
                        const updatedIds = [...savedNotificationIds, notificationId];
                        setSavedNotificationIds(updatedIds);

                        // Persist to storage
                        await onUpdate(id, {
                            selectedDays: newSelectedDays,
                            notificationIds: updatedIds
                        });
                    }
                }
            } catch (error) {
                console.error('Error updating days:', error);
                // Revert the UI state on error
                setSelectedDays(selectedDays);
                Alert.alert(
                    'Error',
                    'Failed to update day selection. Please try again.',
                    [{ text: 'OK' }]
                );
            } finally {
                setIsUpdating(false);
            }
        } else {
            // Just persist the changed days without scheduling
            await onUpdate(id, {
                selectedDays: newSelectedDays
            });
        }
    };

    // Cancel all previously scheduled notifications for this reminder
    const cancelPreviousNotifications = async () => {
        try {
            for (const notificationId of savedNotificationIds) {
                await Notifications.cancelScheduledNotificationAsync(notificationId);
            }
            console.log(`Cancelled ${savedNotificationIds.length} previous notifications`);
        } catch (error) {
            console.error('Error cancelling previous notifications:', error);
        }
    };

    const handleDelete = async () => {
        console.log(`Delete pressed for reminder ${id}`);

        // Cancel all notifications for this reminder
        await cancelPreviousNotifications();

        // Then delete the reminder
        onDelete(id);
    };

    const handleTitlePress = (e: any) => {
        // Prevent expanding the card when title is tapped
        e.stopPropagation();

        if (isExpanded) {
            setIsEditingTitle(true);
            // Focus the input after it's rendered
            setTimeout(() => {
                titleInputRef.current?.focus();
            }, 100);
        }
    };

    const handleTitleChange = (text: string) => {
        setTitle(text);
    };

    const handleTitleBlur = async () => {
        setIsEditingTitle(false);
        console.log(`Title changed to: ${title}`);

        // Persist title change immediately
        await onUpdate(id, { title });

        // If enabled, update notifications to use new title
        if (isEnabled && selectedDays.length > 0) {
            updateAllNotifications(true);
        }
    };

    const handleTimePress = () => {
        setTimePickerVisible(true);
    };

    const handleTimeUpdate = async (hour: number, minute: number) => {
        console.log(`Time updated for reminder ${id} to ${hour}:${minute}`);

        // Update local state
        setReminderTime({ hour, minute });

        try {
            setIsUpdating(true);

            // Cancel all previous notifications
            await cancelPreviousNotifications();

            // Only reschedule if the reminder is enabled and has days selected
            if (isEnabled && selectedDays.length > 0) {
                // Schedule new notifications with updated time
                const newNotificationIds: string[] = [];

                for (const day of selectedDays) {
                    const weekday = dayMap[day].weekday;
                    const notificationId = await scheduleNotificationForDay(weekday, hour, minute);
                    if (notificationId) {
                        newNotificationIds.push(notificationId);
                    }
                }

                // Update saved notification IDs
                setSavedNotificationIds(newNotificationIds);

                // Persist changes to storage
                await onUpdate(id, {
                    time: { hour, minute },
                    notificationIds: newNotificationIds
                });

                console.log(`Updated ${newNotificationIds.length} notifications with new time`);
            } else {
                // Just persist the time change without scheduling
                await onUpdate(id, {
                    time: { hour, minute }
                });
            }
        } catch (error) {
            console.error('Error updating time:', error);
            // Revert local state on error
            setReminderTime(time);
            Alert.alert(
                'Error',
                'Failed to update reminder time. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsUpdating(false);
        }
    };

    // Schedule a notification for a specific weekday
    const scheduleNotificationForDay = async (weekday: number, hourOverride?: number, minuteOverride?: number) => {
        try {
            // Use either the provided hour/minute or the current reminderTime
            const hour = hourOverride !== undefined ? hourOverride : reminderTime.hour;
            const minute = minuteOverride !== undefined ? minuteOverride : reminderTime.minute;

            // Get the day name for display
            const dayName = Object.keys(dayMap).find(
                key => dayMap[key].weekday === weekday
            ) || 'M';

            // Log for debugging
            console.log(`Scheduling notification for ${dayMap[dayName].name} at ${formatTime(hour, minute)} with weekly trigger`);

            // Schedule the notification with a WEEKLY trigger
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: title,
                    body: `It's ${formatTime(hour, minute)}`,
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
                    weekday: weekday,
                    hour: hour,
                    minute: minute,
                }
            });

            console.log(`Scheduled notification for ${dayMap[dayName].name} at ${formatTime(hour, minute)}, ID: ${notificationId}`);

            return notificationId;
        } catch (error) {
            console.error('Error scheduling notification:', error);
            return null;
        }
    };

    // Format time to HH:MM
    const formatTime = (hour: number, minute: number) => {
        return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
    };

    // Get the display days text
    const getDisplayDayText = () => {
        // If no days are selected
        if (selectedDays.length === 0) {
            return "No days selected";
        }

        // If all days are selected, show "Every day"
        if (selectedDays.length === days.length) {
            return "Every day";
        }

        // If multiple days are selected, show comma-separated list
        if (selectedDays.length > 1) {
            // Sort the days to ensure they appear in order of the week
            const sortedSelectedDays = [...selectedDays].sort(
                (a, b) => days.indexOf(a) - days.indexOf(b)
            );

            // Map to full day names and join with commas
            return sortedSelectedDays.map(day => dayMap[day].name).join(', ');
        }

        // If one day is selected, show that day
        return selectedDays.length > 0 ? dayMap[selectedDays[0]].name : 'Mon';
    };

    return (
        <View style={[styles.container, !isExpanded && styles.collapsedContainer]}>
            <TouchableOpacity
                style={styles.collapsibleHeader}
                onPress={toggleExpanded}
                activeOpacity={0.8}
            >
                <View style={styles.headerTopRow}>
                    <View style={styles.titleRow}>
                        {isEditingTitle && isExpanded ? (
                            <TextInput
                                ref={titleInputRef}
                                style={styles.titleInput}
                                value={title}
                                onChangeText={handleTitleChange}
                                onBlur={handleTitleBlur}
                                autoCapitalize="sentences"
                                returnKeyType="done"
                                onSubmitEditing={handleTitleBlur}
                            />
                        ) : (
                            <TouchableOpacity onPress={handleTitlePress} disabled={!isExpanded}>
                                <Text style={styles.label}>{title}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
                </View>

                <View style={styles.headerContent}>
                    <View style={styles.timeContainer}>
                        <TouchableOpacity
                            onPress={handleTimePress}
                            disabled={isUpdating}
                        >
                            <Text style={[
                                styles.time,
                                !isEnabled && styles.timeDisabled
                            ]}>
                                {formatTime(reminderTime.hour, reminderTime.minute)}
                            </Text>
                        </TouchableOpacity>
                        <Text style={[
                            styles.day,
                            selectedDays.length === 0 && styles.noDaysText
                        ]}>{getDisplayDayText()}</Text>
                    </View>

                    <Switch
                        trackColor={{ false: '#767577', true: Colors.PURPLE }}
                        thumbColor={Colors.WHITE}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        disabled={isUpdating}
                    />
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <>
                    <View style={styles.daysContainer}>
                        {days.map((day, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dayButton,
                                    selectedDays.includes(day) && styles.selectedDayButton
                                ]}
                                onPress={() => handleDayPress(day)}
                                disabled={isUpdating}
                            >
                                <Text style={[
                                    styles.dayButtonText,
                                    selectedDays.includes(day) && styles.selectedDayButtonText
                                ]}>
                                    {day}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDelete}
                            disabled={isUpdating}
                        >
                            <Text style={styles.deleteIcon}>🗑️</Text>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <TimePickerDialog
                visible={timePickerVisible}
                onClose={() => setTimePickerVisible(false)}
                onConfirm={handleTimeUpdate}
                initialHour={reminderTime.hour}
                initialMinute={reminderTime.minute}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a2733',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 10,
    },
    collapsedContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    collapsibleHeader: {
        width: '100%',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    titleRow: {
        flex: 1,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeContainer: {
        flex: 1,
    },
    chevron: {
        color: Colors.WHITE,
        fontSize: 12,
        marginLeft: 8,
    },
    label: {
        color: Colors.WHITE,
        opacity: 0.7,
        fontSize: 14,
    },
    titleInput: {
        color: Colors.WHITE,
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.WHITE,
        padding: 0,
        paddingBottom: 3,
    },
    time: {
        color: Colors.WHITE,
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    timeDisabled: {
        fontWeight: 'normal',
        opacity: 0.7,
    },
    day: {
        color: Colors.WHITE,
        fontSize: 14,
    },
    noDaysText: {
        color: '#ff9500', // Orange to indicate attention needed
        fontStyle: 'italic',
    },
    daysContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    dayButton: {
        flex: 1,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
    },
    selectedDayButton: {
        backgroundColor: Colors.WHITE,
    },
    dayButtonText: {
        color: Colors.WHITE,
        fontSize: 12,
    },
    selectedDayButtonText: {
        color: Colors.DEEP_BLUE,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    deleteText: {
        color: Colors.WHITE,
        fontSize: 14,
    },
    deleteIcon: {
        fontSize: 14,
        marginRight: 6,
    }
});