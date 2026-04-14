import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      
      <Text>User Name:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={name}
        onChangeText={setName}
      />

      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text>Address:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={address}
        onChangeText={setAddress}
      />

      <Text>Gender:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setGender('Male')}>
          <Text style={{ marginRight: 20 }}>
            {gender === 'Male' ? '🔘 Male' : '⚪ Male'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setGender('Female')}>
          <Text>
            {gender === 'Female' ? '🔘 Female' : '⚪ Female'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text>Age:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text>Date of Birth:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        placeholder="YYYY-MM-DD"
        value={dob}
        onChangeText={setDob}
      />

      <Text>State:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter State"
        value={stateVal}
        onChangeText={setStateVal}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {submitted && (
        <View style={{ marginTop: 20 }}>
          <Text>--- Submitted Data ---</Text>
          <Text>Name: {name}</Text>
          <Text>Password: {password}</Text>
          <Text>Address: {address}</Text>
          <Text>Gender: {gender}</Text>
          <Text>Age: {age}</Text>
          <Text>DOB: {dob}</Text>
          <Text>State: {stateVal}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default App;
