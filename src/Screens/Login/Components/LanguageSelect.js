import React, { useState } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native'
import { Overlay } from 'react-native-elements';
import FontAicon from 'react-native-vector-icons/Ionicons';
import * as Work from '../../../shared/exporter'
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../../store/actions/auth.action';
import i18n from '../../../shared/MultilanghSetup/multilang';
import { withNamespaces } from 'react-i18next';
import { useTranslation } from 'react-i18next';
const { HP, WP } = Work;
const LanguageSelect = () => {
    const [popUpvisible, setpopUpvisible] = useState(false)
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const Laguage = useSelector(state => state?.auth?.language);
    console.log("Laguage-->",Laguage);
    const toggleOverlay = () => {
        setpopUpvisible(!popUpvisible);
    };
    return (
        <View>
            <Overlay
                overlayStyle={
                    styles.OvelayStyle
                }
                isVisible={popUpvisible}
                onBackdropPress={toggleOverlay} >
                <TouchableOpacity onPress={toggleOverlay} style={{ alignSelf: 'flex-end' }}>
                    <FontAicon

                        name="close"
                        size={20}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        //i18n.changeLanguage(i18n.language === 'ita' ? 'en' : 'ita')
                        i18n.changeLanguage("en"),
                            dispatch(Jobs.Languageswitch('en')),
                            setpopUpvisible(false)
                    }}
                    style={styles.flagView}>
                    <Image
                        style={{ height: 25, width: 40, }}
                        source={require('../../../assets/Images/flag.png'

                        )} />

                    <Text style={styles.popText}>
                        English
              </Text>
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TouchableOpacity
                    onPress={() => {
                        //i18n.changeLanguage(i18n.language === 'ita' ? 'en' : 'ita')
                        i18n.changeLanguage("ita"),
                            dispatch(Jobs.Languageswitch('ita')),
                            setpopUpvisible(false)
                    }}
                    style={styles.flagView}>
                    <Image
                        style={{ height: 27, width: 40, }}
                        source={require('../../../assets/Images/Flag-Italy.jpeg'

                        )} />

                    <Text style={styles.popText}>
                        { }Italian
              </Text>
                </TouchableOpacity>

                <View style={{ height: HP('2') }}>

                </View>


            </Overlay>
            <TouchableOpacity onPress={() => setpopUpvisible(true)}>
                <Image
                    style={{ height: 60, width: 60, borderRadius: 30, borderWidth: 2, borderColor: 'lightgrey', alignSelf: 'flex-end', marginRight: 30 }}
                    source={ Laguage == 'ita' ?  require('../../../assets/Images/Flag-Italy.jpeg'):require('../../../assets/Images/flag.png')}>

                </Image>
            </TouchableOpacity>
        </View>
    )
}

export default LanguageSelect

const styles = StyleSheet.create({
    OvelayStyle:
    {
        backgroundColor: '#fff',
        width: Work.WP('40'),
        // height: Work.HP('40'),
        borderRadius: 10
    },
    popText: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: Work.WP('7'),
        marginVertical: Work.WP('1')
    },
    flagView: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-evenly'
    },
    line: {
        height: 1,
        backgroundColor: 'lightgrey',
        marginVertical: 10

    }
})
