import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { PlatformPressable } from '@react-navigation/elements';
import { icon } from '@/constants/icon';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Colors from '@/utilities/color';

export default function TabBarButton({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    color,
    label }: {
        onPress: Function,
        onLongPress: Function,
        isFocused: boolean,
        routeName: string,
        color: string,
        label: string
    }) {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
        const top = interpolate(scale.value, [0, 1], [0, 9]);
        return {
            transform: [{
                scale: scaleValue
            }],
            top
        }
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);
        return {
            opacity
        }
    });

    return (
        <PlatformPressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
        >
            <Animated.View style={animatedIconStyle}>
                {icon[routeName]({
                    color: isFocused ? Colors.WHITE : Colors.DEEP_BLUE
                })}
            </Animated.View>
            <Animated.Text style={[{ color: isFocused ? Colors.PURPLE : Colors.DEEP_BLUE, fontSize: 12, marginTop: 2 }, animatedTextStyle]}>{label}</Animated.Text>
        </PlatformPressable>
    )
}

const styles = StyleSheet.create({
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})