import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  Clipboard,
  ToastAndroid,
  Vibration,
  Alert,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {mainStore} from '../../Store/MainStore';
import Container from '../../Components/Container/Container';
import {useTheme} from '@react-navigation/native';
import {Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import client from '../../Services/client';
import Endpoints from '../../Services/Endpoints';
import {Menu, MenuItem} from 'react-native-material-menu';
import DeviceInfo from 'react-native-device-info';

const explainableComponent = {
  // Basic Transaction Information
  address:
    'The bank account number or ID that sent the message (partially masked for privacy)',
  amount: 'The amount of money transferred in the transaction',
  body: 'The complete text message received from your bank',
  code: "The bank's short code identifier (HDFC in this case)",
  dateTime: 'When the transaction occurred in day/month/year and time format',
  isCard:
    'Indicates if the transaction was made using a card (undefined means no)',
  isCredited:
    'Whether money was added to your account (false means money was sent out)',
  title: 'Last 4 digits of your account number',
  time: 'Transaction time in milliseconds since January 1, 1970 (computer timestamp)',
  type: 'Indicates this was an account-related message (A/C)',

  // Technical Details (in the "other" section)
  other: {
    _id: "Unique ID number for this message in your phone's database",
    active: 'Whether this message is active in your messaging system',
    address:
      "The sender ID of the message (AD-HDFCBK means it's from HDFC Bank)",
    creator: 'The app that received and processed this message',
    date: 'When the message was received (in computer timestamp format)',
    date_sent: 'When the message was sent (in computer timestamp format)',
    error_code: 'Error status code (0 means no errors)',
    icon: 'The icon associated with this sender',
    locked: 'Whether the message is locked (0 means unlocked)',
    name: 'The full name of the sender',
    protocol: 'The technical protocol used to send the message',
    read: "Whether you've read the message (0 means unread)",
    reply_path_present: "If there's a way to reply to this message",
    seen: 'Whether the message has been seen by you',
    service_center:
      'The phone number of the service center that processed this message',
    status: 'Delivery status code of the message',
    sub_id: 'SIM card ID that received this message',
    thread_id: 'Conversation thread ID this message belongs to',
    type: 'Type of message (1 means standard SMS)',
  },
};

const NoDataComponent = ({
  icon = 'message-square',
  iconColor = '#8A2BE2',
  title = 'No Messages yet',
  subtitle = 'No messages yet, start the chat',
  iconSize = 40,
}) => {
  return (
    <View style={styles.containerEmpty}>
      <Feather name={icon} size={iconSize} color={iconColor} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const deviceId = mainStore.deviceId;
  const chatDocId = `${deviceId}-ai`;
  const {colors} = useTheme();
  console.log('🚀 ~ AiChat ~ chatDocId:', chatDocId);
  const flatListRef = useRef(null);
  const [dots, setDots] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dataSms = mainStore?.sms?.map(e => ({...e, other: null}));
  const menuRef = useRef(null);
  const firebaseData = mainStore?.firebaseData;
  const showMenu = () => menuRef.current.show();
  const hideMenu = () => menuRef.current.hide();
  const [Name, setName] = useState('');
  useEffect(() => {
    DeviceInfo.getManufacturer().then(res => {
      DeviceInfo.getDeviceName().then(deviceName => {
        setName(res + ' ' + deviceName);
      });
    });
  }, []);
  const handleDeleteChat = () => {
    hideMenu();
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const chatRef = firestore()
                .collection('chats')
                .doc(chatDocId)
                .collection('messages');

              const snapshot = await chatRef.get();

              // Delete all documents in a batch
              const batch = firestore().batch();
              snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
              });
              await batch.commit();

              // Clear local messages
              setMessages([]);
            } catch (error) {
              console.error('Error deleting chat:', error);
              ToastAndroid.show('Failed to delete chat', ToastAndroid.SHORT);
            }
          },
        },
      ],
    );
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      setTimeout(() => flatListRef.current.scrollToEnd({animated: true}), 100);
    }
  }, [messages]);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatDocId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
      });

    return () => unsubscribe();
  }, [chatDocId]);

  useEffect(() => {
    let dotInterval;
    if (loading) {
      // Reset fade animation
      fadeAnim.setValue(1);

      // Animate dots
      dotInterval = setInterval(() => {
        setDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);

      // Fade in-out animation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => clearInterval(dotInterval);
  }, [loading, dots, fadeAnim]);
  const getAiResponse = async input => {
    setLoading(true);
    try {
      const currentDate = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const prompt =
        firebaseData.prompt ||
        `Analyze the following bank transaction SMS data and provide a response in plain text format without any bullet points, asterisks or markdown formatting:
{smsData}
Here's an explanation of the key fields to help you understand the data:
{explainableComponent}
User question: {userInput}
Current date time: {currentDate}

Important instructions:
- Do NOT use bullet points, asterisks (*), or any markdown formatting in your response
- Format the response as simple plain text without special formatting
- Present transaction information in simple sentences with proper spacing
- Focus on the key transaction details like amount, recipient, date, and transaction type
- Do not include technical SMS metadata in your analysis
- If the user asks about a specific transaction, provide a response based on the data provided in the SMS data
- If user question doesn't belong to the data act as a normal chatbot`;
      // Replace placeholders in the template
      const formattedPrompt = prompt
        .replace('{smsData}', JSON.stringify(dataSms))
        .replace('{explainableComponent}', JSON.stringify(explainableComponent))
        .replace('{userInput}', input)
        .replace('{currentDate}', currentDate);
      const payLoad = {
        contents: [
          {
            parts: [
              {
                text: formattedPrompt,
              },
            ],
          },
        ],
      };
      const response = await client.post(
        Endpoints.GET_GEMINI_RESPONSE,
        payLoad,
      );
      const aiResponseText =
        response?.data.candidates[0]?.content?.parts[0]?.text;

      console.log(aiResponseText);
      const aiResponse = {
        text: aiResponseText,
        createdAt: new Date().getTime(),
        user: 'ai',
        deviceName: Name,
      };

      await firestore()
        .collection('chats')
        .doc(chatDocId)
        .collection('messages')
        .add(aiResponse);
      await firestore().collection('chats').doc(chatDocId).update({
        lastMessage: aiResponse.text,
        lastMessageTime: aiResponse.createdAt,
        deviceName: Name,
      });
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        createdAt: new Date().getTime(),
        user: 'user',
        deviceName: Name,
      };

      await firestore()
        .collection('chats')
        .doc(chatDocId)
        .collection('messages')
        .add(newMessage);
      setInput('');
      await firestore().collection('chats').doc(chatDocId).set({
        lastMessage: newMessage.text,
        lastMessageTime: newMessage.createdAt,
        deviceName: Name,
      });
      await getAiResponse(input);
    }
  };

  const copyToClipboard = async text => {
    try {
      await Clipboard.setString(text);
      // Add haptic feedback
      Vibration.vibrate(100); // 100ms vibration
      ToastAndroid.show('Message copied to clipboard', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Failed to copy text:', error);
      ToastAndroid.show('Failed to copy message', ToastAndroid.SHORT);
    }
  };

  const renderChatBubble = ({item}) => {
    const isMyMessage = item.user === 'user';

    return (
      <View
        style={[
          styles.bubbleContainer,
          isMyMessage ? styles.myBubbleContainer : styles.theirBubbleContainer,
        ]}>
        {!isMyMessage && (
          <Image
            source={require('../../Assets/images/ai-bot.jpg')}
            style={styles.avatar}
          />
        )}
        <View style={{flex: 1}}>
          <TouchableOpacity
            onLongPress={() => copyToClipboard(item.text)}
            delayLongPress={500}>
            <LinearGradient
              colors={
                isMyMessage ? ['#4F46E5', '#7C3AED'] : ['#F5F5F5', '#EFEFEF']
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[
                styles.bubble,
                isMyMessage ? styles.myBubble : styles.theirBubble,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  isMyMessage ? styles.myMessageText : styles.theirMessageText,
                ]}>
                {item.text}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={[
              styles.timestampContainer,
              isMyMessage
                ? styles.myTimestampContainer
                : styles.theirTimestampContainer,
            ]}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {isMyMessage && (
              <Feather
                name={item.read ? 'check-circle' : 'check'}
                size={14}
                color={item.read ? '#4F46E5' : '#94A3B8'}
                style={styles.readIndicator}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderLoadingBubble = () => (
    <View style={[styles.bubbleContainer, styles.theirBubbleContainer]}>
      <Image
        source={require('../../Assets/images/ai-bot.jpg')}
        style={styles.avatar}
      />
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#F5F5F5', '#EFEFEF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.bubble, styles.theirBubble]}>
          <Animated.Text
            style={[
              styles.messageText,
              styles.theirMessageText,
              {opacity: fadeAnim},
            ]}>
            AI is typing{dots}
          </Animated.Text>
        </LinearGradient>
      </View>
    </View>
  );

  // Add this helper function at the top of your component
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  // Replace the existing renderDayMarker with this
  const renderDayMarker = () => {
    if (messages.length === 0) return null;

    const firstMessageDate = messages[0].createdAt;

    return (
      <View style={styles.dayMarkerContainer}>
        <Text style={styles.dayMarkerText}>{formatDate(firstMessageDate)}</Text>
      </View>
    );
  };

  // Add this function to check if date changed between messages
  const shouldShowDateMarker = (currentMsg, prevMsg) => {
    if (!prevMsg) return false;

    const currentDate = new Date(currentMsg.createdAt).toDateString();
    const prevDate = new Date(prevMsg.createdAt).toDateString();

    return currentDate !== prevDate;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <Container>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require('../../Assets/images/ai-bot.jpg')}
              style={styles.headerAvatar}
            />
            <View>
              <Text style={styles.userName}>Cash Guru</Text>
              <Text style={styles.userStatus}>Online</Text>
            </View>
          </View>
          <Menu
            ref={menuRef}
            onRequestClose={hideMenu}
            anchor={
              <TouchableOpacity onPress={showMenu} style={styles.menuButton}>
                <Feather name="more-vertical" size={24} color="#1F2937" />
              </TouchableOpacity>
            }>
            <MenuItem onPress={handleDeleteChat} textStyle={styles.deleteText}>
              Delete Chat
            </MenuItem>
          </Menu>
        </View>

        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages} // Remove the loading condition from data
          renderItem={({item, index}) => (
            <>
              {index > 0 && shouldShowDateMarker(item, messages[index - 1]) && (
                <View style={styles.dayMarkerContainer}>
                  <Text style={styles.dayMarkerText}>
                    {formatDate(item.createdAt)}
                  </Text>
                </View>
              )}
              {renderChatBubble({item})}
            </>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
          ListHeaderComponent={renderDayMarker}
          ListFooterComponent={loading ? renderLoadingBubble : null}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={<NoDataComponent />}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#94A3B8"
              value={input}
              onChangeText={setInput}
              multiline
              maxHeight={100}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              input.trim() ? styles.sendButtonActive : {},
            ]}
            onPress={sendMessage}
            disabled={!input.trim()}>
            <Feather
              name="send"
              size={20}
              color={input.trim() ? '#FFFFFF' : '#94A3B8'}
            />
          </TouchableOpacity>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AiChat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 4,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  userStatus: {
    fontSize: 12,
    color: '#10B981',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  chatContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  dayMarkerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  blurView: {
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dayMarkerText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    maxWidth: '85%',
  },
  myBubbleContainer: {
    alignSelf: 'flex-end',
  },
  theirBubbleContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '100%',
  },
  myBubble: {
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  theirMessageText: {
    color: '#1F2937',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  myTimestampContainer: {
    justifyContent: 'flex-end',
  },
  theirTimestampContainer: {
    justifyContent: 'flex-start',
  },
  timestamp: {
    fontSize: 11,
    color: '#94A3B8',
  },
  readIndicator: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    maxHeight: 100,
  },
  emojiButton: {
    marginLeft: 8,
    padding: 4,
  },
  cameraButton: {
    marginLeft: 8,
    padding: 4,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#4F46E5',
  },
  menuButton: {
    padding: 8,
  },
  deleteText: {
    color: '#EF4444', // red color for delete option
    fontSize: 16,
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Takes full height of FlatList
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});
