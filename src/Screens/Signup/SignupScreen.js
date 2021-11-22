import React from 'react'
import { SafeAreaView, StyleSheet, Text, View,StatusBar,Image,ActivityIndicator } from 'react-native'
import LogoImage from '../../shared/components/LogoImage'
 import SignupForm from './Components/SignupForm'
import FooterPart from './Components/FooterPart'
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {useDispatch, useSelector} from 'react-redux';
import GeneralModal from '../../Modals/GeneralModal'
import * as Work from '../../shared/exporter';
const SignupScreen = () => {
    const Loader = useSelector(state => state.auth.loadingLoader);
    return (
        <SafeAreaView style={styles.ParentView}>
            <StatusBar barStyle="dark-content" backgroundColor="#BDD5EB"/>
        
            <Animatable.View
                animation='fadeInUpBig'
                duration={1000} style={styles.mainView}>
           
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
             keyboardShouldPersistTaps="always">
            <LogoImage/>
            {Loader == true ? (
          <View
            style={{
           
              justifyContent: 'center',
              marginVertical: Work.WP('5'),
            }}>
            <ActivityIndicator
              style={{alignSelf: 'center'}}
              size="large"
              color={"#4F6EA5"}
            />
            </View>
        
        ) : null} 
        <GeneralModal/>
            <SignupForm/>
            <FooterPart/>
            </KeyboardAwareScrollView>
        </Animatable.View>
     

    </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({ParentView: {
    flex: 1,
    backgroundColor: '#BDD5EB'
},
mainView: {
    flex: 1,
    backgroundColor: '#BDD5EB'
},


})