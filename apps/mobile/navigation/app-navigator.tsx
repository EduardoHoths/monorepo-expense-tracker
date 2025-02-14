import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "@/context/auth-context";
import { LoginScreen } from "@/screens/login-screen";
import { HomeScreen } from "@/screens/home-screen";
import { SettingsScreen } from "@/screens/settings-screen";
import { Ionicons } from "@expo/vector-icons";
import { RegisterScreen } from "@/screens/register-screen";
import LoadingSpinner from "@/components/loading-spinner";
import { useColorScheme } from "nativewind";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabs = [
  {
    name: "Home",
    component: HomeScreen,
    icon: "home",
  },
  {
    name: "Settings",
    component: SettingsScreen,
    icon: "settings",
  },
];

export function AppNavigator() {
  const { user, loading } = useAuth();
  const { colorScheme } = useColorScheme();

  if (loading) {
    return <LoadingSpinner color={colorScheme === "dark" ? "#fff" : undefined} />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#112227" : "#fff",
              borderTopColor: "transparent",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab.Screen
              key={tab.name}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarItemStyle: {
                  marginTop: 5,
                },
                tabBarIcon: ({ size, focused }) => (
                  <Ionicons
                    name={tab.icon as keyof typeof Ionicons.glyphMap}
                    size={size}
                    color={
                      focused
                        ? "#00A3FF"
                        : colorScheme === "dark"
                        ? "#D6D6D6"
                        : "#5A5A5A"
                    }
                  />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
