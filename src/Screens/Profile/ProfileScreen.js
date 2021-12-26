import React,{useState} from 'react'
import { SafeAreaView, StyleSheet, Text,StatusBar, ActivityIndicator,TouchableOpacity, View ,Linking} from 'react-native'
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Work from '../../shared/exporter'
import * as Animatable from 'react-native-animatable'
import UserForm from './Components/UserForm'
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import * as Jobs from '../../store/actions/auth.action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GeneralModal from '../../Modals/GeneralModal'

const ProfileScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(Jobs.saveUser(null));
       
      };
      const user = useSelector(state => state.auth.user);
      const Loader = useSelector(state => state.auth.loadingLoader);
      const Language = useSelector(state => state.auth.language);
    
    return (
        <SafeAreaView style={styles.ParentView}>
        <StatusBar
       
        barStyle="dark-content"
        backgroundColor='#BDD5EB'
      /> 
            <View style={styles.IconContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <FontAicon
                        name="chevron-back-outline"
                        size={Work.WP('10')}
                        color={'#000'}
                    />
                </TouchableOpacity>

                <View style={{ flexGrow: 0.4 }}></View>
                <FontAicon
                   
                    name="person-circle"
                    size={Work.WP('12')}
                    color={'#000'}
                />
            </View>

            <Animatable.View
                animation='fadeInUpBig'
                duration={1000} style={styles.mainView}>
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
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always">
                    <UserForm CurrentUser={user?.user} />
                    <View>
                        <TouchableOpacity
                        onPress={()=> Linking.openURL('https://myavvocatoapp.com/termini-e-condizioni-generali')}
                        >
                        <Text style={[styles.FooterText]}>
                            {t("General terms and conditions")}
                  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> Linking.openURL('https://myavvocatoapp.com/privacy-and-cookie-policy')}
                        >
                        <Text style={styles.FooterText}>
                        {t("Privacy and cookie policy")}
                           
                  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                        onPress={()=> Linking.openURL('https://www.myavvocatoapp.com')}
                        >
                        <Text style={styles.FooterText}>
                        {t("Contact us")}
                         
                  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={[styles.logoutbtn,{ paddingHorizontal:Language == 'ita' ?  Work.WP('5'):Work.WP('11'),}]}
                  onPress={logout}
                  >
                  <Text style={[styles.deleteAccountText,{color:"#fff",fontSize:19}]}>
                        {t("Logout")}
                           
                  </Text>
                  </TouchableOpacity>
                  
                       

                    </View>
                </KeyboardAwareScrollView>
            </Animatable.View>


        </SafeAreaView >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    ParentView: {
        flex: 1,
        backgroundColor: '#BDD5EB',
    },
    mainView: {
        flex: 1,
        borderColor: 'grey',
        borderWidth: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: Work.WP('5'),
        backgroundColor: 'white'

    },
    IconContainer: {
        flexDirection: 'row',
        backgroundColor: '#BDD5EB',
        marginTop:Work.HP('2'),
        alignItems:'center',
 
    },
    FooterText: {
        textAlign: 'center',
        fontSize: 18,
        textDecorationLine: 'underline',
        marginTop: Work.WP('3')
    },
    deleteAccountText: {
        textAlign: 'center',
        fontSize: 18,
    },
    logoutbtn: {
        backgroundColor: '#4F6EA5',
        textAlign: 'center',
        paddingVertical:Work.WP('2'),
        color: 'black',
        borderRadius: 30,
        fontSize: 19,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Work.WP('5')
    },

})
