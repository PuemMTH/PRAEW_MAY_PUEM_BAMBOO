import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	Touchable,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useData } from "../../contexts/DataProvider";

const AddScreen = ({ route }) => {
	
	const { state, dispatch, listSubject } = useData();
	const { list, setList } = listSubject;

	return (
		 <></>
	)
};

export default AddScreen;

const styles = StyleSheet.create({
	container: {},
});
