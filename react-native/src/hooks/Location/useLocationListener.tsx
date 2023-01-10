import { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import type { LocationObject } from 'expo-location';
import { v4 } from 'uuid';

type Callback = (coords: LocationObject) => void;
const BACKGROUND_TASK_NAME = 'background';

const executor: (body: TaskManager.TaskManagerTaskBody<object>) => void = (
  body
) => {
  const data = body.data as unknown as { locations: LocationObject[] };
  const l = data?.locations[0];
  if (!l) return;

  for (const callback of Object.values(locationCallbacks)) {
    callback(l);
  }
};

TaskManager.defineTask(BACKGROUND_TASK_NAME, executor);

const locationCallbacks: { [key: string]: Callback } = {};
const hasStartedBackgroundTaskRef = {
  hasStarted: false,
};

function startLocationTask() {
  if (hasStartedBackgroundTaskRef.hasStarted) return;
  Location.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
  }).catch((_) => {
    hasStartedBackgroundTaskRef.hasStarted = false;
    console.warn('Failed to start location updates task.');
  });
  hasStartedBackgroundTaskRef.hasStarted = true;
}

function addLocationCallback(callback: Callback) {
  const id = v4() as string;
  locationCallbacks[id] = callback;
  return {
    remove: () => {
      delete locationCallbacks[id];
    },
  };
}

/**
 * A hook that calls the callback function with the location object any time the location changes, and also calls the callback immediately
 * with the users last known location. Works with background updates, assuming the user
 * has given the appropriate permission and your app is configured for background location updates.
 * Make sure you ask for location permissions before settings "active" to true
 * @param callback Callback function that gets called immediately (if active) when the location changes
 * @param active Whether the listener is active. Defaults to true.
 *
 * ```tsx
 * const [location, setLocation] = useState<LocationObject | null>(null);
 *
 * useLocationListener({
 *  callback: (location)=>setLocation(location)
 * })
 * ```
 */
export function useLocationListener({
  callback,
  active = true,
}: {
  callback: Callback | null;
  active: boolean;
}) {
  const callbackRef = useRef<null | Callback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;
    if (!callback) return;
    Location.getLastKnownPositionAsync().then((l) => {
      // Checking for coords being truthy out of paranoia..
      // I've seen them return null before from some libs although I'm not sure about expo
      if (l && l.coords.latitude && l.coords.longitude) callback(l);
    });
    startLocationTask();
    const subscription = addLocationCallback(callback);
    return () => {
      subscription.remove();
    };
  }, [callback, active]);

  useEffect(() => {
    if (__DEV__) {
      addLocationCallback((coords) => {
        console.log('Location changed to ');
        console.log(coords);
      });
    }
  }, []);
}
