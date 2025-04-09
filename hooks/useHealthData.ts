import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
    initialize,
    requestPermission,
    readRecords,
} from 'react-native-health-connect';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';

const useHealthData = (date: Date) => {
    const [exerciseSessions, setExerciseSessions] = useState(0);

    // Android - Health Connect
    const readSampleData = async () => {
        // initialize the client
        const isInitialized = await initialize();
        if (!isInitialized) {
            return;
        }

        // request permissions
        await requestPermission([
            { accessType: 'read', recordType: 'ExerciseSession' },
        ]);

        const timeRangeFilter: TimeRangeFilter = {
            operator: 'between',
            startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
            endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
        };

        // ExerciseSession
        const exerciseSessions = await readRecords('ExerciseSession', { timeRangeFilter });
        const totalExerciseSessions = exerciseSessions.reduce((sum, cur) => sum + cur.count, 0);
        setExerciseSessions(totalExerciseSessions);
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