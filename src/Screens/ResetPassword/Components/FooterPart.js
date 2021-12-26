import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Linking } from 'react-native';
import * as Work from '../../../shared/exporter';
import i18n from '../../../shared/MultilanghSetup/multilang';
import { useTranslation } from 'react-i18next';
const { WP, HP } = Work;
const FooterPart = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    return (
        <View>
        <View>
        <View style={styles.textView}>
          <Text style={styles.normolText}>
            {t('By logging into your account, you accept our')}
          </Text>
         <View style={{ flexDirection: 'row' }} >
          <TouchableOpacity
                        onPress={()=> Linking.openURL('https://myavvocatoapp.com/termini-e-condizioni-generali')}
                        >
            <Text style={styles.underLineText}>
              
              {t('General Terms and Condition')}
            </Text>
            </TouchableOpacity>
            <Text style={styles.normolText}>
              {t(' and our')}
            </Text>
          </View>
          <TouchableOpacity
                        onPress={()=> Linking.openURL('https://myavvocatoapp.com/privacy-and-cookie-policy')}
                        >
          <Text style={[styles.underLineText, {}]}>
            {t('Privacy and cookie policy')}
          </Text>
</TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: Work.WP('7'), }} >
          <Text style={[styles.normolText, { fontSize: Work.WP('4.5') }]}>
            {t("Don't have an account?")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SingUp')}>
            <Text style={[styles.normolText, { fontSize: Work.WP('5'), top: 0, textDecorationLine: 'underline', }]}>
              {t(' Register')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
        </View>
    )
}

export default FooterPart

const styles = StyleSheet.create({
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
      textView: {
        marginTop: Work.WP('5'),
        justifyContent: 'center', alignItems: 'center'
      }

})
