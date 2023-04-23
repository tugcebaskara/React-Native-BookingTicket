import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import AuthProvider, { useAuth } from "./src/AuthContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/Store";
import Navigator from "./src/navigation/Navigator";



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primaryColor: "#0D1B2A",
    backgroundColor: "#1B263B",
    secondColor: "#415A77",
    threeColor: "#778DA9",
    textColor: "#E0E1DD",
    background: "#415A77",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AuthProvider>
            <PaperProvider theme={theme}>
              <Navigator />
            </PaperProvider>
          </AuthProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
