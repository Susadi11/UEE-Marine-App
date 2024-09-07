import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';  // Import Text from react-native

interface TabBarButtonProps {
  isFocused: boolean;
  onPress: () => void;
  routeName: string;
  color: string;
  label: string;  // Ensure this is a string
  style?: ViewStyle;
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {
  const { isFocused, label, routeName, color, onPress, style } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      isFocused ? 1 : 0,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  const getIconName = () => {
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'Blog':
        return 'forum-outline';
      case 'Events':
        return 'calendar-month-outline';
      case 'Sounds':
        return 'music';
      default:
        return 'home';
    }
  };

  return (
    <Pressable {...{ onPress }} style={[styles.container, style]}>
      <Animated.View style={[animatedIconStyle]}>
        <MaterialCommunityIcons name={getIconName()} size={24} color={color} />
      </Animated.View>

      <Animated.Text style={[{ color, fontSize: 11 }, animatedTextStyle]}>
        {/* Ensure the label is rendered inside a Text component */}
        <Text>{label}</Text>  {/* Wrap the label in a <Text> component */}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default TabBarButton;
