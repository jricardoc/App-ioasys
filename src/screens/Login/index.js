import React, { useState, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    Keyboard,
    ActivityIndicator
} from 'react-native';

export default function Login({ navigation }) {

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 330, y: 155 }));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);


        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: false
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            })
        ]).start();
    }, []);

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 200,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 65,
                duration: 100,
                useNativeDriver: false
            }),
        ]).start();
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 330,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 155,
                duration: 100,
                useNativeDriver: false
            }),
        ]).start();
    }



    singIn = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "https://empresas.ioasys.com.br/api/v1/users/auth/sign_in",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: email, password: password }),
                }
            );
            const content = await response.json();
            console.log(response.headers);
            if (response.status == 200) {
                navigation.navigate('Dashboard', {user: content.investor, headers: response.headers.map });
            } else {
                console.warn('Não autorizado');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Animated.Image
                    style={{
                        width: logo.x,
                        height: logo.y
                    }}
                    source={require('../../assets/logo_ioasys.png')}
                />
            </View>

            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: opacity,
                        transform: [
                            { translateY: offset.y }
                        ]
                    }
                ]}
            >
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={(value) => {
                        setEmail(value);
                    }}
                />

                <TextInput
                    value={password}
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        setPassword(value);
                    }}
                />

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={isLoading ? null : singIn}
                >
                    {isLoading ? (
                        <View style={{ width: 20, height: 20 }}>
                            <ActivityIndicator
                                color={"#fff"}
                            />

                        </View>
                    ) : (
                        < Text style={styles.submitText}>Acessar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerText}>Criar conta gratuita</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView >
    );
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEFDFF'
    },
    containerLogo: {
        justifyContent: 'center',
        marginBottom: 28,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    input: {
        backgroundColor: '#dedede',
        width: '90%',
        marginBottom: 15,
        color: '#363636',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    btnSubmit: {
        backgroundColor: '#247BA0',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginBottom: 16,
    },
    submitText: {
        color: '#FEFDFF',
        fontSize: 15
    },
    btnRegister: {
        marginTop: 10
    },
    registerText: {
        color: '#247BA0'
    }
});