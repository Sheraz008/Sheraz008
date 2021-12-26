import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as Yup from 'yup';
import * as Work from '../../../shared/exporter';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/auth.action';
import Mailer from 'react-native-mail';

const { WP, HP } = Work
const SendMailForm = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const updateUser = async ({ Name,Surname,Email, Legalrequest }) => {
      dispatch(
        Jobs.sendMail({
            name:Name,
            surname:Surname,
            email: Email,
            message: Legalrequest,
 
        }),
      );
    };
  const   handleEmail = () => {
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<b>A Bold Body</b>',
      customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
      isHTML: true,
      attachments: [{
        // Specify either `path` or `uri` to indicate where to find the file data.
        // The API used to create or locate the file will usually indicate which it returns.
        // An absolute path will look like: /cacheDir/photos/some image.jpg
        // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
        path: '', // The absolute path of the file from which to read data.
        uri: '', // The uri of the file from which to read the data.
        // Specify either `type` or `mimeType` to indicate the type of data.
        type: '', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        mimeType: '', // - use only if you want to use custom type
        name: '', // Optional: Custom filename for attachment
      }]
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }
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
                updateUser(values)

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
                            placeholder={t("Write here your legal request")}
                            multiline={true}
                            placeholderTextColor="#757B77"
                            style={[styles.input,{ height: HP('25'),  textAlignVertical: 'top',}]}
                            onChangeText={handleChange('Legalrequest')}
                            onBlur={handleBlur('Legalrequest')}
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
                            onPress={handleEmail}>
                            <Text style={{ fontSize: 20, color: '#fff' }}>{t("Send email")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    </View>
    )
}

export default SendMailForm

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

