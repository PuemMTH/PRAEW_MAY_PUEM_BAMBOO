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
// import { DataProvider, Provider } from "./src/contexts/DataProvider";

import { Context, Provider } from "./src/contexts/SubjectProvider";

const StackScreen = ({ navigation }) => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen 
				name="StackHome"
				component={HomeScreen}
				// add icon to header
				options={{
					headerTintColor : "#fff",
					headerTitle : "Home",
					headerStyle :{backgroundColor :'#FF8989'},
					headerRight: () => (
						<Ionicons
							name="add-outline"
							size={30}
							color="#fff"
							style={{ marginRight: 10 }}
							onPress={() => navigation.navigate("StackAdd")}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="StackAdd"
				headerTitle="Add"
				component={AddScreen}
				options={{
					headerTintColor : "#fff",
					headerStyle :{backgroundColor :'#FF8989'}
				}}
			/>
		</Stack.Navigator>
	);
};

export default function App() {
	const Tab = createBottomTabNavigator();	

	return (
		<Provider>
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
							headerTitle : "Home",
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="home" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="View"
						component={ViewScreen}
						options={{
							headerShown : true,
							headerTintColor : "#fff",
							headerTitle : "View",
							headerStyle : {
								backgroundColor: "#FF8989",
								shadowColor : "#000" ,
							},
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
		</Provider>
	);

}	