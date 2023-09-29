// shortcut key for functional component: rnfes
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { useData } from "../../contexts/DataProvider";

const HomeScreen = ({ navigation }) => {
	const { state, dispatch, listSubject } = useData();
	const { list, setList } = listSubject;

	return (
		<></>
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
