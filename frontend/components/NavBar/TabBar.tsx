// TabBar.tsx
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import TabBarButton from './TabBarButton';
import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const primaryColor = '#005eff';
  const greyColor = '#737373';

  return (
    <View style={styles.container}>
      <BlurView intensity={60} tint="light" style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key] as { options: BottomTabNavigationOptions };
          const label = typeof options.tabBarLabel === 'string' 
            ? options.tabBarLabel 
            : route.name; // Ensure label is a string

          // Skip rendering for certain routes
          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabBarButton
              key={route.name}
              style={styles.tabbarItem}
              onPress={onPress}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? primaryColor : greyColor}
              label={label}
            />
          );
        })}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    borderRadius: 45,
    overflow: 'hidden',
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'transparent',
    borderRadius: 45,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TabBar;
