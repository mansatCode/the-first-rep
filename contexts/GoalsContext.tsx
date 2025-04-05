import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our context
interface GoalsContextType {
    weeklyGoal: number;
    setWeeklyGoal: (goal: number) => void;
    workoutsCompleted: number;
    setWorkoutsCompleted: (completed: number) => void;
}

// Create the context with default values
const GoalsContext = createContext<GoalsContextType>({
    weeklyGoal: 2,
    setWeeklyGoal: () => { },
    workoutsCompleted: 1,
    setWorkoutsCompleted: () => { },
});

// Props for our provider component
interface GoalsProviderProps {
    children: ReactNode;
}

// Provider component that will wrap our app
export const GoalsProvider: React.FC<GoalsProviderProps> = ({ children }) => {
    const [weeklyGoal, setWeeklyGoal] = useState<number>(2);
    const [workoutsCompleted, setWorkoutsCompleted] = useState<number>(1);

    // Values that will be provided to consuming components
    const value = {
        weeklyGoal,
        setWeeklyGoal,
        workoutsCompleted,
        setWorkoutsCompleted,
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