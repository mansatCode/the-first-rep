import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import Colors from '@/utilities/color';

interface TimePickerDialogProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (hour: number, minute: number) => void;
    initialHour?: number;
    initialMinute?: number;
}

export default function TimePickerDialog({
    visible,
    onClose,
    onConfirm,
    initialHour = new Date().getHours(),
    initialMinute = new Date().getMinutes()
}: TimePickerDialogProps) {
    const [hour, setHour] = useState(initialHour);
    const [minute, setMinute] = useState(initialMinute);
    const [hourText, setHourText] = useState(formatNumber(initialHour));
    const [minuteText, setMinuteText] = useState(formatNumber(initialMinute));

    const minuteInputRef = useRef<TextInput>(null);

    const handleConfirm = () => {
        onConfirm(hour, minute);
        onClose();
    };

    // Helper function to format numbers with leading zeros
    function formatNumber(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    // Handle hour input change
    const handleHourChange = (text: string) => {
        // Only allow numeric input
        if (text === '' || /^\d+$/.test(text)) {
            setHourText(text);

            const numValue = parseInt(text || '0');
            if (numValue >= 0 && numValue <= 23) {
                setHour(numValue);
            }
        }
    };

    // Handle minute input change
    const handleMinuteChange = (text: string) => {
        // Only allow numeric input
        if (text === '' || /^\d+$/.test(text)) {
            setMinuteText(text);

            const numValue = parseInt(text || '0');
            if (numValue >= 0 && numValue <= 59) {
                setMinute(numValue);
            }
        }
    };

    // Handle input blur to ensure valid values
    const handleHourBlur = () => {
        const numValue = parseInt(hourText || '0');

        if (isNaN(numValue) || numValue < 0) {
            setHour(0);
            setHourText('00');
        } else if (numValue > 23) {
            setHour(23);
            setHourText('23');
        } else {
            setHourText(formatNumber(numValue));
        }
    };

    const handleMinuteBlur = () => {
        const numValue = parseInt(minuteText || '0');

        if (isNaN(numValue) || numValue < 0) {
            setMinute(0);
            setMinuteText('00');
        } else if (numValue > 59) {
            setMinute(59);
            setMinuteText('59');
        } else {
            setMinuteText(formatNumber(numValue));
        }
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                        <View style={styles.dialog}>
                            <Text style={styles.title}>Select reminder time</Text>

                            <View style={styles.timeContainer}>
                                {/* Hour Input */}
                                <View style={styles.timeColumn}>
                                    <View style={styles.timeBox}>
                                        <TextInput
                                            style={styles.timeText}
                                            value={hourText}
                                            onChangeText={handleHourChange}
                                            onBlur={handleHourBlur}
                                            keyboardType="number-pad"
                                            maxLength={2}
                                            selectTextOnFocus
                                            onSubmitEditing={() => minuteInputRef.current?.focus()}
                                        />
                                    </View>
                                    <Text style={styles.label}>Hour</Text>
                                </View>

                                {/* Separator */}
                                <Text style={styles.separator}>:</Text>

                                {/* Minute Input */}
                                <View style={styles.timeColumn}>
                                    <View style={[styles.timeBox, styles.selectedBox]}>
                                        <TextInput
                                            ref={minuteInputRef}
                                            style={styles.timeText}
                                            value={minuteText}
                                            onChangeText={handleMinuteChange}
                                            onBlur={handleMinuteBlur}
                                            keyboardType="number-pad"
                                            maxLength={2}
                                            selectTextOnFocus
                                        />
                                    </View>
                                    <Text style={styles.label}>Minute</Text>
                                </View>
                            </View>

                            {/* Buttons */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={onClose} style={styles.button}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleConfirm} style={styles.button}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: 300,
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: Colors.WHITE,
        marginBottom: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    timeColumn: {
        alignItems: 'center',
    },
    timeBox: {
        width: 100,
        height: 100,
        backgroundColor: Colors.DEEP_BLUE,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    selectedBox: {
        borderWidth: 2,
        borderColor: Colors.WHITE,
    },
    timeText: {
        fontSize: 60,
        color: Colors.WHITE,
        fontWeight: '300',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        padding: 0,
    },
    separator: {
        fontSize: 60,
        color: Colors.WHITE,
        marginHorizontal: 5,
        fontWeight: '300',
    },
    label: {
        fontSize: 16,
        color: Colors.WHITE,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        padding: 10,
    },
    buttonText: {
        fontSize: 18,
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
});