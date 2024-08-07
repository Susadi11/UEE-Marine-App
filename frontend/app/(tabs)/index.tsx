import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const App = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-100`}>
      <Text style={tw`text-black-100 text-lg`}>Hello, Custom Tailwind!</Text>
    </View>
  );
};

export default App;
