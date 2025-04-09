import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
    initialize,
    requestPermission,
    readRecords,
    ExerciseType
} from 'react-native-health-connect';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';

const useHealthData = (date: Date) => {
    const EXERCISE_SESSION_TYPE_STRENGTH_TRAINING = ExerciseType.STRENGTH_TRAINING;
    const [exerciseSessions, setExerciseSessions] = useState();

    // Android - Health Connect
    const readSampleData = async () => {
        // initialise the client
        const isInitialised = await initialize();
        if (!isInitialised) {
            return;
        }

        // request permissions
        await requestPermission([
            { accessType: 'read', recordType: 'ExerciseSession' },
        ]);

        // Create a start date (1 month before the given date)
        const startDate = new Date(date);
        startDate.setMonth(date.getMonth() - 1);
        startDate.setHours(0, 0, 0, 0);

        // Create an end date (end of the given date)
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const timeRangeFilter: TimeRangeFilter = {
            operator: 'between',
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString(),
        };

        // ExerciseSession
        const rawExerciseSessionsData = await readRecords('ExerciseSession', { timeRangeFilter });
        console.log('[Health Connect] Number of exercise sessions found:', rawExerciseSessionsData.records.length);
        console.log('[Health Connect] Raw exercise sessions data:', JSON.stringify(rawExerciseSessionsData));

        // Filter for strength training sessions only
        const strengthTrainingSessions = rawExerciseSessionsData.records.filter(
            session => session.exerciseType === EXERCISE_SESSION_TYPE_STRENGTH_TRAINING
        );

        console.log('[Health Connect] Number of strength training sessions found:', strengthTrainingSessions.length);

        const exerciseSessions = strengthTrainingSessions.map(session => {
            // Calculate duration in seconds
            const startTime = new Date(session.startTime);
            const endTime = new Date(session.endTime);
            const durationInSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

            return {
                id: session.metadata?.id,
                title: session.title,
                startTimestamp: session.startTime,
                endTimestamp: session.endTime,
                duration: durationInSeconds // Duration in seconds
            };
        });

        setExerciseSessions(exerciseSessions);
    };

    useEffect(() => {
        if (Platform.OS !== 'android') {
            return;
        }
        readSampleData();
    }, [date]);

    return { exerciseSessions };
};

export default useHealthData;