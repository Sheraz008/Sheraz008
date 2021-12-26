import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
const LoginForm = ({ Set_Modal_Visible }) => {
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

                    Email: '',
                    Password: '',

                }}
                validationSchema={Yup.object({
                    Email: Yup.string().email().required('Please enter a valid Email'),
                    Password: Yup.string().min(5, 'Too Short ! At least 8 Characters Required').required('Field Required'),
                })}
                onSubmit={(values) => {
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
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Enter your email")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                onChangeText={handleChange('Email')}
                                onBlur={handleBlur('Email')}
                                error={errors.Email}
                                touched={touched.Email}
                                autoCorrect={false}
                                errorMessage={
                                    errors.Email && touched.Email
                                        ? errors.Email
                                        : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} />
                        </View>

                        <View>
                            <Input
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                placeholder={t("Enter your password")}
                                placeholderTextColor="#757B77"
                                style={styles.input}
                                onChangeText={handleChange('Password')}
                                onBlur={handleBlur('Password')}
                                error={errors.Password}
                                touched={touched.Password}
                                autoCorrect={false}
                                secureTextEntry={true}
                                errorMessage={
                                    errors.Password && touched.Password ? errors.Password : null
                                }
                                errorStyle={{ marginLeft: WP('10') }} />
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => Set_Modal_Visible(true)}>
                                <Text style={styles.passwordText}>{t('Forgot password?')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={styles.loginbtn}
                             onPress={handleSubmit}
                            //onPress={()=>navigation.navigate('Home')}
                            >
                                <Text style={{ fontSize: 20, color: '#fff',marginRight:15 }}>  {t(' Login')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default LoginForm;
// export default withNamespaces()(LoginForm);
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
        paddingHorizontal:WP('7'),
        color: 'black',
        borderRadius: 30,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: WP('10'),
       // width: WP('3'),
        alignSelf: 'center'
    },
    passwordText: {
        textAlign: 'center',
        fontSize: WP('4.5'),
        textDecorationLine: 'underline'


    }

})