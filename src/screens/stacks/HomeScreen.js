// shortcut key for functional component: rnfes
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { Context } from "../../contexts/SubjectProvider";

const HomeScreen = ({ navigation }) => {
	const { state, addTest } = useContext(Context);
	
	return (
		<View style={styles.container}>
			<FlatList
				data={state}
				renderItem={({ item }) => (
					<Text
						style={{
							fontSize: 20,
							padding: 10,
							borderBottomWidth: 1,
							borderBottomColor: "#ccc",
						}}
					>
						{item.subject_name}
					</Text>
				)}
				keyExtractor={(item) => item.sub_id}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
});
