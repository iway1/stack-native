import { useEffect } from 'react';
import { Linking } from 'react-native';
import type { AnyZodObject, z } from 'zod';

function getURLParams(parameterName: string, url: string) {
  const name = parameterName.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return null;
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function parseFirebaseDynamicLinkData(fireBaseUrl: string) {
  const link = getURLParams('link', fireBaseUrl);
  if (!link) return;
  const data = getURLParams('data', link);
  if (!data) return;
  const buffer = Buffer.from(data, 'base64');
  return buffer.toString();
}

export function useHandleDynamicLink<Schema extends AnyZodObject>({
  schema,
  callback,
  handlesInitial = false,
}: {
  schema: Schema;
  callback: (data: z.infer<Schema>) => void;
  handlesInitial?: boolean;
}) {
  useEffect(() => {
    function handleData(d: unknown) {
      const parsed = schema.safeParse(d);
      if (!parsed.success) {
        return;
      }
      const { data } = parsed;
      callback(data);
    }

    function handleUrl(url: string) {
      const base64String = parseFirebaseDynamicLinkData(url);
      if (!base64String) return;
      const json = JSON.parse(base64String);
      handleData(json);
    }

    if (handlesInitial) {
      Linking.getInitialURL().then((data) => {
        if (data) handleUrl(data);
      });
    }

    const dynamicLinkListener = Linking.addEventListener('url', (data) => {
      handleUrl(data.url);
    });
    return () => {
      dynamicLinkListener.remove();
    };
  }, [callback, schema, handlesInitial]);
}
