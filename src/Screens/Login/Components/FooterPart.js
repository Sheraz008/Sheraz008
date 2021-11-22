import React, { useEffect } from 'react'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Work from '../../../shared/exporter'
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { AccessToken, GraphRequest, LoginManager } from 'react-native-fbsdk-next';
import { useTranslation } from 'react-i18next';
import { SocialIcon } from 'react-native-elements'
import * as Jobs from '../../../store/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';
const FooterPart = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
    const socialLoginApicall = async (Name,Email,Id ) => {
      dispatch(
        Jobs.SocailLogin({
          name: Name,
          email: Email,
          id:Id
        }),
      );
    };
  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '48729578148-mkjql6sl8064adjlut6etku0megho1ln.apps.googleusercontent.com',
    });
  }, []);
  const AppleButtonPress = async () => {

    const UserInfo = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log("UserInfo------>", UserInfo);

  }
  const initUser = (token) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((user) => {
        socialLoginApicall(user?.name,user?.email,user?.id)
        console.log('json--->', user);
      })
      .catch(() => {
        alert('some technical issue')
      })
  }


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.Text}>
        {t("or access with")}
      </Text>
      <View style={styles.ImageContainer}>
        <TouchableOpacity
          onPress={async () => {
            try {
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();



              await GoogleSignin.signOut();
              if (userInfo) {          
                socialLoginApicall(userInfo?.user?.name,userInfo?.user?.email,userInfo?.user?.id)
              }
            } catch (error) {
              console.log(error);
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
            }
          }}
        >
          <SocialIcon
            type='google'
            iconSize={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={onFbLogin}

          onPress=
          {async () => {
            try {

              LoginManager.logInWithPermissions(['public_profile']).then(
                function (result) {
                  if (result.isCancelled) {
                    console.log('Login cancelled');
                  } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                      console.log("Response to be set------->", data);
                      const { accessToken } = data
                      initUser(accessToken)
                      //navigation.navigate('Home')

                    });
                    console.log(
                      'Login success with permissions: ' +
                      result.grantedPermissions.toString(),
                    );
                  }
                },
                function (error) {
                  console.log('Login fail with error: ' + error);
                },
              );
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <SocialIcon
            type='facebook'
            iconSize={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => AppleButtonPress()}
          style={styles.imageView}>
          <SocialIcon
            type='apple'
            iconColor="black"
            iconSize={40}
          />
        </TouchableOpacity>

      </View>
      <View>
        <View style={styles.textView}>
          <Text style={styles.normolText}>
            {t('By logging into your account,you accept our')}
          </Text>
          <View style={{ flexDirection: 'row' }} >
            <Text style={styles.underLineText}>
              {t('General Terms and Condition')}
            </Text>
            <Text style={styles.normolText}>
              {t('and our')}
            </Text>
          </View>
          <Text style={[styles.underLineText, {}]}>
            {t('Privacy and cookie policy')}
          </Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: Work.WP('7'), }} >
          <Text style={[styles.normolText, { fontSize: Work.WP('4.5') }]}>
            {t("Don't have an account?")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SingUp')}>
            <Text style={[styles.normolText, { fontSize: Work.WP('5'), top: 0, textDecorationLine: 'underline', }]}>
              {t('Register')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default FooterPart

const styles = StyleSheet.create({
  mainContainer: {
  },
  Text: {
    textAlign: 'center', fontSize: Work.WP('5'),
  },
  normolText: {
    textAlign: 'center', fontSize: Work.WP('4'), top: 2
  },
  underLineText: {
    textAlign: 'center', fontSize: Work.WP('4.5'),
    textDecorationLine: 'underline'

  },
  logoImage: {
    height: Work.HP('6'),
    width: Work.WP('12'),
    borderRadius: 13,

  },
  AppleLogo: {
    height: Work.HP('10'),
    width: Work.WP('10'),
    borderRadius: 13,


  },
  facebookLogo: {
    height: Work.HP('7.5'),
    width: Work.WP('16'),
    borderWidth: 0,
    borderRadius: 20,
    top: -3

  },
  imageView: {
    height: Work. WP('14'),
    width: Work.WP('14'),
    borderRadius: 50,
    backgroundColor: "#EEEEEE",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#9E9E9E",

  },
  ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: Work.WP('10'),
    marginTop: Work.WP('5'),
    alignItems:'center'

  },
  textView: {
    marginTop: Work.WP('5'),
    justifyContent: 'center', alignItems: 'center'
  }
})
