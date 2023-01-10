import React, { useContext } from 'react';
import { Context, createContext, ReactNode, useState } from 'react';
import { z } from 'zod';
import { useHandlePushNotification } from '../../hooks/PushNotifications/useHandlePushNotification';

interface PushNotificationContext {
  unprocessedNotificationData: unknown | null;
  notificationProcessed: () => void;
}

const Context = createContext<PushNotificationContext | null>(null);

export function PushNotificationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [unprocessedPushNotification, setUnprocessedPushNotification] =
    useState<unknown | null>(null);

  // memoing breaks TS here not sure why, but shouldn't
  useHandlePushNotification({
    callback: (data) => setUnprocessedPushNotification(data),
    zodSchema: z.unknown(),
  });

  return (
    <Context.Provider
      value={{
        unprocessedNotificationData: unprocessedPushNotification,
        notificationProcessed: () => setUnprocessedPushNotification(null),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function usePushNotificationsContext() {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error(
      'usePushNotificationsContext must be called from within a PushNotificationProvider'
    );
  return ctx;
}
