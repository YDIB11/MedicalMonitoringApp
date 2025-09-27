import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useMaintenance } from "./MaintenanceContext";
import { MaterialIcons } from "@expo/vector-icons";

// Get device dimensions
const { width } = Dimensions.get("window");

export default function DeviceMaintenanceHistory() {
  const { deviceName } = useLocalSearchParams(); // Get the device name from params
  const { maintenanceRecords } = useMaintenance();

  // Filter maintenance records for the specific device
  const filteredRecords = maintenanceRecords.filter(
    (record) => record.device === deviceName
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deviceName} - Maintenance History</Text>

      {/* List of Maintenance Tasks */}
      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="build" size={28} color="#03346E" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.taskText}>
                Date: {item.date} - Status: {item.status}
              </Text>
              <Text style={styles.descriptionText}>
                Description: {item.description}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noDataText}>
            No maintenance records for this device.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#021526",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6EACDA",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  taskItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#E2E2B6",
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
    color: "#03346E",
    fontWeight: "600",
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: "#03346E",
    flexShrink: 1,
    textAlign: "justify",
  },
  noDataText: {
    fontSize: 18,
    color: "#6EACDA",
    textAlign: "center",
    marginTop: 20,
  },
});
