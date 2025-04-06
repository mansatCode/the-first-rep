import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const WEEKLY_GOAL_KEY = '@fitness_app:weeklyGoal';
const WORKOUTS_COMPLETED_KEY = '@fitness_app:workoutsCompleted';

// Define the shape of our context
interface GoalsContextType {
    weeklyGoal: number;
    setWeeklyGoal: (goal: number) => void;
    workoutsCompleted: number;
    setWorkoutsCompleted: (completed: number) => void;
    isLoading: boolean;
}

// Create the context with default values
const GoalsContext = createContext<GoalsContextType>({
    weeklyGoal: 2,
    setWeeklyGoal: () => { },
    workoutsCompleted: 1,
    setWorkoutsCompleted: () => { },
    isLoading: true,
});

// Props for our provider component
interface GoalsProviderProps {
    children: ReactNode;
}

// Provider component that will wrap our app
export const GoalsProvider: React.FC<GoalsProviderProps> = ({ children }) => {
    const [weeklyGoal, setWeeklyGoalState] = useState<number>(2);
    const [workoutsCompleted, setWorkoutsCompletedState] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load saved values from AsyncStorage on initial render
    useEffect(() => {
        const loadSavedValues = async () => {
            try {
                // Load weekly goal
                const savedWeeklyGoal = await AsyncStorage.getItem(WEEKLY_GOAL_KEY);
                if (savedWeeklyGoal !== null) {
                    const parsedValue = parseInt(savedWeeklyGoal, 10);
                    setWeeklyGoalState(parsedValue);
                }

                // Load workouts completed
                const savedWorkoutsCompleted = await AsyncStorage.getItem(WORKOUTS_COMPLETED_KEY);
                if (savedWorkoutsCompleted !== null) {
                    const parsedValue = parseInt(savedWorkoutsCompleted, 10);
                    setWorkoutsCompletedState(parsedValue);
                }
            } catch (error) {
                console.error('Error loading saved values:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedValues();
    }, []);

    // Custom setters that update both state and AsyncStorage
    const setWeeklyGoal = async (goal: number) => {
        // Update state
        setWeeklyGoalState(goal);

        // Persist to AsyncStorage
        try {
            await AsyncStorage.setItem(WEEKLY_GOAL_KEY, goal.toString());
        } catch (error) {
            console.error('Error saving weekly goal:', error);
        }
    };

    const setWorkoutsCompleted = async (completed: number) => {
        // Update state
        setWorkoutsCompletedState(completed);

        // Persist to AsyncStorage
        try {
            await AsyncStorage.setItem(WORKOUTS_COMPLETED_KEY, completed.toString());
        } catch (error) {
            console.error('Error saving workouts completed:', error);
        }
    };

    // Values that will be provided to consuming components
    const value = {
        weeklyGoal,
        setWeeklyGoal,
        workoutsCompleted,
        setWorkoutsCompleted,
        isLoading,
    };

    return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
};

// Custom hook to use the goals context
export const useGoals = () => {
    const context = useContext(GoalsContext);
    if (context === undefined) {
        throw new Error('useGoals must be used within a GoalsProvider');
    }
    return context;
};

export default GoalsContext;