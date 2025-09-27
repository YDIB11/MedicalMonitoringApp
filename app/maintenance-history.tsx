import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Define the type for each maintenance history item
interface MaintenanceItem {
  date: string;
  description: string;
}

export default function MaintenanceHistoryScreen() {
  // State to store maintenance history data, typed as an array of MaintenanceItem
  const [maintenanceHistory, setMaintenanceHistory] = useState<
    MaintenanceItem[]
  >([]);

  useEffect(() => {
    // Simulate an API call to fetch maintenance history data
    const fetchData = async () => {
      // Example of fetching data (replace with real API call)
      const fetchedData: MaintenanceItem[] = [
        {
          date: "2024-09-01",
          description: "Regular maintenance - Filter cleaned.",
        },
        { date: "2024-08-15", description: "Battery replacement." },
        { date: "2024-07-10", description: "Software update." },
      ];
      setMaintenanceHistory(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Maintenance History</Text>

      {maintenanceHistory.length > 0 ? (
        maintenanceHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyDescription}>{item.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No maintenance history available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#021526",
    alignItems: "center", // Center content horizontally
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6EACDA",
    marginBottom: 20,
    textAlign: "center", // Center the title text
  },
  historyItem: {
    backgroundColor: "#E2E2B6",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    width: "90%", // Responsive width to fit various screen sizes
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  historyDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#03346E",
    marginBottom: 5,
  },
  historyDescription: {
    fontSize: 16,
    color: "#03346E",
    flexShrink: 1, // Allow the text to wrap
    textAlign: "justify", // Improve text readability
  },
  noDataText: {
    fontSize: 18,
    color: "#6EACDA",
    textAlign: "center", // Center the text if no data is available
    marginTop: 20,
  },
});
