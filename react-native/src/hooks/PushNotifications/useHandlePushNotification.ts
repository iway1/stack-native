import { useEffect } from 'react';
import type { ZodSchema } from 'zod';
import * as Notifications from 'expo-notifications';

/**
 * A hook that calls the callback any time a push notification is called. With this hook, push notifications will be handled once per
 * mounted usePushNotificationHandler. You have to pass a zod schema to validate the notification type, which will
 * make it so that the handler only fires when a notification is received data matching the zod schema (also makes the callback typesafe).
 * If you need to handle any push notification, you can pass z.any()
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
 *  usePushNotificationHandler({
 *    callback: (data)=>setMessages((old)=>[...old, data.payload.text]);
 *    zodSchema: Schema,
 *  })
 * }
 * ```
 */
export function useHandlePushNotification<SchemaType extends ZodSchema>({
  callback,
  zodSchema,
  active = true,
}: {
  callback: (data: SchemaType) => void;
  zodSchema: SchemaType;
  active?: boolean;
}) {
  useEffect(() => {
    if (!active) return;
    function handleData(d: unknown) {
      if (!zodSchema) {
        callback(d as any);
        return;
      }
      const parsed = (zodSchema as ZodSchema).safeParse(d);
      if (!parsed.success) {
        return;
      }
      const { data } = parsed;
      callback(data);
    }
    const listener = Notifications.addNotificationResponseReceivedListener(
      (e) => {
        handleData(e.notification.request.content.data);
      }
    );
    return () => listener.remove();
  }, [callback, zodSchema, active]);
}
