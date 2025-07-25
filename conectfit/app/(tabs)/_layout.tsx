import { Tabs, useSegments } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

export default function TabLayout() {
  const segments = useSegments();

  const hiddenScreens = ["login", "forget", "cadastre"];
  const currentSegment = segments[1] ?? "";
  const hideTabBar = hiddenScreens.includes(currentSegment);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: [
          {
            backgroundColor: "#FF0000",
            display: hideTabBar ? "none" : "flex",
          },
          Platform.select({
            ios: { position: "absolute" },
            default: {},
          }),
        ],
      }}
    >
      <Tabs.Screen
        name="home-screen"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments-screen"
        options={{
          title: "Pagamentos",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="payments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appraisal-screen"
        options={{
          title: "Avaliação",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training-screen"
        options={{
          title: "Treino",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile-screen"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Entypo name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
