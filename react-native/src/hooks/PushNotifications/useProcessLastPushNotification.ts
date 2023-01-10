import { useEffect, useRef } from 'react';
import type { AnyZodObject, z } from 'zod';
import { usePushNotificationsContext } from '../../components/Context/PushNotifications';

type Callback<T extends AnyZodObject> = (data: z.infer<T>) => void;

/**
 * Use this to process the last received push notification. This is useful in cases where the handling component may not be mounted
 * at the time that the notification is received. (IE the user opens the notification while not logged in, we can use this on a screen
 * where they are logged in and it will process it.). Once a notification is processed, it will be thrown away (so it wont' be processed again
 * in the future.)
 *
 * Notifications are only processed if they match the zod schema. If multiple useProcessLastPushNotification hooks are active at the same time
 * and their schemas match new push notification data, each callback gets called.
 * ```tsx
 * const Schema = z.object({
 *  type: z.literal("new-message")
 *  payload: z.object({
 *    text: z.string();
 *  })
 * })
 *
 * function MyComponent() {
 *  const [messages, setMessages] = useState<string[]>([]);
 *  useProcessLastPushNotification({
 *    callback: (data)=>setMessages((old)=>[...old, data.payload.text]);
 *    zodSchema: Schema,
 *  })
 * }
 * ```
 */
export function useProcessLastPushNotification<T extends AnyZodObject>({
  zodSchema,
  callback,
}: {
  zodSchema: T;
  callback: Callback<T>;
}) {
  const callbackRef = useRef<Callback<T>>(callback);
  callbackRef.current = callback;
  const { unprocessedNotificationData, notificationProcessed } =
    usePushNotificationsContext();
  useEffect(() => {
    if (unprocessedNotificationData) {
      const parse = zodSchema.safeParse(unprocessedNotificationData);
      if (!parse.success) return;
      callbackRef.current(parse.data);
      notificationProcessed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unprocessedNotificationData]);
}
