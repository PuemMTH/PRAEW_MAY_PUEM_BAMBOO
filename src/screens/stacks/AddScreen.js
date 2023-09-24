import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { useData } from "../../contexts/DataProvider";
import { Button } from "native-base";

const AddScreen = () => {
	const { state, dispatch } = useData();

	const timeOptions = [];
	for (let hour = 8; hour <= 21; hour++) {
		for (let minute = 0; minute <= 30; minute += 30) {
			const time = `${hour.toString().padStart(2, "0")}:${minute
				.toString()
				.padStart(2, "0")}`;
			timeOptions.push(time);
		}
	}


	return (
		<View>
			<TextInput
				style={styles.inputStyle}
				placeholder="Subject Code"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { sub_code: text } })
				}
				value={state.sub_code}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Subject ID"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { sub_id: text } })
				}
				value={state.sub_id}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Subject Name"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { subject_name: text } })
				}
				value={state.subject_name}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Edition"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { edition: text } })
				}
				value={state.edition}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Time Start"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { timestart: text } })
				}
				value={state.timestart}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Time End"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { timeend: text } })
				}
				value={state.timeend}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Day"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { day: text } })
				}
				value={state.day}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Month"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { month: text } })
				}
				value={state.month}
			/>
			<TextInput
				style={styles.inputStyle}
				placeholder="Year"
				onChangeText={(text) =>
					dispatch({ type: "SET_DATA", payload: { year: text } })
				}
				value={state.year}
			/>

			<Button
				onPress={() => {
					console.log(state);
				}}
			/>



			{/* <ModalDropdown
				options={timeOptions}
				defaultValue="Select"
				style={styles.dropdownStyle}
				dropdownStyle={styles.dropdownTextStyle}
				defaultIndex={0}
			/> */}
		</View>
	);
};

export default AddScreen;

const styles = StyleSheet.create({
	container: {},
	dropdownStyle: {
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		padding: 10,
		backgroundColor: "#ccc",
		borderRadius: 5,
	},
	dropdownTextStyle: {
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: "#ccc",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	inputStyle: {
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		padding: 10,
		backgroundColor: "#ccc",
		borderRadius: 5,
	},
});
