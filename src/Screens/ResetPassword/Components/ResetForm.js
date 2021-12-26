import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Linking } from 'react-native';
import { Input } from 'react-native-elements';
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import * as Work from '../../../shared/exporter';
import i18n from '../../../shared/MultilanghSetup/multilang';
import { withNamespaces } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/auth.action';
const { WP, HP } = Work;
const ResetForm = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const login = async ({ Email, Password }) => {
        dispatch(
            Jobs.login({
                email: Email,
                password: Password,
            }),
        );
    };
    return (
        <View>
            <Formik
                initialValues={{
                    Password: '',
                    ConPassword: ''


                }}
                validationSchema={Yup.object({
                
                    Password: Yup.string()
                      .min(8, 'Too Short ! At least 8 Characters Required')
                      .required('Field Required'),
                    ConPassword: Yup.string()
                      .min(8, 'Too Short ! At least 8 Characters Required')
                      .required('Field Required')
                      .oneOf([Yup.ref('Password')], 'Passwords do not match'),
                  })}
      
                onSubmit={(values) => {
                    console.log(values);

                }}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                }) => (
                    <View>
                    <View>
                    <Input
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                        width: WP('92'),
                        marginTop: WP('4'),
                      }}
                      placeholder={'Password'}
                      placeholderTextColor="#757B77"
                      style={[styles.input]}
                      onChangeText={handleChange('Password')}
                      onBlur={handleBlur('Password')}
                      error={errors.Password}
                      touched={touched.Password}
                      autoCorrect={false}
                      secureTextEntry={true}
                     
                      errorMessage={
                        errors.Password && touched.Password
                          ? errors.Password
                          : null
                      }
                      errorStyle={{marginLeft: WP('10.5')}}
                    />
                  </View>
                  <View>
                    <Input
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                        width: WP('92'),
                        marginTop: WP('-1'),
                      }}
                      placeholder={'Confirm Password'}
                      placeholderTextColor="#757B77"
                      style={styles.input}
                      onChangeText={handleChange('ConPassword')}
                      onBlur={handleBlur('ConPassword')}
                      error={errors.ConPassword}
                      touched={touched.ConPassword}
                      autoCorrect={false}
                      secureTextEntry={true}
                      
                 
                      errorMessage={
                        errors.ConPassword && touched.ConPassword
                          ? errors.ConPassword
                          : null
                      }
                      errorStyle={{marginLeft: WP('10.5')}}
                    />
                  </View>
  
  

                        <View>
                            <TouchableOpacity
                                style={styles.loginbtn}
                                onPress={handleSubmit}
                            //onPress={()=>navigation.navigate('Home')}
                            >
                                <Text style={{ fontSize: 20, color: '#fff',marginRight:10 }}>  {t('Reset')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                
            </Formik>
            
        </View>
    )
}

export default ResetForm

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        fontSize: 18,
        height: HP('6'),
        borderColor: "#9E9E9E",
        width: WP('40'),
        borderWidth: 1,
        paddingHorizontal: WP('4'),
        marginHorizontal: WP('10')

    },
    loginbtn: {
        backgroundColor: '#4F6EA5',
        paddingVertical: WP('2'),
        paddingHorizontal: WP('6'),
        color: 'black',
        borderRadius: 30,
        fontSize: 18,
        fontWeight: 'bold',
        //justifyContent: 'center',
        alignItems: 'center',
        marginVertical: WP('10'),
        // width: WP('3'),
        alignSelf: 'center'
    },
    passwordText: {
        textAlign: 'center',
        fontSize: WP('4.5'),
        textDecorationLine: 'underline'


    },
  
})
