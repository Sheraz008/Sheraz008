
import { SafeAreaView, StyleSheet, StatusBar,Text, TouchableOpacity, View, ScrollView, Button } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import FontAicon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import * as Work from '../../shared/exporter'
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Bubble, GiftedChat, Send, InputToolbar, Composer,Message,Time } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Jobs from '../../store/actions/auth.action';
import io from 'socket.io-client';
import { Platform } from 'react-native';
const Chatscreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const userid = useSelector(state => state.auth?.user?.user?._id);
    const Messages = useSelector(state => state?.auth?.chatMessages);
    const Language = useSelector(state => state?.auth?.language);
    const socket = io('http://147.182.142.76:5000');
   // console.log("Messages---->", Messages);
    useEffect(() => {

        Language == 'ita' ?
            setMessages([
              
                {
                    _id: 2,
                    text: 'In questa chat non forniamo consulenza legale. Se hai bisogno di questo servizio usa il nostro servizio di consulenza online.',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Ali',
                        //avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 1,
                    text: 'Ciao, in questa chat ti forniremo un orientamento legale in modo da guidarti nella risoluzione del tuo caso problema legale.',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Sheraz ',
                        //avatar: 'https://placeimg.com/140/140/any',
                    },
                },


            ]) :
            setMessages([
               
                {
                    _id: 2,
                    text: 'We dont provide legal consulting services here.If you need this service you can use our online consultant section',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'ALI',
                        //avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 1,
                    text: t('Hello, in this chat we will help you to undestand the legal guidelines in order to resolve your legal problem.'),
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Sheraz',
                        //avatar: 'https://placeimg.com/140/140/any',
                    },
                },

             

            ]);

        socket.on('message', (userMessage) => {
            console.log("userMessage---->", userMessage);

        });
        dispatch(Jobs.chatMessages({ userId: userid }),);
        let getList = [];
        Messages && Messages?.map(data => {
            getList.push({
                _id: data.id,
                text: data.message,
                createdAt: new Date(data.created_at),
                user: {
                    _id: data.sender,
                    name: 'sheraz',
                },
            });
        });
        //   setMessages(getList);
    }, []);

    const onSend = useCallback((messages = []) => {
        
        const Message = {
            sender: userid,
            message: messages[0].text,
            // user_id:
            //   userid === route.params.data?.sender_id
            //     ? route.params.data?.receiver_id
            //     : route.params.data?.sender_id,
            // chat_id: chat_id,
            // photo: pic,
          };
          console.log("messages to be send ----->",Message);
        socket.emit('message', Message);

        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{height:50,width:50,justifyContent:'center',alignItems:'center',top:13}} >

                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{alignSelf:'center'}}
                        //style={{ marginTop: 1, marginRight: 10,marginBottom:10 }}
                        size={45}
                        color="#4F6EA5"
                    />
                    
                </View>
            </Send>
        );
    };
    const renderMessage = (props) => {
      
        const containerStyle = {
            
            left: {

                marginLeft: 10,
            },
           backgroundColor:"blue"
        };
    
        return <Message { ...props} containerStyle={{
            marginTop:10,backgroundColor:'red'
        }} />;
    };

    // const renderBubble = (props) => {
        
        
    // };
    const renderBubble = (props) => {
        
        
        return (
          <View>
        
            <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#4F6EA5',
                },
                left: {
                    backgroundColor: '#fff',
                },
            }}
            textStyle={{
                right: {
                    fontFamily: 'Montserrat-Light',
                    fontSize: 19
                },
                left: {
                    color:"grey",
                    fontFamily: 'Montserrat-Light',
                    fontSize: 19
                },
                
            }}
        />
          </View>
        );
      }
    
    
   
    const renderInputToolbar = (props) => {

        return (
            <InputToolbar
                {...props}
                placeholder={Language == 'ita' ? "Messaggio" : "Message"}
                textInputStyle={styles.input}
            //containerStyle={{ borderRadius: 30,borderWidth:1,borderColor:"grey",borderTopColor:'grey'}}
            //  textInputStyle={{borderWidth: 1.5,borderRadius: 30,borderWidth:2,borderColor:"lightgrey",}}
            //containerStyle={{marginBottom:20,borderWidth: 1.5,borderRadius: 30,alignItems:'center',justifyContent:'center'}}
            />
        );
    }
    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }
    const renderComposer = (props) => {

        return (
            <Composer
                {...props}
                placeholder={Language == 'ita' ? "Messaggio" : "Message"}

                //containerStyle={{ borderRadius: 30,borderWidth:1,borderColor:"grey",borderTopColor:'grey'}}
                textInputStyle={{ borderWidth: 1.5, borderRadius: 30, borderWidth: 2, borderColor: "lightgrey", height: 40,paddingHorizontal:10,marginVertical:2,paddingVertical:12,top:15}}
            //containerStyle={{marginBottom:20,borderWidth: 1.5,borderRadius: 30,alignItems:'center',justifyContent:'center'}}
            />
        );
    }


    return (
        <SafeAreaView style={styles.ParentView}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor='#BDD5EB'
            />
            <View style={styles.IconContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <FontAicon
                        name="chevron-back-outline"
                        size={Work.WP('10')}
                        color={'#000'}
                        style={{ marginStart: 10 }}

                    />
                </TouchableOpacity>

                <View style={{ flexGrow: 0.4 }}></View>
                <FontAicon

                    name="chatbubbles-outline"
                    size={Work.WP('10')}
                    color={'#000'}
                />
            </View>
            {/* 
 <KeyboardAwareScrollView> */}
            <Animatable.View
                animation='fadeInUpBig'
                duration={1000}
                style={styles.mainView}>
                <GiftedChat
                    messages={messages}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderBubble={renderBubble}
                    alwaysShowSend
                    renderUsernameOnMessage={true}
                    renderSend={renderSend}
                    renderMessage={renderMessage}
                    //renderAvatar={null}
                    scrollToBottom
                    listViewProps={{keyboardDismissMode: 'on-drag'}}
                    isKeyboardInternallyHandled={false}
                    renderComposer={renderComposer}
                    renderInputToolbar={(props) => (
                        <InputToolbar {...props} containerStyle={{borderTopWidth: 0}} />
                      )}
           
                   // renderInputToolbar={renderInputToolbar}
                    scrollToBottomComponent={scrollToBottomComponent}
                />
                {/* <View style={styles.ChatboxContainer}>
                    <KeyboardAwareScrollView >
                    <Text style={styles.chatText}>Hello,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('0'), }]}>
                        in this chat we will help you to understand the legal guidelines in order to resolve your legal problem ,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('2'), }]}>We don't provide legal consulting services here. If you need the service you can use our online consultant services.</Text>

                    <Text style={styles.chatText}>Hello,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('0'), }]}>
                        in this chat we will help you to understand the legal guidelines in order to resolve your legal problem ,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('2'), }]}>We don't provide legal consulting services here. If you need the service you can use our online consultant services.</Text>
                    <Text style={styles.chatText}>Hello,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('0'), }]}>
                        in this chat we will help you to understand the legal guidelines in order to resolve your legal problem ,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('2'), }]}>We don't provide legal consulting services here. If you need the service you can use our online consultant services.</Text>
                    <Text style={styles.chatText}>Hello,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('0'), }]}>
                        in this chat we will help you to understand the legal guidelines in order to resolve your legal problem ,</Text>
                    <Text style={[styles.chatText, { marginTop: Work.WP('2'), }]}>We don't provide legal consulting services here. If you need the service you can use our online consultant services.</Text>
                    </KeyboardAwareScrollView>
                   
                </View> */}

                {/* <KeyboardAwareScrollView> */}
                {/* <View style={styles.bottomView}>

                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0, }}
                        placeholder={"Message"}
                        placeholderTextColor="#757B77"
                        multiline={true}
                        style={styles.input}
                    />

                </View> */}
                {/* </KeyboardAwareScrollView> */}
                {/* </KeyboardAwareScrollView> */}

                {/* <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always">
                  

                </KeyboardAwareScrollView> */}
                <View style={{marginVertical:20}}>
              
                </View>
            </Animatable.View>
            {/* </KeyboardAwareScrollView> */}


        </SafeAreaView>
    )
}

