import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDevice } from "./DeviceContext";
import { useMaintenance } from "./MaintenanceContext";

// Get device dimensions
const { width, height } = Dimensions.get("window");

type DeviceDetailsType = {
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: string;
  lastMaintenance: string;
  nextMaintenance: string;
  usageHours: string;
  notes: string;
};

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { devices } = useDevice();
  const { addMaintenanceRecord } = useMaintenance();
  const router = useRouter();

  // Find the device by ID
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetailsType>(
    devices.find((device) => device.id === id) || {
      name: "Unknown Device",
      manufacturer: "",
      model: "",
      serialNumber: "",
      status: "",
      lastMaintenance: "",
      nextMaintenance: "",
      usageHours: "",
      notes: "",
    }
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [addMaintenanceModalVisible, setAddMaintenanceModalVisible] =
    useState(false);
  const [maintenanceDate, setMaintenanceDate] = useState<string>("");
  const [maintenanceDescription, setMaintenanceDescription] =
    useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editableDetails, setEditableDetails] = useState<DeviceDetailsType>({
    ...deviceDetails,
  });

  useEffect(() => {
    // Update state if the devices list changes or the ID changes
    const selectedDevice = devices.find((device) => device.id === id);
    if (selectedDevice) {
      setDeviceDetails(selectedDevice);
      setEditableDetails({ ...selectedDevice });
    }
  }, [id, devices]);

  // Handler for date change
  const onDateChange = (event: any, date?: Date) => {
    const currentDate = date || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setMaintenanceDate(currentDate.toISOString().split("T")[0]);
  };

  // Handle saving changes to device details
  const handleSaveChanges = () => {
    setDeviceDetails(editableDetails);
    setModalVisible(false);
  };

  // Handle adding a maintenance record
  const handleAddMaintenance = () => {
    if (maintenanceDate && maintenanceDescription) {
      addMaintenanceRecord(
        deviceDetails.name,
        maintenanceDate,
        maintenanceDescription
      );
      setAddMaintenanceModalVisible(false);
      setMaintenanceDate("");
      setMaintenanceDescription("");
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  if (!deviceDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Device Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Details</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <MaterialIcons
            name="medical-services"
            size={36}
            color="#03346E"
            style={styles.icon}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.deviceText}>
              Device Name:{" "}
              <Text style={styles.detailValue}>{deviceDetails.name}</Text>
            </Text>
            <Text style={styles.deviceText}>
              Manufacturer:{" "}
              <Text style={styles.detailValue}>
                {deviceDetails.manufacturer}
              </Text>
            </Text>
            <Text style={styles.deviceText}>
              Model:{" "}
              <Text style={styles.detailValue}>{deviceDetails.model}</Text>
            </Text>
            <Text style={styles.deviceText}>
              Serial Number:{" "}
              <Text style={styles.detailValue}>
                {deviceDetails.serialNumber}
              </Text>
            </Text>
            <Text style={styles.deviceText}>
              Status:{" "}
              <Text style={styles.detailValue}>{deviceDetails.status}</Text>
            </Text>
            <Text style={styles.deviceText}>
              Last Maintenance:{" "}
              <Text style={styles.detailValue}>
                {deviceDetails.lastMaintenance}
              </Text>
            </Text>
            <Text style={styles.deviceText}>
              Next Maintenance:{" "}
              <Text style={styles.detailValue}>
                {deviceDetails.nextMaintenance}
              </Text>
            </Text>
            <Text style={styles.deviceText}>
              Usage Hours:{" "}
              <Text style={styles.detailValue}>{deviceDetails.usageHours}</Text>
            </Text>
            <Text style={styles.deviceText}>
              Notes:{" "}
              <Text style={styles.detailValue}>{deviceDetails.notes}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={[styles.fab, styles.editButton]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="pencil" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fab, styles.addMaintenanceButton]}
          onPress={() => setAddMaintenanceModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fab, styles.viewHistoryButton]}
          onPress={() =>
            router.push(
              `/device-maintenance-history?deviceName=${deviceDetails.name}`
            )
          }
        >
          <Ionicons name="clipboard" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Modal for Editing Device Details */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Device Details</Text>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              {Object.keys(editableDetails).map((key) => (
                <View key={key} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    {key.replace(/([A-Z])/g, " $1")}:
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={editableDetails[key as keyof DeviceDetailsType]}
                    onChangeText={(text) =>
                      setEditableDetails({ ...editableDetails, [key]: text })
                    }
                  />
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
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

      {/* Modal for Adding Maintenance */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={addMaintenanceModalVisible}
        onRequestClose={() => setAddMaintenanceModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Maintenance</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              <Text style={styles.dateText}>
                {maintenanceDate || "Select Maintenance Date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={maintenanceDescription}
              onChangeText={setMaintenanceDescription}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddMaintenance}
            >
              <Text style={styles.buttonText}>Add Maintenance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setAddMaintenanceModalVisible(false)}
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
    backgroundColor: "#021526",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6EACDA",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#E2E2B6",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 600,
    alignItems: "flex-start",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  icon: {
    marginBottom: 10,
  },
  detailsContainer: {
    width: "100%",
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#03346E",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  editButton: {},
  addMaintenanceButton: {},
  viewHistoryButton: {},
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
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalScroll: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#03346E",
    marginBottom: 20,
  },
  dateText: {
    color: "#03346E",
    fontSize: 16,
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
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  inputLabel: {
    fontSize: 16,
    color: "#03346E",
    marginBottom: 5,
  },
  saveButton: {
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
  buttonText: {
    color: "#E2E2B6",
    fontSize: 18,
    fontWeight: "bold",
  },
  deviceText: {
    fontSize: 16,
    color: "#03346E",
    marginVertical: 5,
  },
  detailValue: {
    fontWeight: "600",
    color: "#03346E",
  },
});
