import React, { createContext, useContext, useState } from "react";

// Define the shape of a maintenance record
interface MaintenanceRecord {
  id: string;
  device: string;
  date: string;
  status: string;
  description: string;
}

// Define the context type
interface MaintenanceContextType {
  maintenanceRecords: MaintenanceRecord[];
  addMaintenanceRecord: (
    device: string,
    date: string,
    description: string
  ) => void;
  deleteMaintenanceRecord: (id: string) => void;
  updateMaintenanceRecord: (updatedRecord: MaintenanceRecord) => void;
}

// Create the context
const MaintenanceContext = createContext<MaintenanceContextType | undefined>(
  undefined
);

// Create a provider component
export const MaintenanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [maintenanceRecords, setMaintenanceRecords] = useState<
    MaintenanceRecord[]
  >([]);

  const addMaintenanceRecord = (
    device: string,
    date: string,
    description: string
  ) => {
    const newRecord: MaintenanceRecord = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      device,
      date,
      status: new Date(date) < new Date() ? "Completed" : "Scheduled", // Determine status based on date
      description,
    };
    setMaintenanceRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  const deleteMaintenanceRecord = (id: string) => {
    setMaintenanceRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== id)
    );
  };

  const updateMaintenanceRecord = (updatedRecord: MaintenanceRecord) => {
    setMaintenanceRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceRecords,
        addMaintenanceRecord,
        deleteMaintenanceRecord,
        updateMaintenanceRecord,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

// Create a custom hook to use the context
export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error("useMaintenance must be used within a MaintenanceProvider");
  }
  return context;
};
