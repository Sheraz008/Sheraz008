import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements';
import FontAicon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Work from '../../../shared/exporter'
import { useTranslation } from 'react-i18next';
const { HP, WP } = Work;
const ResetEmailPopup = ({ PopVisible, Set_Modal_Visible }) => {
    const { t, i18n } = useTranslation();
    const toggleOverlay = () => {
        Set_Modal_Visible(!PopVisible);
    };

    return (
        <View>
            <Overlay
                overlayStyle={
                    styles.OvelayStyle
                }
                isVisible={PopVisible}
                onBackdropPress={toggleOverlay} >
                <TouchableOpacity onPress={toggleOverlay} style={{ alignSelf: 'flex-end' }}>
                    <FontAicon

                        name="close"
                        size={Work.WP('7.5')}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <Text style={styles.BoldText}>
                    {t("Password recovery")}
              </Text>
                <Text style={styles.popText}>
                    {t("Insert your email and we will send you a link to reset your password")}
            </Text>
                <View>
                    <Formik
                        initialValues={{ Email: '' }}
                        validationSchema={Yup.object({ Email: Yup.string().email().required('Please enter a valid Email') })}
                        onSubmit={(values) => {

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
                                        placeholder={t("Insert your email")}
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
                                        errorStyle={{ marginLeft: WP('5') }} />
                                </View>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.roundBtn}>
                                    <Text style={styles.BtnText}>
                                        {t("Reset password")}
            </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
                <View style={{height:HP('4')}}>

                </View>


            </Overlay>

        </View>
    )
}

export default ResetEmailPopup

const styles = StyleSheet.create({
    OvelayStyle:
    {
        backgroundColor: '#fff',
        width: Work.WP('80'),
        // height: Work.HP('40'),
        borderRadius: 30
    },
    popText: {
        fontSize: 17,
        textAlign: 'center',
        marginHorizontal: Work.WP('7'),
        marginVertical: Work.WP('1')
    },
    roundBtn: {
        backgroundColor: '#54749B',
        height: Work.HP('5'),
        width: Work.WP('50'),
        alignSelf: 'center',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnText: {
        color: '#fff',
        fontSize: 20
    },
    BoldText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#757575',
        textAlign: 'center',
        marginVertical: Work.WP('1')
    },
    input: {   
        backgroundColor: '#fff',
        fontSize: 18,
        height: HP('6'),
        borderColor: "#9E9E9E",
        width: WP('40'),
        borderWidth: 1,
        paddingHorizontal: WP('4'),
        marginHorizontal: WP('5'),
        marginTop: WP('4'),
        textAlign:'center'

    },
})
