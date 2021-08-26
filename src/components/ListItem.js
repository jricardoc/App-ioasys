import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


export default function ListItem({ data }) {

    const [modalVisible, setModalVisible] = useState(false);

    
    const RenderSection = ({title, content}) => {
        return (
            <View>
                <View style={{ marginBottom: 8}}>
                    <Text style={{color: "#000", fontSize: 18, fontWeight: 'bold'}}>{title}</Text> 
                    <View style={{width: 20, height: 2, backgroundColor:'#247BA0', marginLeft: 2 ,borderRadius: 8}}/>
                </View>
                <Text style={{color: "#000", fontSize: 14, marginBottom:14}}>{content}</Text>
            </View>
        )
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.modalItem} >
                    <Image source={{ uri: `https://empresas.ioasys.com.br${data.photo}` }} style={styles.modalPhoto} />
                    <View style={styles.itemInfoModal}>
                        <Text style={styles.modalText} onPress={() => setModalVisible(false)}>{data.enterprise_name}</Text>
                    </View>
                    <TouchableOpacity style={{position:'absolute', top:14,right:24}} onPress={() => setModalVisible(false)}>
                        <FontAwesome5
                            name="times"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.itemInfoModal}>
                        <RenderSection
                            title='Description'
                            content={data.description}
                        />
                         <RenderSection
                            title='City'
                            content={data.city}
                        />
                         <RenderSection
                            title='Country'
                            content={data.country}
                        />
                         <RenderSection
                            title='Value'
                            content={data.value}
                        />
                             <RenderSection
                            title='Share Price'
                            content={data.share_price}
                        />

                </ScrollView>
                   
            </Modal>

            <TouchableOpacity style={styles.item}>
                <Image source={{ uri: `https://empresas.ioasys.com.br${data.photo}` }} style={styles.itemPhoto} />
                <View style={styles.itemInfo} onPress={() => setModalVisible(true)}>
                    <Text style={styles.itemP1} onPress={() => setModalVisible(true)}>{data.enterprise_name}</Text>
                    <Text style={styles.itemP2}>{data.email_enterprise == null ? "Email não informado" : data.email_enterprise}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingTop: 15,
        paddingBottom: 15,
    },
    modalItem: {
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingVertical: 26,
        backgroundColor:'#247BA0'
    },
    modalPhoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    itemPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemInfo: {
        marginLeft: 20,
        flex: 1,
    },
    itemInfoModal: {
        marginHorizontal: 16,
        marginVertical: 26
    },
    itemP1Modal: {
        fontSize: 18,
        color: '#222222',
        marginBottom: 16,
    },
    btnText:  {
        fontSize: 18,
        color: '#FEFDFF',
        fontWeight:'bold',
    },
    itemP1: {
        fontSize: 16,
        color: '#222222',
        marginBottom: 5,
        fontWeight:'bold',
    },
    modalText: {
        fontSize: 22,
        color: '#FEFDFF',
        marginBottom: 5,
        fontWeight:'bold',
    },
    btnSubmit: {
        backgroundColor: '#247BA0',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 7,
        paddingVertical: 16,
        marginVertical: 16
    },
});

