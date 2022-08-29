import { ToastAndroid, Alert, Platform } from 'react-native';

export const displayToast = (msg) => {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
    } else {
        Alert.alert('', msg, [{ text: 'OK', onPress: () => { } }]);
    }
};
