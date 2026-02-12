import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#121212' : '#dadada';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const cardColor = isDarkMode ? '#1e1e1e' : '#ffffff';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={[styles.container, { backgroundColor }]}>
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={{ color: textColor }}>Danish</Text>
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 10 }}
        >
          <View style={styles.box1} />
          <View style={styles.box2} />
          <View style={styles.box3} />
          <View style={styles.box1} />
          <View style={styles.box2} />
          <View style={styles.box3} />
        </ScrollView>
      </View>

      <View style={{ backgroundColor: isDarkMode ? '#000' : '#333', padding: 10 }}>
        <Text style={{ color: 'white' }}>helowwww</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  box1: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  box2: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'green',
  },
  box3: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
