import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import type { NotificationChannelInput } from 'expo-notifications';
import { useStkOptions } from '../../components';

/**
 * Gets the users push notification token and calls the callback function. By default, it'll call the callback one time or when
 * the callback changes. It will ask users for push notification permissions unless active: false.
 * ```tsx
 * useSubscribeToPushNotifications({
 *  callback: (token)=>sendTokenToBackend(token);
 *  active: true // defaults to true, set to false if you want to wait to ask for permissions
 * })
 * ```
 */
export function useSubscribeToPushNotifications({
  callback,
  active = true,
}: {
  callback: (token: string) => void;
  active?: boolean;
}) {
  const channelInput = useStkOptions().androidNotificationChannel;

  useEffect(() => {
    registerForPushNotificationsAsync(channelInput).then((token) => {
      if (!token) {
        console.log("Couldn't register for notifications.");
        return;
      }
      console.log('Registered with token: ' + token);
      callback(token);
    });
  }, [callback, active, channelInput]);
}

async function registerForPushNotificationsAsync(
  androidNotificationChannelInput?: NotificationChannelInput
) {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync(
      'default',
      androidNotificationChannelInput
        ? androidNotificationChannelInput
        : {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          }
    );
  }

  return token;
}
