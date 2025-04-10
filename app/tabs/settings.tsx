import Colors from '@/utilities/color';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import SettingSvg from '../../assets/images/settings.svg';
import SettingItem from '../../components/SettingItem';
import { settingIcons } from '@/constants/icon';
import { useNavigation } from 'expo-router';
import auth from '@react-native-firebase/auth';

export default function Page() {
  const navigation = useNavigation();

  const handleSettingPress = (setting: string) => {
    console.log(`${setting} pressed`);
  };

  const handleRemindersPress = () => {
    navigation.navigate('setReminders');
  };

  const handleLogout = () => {
    console.log('Log Out pressed');
    auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsContainer}>
          <SettingItem
            icon={settingIcons.bell()}
            title="Reminders"
            onPress={() => handleRemindersPress()}
          />
          <SettingItem
            icon={settingIcons.language()}
            title="Language"
            onPress={() => handleSettingPress('Language')}
          />
          <SettingItem
            icon={settingIcons.ruler()}
            title="Units"
            onPress={() => handleSettingPress('Units')}
          />
          <SettingItem
            icon={settingIcons.location()}
            title="Select Home Gym"
            onPress={() => handleSettingPress('Select Home Gym')}
          />
        </View>

        <SettingSvg width={400} height={250} />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEEP_BLUE,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  settingsContainer: {
  },
  logoutButton: {
    backgroundColor: Colors.DARK_BLUE,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 0,
    marginHorizontal: 100,
  },
  logoutText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
});
