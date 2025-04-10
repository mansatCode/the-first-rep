import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import LogoSvg from '../assets/images/logo.svg';
import Colors from '@/utilities/color';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from '@firebase/app';

const index = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // const signUp = async (email: string, password: string) => {
    //     setLoading(true);
    //     try {
    //         await auth().createUserWithEmailAndPassword(email, password);
    //     } catch (e: any) {
    //         const err = e as FirebaseError;
    //         alert('Registration failed: ' + err.message)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e: any) {
            const err = e as FirebaseError;
            alert('Sign in failed: ' + err.message)
        } finally {
            setLoading(false);
        }
    }

    const handleSignIn = (): void => {
        console.log('Sign in button pressed');
        signIn(email, password);
    };

    const handleForgotPassword = (): void => {
        console.log('Forgot password pressed');
    };

    const handleSignUp = (): void => {
        console.log('Sign up pressed');
        signUp(email, password);
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
                        placeholder="Email"
                        placeholderTextColor={Colors.DEEP_BLUE}
                        value={email}
                        autoCapitalize='none'
                        onChangeText={setEmail}
                        textAlign={'center'}
                        keyboardType='email-address'
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={Colors.DEEP_BLUE}
                        secureTextEntry
                        value={password}
                        autoCapitalize='none'
                        onChangeText={setPassword}
                        textAlign={'center'}
                    />
                    {loading ? (
                        <ActivityIndicator size={'large'} style={{ margin: 28 }} />
                    ) : (
                        <>
                            {/* <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.forgotPasswordText}>I forgot my password</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                                <Text style={styles.signInButtonText}>Sign in</Text>
                            </TouchableOpacity>

                            {/* <View style={styles.signUpSection}>
                                <Text style={styles.noAccountText}>Don't have an account?</Text>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={styles.signUpText}>Sign Up Here</Text>
                                </TouchableOpacity>
                            </View> */}
                        </>
                    )}

                </View>

                {/* Comment out this view when releasing */}
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
        backgroundColor: Colors.DEEP_BLUE,
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
        marginTop: 16,
        backgroundColor: Colors.DARK_BLUE,
        borderRadius: 20,
        padding: 15,
        width: 150,
        alignSelf: 'center',
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