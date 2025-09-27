import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useMaintenance } from "./MaintenanceContext";

export default function MaintenanceScreen() {
  const router = useRouter();
  const { maintenanceRecords } = useMaintenance();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maintenance Schedule</Text>

      {/* List of Maintenance Tasks */}
      <FlatList
        data={maintenanceRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>
              {item.device} - {item.date} ({item.status})
            </Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noDataText}>
            No maintenance records available.
          </Text>
        }
      />

      {/* Button to Add New Maintenance Record */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/add-maintenance")}
      >
        <Text style={styles.buttonText}>Add Maintenance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#021526",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  taskItem: {
    padding: 16,
    backgroundColor: "#E2E2B6",
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#03346E",
  },
  descriptionText: {
    fontSize: 14,
    color: "#03346E",
    marginTop: 5,
  },
  noDataText: {
    fontSize: 18,
    color: "#6EACDA",
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#03346E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#E2E2B6",
    fontSize: 18,
    fontWeight: "bold",
  },
});
