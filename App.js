import { StatusBar } from "expo-status-bar";

// Import React and Component for create page
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import another pages
import ViewScreen from "./src/screens/ViewScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Home Screen
import HomeScreen from "./src/screens/stacks/HomeScreen";
import AddScreen from "./src/screens/stacks/AddScreen";

// Icon for Tab
import { Ionicons } from "@expo/vector-icons";

// Import Provider
import { DataProvider } from "./src/contexts/DataProvider";

const StackScreen = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="StackHome" component={HomeScreen} />
			<Stack.Screen name="StackAdd" component={AddScreen} />
		</Stack.Navigator>
	);
};

export default function App() {
	const Tab = createBottomTabNavigator();

	return (
		<DataProvider>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={{
						tabBarActiveTintColor: "#000",
						tabBarInactiveTintColor: "#ccc",
						headerShown: false,
					}}
				>
					<Tab.Screen
						name="Home"
						component={StackScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="home" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="View"
						component={ViewScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="book" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Profile"
						component={ProfileScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="person" color={color} size={size} />
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</DataProvider>
	);
}
