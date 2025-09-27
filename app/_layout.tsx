import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { MaintenanceProvider } from "./MaintenanceContext";
import { DeviceProvider } from "./DeviceContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DeviceProvider>
      <MaintenanceProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#021526", // Dark background for the top bar
            },
            headerTintColor: "#E2E2B6", // Light color for text in the top bar
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: true, title: "Dashboard" }}
          />
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen
            name="device-details"
            options={{ title: "Device Details" }}
          />
          <Stack.Screen name="maintenance" options={{ title: "Maintenance" }} />
          <Stack.Screen
            name="add-maintenance"
            options={{ title: "Add Maintenance" }}
          />
          <Stack.Screen
            name="device-maintenance-history"
            options={{ title: "Maintenance History" }}
          />
        </Stack>
      </MaintenanceProvider>
    </DeviceProvider>
  );
}
