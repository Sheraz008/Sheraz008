import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as Work from '../../../shared/exporter'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const FooterPart = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    return (
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
            <View style={{ flexDirection: 'row', justifyContent: 'center',marginVertical: Work.WP('7'), }} >
                <Text style={[styles.normolText, { fontSize: Work.WP('4.5') }]}>
                {t("Already have an account?")}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.normolText, { fontSize: Work.WP('5'), top: 0, textDecorationLine: 'underline', }]}>
                    {t('Login')}
            </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FooterPart

const styles = StyleSheet.create({
    textView: {
        marginHorizontal: Work.WP('3'),
        marginTop: Work.WP('5'),
        justifyContent: 'center', alignItems: 'center'
    },
    normolText: {
        textAlign: 'center', fontSize: Work.WP('4'), top: 2
    },
    underLineText: {
        textAlign: 'center', fontSize: Work.WP('4.5'),
        textDecorationLine: 'underline'

    },
})
