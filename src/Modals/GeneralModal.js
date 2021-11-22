import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Work from '../shared/exporter';
import Modal from 'react-native-modal';
import FontAicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Jobs from '../store/actions/auth.action';
import {  Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
const {WP, HP} = Work;
const GeneralModal = ({screen}) => {
  const navigation = useNavigation();
  const Loader = useSelector(state => state.auth.loadingLoader);
  const errorModal = useSelector(state => state.auth.errorLoader);
  const suceesModal = useSelector(state => state.auth.successLoader);
  const ErrorMessage = useSelector(state => state.auth.errorMessage);
  const SuccesMessage = useSelector(state => state.auth?.successMessage);

  const dispatch = useDispatch();
  const CloseModal = () => {
    dispatch(Jobs.errorModal(false));
  };
  const CloseSuccessModal = () => {
    dispatch(Jobs.successModal(false));
  };
  const toggleOverlaySucees = () => {
    
      dispatch(Jobs.successModal(!suceesModal))

  }

  const toggleOverlayError = () => {
    
      dispatch(Jobs.errorModal(!errorModal))
      
    }
  
  
  return( <View>
      {

        errorModal == true ? (
          <Overlay 
          isVisible={errorModal}
          overlayStyle={{
            backgroundColor: 'white',
            width: WP('50'),
            height: WP('50'),
            justifyContent: 'center',
            borderRadius: 10,
            shadowOffset: {width: 1, height: 1},
            shadowColor: '#000',
            shadowOpacity: 0.3,
            elevation: 5,

          }}
          onBackdropPress={toggleOverlayError}
         >
            
                <FontAicon
                  name="alert-circle-outline"
                  size={40}
                  color={'red'}
                  style={{alignSelf: 'center'}}
                />

                <Text
                  style={{fontSize: 18, color: 'grey', textAlign: 'center',marginVertical:15}}>
                  {ErrorMessage}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                   
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => CloseModal()}
                    style={{
                      height: HP('4.5'),
                      width: WP('25'),
                      backgroundColor:"#4F6EA5",
                      borderRadius: WP('5'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Back
                    </Text>
                  </TouchableOpacity>
                </View>
  
         
          </Overlay>
        ) : suceesModal == true ? (
          <Overlay 
          isVisible={suceesModal}
          overlayStyle={{
            backgroundColor: 'white',
            width: WP('50'),
            height: WP('50'),
            justifyContent: 'center',
            borderRadius: 10,
            shadowOffset: {width: 1, height: 1},
            shadowColor: '#000',
            shadowOpacity: 0.3,
            elevation: 5,

          }}
          onBackdropPress={toggleOverlaySucees}
         >
             {/* <FontAicon
                    name="checkmark-circle-outline"
                    size={40}
                    color={Work.THEME.colors.green}
                    style={{alignSelf: 'center'}}
                  /> */}
                  <Icon name="check-circle" color="green" size={40} style={{alignSelf: 'center'}} />

              
<Text
                  style={{fontSize: 18, color: 'grey', textAlign: 'center'}}>
                  {SuccesMessage}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: WP('5'),
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                    
                        CloseSuccessModal();
                      
                    }}
                    style={{
                      height: HP('4.5'),
                      width: WP('25'),
                      backgroundColor:"#4F6EA5",
                      borderRadius: WP('5'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
  
         
          </Overlay>
  
        ) : //  :
        //  ModalVisible == true ?
        // <PhoneverificationModal></PhoneverificationModal>
        null
      }
    </View>
  );
};

export default GeneralModal;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsWrapper: {
    width: 100,
  },
  blueText: {
    color: '#0f197a',
    fontSize: WP('3.5'),
    marginTop: WP('5'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: WP('10'),
  },
  yellowBackground: {
    height: WP('23'),
    width: WP('23'),
    borderRadius: WP('23'),
    marginTop: WP('4'),
    alignSelf: 'center',
    backgroundColor: '#FFD301',
  },
  RedBackground: {
    height: WP('23'),
    width: WP('23'),
    borderRadius: WP('23'),
    marginTop: WP('4'),
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  // MainCintainerView: {
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