export default Chatscreen

const styles = StyleSheet.create({
    ParentView: {
        flex: 1,
        backgroundColor: '#BDD5EB',

    },
    mainView: {
        flex: 1,
        borderColor: 'grey',
        borderWidth: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: Work.WP('5'),
        backgroundColor: 'white',
    },
    IconContainer: {
        flexDirection: 'row',
        backgroundColor: '#BDD5EB',
        marginTop: Work.HP('2'),
        alignItems: 'center'

    },
    TextConatiner: {
        marginHorizontal: Work.WP('20'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Work.WP('10')
    },
    FormText: {
        textAlign: 'center',
        fontSize: 17,

    },
    chatText: {
        fontSize: 18,
        marginStart: Work.WP('10'),
        marginTop: Work.WP('10'),
        marginHorizontal: Work.WP('10')
    },
    input: {
        backgroundColor: '#fff',
        color:'#000',
        fontSize: 18,
        height: Work.HP('6'),
        lineHeight: Platform.OS == 'ios' ? 15 : 0,
        borderColor: "#9E9E9E",
        width: Work.WP('80'),
        borderWidth: 1,
        paddingHorizontal: Work.WP('4'),
        marginHorizontal: Work.WP('2'),
        borderRadius: 20,
        // marginBottom: 100

    },
    bottomView: {
        width: '100%',
        justifyContent: 'center',
        padding: 10,
        // flexDirection: 'column',
        //marginVertical: 10,
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick,
    },
    ChatboxContainer:
    {
        backgroundColor: 'red',
        maxHeight: Work.HP('60'),
        marginTop: Work.WP('3')
        // flex: 1,

    }


})