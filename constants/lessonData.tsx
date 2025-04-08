import React from 'react';
import { SvgProps } from 'react-native-svg';

import CheckSvg from '@/assets/images/check.svg';
import Colors from '@/utilities/color';

export interface LessonData {
    id: string;
    title: string;
    description: string;
    // SVG component instead of image URL
    SvgImage: React.FC<SvgProps>;
    // Array of source strings
    sources: string[];
    // Description to display above sources
    sourceDescription: string;
    // Icon information for the lesson card
    icon: {
        name: string; // Ionicons name
        size: number;
        color: string;
    };
}

// \n for line break
// \\p for paragraph break
export const LESSONS: LessonData[] = [
    {
        id: "strength-benefits",
        title: "The benefits of strength training",
        description: "Progressive overload is a fundamental principle in strength training that involves gradually increasing the stress placed on your body during workouts. This concept is essential for continuous improvement and avoiding plateaus in your fitness journey.\n\nThe science behind progressive overload is based on how your muscles adapt to stress. When you challenge your muscles beyond their accustomed load, microscopic damage occurs to the muscle fibers. During the recovery process, your body repairs these fibers, making them stronger and more resilient than before. There are multiple ways to implement progressive overload in your training routine.\\pThe most common method is to increase the weight or resistance. For example, if you can comfortably perform 3 sets of 10 squats with 100 pounds, you might increase to 105 pounds for your next workout.\n\nHowever, weight isn't the only variable you can adjust. You can also increase the number of repetitions, sets, or training frequency. Alternatively, you might decrease rest periods between sets or improve your exercise form to target muscles more effectively.",
        SvgImage: CheckSvg as React.FC<SvgProps>,
        sources: [
            "Journal of Strength and Conditioning Research, 2022",
            "American College of Sports Medicine Guidelines, 2023",
            "National Strength and Conditioning Association"
        ],
        sourceDescription: "This information is based on the following academic sources:",
        icon: {
            name: "flash",
            size: 24,
            color: Colors.WHITE,
        }
    },
    {
        id: "progressive-overload",
        title: "What is progressive overload?",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        SvgImage: CheckSvg as React.FC<SvgProps>,
        sources: [
            "Sports Medicine Review, 2023",
            "International Journal of Exercise Science, 2021",
            "Principles of Strength Training, 4th Edition"
        ],
        sourceDescription: "This content references the following scientific literature:",
        icon: {
            name: "calculator-outline",
            size: 24,
            color: Colors.WHITE,
        }
    },
    {
        id: "strength-frequency",
        title: "How often should I strength train?",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        SvgImage: CheckSvg as React.FC<SvgProps>,
        sources: [
            "Exercise Physiology Journal, 2022",
            "American Council on Exercise, Training Guidelines 2023",
            "Medicine & Science in Sports & Exercise, 2021"
        ],
        sourceDescription: "The recommendations are supported by these research publications:",
        icon: {
            name: "time-outline",
            size: 24,
            color: Colors.WHITE,
        }
    },
];