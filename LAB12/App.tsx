import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";


interface Post {
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async (limit = 10) => {
    try {
      setLoading(true); // 👈 START loading

      await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      );
      const data = await response.json();

      setPostList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // 👈 STOP loading (always runs)
    }
  };


 useEffect(() => {
  console.log("Loading started");
  fetchData();
}, []);

  useEffect(() => {
    console.log("Loading state:", loading);
}, [loading]);


if(loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.bodyText}>{item.body}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
        <View
          style={{
            height: 16,
          }}
        />
      )}
      ListEmptyComponent={<Text>No Posts Found</Text>}
      ListHeaderComponent={<Text style={styles.headerText}>Post List</Text>}
      ListFooterComponent={
        <Text style={styles.footerText}>End of list</Text>
      }
    />
      </View>
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center", // Center the loading spinner
    alignItems: "center", // Center the loading spinner
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 16,
  },
  });
