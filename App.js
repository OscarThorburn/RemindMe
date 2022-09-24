import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HistoricReminders from "./screens/HistoricReminders";
import ManageReminder from "./screens/ManageReminder";
import PlannedReminders from "./screens/PlannedReminders";
import IconButton from "./components/UI/IconButton";
import { GlobalStyles } from "./constants/styles";
import RemindersContextProvider from "./store/reminders-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function RemindersOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primaryDark },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primaryDark },
        tabBarActiveTintColor: GlobalStyles.colors.primaryDark,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="PlannedReminders"
        component={PlannedReminders}
        options={{
          title: "My Day",
          tabBarLabel: "My Day",
          tabBarLabelStyle: {
            color: GlobalStyles.colors.primaryLight,
            fontSize: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="alarm-outline"
              size={size}
              color={GlobalStyles.colors.primaryLight}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="HistoricReminders"
        component={HistoricReminders}
        options={{
          title: "History",
          tabBarLabel: "History",
          tabBarLabelStyle: {
            color: GlobalStyles.colors.primaryLight,
            fontSize: 15,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              size={size}
              color={GlobalStyles.colors.primaryLight}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <RemindersContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primaryLight,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="RemindersOverview"
              component={RemindersOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageReminder"
              component={ManageReminder}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RemindersContextProvider>
    </>
  );
}
