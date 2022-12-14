import * as React from 'react';
import { Image, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  componentMap,
  ComponentMap,
  isComponentMap,
} from 'example/src/componentMap';
import { ContainerScreen } from 'example/src/ContainerScreen';
import { NavigationContainer } from '@react-navigation/native';
import { images } from 'example/src/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { camelCaseToTitleCase } from 'example/src/ContainerScreen';

const stackNavigator = createStackNavigator();

type ComponentMapFlattened = string[];

function flattenComponentMap(
  componentMap: ComponentMap,
  path: string[]
): ComponentMapFlattened {
  let r: ComponentMapFlattened = [];
  for (var [name, componentOrScreen] of Object.entries(componentMap)) {
    const newPath = [...path, name];
    if (isComponentMap(componentOrScreen)) {
      r.push(newPath.join('.'));
      r = [...r, ...flattenComponentMap(componentOrScreen, newPath)];
    } else {
      r.push(newPath.join('.'));
    }
  }
  return r;
}

function Inner() {
  const componentMapFlattened = flattenComponentMap(componentMap, []);
  return (
    <stackNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#18181b' },
        headerTitleStyle: { color: '#FEB52B' },
        headerTintColor: 'white',
      }}
    >
      <stackNavigator.Screen
        name="root"
        options={{
          title: '',
          headerLeft: () => (
            <View className="pl-1 flex-row items-center justify-start flex-1">
              <Image className="flex-row justify-start" source={images.logo} />
            </View>
          ),
          headerRight: () => {
            return <Text className="text-[#FEB52B] mr-5 text-2xl">Native</Text>;
          },
        }}
        component={ContainerScreen}
      />
      {componentMapFlattened.map((path) => {
        const split = path.split('.');
        return (
          <stackNavigator.Screen
            key={path}
            name={path}
            component={ContainerScreen}
            options={{
              title: camelCaseToTitleCase(split[split.length - 1]!),
            }}
          />
        );
      })}
    </stackNavigator.Navigator>
  );
}

const NAV_STATE_KEY = 'nav-state';

export default function App() {
  const [navStateLoaded, setNavStateLoaded] = React.useState(false);
  const [initialNavState, setInitialNavState] = React.useState<any>();

  React.useEffect(() => {
    if (navStateLoaded) return;
    AsyncStorage.getItem(NAV_STATE_KEY).then((r) => {
      if (!r) {
        setNavStateLoaded(true);
        return;
      }
      setInitialNavState(JSON.parse(r));
      setNavStateLoaded(true);
    });
  }, [navStateLoaded]);
  if (!navStateLoaded) return null;
  return (
    <NavigationContainer
      initialState={initialNavState}
      onStateChange={(state) => {
        AsyncStorage.setItem(NAV_STATE_KEY, JSON.stringify(state));
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Inner />
      </View>
    </NavigationContainer>
  );
}
