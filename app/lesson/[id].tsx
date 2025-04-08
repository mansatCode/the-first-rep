import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import * as Clipboard from 'expo-clipboard';
import Colors from '@/utilities/color';
import { LESSONS } from '@/constants/lessonData';
import SettingItem from '@/components/SettingItem';
import { settingIcons } from '@/constants/icon';

// Function to split text into multiple pages based on \p delimiter
const splitTextIntoPages = (text: string) => {
    // Split by \p character
    const pages = text.split('\\p');

    // Trim whitespace from each page
    return pages.map(page => page.trim());
};

const LessonDetail = () => {
    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    // Find the lesson data based on the id
    const lesson = LESSONS.find(lesson => lesson.id === id);

    if (!lesson) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Lesson not found</Text>
            </SafeAreaView>
        );
    }

    // Split the description into pages
    const textPages = splitTextIntoPages(lesson.description);

    // Function to copy text to clipboard
    const copyToClipboard = async (text: string, index: number) => {
        await Clipboard.setStringAsync(text);
        setCopiedIndex(index);

        // Reset copied status after 2 seconds
        setTimeout(() => {
            setCopiedIndex(null);
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.DEEP_BLUE },
                    headerTitleStyle: { color: Colors.WHITE, fontSize: 16 },
                    headerTintColor: Colors.WHITE,
                    title: lesson.title,
                }}
            />

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.svgContainer}>
                    <lesson.SvgImage />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{lesson.title}</Text>

                    {/* Swiper for paginated text */}
                    <Swiper
                        showsButtons={false}
                        loop={false}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                        paginationStyle={styles.pagination}
                    >
                        {textPages.map((page, index) => (
                            <View key={`page-${index}`} style={styles.slide}>
                                <Text style={styles.text}>{page}</Text>
                            </View>
                        ))}
                    </Swiper>
                </View>
                <View style={styles.settingsContainer}>
                    <SettingItem
                        icon={settingIcons.info()}
                        title="Sources"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </ScrollView>

            {/* Sources Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sources</Text>

                        {lesson.sources.map((source, index) => (
                            <TouchableOpacity
                                key={`source-${index}`}
                                style={styles.sourceItemContainer}
                                onPress={() => copyToClipboard(source, index)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.sourceItem}>
                                    {source}
                                </Text>
                                {copiedIndex === index && (
                                    <View style={styles.copiedIndicator}>
                                        <Ionicons name="copy-outline" size={16} color={Colors.WHITE} />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.DEEP_BLUE,
    },
    scrollContainer: {
        flex: 1,
    },
    svgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        backgroundColor: Colors.DEEP_BLUE,
    },
    contentContainer: {
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        marginTop: 8,
        backgroundColor: Colors.DARK_BLUE,
        height: 460,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 10,
    },
    slide: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14,
        color: Colors.WHITE,
        lineHeight: 24,
        textAlign: 'left',
    },
    pagination: {
        bottom: 10,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.WHITE,
    },
    errorText: {
        color: Colors.WHITE,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
    },
    modalContent: {
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 20,
    },
    sourceItemContainer: {
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: Colors.DEEP_BLUE,
    },
    sourceItem: {
        fontSize: 15,
        color: Colors.WHITE,
    },
    copiedIndicator: {
        position: 'absolute',
        right: 8,
        top: 8,
        backgroundColor: Colors.DEEP_BLUE,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    copiedText: {
        color: Colors.WHITE,
        fontSize: 12,
        marginLeft: 4,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
});

export default LessonDetail;