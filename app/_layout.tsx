import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import 'react-native-reanimated';
import Colors from '@/utilities/color';
import { GoalsProvider } from '../contexts/GoalsContext';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Start with user as null to prevent immediate navigation
  const [initialising, setInitialising] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const colorScheme = useColorScheme();
  const router = useRouter();

  console.log('RootLayout rendering:', {
    initialising,
    userExists: !!user,
    loaded
  });

  // Handle font loading
  useEffect(() => {
    console.log('Font loading effect triggered:', { loaded });
    if (loaded) {
      console.log('Fonts loaded, hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Handle auth state
  useEffect(() => {
    console.log('Auth state effect initialized');

    // Force initializing state to true and user to null on mount
    setInitialising(true);

    const subscriber = auth().onAuthStateChanged((firebaseUser) => {
      console.log('onAuthStateChanged callback triggered:', {
        userExists: !!firebaseUser,
        userId: firebaseUser?.uid,
        initialising
      });

      // Delay setting the user to prevent immediate navigation
      setTimeout(() => {
        setUser(firebaseUser);
        setInitialising(false);
        console.log('User state updated after delay');
      }, 300); // Small delay to ensure component is fully mounted
    });

    return () => {
      console.log('Auth state effect cleanup');
      subscriber();
    }
  }, []);

  // Handle navigation based on auth state - simplified logic
  useEffect(() => {
    console.log('Navigation effect triggered:', {
      initialising,
      userExists: !!user
    });

    if (initialising) {
      console.log('Still initialising, skipping navigation');
      return;
    }

    console.log('Navigation conditions:', {
      userExists: !!user,
    });

    try {
      if (user) {
        console.log('User is authenticated, navigating to tabs');
        router.replace('/tabs/');
      } else {
        console.log('User is not authenticated, navigating to root');
        router.replace('/');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [user, initialising, router]);

  // Check loading conditions with detailed logging
  console.log('Checking loading conditions:', {
    loaded,
    initialising
  });

  if (!loaded) {
    console.log('Returning loading state: Fonts not loaded');
    return null;
  }

  if (initialising) {
    console.log('Returning loading state: Still initialising auth');
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.PURPLE} />
      </View>
    );
  }

  console.log('Rendering main layout');
  // Render main layout once everything is ready
  return (
    <GoalsProvider>
      <Stack screenOptions={{
        headerShown: false,
      }}>
      </Stack>
    </GoalsProvider>
  );
}