import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

// ------------------
// Type Definition
// ------------------
type FoodItem = {
  id: number;
  name: string;
  category: 'Veg' | 'Non-Veg' | 'Beverage';
  price: number;
  rating: number;
};

// ------------------
// Load JSON Data
// ------------------
const menu: FoodItem[] = require('./menu.json');

const App = () => {

  const formatPrice = (price: number) => `₹${price}`;

  const getCardColor = (category: string) => {
    switch (category) {
      case 'Veg':
        return '#a9e9b8';     // Light Green
      case 'Non-Veg':
        return '#f97175';     // Light Red
      case 'Beverage':
        return '#95e2f0';     // Light Blue
      default:
        return '#f0f0f0';
    }
  };

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: getCardColor(item.category) },
      ]}
    >
      <Text style={styles.foodName}>🍽 {item.name}</Text>
      <Text style={styles.text}>📂 {item.category}</Text>
      <Text style={styles.text}>💰 {formatPrice(item.price)}</Text>
      <Text style={styles.text}>⭐ {item.rating}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Restaurant Menu</Text>

      {/* Food List */}
      <FlatList
        data={menu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No items available</Text>
        )}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
      />

      {/* Footer */}
      <Text style={styles.footer}>Thank You for Visiting</Text>

    </SafeAreaView>
  );
};

// ------------------
// Styles
// ------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  footer: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    color: '#060606',
  },

  card: {
    width: 190,
    height: 160,
    padding: 16,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },

  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 15,
  },

  separator: {
    width: 16,
  },

  empty: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default App;
