import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useMaintenance } from "./MaintenanceContext";

export default function AddMaintenanceScreen() {
  const router = useRouter();
  const { deviceName: defaultDeviceName } = useLocalSearchParams(); // Get the device name from params
  const { addMaintenanceRecord } = useMaintenance();

  // Use the device name from params, or allow manual input if not provided
  const [deviceName, setDeviceName] = useState<string>(
    defaultDeviceName ? String(defaultDeviceName) : ""
  );
  const [maintenanceDate, setMaintenanceDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const validateForm = () => {
    if (!deviceName) {
      Alert.alert("Error", "Device name is required.");
      return false;
    }
    if (!maintenanceDate) {
      Alert.alert("Error", "Maintenance date is required.");
      return false;
    }
    if (!description) {
      Alert.alert("Error", "Description is required.");
      return false;
    }
    return true;
  };

  const handleAddMaintenance = () => {
    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    // Add maintenance record using the context
    addMaintenanceRecord(deviceName, maintenanceDate, description);

    // Navigate back to the maintenance screen to see the updates
    router.push("/maintenance");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Maintenance Record</Text>

      {/* Device Name Input (disabled if deviceName was provided via navigation) */}
      <TextInput
        style={styles.input}
        placeholder="Device Name"
        placeholderTextColor="#6EACDA"
        value={deviceName}
        onChangeText={setDeviceName}
        editable={!defaultDeviceName} // Make input field non-editable if device name is pre-filled
      />

      <TextInput
        style={styles.input}
        placeholder="Maintenance Date (YYYY-MM-DD)"
        placeholderTextColor="#6EACDA"
        value={maintenanceDate}
        onChangeText={setMaintenanceDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#6EACDA"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Add Maintenance"
        onPress={handleAddMaintenance}
        color="#03346E"
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#6EACDA",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#E2E2B6",
    color: "#03346E",
  },
});
