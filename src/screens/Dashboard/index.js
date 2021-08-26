import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon,
} from './styles';

import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListItem from '../../components/ListItem';

export default function Dashboard({ navigation, route }) {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState([]);
    const { user, headers } = route.params

    const fetchData = async (query) => {
        try {
            const url = new URL("/api/v1/enterprises", "https://empresas.ioasys.com.br")
            url.searchParams.append("name", query);
            const response = await fetch(url.href, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": headers['access-token'],
                    client: headers.client,
                    uid: user.email
                }
            })
            const { enterprises } = await response.json();
            setList(enterprises);
        } catch (error) {
            console.log(error);
        } 
    }

    useEffect(() => {
        if(searchText.length > 3){
            fetchData(searchText);
        }else{
            fetchData();
        }
    }, [searchText]);

    const handleOrderClick = () => {
        let newList = [...list];
        newList.sort((a, b) => (a.enterprise_name > b.enterprise_name ? 1 : b.enterprise_name > a.enterprise_name ? -1 : 0));
        setList(newList);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://media-exp1.licdn.com/dms/image/C4D0BAQEXbLGV0T-uFA/company-logo_200_200/0/1530557242980?e=2159024400&v=beta&t=2irC49VPWpaB5CpQYf1oQft7SEH9F3hFeTkrAdpQz6E' }}
                        />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>{user.investor_name}</UserName>
                        </User>
                    </UserInfo>

                    <LogoutButton onPress={() => { }}>
                        <Icon name="power" onPress={() => navigation.navigate('Login')} />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <View style={styles.searchArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise uma empresa"
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                />
                <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
                    <MaterialCommunityIcons
                        name="order-alphabetical-ascending"
                        size={32}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={list}
                style={styles.list}
                renderItem={({ item }) => <ListItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFDFF',
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#dedede',
        margin: 30,
        borderRadius: 5,
        fontSize: 19,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#363636',
    },
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderButton: {
        width: 32,
        marginRight: 30,
    },
    list: {
        flex: 1,
    },
});

