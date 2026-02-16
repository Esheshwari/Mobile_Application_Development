import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function PaymentScreen() {
  const transferBanks = [
    { name: "Bank Mandiri", icon: "🏦" },
    { name: "Bank BCA", icon: "🏦" },
    { name: "Bank BNI", icon: "🏦" },
    { name: "Bank Mega", icon: "🏦" },
  ];

  const virtualAccounts = [
    { name: "Virtual Account Mandiri", icon: "💳" },
    { name: "Virtual Account BCA", icon: "💳" },
    { name: "Virtual Account BNI", icon: "💳" },
    { name: "Virtual Account Mega", icon: "💳" },
  ];

  const installments = [
    { name: "Kredivo", icon: "💰" },
    { name: "< 17 Tahun (S&K BERLAKU)", icon: "📄" },
  ];

  const renderItem = (item: any, index: number) => (
    <TouchableOpacity key={index} style={styles.paymentItem}>
      <View style={styles.paymentLeft}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.paymentText}>{item.name}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pembayaran</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.timer}>
            Selesaikan pemesanan dalam{" "}
            <Text style={styles.timerRed}>00:60:00</Text>
          </Text>

          <Text style={styles.sectionTitle}>Transfer Bank</Text>
          {transferBanks.map(renderItem)}

          <Text style={styles.sectionTitle}>Virtual Account</Text>
          {virtualAccounts.map(renderItem)}

          <Text style={styles.sectionTitle}>
            Cicilan Tanpa Kartu Kredit
          </Text>
          {installments.map(renderItem)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B2FF7",
  },

  header: {
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  timer: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },

  timerRed: {
    color: "red",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#555",
  },

  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 26,
    marginRight: 12,
  },

  paymentText: {
    fontSize: 15,
    color: "#333",
  },

  arrow: {
    fontSize: 22,
    color: "#7B2FF7",
    fontWeight: "bold",
  },
});
