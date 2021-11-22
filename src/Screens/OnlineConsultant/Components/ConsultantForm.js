import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as Yup from 'yup';
import * as Work from '../../../shared/exporter';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/auth.action';

const { WP, HP } = Work
const ConsultantForm = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const OnlineConsultant = async ({ Name,Surname,Email, Legalrequest }) => {
 
      dispatch(
        Jobs.onlineConsultant({
            name:Name,
            surname:Surname,
          email: Email,
          message: Legalrequest,

        }),
      );
    };
    return (
        <View style={styles.FormikView}>
        <Formik
            initialValues={{
                Name: '',
                Surname: '',
                Email: '',
                Legalrequest: '',
            }}
            validationSchema={Yup.object({
                Name: Yup.string().required('Name Required').max('25'),
                Surname: Yup.string().required('Surname Required').max('25'),
                Legalrequest: Yup.string().required('Field Required'),
                Email: Yup.string().email().required('Please enter a valid Email'),
                
            })}
            onSubmit={(values) => {
                OnlineConsultant(values)

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
                            placeholder={t("Name")}
                            placeholderTextColor="#757B77"
                            style={styles.input}
                            onChangeText={handleChange('Name')}
                            onBlur={handleBlur('Name')}
                            error={errors.Name}
                            touched={touched.Name}
                            autoCorrect={false}
                            errorMessage={
                                errors.Name && touched.Name
                                    ? errors.Name
                                    : null
                            }
                            errorStyle={{ marginLeft: WP('10') }} />
                    </View>
                
                    <View>
                        <Input
                            inputContainerStyle={{ borderBottomWidth: 0, }}
                            placeholder={t("Surname")}
                            placeholderTextColor="#757B77"
                            style={styles.input}
                            onChangeText={handleChange('Surname')}
                            onBlur={handleBlur('Surname')}
                            error={errors.Surname}
                            touched={touched.Surname}
                            autoCorrect={false}
                            errorMessage={
                                errors.Surname && touched.Surname
                                    ? errors.Surname
                                    : null
                            }
                            errorStyle={{ marginLeft: WP('10') }} />
                    </View>
                    <View>
                        <Input
                            inputContainerStyle={{ borderBottomWidth: 0, }}
                            placeholder={t("Email")}
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
                            placeholder={t("Summarize your legal request and indicate your time and date preference to schedule an appointment.")}
                            placeholderTextColor="#757B77"
                            style={[styles.input,{ height: HP('25'),  textAlignVertical: 'top',}]}
                            onChangeText={handleChange('Legalrequest')}
                            onBlur={handleBlur('Legalrequest')}
                            multiline={true}
                            error={errors.Legalrequest}
                            touched={touched.Legalrequest}
                            autoCorrect={false}
                            errorMessage={
                                errors.Legalrequest && touched.Legalrequest
                                    ? errors.Legalrequest
                                    : null
                            }
                            errorStyle={{ marginLeft: WP('10') }} />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.loginbtn}
                            onPress={handleSubmit}>
                            <Text style={{ fontSize: 20, color: '#fff' }}>{t("Send Request")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    </View>
    )
}

export default ConsultantForm

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
        textAlign: 'center',
        paddingVertical: WP('2'),
        color: 'black',
        borderRadius: 30,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: WP('2'),
        width: WP('40'),
   
        alignSelf: 'center'
    },
    passwordText: {
        textAlign: 'center',
        fontSize: WP('4.5'),
        textDecorationLine: 'underline'
    },
    FormikView:{
        marginTop:WP('10')

    }

})


