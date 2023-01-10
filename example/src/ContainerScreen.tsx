import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import {
  componentMap,
  ComponentMap,
  ScreenComponent,
  isComponentMap,
} from 'example/src/componentMap';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

export function camelCaseToTitleCase(s: string) {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const MUIIcon = styled(MaterialIcons);

function resolvePath(path: string[]): ComponentMap | ScreenComponent {
  let r: ComponentMap | ScreenComponent = componentMap;
  for (let p of path) {
    r = (r as any)[p as any];
  }
  return r;
}

export function ContainerScreen() {
  const params = useRoute<any>().params;
  const currentPath = params && params.path ? params.path : ([] as string[]);
  // console.log('Container screen path: ' + currentPath);
  const componentMapOrScreenComponent = resolvePath(currentPath);
  return isComponentMap(componentMapOrScreenComponent) ? (
    <ComponentMapScreen
      map={componentMapOrScreenComponent}
      path={currentPath}
    />
  ) : (
    <ComponentScreen Component={componentMapOrScreenComponent} />
  );
}

export function ComponentMapScreen({
  path,
  map,
}: {
  map: ComponentMap;
  path: string[];
}) {
  const nav = useNavigation<StackNavigationProp<any>>();

  function onPressRow(name: string) {
    const p = [...path, name];

    nav.navigate(p.join('.'), {
      path: p,
    });
  }

  return (
    <ScrollView className="p-1 pt-0 bg-[#3f3f46]">
      {Object.entries(map).map(([name, screenOrComponentMap]) => {
        const isMap = isComponentMap(screenOrComponentMap);
        return (
          <TouchableOpacity
            onPress={() => onPressRow(name)}
            className="flex flex-row px-2 py-2 mt-1 items-center bg-[#18181b] rounded-sm"
            key={name}
          >
            <MUIIcon
              size={24}
              color="#FEB52B"
              name={isMap ? 'folder' : 'build-circle'}
            />
            <Text className="ml-2 text-white font-bold">
              {camelCaseToTitleCase(name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export function ComponentScreen({ Component }: { Component: ScreenComponent }) {
  return <Component />;
}
