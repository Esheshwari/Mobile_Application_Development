import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function FirstScreen({ navigation }: any) {
  const [name, setName] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Name:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={name}
        onChangeText={setName}
      />

      <Button
        title="Go to Second Screen"
        onPress={() => navigation.navigate('Second', { name })}
      />
    </View>
  );
}

function SecondScreen({ route }: any) {
  const { name } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Received Name:</Text>
      <Text>{name}</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
