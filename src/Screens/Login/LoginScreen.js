import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, ActivityIndicator, View, StatusBar, Image, Text } from 'react-native'
import * as Work from '../../shared/exporter'
import LogoImage from '../../shared/components/LogoImage'
import LoginForm from './Components/LoginForm'
import FooterPart from './Components/FooterPart'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ResetEmailPopup from './Components/ResetEmailPopup'
import * as Animatable from 'react-native-animatable'
import FontAicon from 'react-native-vector-icons/Ionicons';
import LanguageSelect from './Components/LanguageSelect';
import GeneralModal from '../../Modals/GeneralModal'
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler'

const LoginScreen = ({ navigation }) => {
    const [Modalvisible, setModalvisibleVisible] = useState(false);
    const Loader = useSelector(state => state.auth.loadingLoader);
    return (
        <SafeAreaView style={styles.ParentView}>
            <StatusBar

                barStyle="dark-content"
                backgroundColor='#BDD5EB'
            />
            <Animatable.View
                animation='fadeInUpBig'
                duration={1000} style={styles.mainView}>
                <ResetEmailPopup PopVisible={Modalvisible} Set_Modal_Visible={setModalvisibleVisible} />

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always">
                    <LanguageSelect />
                    <View style={{marginVertical:20}}>
                    <LogoImage />
                    </View>
                 
                    {Loader == true ? (
                        <View
                            style={{

                                justifyContent: 'center',
                                marginVertical: Work.WP('5'),
                            }}>
                            <ActivityIndicator
                                style={{ alignSelf: 'center' }}
                                size="large"
                                color={"#4F6EA5"}
                            />
                        </View>

                    ) : null}
                    <GeneralModal></GeneralModal>
                
                    <LoginForm Set_Modal_Visible={setModalvisibleVisible} />
                    <FooterPart />
                </KeyboardAwareScrollView>
            </Animatable.View>


        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    ParentView: {
        flex: 1,
        backgroundColor: '#BDD5EB'

    },
    mainView: {
        flex: 1,
        backgroundColor: '#BDD5EB'
    },


})
