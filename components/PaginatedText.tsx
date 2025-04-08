import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Colors from '@/utilities/color';
import { LESSONS } from '@/constants/lessonData';

const { width } = Dimensions.get('window');

// Function to split text into multiple pages
const splitTextIntoPages = (text: string, maxWordsPerPage = 200) => {
    const words = text.split(' ');
    const pages = [];

    for (let i = 0; i < words.length; i += maxWordsPerPage) {
        pages.push(words.slice(i, i + maxWordsPerPage).join(' '));
    }

    return pages;
};

const LessonDetail = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

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

            <View style={styles.svgContainer}>
                <lesson.SvgImage />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{lesson.title}</Text>

                {/* Swiper for paginated text */}
                <Swiper
                    style={styles.swiper}
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

                <TouchableOpacity
                    style={styles.sourcesButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="information-circle-outline" size={20} color={Colors.WHITE} />
                    <Text style={styles.sourcesText}>Sources</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.WHITE} />
                </TouchableOpacity>
            </View>

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
                            <Text key={`source-${index}`} style={styles.sourceItem}>
                                {source}
                            </Text>
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
    container: {
        flex: 1,
        backgroundColor: Colors.DEEP_BLUE,
    },
    svgContainer: {
        width: '100%',
        height: 250,
        backgroundColor: Colors.DEEP_BLUE,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 20,
    },
    swiper: {
        height: 250, // Adjust this height as needed
    },
    slide: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14,
        color: Colors.LIGHT_BLUE,
        lineHeight: 22,
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
        backgroundColor: Colors.LIGHT_BLUE,
    },
    sourcesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 10,
    },
    sourcesText: {
        flex: 1,
        fontSize: 15,
        color: Colors.WHITE,
        marginLeft: 8,
    },
    errorText: {
        color: Colors.WHITE,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.DEEP_BLUE,
        borderRadius: 12,
        padding: 20,
        position: 'relative',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 20,
    },
    sourceItem: {
        fontSize: 15,
        color: Colors.LIGHT_BLUE,
        marginBottom: 16,
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    closeButtonText: {
        fontSize: 16,
        color: Colors.WHITE,
    },
});

export default LessonDetail;