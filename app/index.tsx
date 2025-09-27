import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useDevice } from "./DeviceContext";

export default function Index() {
  const router = useRouter();
  const { devices, addDevice } = useDevice();
  const [modalVisible, setModalVisible] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState<string>("");
  const [newDeviceManufacturer, setNewDeviceManufacturer] =
    useState<string>("");
  const [newDeviceModel, setNewDeviceModel] = useState<string>("");
  const [newDeviceSerialNumber, setNewDeviceSerialNumber] =
    useState<string>("");

  const renderButton = (
    title: string,
    iconName: keyof typeof AntDesign.glyphMap, // Ensuring the icon name is valid
    onPress: () => void
  ) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign
        name={iconName}
        size={20}
        color="#E2E2B6"
        style={styles.buttonIcon}
      />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const handleAddDevice = () => {
    if (
      !newDeviceName ||
      !newDeviceManufacturer ||
      !newDeviceModel ||
      !newDeviceSerialNumber
    ) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    const newDevice = {
      id: Math.random().toString(),
      name: newDeviceName,
      manufacturer: newDeviceManufacturer,
      model: newDeviceModel,
      serialNumber: newDeviceSerialNumber,
      status: "In Use",
      lastMaintenance: "N/A",
      nextMaintenance: "N/A",
      usageHours: "0",
      notes: "No notes available.",
    };
    addDevice(newDevice);
    setNewDeviceName("");
    setNewDeviceManufacturer("");
    setNewDeviceModel("");
    setNewDeviceSerialNumber("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Dashboard</Text>
      <View style={styles.separator} />

      {/* FlatList to show devices */}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          renderButton(item.name, "API", () =>
            router.push(`/device-details?id=${item.id}`)
          )
        }
        contentContainerStyle={styles.listContainer}
      />

      {/* Add Device Button */}
      {renderButton("Add Device", "plus", () => setModalVisible(true))}

      {/* Maintenance Button */}
      {renderButton("Go to Maintenance", "tool", () =>
        router.push("/maintenance")
      )}

      {/* Modal for Adding New Device */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Device</Text>
            <TextInput
              style={styles.input}
              placeholder="Device Name"
              value={newDeviceName}
              onChangeText={setNewDeviceName}
            />
            <TextInput
              style={styles.input}
              placeholder="Manufacturer"
              value={newDeviceManufacturer}
              onChangeText={setNewDeviceManufacturer}
            />
            <TextInput
              style={styles.input}
              placeholder="Model"
              value={newDeviceModel}
              onChangeText={setNewDeviceModel}
            />
            <TextInput
              style={styles.input}
              placeholder="Serial Number"
              value={newDeviceSerialNumber}
              onChangeText={setNewDeviceSerialNumber}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddDevice}
            >
              <Text style={styles.buttonText}>Add Device</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021526",
    padding: 36,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#E2E2B6",
    marginBottom: 30,
    letterSpacing: 1,
  },
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: "#6EACDA",
    marginVertical: 8,
  },
  listContainer: {
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#03346E",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: "center",
    width: 260,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#E2E2B6",
    fontSize: 18,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#E2E2B6",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#03346E",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#03346E",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#03346E",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#FF4C4C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
});
