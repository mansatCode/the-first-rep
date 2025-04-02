import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import LogoSvg from '../assets/images/logo.svg';
import Colors from '@/utilities/color';
import { router } from 'expo-router';

const index = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignIn = (): void => {
        console.log('Sign in button pressed');
    };

    const handleForgotPassword = (): void => {
        console.log('Forgot password pressed');
    };

    const handleSignUp = (): void => {
        console.log('Sign up pressed');
    };

    const handleContinueWithoutSignIn = (): void => {
        console.log('Continue without signing in pressed');
        router.replace('/tabs/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.DEEP_BLUE} barStyle="light-content" />
            <View style={styles.content}>
                <LogoSvg width={234} height={256} />

                <Text style={styles.title}>The First Rep</Text>
                <Text style={styles.subtitle}>Strength training motivation</Text>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor={Colors.DEEP_BLUE}
                        value={username}
                        onChangeText={setUsername}
                        textAlign={'center'}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={Colors.DEEP_BLUE}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        textAlign={'center'}
                    />

                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPasswordText}>I forgot my password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                        <Text style={styles.signInButtonText}>Sign in</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpSection}>
                        <Text style={styles.noAccountText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpText}>Sign Up Here</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleContinueWithoutSignIn}>
                        <Text style={styles.continueText}>Continue without signing in &gt;</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEEP_BLUE, // Dark background color from the image
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.WHITE,
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        fontSize: 16,
    },
    forgotPasswordText: {
        color: Colors.WHITE,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    signInButton: {
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 20,
        padding: 15,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
    },
    signInButtonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
        fontSize: 16,
    },
    signUpSection: {
        alignItems: 'center',
        marginTop: 15,
    },
    noAccountText: {
        color: Colors.LIGHT_BLUE,
        fontSize: 13,
    },
    signUpText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    continueText: {
        color: Colors.WHITE,
        fontSize: 15,
    },
});