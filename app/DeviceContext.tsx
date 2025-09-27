import React, { createContext, useContext, useState } from "react";

// Define the shape of a device
interface Device {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: string;
  lastMaintenance: string;
  nextMaintenance: string;
  usageHours: string;
  notes: string;
}

// Define the context type
interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Device) => void;
}

// Create the context
const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

// Create a provider component
export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [devices, setDevices] = useState<Device[]>([]);

  const addDevice = (device: Device) => {
    setDevices((prevDevices) => [...prevDevices, device]);
  };

  return (
    <DeviceContext.Provider value={{ devices, addDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

// Create a custom hook to use the DeviceContext
export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};
