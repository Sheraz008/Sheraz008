import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements';
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Work from '../../../shared/exporter'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const Popup = ({ PopVisible, Set_Modal_Visible, pressede_Typesending }) => {
    const navigation = useNavigation();
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
                <FontAicon
                    style={{ alignSelf: 'center' }}
                    name={pressede_Typesending == 'chat' ? "chatbubbles-outline" : pressede_Typesending == 'mail' ? "mail-outline" : 'book-outline'}
                    size={Work.WP('10')}
                    color={'#000'}
                />
                {
                    pressede_Typesending == 'chat' ?
                        <Text style={styles.popText}>
                            {t("This chat doesn't guarantee a legal advice. The consultant will only lead you trough the legal guidelines.")}
                </Text> :
                        pressede_Typesending == 'mail' ?
                            <Text style={styles.popText}>
                                {t("Our email response doesn't guarantee a legal advice. The consultant will only lead you trough the legal guidelines.")}
                </Text> :
                            <Text style={styles.popText}>
                                {t("Book an appointment online with a legal consultant. The price for 1 hour consultation is € 100,00.")}
                </Text>

                }



                <TouchableOpacity
                    onPress={() => {
                        pressede_Typesending == 'chat' ? navigation.navigate('Chat') : pressede_Typesending == 'mail' ? navigation.navigate('SendMail') : navigation.navigate('Consultant')
                        Set_Modal_Visible(false)
                    }
                    }

                    style={styles.roundBtn}>
                    <Text style={styles.BtnText}>
                        {t("Proceed")}
                </Text>
                </TouchableOpacity>
                <View style={{ height: Work.HP('2.5') }}>

                </View>
            </Overlay>

        </View>
    )
}

export default Popup

const styles = StyleSheet.create({
    OvelayStyle:
    {
        backgroundColor: '#fff',
        width: Work.WP('80'),
        //height: Work.HP('35'),
        borderRadius: 30
    },
    popText: {
        fontSize: 17,
        textAlign: 'center',
        marginHorizontal: Work.WP('6'),
        marginVertical: Work.WP('1')
    },
    roundBtn: {
        backgroundColor: '#54749B',
        height: Work.HP('5'),
        width: Work.WP('50'),
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
