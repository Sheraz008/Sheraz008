import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import FontAicon from 'react-native-vector-icons/Ionicons';
import {Input} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import * as Work from '../../../shared/exporter';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import * as Jobs from '../../../store/actions/auth.action';
const axios = require('axios');
const {HP, WP} = Work;

const ResetEmailPopup = ({PopVisible, Set_Modal_Visible}) => {
  const {t, i18n} = useTranslation();
  const Loader = useSelector(state => state.auth.loadingLoader);
  const toggleOverlay = () => {
    Set_Modal_Visible(!PopVisible);
  };
  const dispatch = useDispatch();
  const login = async ({ Email,Password }) => {
    Set_Modal_Visible(false);
    dispatch(
        Jobs.ResetPasswordRequest({
            email: Email,
            password:Password
        }),
    );
};
  const ApiCall = email => {
   
    axios({
      method: 'post',
      url: 'http://147.182.142.76:5000/api/forgetEmail',
      data: {
        email: email?.Email,
      },
    })
      .then(function (response) {
        console.log('response--->', response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View>
      <Overlay
        overlayStyle={styles.OvelayStyle}
        isVisible={PopVisible}
        onBackdropPress={toggleOverlay}>
        <TouchableOpacity
          onPress={toggleOverlay}
          style={{alignSelf: 'flex-end'}}>
          <FontAicon name="close" size={Work.WP('7.5')} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.BoldText}>{t('Password recovery')}</Text>
        <Text style={styles.popText}>
          {t(
            'Insert your email and we will send you a link to reset your password',
          )}
        </Text>
        <View>
          <Formik
            initialValues={{Email: '', Password: '',}}
            validationSchema={Yup.object({
              Email: Yup.string()
                .email()
                .required('Please enter a valid Email'),
                Password: Yup.string().min(5, 'Too Short ! At least 8 Characters Required').required('Please enter a valid Password'),

            })}
            onSubmit={values => {
                login(values);
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
                    inputContainerStyle={{borderBottomWidth: 0}}
                    placeholder={t('Insert your email')}
                    placeholderTextColor="#757B77"
                    style={styles.input}
                    onChangeText={handleChange('Email')}
                    onBlur={handleBlur('Email')}
                    error={errors.Email}
                    touched={touched.Email}
                    autoCorrect={false}
                    errorMessage={
                      errors.Email && touched.Email ? errors.Email : null
                    }
                    errorStyle={{marginLeft: WP('5')}}
                  />
                </View>
                <View>
                  <Input
                    inputContainerStyle={{borderBottomWidth: 0}}
                    placeholder={t("Enter your password")}
                    placeholderTextColor="#757B77"
                    style={[styles.input,{  marginTop: WP('0'),}]}
                    onChangeText={handleChange('Password')}
                    onBlur={handleBlur('Password')}
                    error={errors.Password}
                    touched={touched.Password}
                    autoCorrect={false}
                    errorMessage={
                      errors.Password && touched.Password ? errors.Password : null
                    }
                    errorStyle={{marginLeft: WP('5')}}
                  />
                </View>
           

             
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.roundBtn}>
                  <Text style={styles.BtnText}>{t('Reset password')}</Text>
                  {Loader == true ? (
                  <ActivityIndicator
                                style={{ alignSelf: 'center',marginStart:10 }}
                                size="small"
                                color={"#fff"}
                            />
                                 ) : null}
                </TouchableOpacity>
                
                               
              </View>
            )}
          </Formik>
        </View>
        <View style={{height: HP('4')}}></View>
      </Overlay>
    </View>
  );
};

export default ResetEmailPopup;

const styles = StyleSheet.create({
  OvelayStyle: {
    backgroundColor: '#fff',
    width: Work.WP('80'),
    // height: Work.HP('40'),
    borderRadius: 30,
  },
  popText: {
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: Work.WP('7'),
    marginVertical: Work.WP('1'),
  },
  roundBtn: {
    backgroundColor: '#54749B',
     height: Work.HP('5'),
    // width: Work.WP('50'),
     alignSelf: 'center',
     borderRadius: 30,
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 20,
     flexDirection:'row'
  
  },
  BtnText: {
    color: '#fff',
    fontSize: 20,
  },
  BoldText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#757575',
    textAlign: 'center',
    marginVertical: Work.WP('1'),
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 18,
    height: HP('6'),
    borderColor: '#9E9E9E',
    width: WP('40'),
    borderWidth: 1,
    paddingHorizontal: WP('4'),
    marginHorizontal: WP('5'),
    marginTop: WP('4'),
    textAlign: 'center',
  },
});
