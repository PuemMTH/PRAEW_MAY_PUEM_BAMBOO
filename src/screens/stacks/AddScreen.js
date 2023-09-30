import React, { useContext, useEffect, useState } from "react";
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

import { Context as SubjectContext } from "../../contexts/SubjectProvider";
const AddScreen = ({ route }) => {
	const { state, addTest } = useContext(SubjectContext);                                                                                                                                       
	const [subject_name, setSubject_name] = useState("");
	const [sec, setSec] = useState("");
	const [room, setRoom] = useState("");
	const [time, setTime] = useState("");
	const [day, setDay] = useState("");
	const [sub_id, setSub_id] = useState("");
	const [id, setId] = useState("");
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		if (route.params?.id) {
			const { id, sub_id, subject_name, sec, room, time, day } =
				route.params;
			setId(id);
			setSub_id(sub_id);
			setSubject_name(subject_name);
			setSec(sec);
			setRoom(room);
			setTime(time);
			setDay(day);
			setIsEdit(true);
		}
	}, [route.params]);
	return (
		<>
			<Text 
				style={{
					fontSize: 20,
					padding: 10,
					borderBottomWidth: 1,
					borderBottomColor: "#ccc",
				}}
			> 
				{isEdit ? "Edit" : "Add"} Subject
			</Text>

			<TextInput
				style={{
					height: 40,
					borderColor: "gray",
					borderWidth: 1,
					margin: 10,
				}}
				placeholder="Subject ID"
				onChangeText={(text) => setSub_id(text)}
				value={sub_id}
			/>
			<TextInput
				style={{
					height: 40,
					borderColor: "gray",
					borderWidth: 1,
					margin: 10,
				}}
				placeholder="Subject Name"
				onChangeText={(text) => setSubject_name(text)}
				value={subject_name}
			/>
			<TextInput
				style={{
					height: 40,
					borderColor: "gray",
					borderWidth: 1,
					margin: 10,
				}}
				placeholder="Section"
				onChangeText={(text) => setSec(text)}
				value={sec}
			/>
			<TextInput
				style={{
					height: 40,
					borderColor: "gray",
					borderWidth: 1,
					margin: 10,
				}}
				placeholder="Room"
				onChangeText={(text) => setRoom(text)}
				value={room}
			/>
			

		</>		
	)
};

export default AddScreen;

const styles = StyleSheet.create({
	container: {},
});
