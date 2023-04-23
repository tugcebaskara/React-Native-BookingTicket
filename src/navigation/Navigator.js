import React, { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Payment from "../screens/Payment";
import ChooseTicket from "../screens/ChooseTicket";
import DetailTicket from "../screens/DetailTicket";
import SearchTicket from "../screens/SearchTicket";
import { useSelector } from "react-redux";
import colors from "../constants/colors";
import { Platform } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProcessSuccess from "../screens/ProcessSuccess";
const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function MyTabs(props) {
  return (
    <BottomTab.Navigator
      initialRouteName="SearchTicket"
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        //unmountOnBlur: true,
        tabBarShowLabel: false,
        lazy: false,
        tabBarStyle: styles.tabbarStyle,
      }}
      //tabBar={props => <TabBar {...props}/>}
    >
      <BottomTab.Screen
        name="SearchTicket"
        component={SearchTicket}
        options={{
          headerShown: true,
          headerTitle: "Bilet Ara",
          headerTintColor: colors.primary,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? colors.primary : colors.dark}
              size={wp("6%")}
              style={{
                width: wp("6%"),
                height: wp("6%"),
                textAlign: "center",
                top: wp("3.9%"),
                position: "absolute",
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Profil",
          headerTintColor: colors.primary,
          headerStyle: {
            height: Platform.OS === "ios" ? wp("22%") : wp("14%"),
          },

          tabBarIcon: ({ focused, tintColor }) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? colors.primary : colors.dark}
              size={wp("6%")}
              style={{
                width: wp("6%"),
                height: wp("6%"),
                textAlign: "center",
                top: wp("3.9%"),
                position: "absolute",
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const Navigator = (props) => {
  const user = useSelector((state) => state.system.isUserActive);

  return user ? (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#0D1B2A" },
        headerTintColor: "#E0E1DD",
        headerTitleStyle: {
          fontWeight: "400",
        },
      }}
    >
      <Stack.Screen
        {...props}
        name="MainScreen"
        options={{ headerShown: false }}
      >
        {(props) => <MyTabs />}
      </Stack.Screen>
      <Stack.Screen name="SearchTicket" component={SearchTicket} />
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerShown: true,
          title: "Bilet Seç",
          headerTitleStyle: {
            fontSize: wp("4.2%"),
          },
          headerStyle: {
            height: Platform.OS === "ios" ? wp("22%") : wp("14%"),
          },
          headerBackTitle: "Geri",
          headerTintColor: colors.primary,
          headerBackTitleVisible: true,
        }}
        name="ChooseTicket"
        component={ChooseTicket}
      />
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerShown: true,
          title: "Bilet Detayı",
          headerTitleStyle: {
            fontSize: wp("4.2%"),
          },
          headerStyle: {
            height: Platform.OS === "ios" ? wp("22%") : wp("14%"),
          },
          headerBackTitle: "Geri",
          headerTintColor: colors.primary,
          headerBackTitleVisible: true,
        }}
        name="DetailTicket"
        component={DetailTicket}
      />
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerShown: true,
          title: "Ödeme",
          headerTitleStyle: {
            fontSize: wp("4.2%"),
          },
          headerStyle: {
            height: Platform.OS === "ios" ? wp("22%") : wp("14%"),
          },
          headerBackTitle: "Geri",
          headerTintColor: colors.primary,
          headerBackTitleVisible: true,
        }}
        name="Payment"
        component={Payment}
      />
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerShown: true,
          title: "Ödeme Başarılı",
          headerTitleStyle: {
            fontSize: wp("4.2%"),
          },
          headerStyle: {
            height: Platform.OS === "ios" ? wp("22%") : wp("14%"),
          },
          headerBackTitle: "Geri",
          headerTintColor: colors.primary,
          headerBackTitleVisible: true,
        }}
        name="ProcessSuccess"
        component={ProcessSuccess}
      />
    </Stack.Navigator>
  ) : (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="Register" component={Register} />
    </Auth.Navigator>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  bottomTabIcon: {
    height: wp("6%"),
    width: wp("6%"),
    justifyContent: "center",
    alignItems: "center",
  },
  tabbarStyle: {
    backgroundColor: colors.white,
    height: Platform.OS === "ios" ? wp("18%") : wp("14%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
    borderWidth: 0.5,
    borderColor: "white",
  },
});
