import Colors from '@/utilities/color';
import React, { ReactNode } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

interface SettingItemProps {
    icon: ReactNode;
    title: string;
    onPress: () => void;
}

const SettingItem = ({ icon, title, onPress }: SettingItemProps) => {
    return (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingItemLeft}>
                {icon}
                <Text style={styles.settingTitle}>{title}</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: Colors.DARK_BLUE,
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingTitle: {
        fontSize: 16,
        color: Colors.WHITE,
        fontWeight: '600',
        marginLeft: 14,
    },
    chevron: {
        fontSize: 40,
        color: Colors.WHITE,
    },
});

export default SettingItem;