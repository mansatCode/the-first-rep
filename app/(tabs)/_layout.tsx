import { TabBar } from '@/components/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name='index' options={{ title: "Home" }} />
      <Tabs.Screen name='track' options={{ title: "Track" }} />
      <Tabs.Screen name='global' options={{ title: "Global" }} />
      <Tabs.Screen name='settings' options={{ title: "Settings" }} />
    </Tabs>
  );
}
