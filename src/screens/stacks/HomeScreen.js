import {
	Alert,
	Button,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import { Context } from "../../contexts/SubjectProvider";

const AlertE = (
	{
		title = "Delete",
		message = "Are you sure to delete this subject?",
		confirmText = "OK",
		cancelText = "Cancel",
		onPress = () => {},
		onCancel = () => {},
	}
) => {
	Alert.alert(
		title,
		message,
		[
			{
				text: cancelText,
				onPress: onCancel,
				style: "cancel",
			},
			{
				text: confirmText,
				onPress: onPress,
			},
		],
		{ cancelable: false }
	);
}

const HomeScreen = ({ navigation }) => {
	const { state, addTest, deleteTest } = useContext(Context);
	const [afterSort, setAfterSort] = useState([]); //getter setter
	useEffect(() => {
		if (state !== undefined) {
			const sortedData = [...state];
			sortedData.sort((a, b) => {
				var SortDayA = a.day.split("/").map(Number);
				var SortDayB = b.day.split("/").map(Number);
				// var SortTimeA = a.time.split(":").map(Number);
				// var SortTimeB = b.time.split(":").map(Number);
				if (SortDayA[2] !== SortDayB[2]) {
					return SortDayA[2] - SortDayB[2];
				}
				if (SortDayA[1] !== SortDayB[1]) {
					return SortDayA[1] - SortDayB[1];
				}
				return SortDayA[0] - SortDayB[0];
			});
			setAfterSort(sortedData);
		}
	}, [state]);

	const checkDate = (date) => {
		const text = {
			0: "ใกล้ถึงวันสอบ",
			1: "สอบวันนี้",
			2: "สอบเร็วๆนี้",
			3: "สอบไปแล้ว",
		};
	
		const today = new Date();
		const [day, month, year] = date.split("/");
	
		// Note: ใช้ parseInt เพื่อแปลงค่าจาก String เป็น Number
		const examDate = new Date(year, parseInt(month) - 1, parseInt(day));
		// Note: ใช้ Math.ceil เพื่อปัดเศษขึ้นเป็นจำนวนเต็ม
		const diffTime = examDate - today;
		// Note: ใช้ Math.ceil เพื่อปัดเศษขึ้นเป็นจำนวนเต็ม
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		// diffDays คือจำนวนวันที่เหลืออยู่จนถึงวันสอบ 
		// 3 ถ้า diffDays < 0 แสดงว่าสอบไปแล้ว
		// ถ้า diffDays === 0 แสดงว่าสอบวันนี้
		// ถ้า diffDays <= 3 แสดงว่าใกล้ถึงวันสอบ
		// ถ้า diffDays > 3 แสดงว่าสอบเร็วๆนี้


		if (diffDays < 0) {
			return text[3];
		}
		if (diffDays === 0) {
			return text[1];
		}
		if (diffDays <= 3) {
			return text[2];
		}
		return text[0];

		// if (diffDays < 0) {
		// 	return text[3];
		// } else if (diffDays === 0) {
		// 	return text[1];
		// } else if (diffDays <= 3) {
		// 	return text[2];
		// } else {
		// 	return "";
		// }
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={afterSort}
				renderItem={({ item }) => (
					<View style={styles.label}>
						<Text style={styles.title}>{item.subject_name}</Text>
						<Text style={styles.subtitle}>{item.day}</Text>
						<Text style={styles.subtitle}>{item.time}</Text>
						<Text style={styles.subtitle}>{checkDate(item.day)}</Text>
						
						<TouchableOpacity
							onPress={() => {
								AlertE({
									title: "Delete",
									message: "Are you sure to delete this subject?",
									confirmText: "OK",
									cancelText: "Cancel",
									onPress: () => deleteTest(item._id),
									onCancel: () => {},
								});
							}}
						>
							<FontAwesome name="trash" size={20} color="red" />
						</TouchableOpacity>

						{/* Edit */}
						<TouchableOpacity
							onPress={() => {
								console.log(item)
								navigation.navigate("StackAdd", { 
									item: item,
									isEdit: true,
								});
							}}
						>
							<FontAwesome name="edit" size={20} color="green" />
						</TouchableOpacity>
					</View>
				)}
				keyExtractor={(item) => item._id}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 25,
		backgroundColor: "#FDF0F0",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 1,
	},
	label: {
		backgroundColor: "#FFFFFF",
		padding: 16,
		marginBottom: 8,
		elevation: 2,
		borderRadius: 10,
	},
	label2: {
		alignSelf: "center",
		backgroundColor: "#FF6969",
		padding: 16,
		borderRadius: 8,
		marginBottom: 15,
	},
});
