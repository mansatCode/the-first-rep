import { TabBar } from '@/components/TabBar';
import Colors from '@/utilities/color';
import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function TabLayout() {
  return (
    <>
      {/* Status bar configuration for all tabs */}
      <StatusBar backgroundColor={Colors.DEEP_BLUE} barStyle="light-content" />
      <Tabs tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          // Default header styles for all tabs
          headerStyle: { backgroundColor: Colors.DEEP_BLUE },
          headerTitleStyle: { color: Colors.WHITE, fontSize: 32 }
        }}
      >
        <Tabs.Screen name='index' options={{ title: "Home" }} />
        <Tabs.Screen name='track' options={{ title: "Track" }} />
        <Tabs.Screen name='global' options={{ title: "Global", headerShown: false }} />
        <Tabs.Screen name='settings' options={{ title: "Settings" }} />
      </Tabs>
    </>
  );
}
