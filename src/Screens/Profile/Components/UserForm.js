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
const UserForm = ({CurrentUser}) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const updateUser = async ({ Name,Surname,Email, DateOfBirth }) => {
 
      dispatch(
        Jobs.updateUser({
            name:Name,
            surname:Surname,
          email: Email,
          dob: DateOfBirth,
          userId:CurrentUser?._id
        }),
      );
    };
    return (
        <View style={styles.FormikView}>
        <Formik
            initialValues={{
                Name: CurrentUser?.name,
                Surname: CurrentUser?.surname,
                DateOfBirth:CurrentUser?.dob,
                Email:CurrentUser?.email,
               
            }}
            validationSchema={Yup.object({
                Name: Yup.string().required('Name Required').max('25'),
                Surname: Yup.string().required('Surname Required').max('25'),
                DateOfBirth: Yup.string().required('Date of birth Required').max('25'),
                Email: Yup.string().email().required('Please enter a valid Email'),
                //Password: Yup.string().min(8, 'Too Short ! At least 8 Characters Required').required('Field Required'),
                // ConPassword: Yup.string().min(8, 'Too Short ! At least 8 Characters Required').required('Field Required').oneOf([Yup.ref('Password')], 'Passwords do not match'),
            })}
            onSubmit={(values) => {
     //console.log(values);
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
                            defaultValue={CurrentUser?.name}
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
                            defaultValue={CurrentUser?.surname}
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
                            defaultValue={CurrentUser?.email}
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
                            placeholder={t("Date of birth")}
                            placeholderTextColor="#757B77"
                            style={styles.input}
                            onChangeText={handleChange('DateOfBirth')}
                            onBlur={handleBlur('DateOfBirth')}
                            error={errors.DateOfBirth}
                            touched={touched.DateOfBirth}
                            autoCorrect={false}
                            defaultValue={CurrentUser?.dob}
                            errorMessage={
                                errors.DateOfBirth && touched.DateOfBirth
                                    ? errors.DateOfBirth
                                    : null
                            }
                            errorStyle={{ marginLeft: WP('10') }} />
                    </View>

                    {/* <View>
                        <Input
                            inputContainerStyle={{ borderBottomWidth: 0, }}
                            placeholder={t("Password")}
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
                    </View> */}

                  
                    <View>
                        <TouchableOpacity
                            style={styles.loginbtn}
                            onPress={handleSubmit}>
                            <Text style={{ fontSize: 20, color: '#fff' }}>{("Save changes")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    </View>
    )
}

export default UserForm

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
        marginVertical: WP('10'),
        width: WP('40'),
   
        alignSelf: 'center'
    },
    passwordText: {
        textAlign: 'center',
        fontSize: WP('4.5'),
        textDecorationLine: 'underline'
    },
    FormikView:{
        marginTop:WP('15')

    }

})
