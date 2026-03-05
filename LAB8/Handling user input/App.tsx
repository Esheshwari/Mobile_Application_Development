import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'




const Profile = ({ navigation }: { navigation: any }) => {


  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');


  // Only submit text
  const handleSubmit = () => {
    setSubmittedText(text);
  }






  return (
    <View style={styles.container}>


      <Text style={styles.title}>Profile Screen</Text>


      <TextInput
        placeholder="Enter something..."
        style={styles.input}
        value={text}
        onChangeText={(value) => setText(value)}
      />


      {/* Submit Button */}
      <Button title="Submit Text" onPress={handleSubmit} />


      {/* Show Result */}
      {submittedText ? (<Text style={styles.result}>Result: {submittedText}</Text>) : null}


      {/* Space */}
      <View style={{ marginTop: 15 }} />


      {/* Navigate Button */}
       <Button title='Home'  onPress={() => navigation.navigate('Home')}/>
    </View>
  )
}


export default Profile


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  result: {
    marginTop: 15,
    fontSize: 18
  }
})
