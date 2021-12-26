import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import * as Work from '../../shared/exporter'
const LogoImage = ({screen}) => {
    return (
        <View>
             <Image
            style={ screen =='home'? styles.HomepageStyle:styles.logoImage}
            source={require('../../assets/Images/Menulogo.png')}
            />
        </View>
    )
}

export default LogoImage

const styles = StyleSheet.create({
    logoImage:{
        height:Work.HP('10'),
        width:Work.WP('80'),
        marginBottom:Work.WP('5'),
        alignSelf:'center'
    },
    HomepageStyle:{
         height:Work.HP('10'),
         width:Work.WP('80'),
         alignSelf:'center'

    }
})
