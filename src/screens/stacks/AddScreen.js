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
	ScrollView,
} from "react-native";

import { Context as SubjectContext } from "../../contexts/SubjectProvider";

const AddScreen = ({ route, navigation }) => {
	const { state, addTest } = useContext(SubjectContext);
	const [subject_name, setSubject_name] = useState("");
	const [sec, setSec] = useState("");
	const [room, setRoom] = useState("");
	const [time, setTime] = useState(
		`${new Date().getHours()}.${new Date().getMinutes()}-${new Date().getHours()+3}.${new Date().getMinutes()}`
		);
	const [day, setDay] = useState(
		`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
		);
	const [sub_id, setSub_id] = useState("");
	const [id, setId] = useState("");
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		if (route.params) {
			const { _id, sub_id, subject_name } = route.params.item;
			const { sec, room, time, day } = route.params.item;
			const { isEdit } = route.params;
			setId(_id);
			setSub_id(sub_id);
			setSubject_name(subject_name);
			setSec(sec);
			setRoom(room);
			setTime(time);
			setDay(day);
			setIsEdit(isEdit);
		}
	}, [route.params]);
	return (
		<ScrollView style={styles.container}>
			<Text
				style={{
					fontSize: 20,
					padding: 10,
					borderBottomWidth: 1,
					borderBottomColor: "#ccc",
					alignSelf : "center",
					fontWeight: "bold",
				}}
			>
				{isEdit ? "Edit Subject" : "Add Subject"}
			</Text>

			<Text style={styles.label}>Subject Name</Text>
			<TextInput
				style={styles.input}
				placeholder="Subject Name"
				numberOfLines={2}
				onChangeText={(text) => setSubject_name(text)}
				value={subject_name}
			/>

			<Text style={styles.label}>Subject ID</Text>
			<TextInput
				style={styles.input}
				placeholder="Subject ID"
				numberOfLines={2}
				onChangeText={(text) => setSub_id(text)}
				value={sub_id}
			/>

			<Text style={styles.label}>Section</Text>
			<TextInput
				style={styles.input}
				placeholder="Section"
				numberOfLines={2}
				keyboardType="numeric"
				onChangeText={(text) => setSec(text)}
				value={sec}
			/>

			<Text style={styles.label}>Room</Text>
			<TextInput
				style={styles.input}
				placeholder="Room"
				numberOfLines={2}
				onChangeText={(text) => setRoom(text)}
				value={room}
			/>

			<Text style={styles.label}>Day</Text>
			<TextInput
				style={styles.input}
				placeholder="Ex. 12/12/2023"
				numberOfLines={2}
				onChangeText={(text) => setDay(text)}
				value={day}
			/>

			<Text style={styles.label}>Time</Text>
			<TextInput
				style={styles.input}
				placeholder="Ex. 10.00-12.00"
				numberOfLines={2}
				onChangeText={(text) => setTime(text)}
				value={time}
			/>

			<TouchableOpacity
				style={styles.submit}
				onPress={() => {
					// check format
					const date = day.split("/");
					if (date.length !== 3) {
						Alert.alert("Error", "Invalid date format (dd/mm/yyyy)");
						return;
					}
					const [d, m, y] = date;
					if (d.length !== 2 || m.length !== 2 || y.length !== 4) {
						Alert.alert("Error", "Invalid date format (dd/mm/yyyy)");
						return;
					}
					// คือเดือน 1-12
					const dayObj = new Date(y, m - 1, d);
					if (dayObj.getDate() !== parseInt(d)) {
						Alert.alert("Error", "Invalid month format");
						return;
					}
					// คือวัน 1-31
					if (dayObj.getMonth() + 1 !== parseInt(m)) {
						Alert.alert("Error", "Invalid day format");
						return;
					}
					// คือปี ค.ศ.
					if (dayObj.getFullYear() !== parseInt(y)) {
						Alert.alert("Error", "Invalid year format");
						return;
					}
					// คือวันที่มีจริง
					const timeArr = time.split("-");
					// ต้องมี - 2 ตัว
					if (timeArr.length !== 2) {
						Alert.alert("Error", "Invalid time format (hh.mm-hh.mm)");
						return;
					}
					const [start, end] = timeArr;
					const [startH, startM] = start.split(".");
					const [endH, endM] = end.split(".");
					// ต้องมี . 2 ตัว
					if (
						startH.length !== 2 ||
						startM.length !== 2 ||
						endH.length !== 2 ||
						endM.length !== 2
					) {
						Alert.alert("Error", "Invalid time format (hh.mm-hh.mm)");
						return;
					}
					if (
						parseInt(startH) > 23 ||
						parseInt(startM) > 59 ||
						parseInt(endH) > 23 ||
						parseInt(endM) > 59
					) {
						Alert.alert("Error", "Invalid time format (hh.mm-hh.mm)");
						return;
					}

					// start time must be less than end time
					const startTime = new Date();
					startTime.setHours(parseInt(startH));
					startTime.setMinutes(parseInt(startM));
					const endTime = new Date();
					endTime.setHours(parseInt(endH));
					endTime.setMinutes(parseInt(endM));
					if (startTime.getTime() >= endTime.getTime()) {
						Alert.alert("Error", "Invalid time start time must be less than end time");
						return;
					}

					addTest(sub_id, subject_name, sec, room, time, day)
					navigation.navigate("StackHome");
				}}
				underlayColor="#fff"
			>
				<Text style={styles.text}>Submit</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default AddScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 5,
		backgroundColor: "#FDF0F0",
	},
	label: {
		marginTop: 10,
		fontSize: 18,
		fontWeight: "bold",
		fontStyle: "normal",
		marginLeft: 10,
		color: "#000",
	},
	input: {
		fontSize: 15,
		borderWidth: 1.5,
		borderColor: "#FF8989",
		borderRadius: 20,
		paddingLeft: 15,
		margin: 10,
		marginBottom: 15,
		backgroundColor: "#fff",
		elevation : 2.5,
	},
	submit: {
		marginRight: 100,
		marginLeft: 100,
		marginTop: 20,
		marginBottom: 20,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "#219C90",
		borderRadius: 30,
		elevation : 3,
	},
	text: {
		fontSize: 20,
		alignSelf: "center",
		borderRadius: 30,
		color: "#fff",
		fontWeight: "bold",
	},
});