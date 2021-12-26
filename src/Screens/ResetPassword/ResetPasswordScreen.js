import React from 'react'
import { SafeAreaView, StyleSheet, ActivityIndicator, View, StatusBar, Image, Text } from 'react-native'
import LogoImage from '../../shared/components/LogoImage'
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GeneralModal from '../../Modals/GeneralModal'
import { useDispatch, useSelector } from 'react-redux';
import ResetForm from './Components/ResetForm'
import FooterPart from './Components/FooterPart'
const ResetPasswordScreen = () => {
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
         

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always">
                   <View style={{marginVertical:20}}>
                   </View>
                <LogoImage />
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
                <View style={{marginVertical:10}}>
                </View>
                <ResetForm/>
                
             
              
            </KeyboardAwareScrollView>
        </Animatable.View>


    </SafeAreaView>
    )
}

export default ResetPasswordScreen

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
