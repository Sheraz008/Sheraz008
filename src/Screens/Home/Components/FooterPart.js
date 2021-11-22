import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Work from '../../../shared/exporter'
import { useTranslation } from 'react-i18next';
const FooterPart = ({ Set_Modal_Visible,Set_Pressed_Type }) => {
    const { t, i18n } = useTranslation();
    return (
        <View>
            <View style={styles.MainContainer}>
                <FontAicon
                    style={{ marginTop: 10 }}
                    name="chatbubbles-outline"
                    size={Work.WP('10')}
                    color={'#000'}
                />
                <TouchableOpacity
                    onPress={() => {
                        Set_Modal_Visible(true);
                        Set_Pressed_Type('chat')
                    }}
                    style={styles.roundBtn}>
                    <Text style={styles.BtnText}>
                        {t("Chat")}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.MainContainer}>
                <FontAicon

                    name="mail-outline"
                    size={Work.WP('10')}
                    color={'#000'}
                />
                <TouchableOpacity
                      onPress={() => {
                        Set_Modal_Visible(true);
                        Set_Pressed_Type('mail')
                    }}
                    style={styles.roundBtn}>
                    <Text style={styles.BtnText}>
                         {t("Send email")}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.MainContainer}>
                <FontAicon

                    name="book-outline"
                    size={Work.WP('10')}
                    color={'#000'}
                />
                <TouchableOpacity
                     onPress={() => {
                        Set_Modal_Visible(true);
                        Set_Pressed_Type('appoitment')
                    }}
                    style={styles.roundBtn}>
                    <Text style={styles.BtnText}>
                        {t("Online consultant")}
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FooterPart

const styles = StyleSheet.create({
    MainContainer: {
        marginVertical: Work.WP('2'),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundBtn: {
        backgroundColor: '#54749B',
        height: Work.HP('4.5'),
        width: Work.WP('60'),
        alignSelf: 'center',
        borderRadius: 30,
        marginTop: Work.WP('5'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnText: {
        color: '#fff',
        fontSize: 20
    }
})
