import React, { useState,useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,StatusBar } from 'react-native'
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Work from '../../shared/exporter'
import LogoImage from '../../shared/components/LogoImage'
import FooterPart from './Components/FooterPart'
import Popup from './Components/Popup'
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';

const HomePage = ({ navigation }) => {
    const [Modalvisible, setModalvisibleVisible] = useState(false);
    const [PressedType, setPressedType] = useState(null)
    const { t, i18n } = useTranslation();
    const socket = io('https://myavvocato.herokuapp.com');
    const user = useSelector(state => state.auth.user);
    
    useEffect(() => {
        
        socket.emit('join', user?.user?._id);
        socket.on('join',msg=>{
            console.log("result from socket",msg);

        })
        socket.on('disconnect',msg=>{
            console.log("result from socket",msg);
        })
    }, [])
    return (
        <SafeAreaView style={styles.parentView}>
          <StatusBar
       
        barStyle="dark-content"
        backgroundColor='#BDD5EB'
      /> 
      {/* <StatusBar hidden /> */}

            <View style={styles.mainContaner}>
               
                <Popup PopVisible={Modalvisible} Set_Modal_Visible={setModalvisibleVisible} pressede_Typesending={PressedType} />
   
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.UserIcon}>
                    <FontAicon
                        name="person-circle"
                        size={Work.WP('12')}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <LogoImage screen={'home'} />
                <View>
                    <Text style={styles.BoldText}>
                       {t("How can we help you ?")}
              </Text>
                    <Text style={styles.normolText}>
                        {t("Your legel advise")}
              </Text>
                    <Text style={[styles.normolText, { marginTop: Work.WP('-0.5') }]}>
                         {t("is on its way")}
              </Text>
                </View>
                <FooterPart Set_Modal_Visible={setModalvisibleVisible} Set_Pressed_Type={setPressedType} />
            </View>
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    UserIcon: {
        alignSelf: 'flex-end',
        marginRight: Work.WP('3'),
        marginVertical: Work.WP('5')
    },
    parentView: {
        flex: 1
    },
    mainContaner: {
        flex: 1,
        backgroundColor: '#BDD5EB'
    },
    BoldText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#757575',
        textAlign: 'center',
        marginTop: Work.WP('10')
    },
    normolText: {
        fontSize: 18,
        color: '#757575',
        textAlign: 'center',
        marginTop: Work.WP('2.5'),
        fontWeight: '400'


    }
})
