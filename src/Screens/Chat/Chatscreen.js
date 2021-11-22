
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Button } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import FontAicon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import * as Work from '../../shared/exporter'
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Bubble, GiftedChat, Send ,InputToolbar,Composer} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import * as Jobs from '../../store/actions/auth.action';
import io from 'socket.io-client';
const Chatscreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const dispatch=useDispatch();
    const { t, i18n } = useTranslation();
    const userid = useSelector(state => state.auth?.user?.user?._id);
    const Messages = useSelector(state => state?.auth?.chatMessages);
    const socket = io('https://myavvocato.herokuapp.com');
    console.log("Messages---->",Messages);
    useEffect(() => {
        // setMessages([
        //     {
        //         _id: 1,
        //         text: t('Hello, in this chat we will help you to undestand the legal guidelines in order to resolve your legal problem.'),
        //         createdAt: new Date(),
        //         user: {
        //             _id: 2,
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        //     {
        //         _id: 2,
        //         text:'We dont provide legal consulting services hereIf you need the service you can use our online consultant services',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 2,
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
            

        // ]);

        socket.on('message', userMessage => {
            console.log("userMessage---->",userMessage);
      
          });
          dispatch(Jobs.chatMessages({userId:userid}),);
          let getList = [];
          Messages&& Messages?.map(data => {
            getList.push({
              _id: data.id,
              text: data.message,
              createdAt: new Date(data.created_at),
              user: {
                _id: data.sender,
                name:'sheraz',
                
              },
            });
          });
          setMessages(getList);
    }, []);

    const onSend = useCallback((messages = []) => {
        // const Message = {
        //     User_id: userid,
        //     message: messages[0].text,
        //     // user_id:
        //     //   userid === route.params.data?.sender_id
        //     //     ? route.params.data?.receiver_id
        //     //     : route.params.data?.sender_id,
        //     // chat_id: chat_id,
        //     // photo: pic,
        //   };
          socket.emit('message',(sender=userid,message=messages[0].text));

        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View >
                    
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#2e64e5"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };
   const  renderInputToolbar = (props) => {

        return ( 
                 <InputToolbar 
                    {...props}
                    placeholder="Message"
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
    const  renderComposer = (props) => {

        return ( 
                 <Composer 
                    {...props}
                    placeholder="Message"
                    
                   //containerStyle={{ borderRadius: 30,borderWidth:1,borderColor:"grey",borderTopColor:'grey'}}
                     textInputStyle={{borderWidth: 1.5,borderRadius: 30,borderWidth:2,borderColor:"lightgrey",height:40}}
                    //containerStyle={{marginBottom:20,borderWidth: 1.5,borderRadius: 30,alignItems:'center',justifyContent:'center'}}
                 />
       );
    }
 

    return (
        <SafeAreaView style={styles.ParentView}>
            <View style={styles.IconContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <FontAicon
                        name="chevron-back-outline"
                        size={Work.WP('10')}
                        color={'#000'}
                    />
                </TouchableOpacity>

                <View style={{ flexGrow: 0.4 }}></View>
                <FontAicon

                    name="chatbubbles-outline"
                    size={Work.WP('11')}
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
                    renderSend={renderSend}
                    scrollToBottom
                    //renderComposer={renderComposer}
                    renderInputToolbar={renderInputToolbar}
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
        fontSize: 18,
         height: Work.HP('6'),
        borderColor: "#9E9E9E",
        width: Work.WP('80'),
        borderWidth: 1,
        paddingHorizontal: Work.WP('4'),
        marginHorizontal: Work.WP('2'),
        borderRadius: 20,
        marginBottom: 100

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