import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
} from "react-native";
import students from "./students.json";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Student Directory</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.infoText}>Grade: {item.grade}</Text>
            <Text style={styles.infoText}>Section: {item.section}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.footerText}>Total Students: {students.length}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 12,
    fontWeight: "500",
  },
});
