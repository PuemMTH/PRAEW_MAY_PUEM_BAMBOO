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

const AlertE = ({
	title = "Delete",
	message = "Are you sure to delete this subject?",
	confirmText = "OK",
	cancelText = "Cancel",
	onPress = () => {},
	onCancel = () => {},
}) => {
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
};

const HomeScreen = ({ navigation }) => {
	const { state, addTest, deleteTest } = useContext(Context);
	const [afterSort, setAfterSort] = useState([]); //getter setter
	useEffect(() => {
		if (state !== undefined) {
			const sortedData = [...state];
			sortedData.sort((a, b) => {
				// var SortDayA = a.day.split("/").map(Number);
				// var SortDayB = b.day.split("/").map(Number);

				// if (SortDayA[2] !== SortDayB[2]) {
				// 	return SortDayA[2] - SortDayB[2];
				// }
				// if (SortDayA[1] !== SortDayB[1]) {
				// 	return SortDayA[1] - SortDayB[1];
				// }
				// return SortDayA[0] - SortDayB[0];
				
				const [dayA, monthA, yearA] = a.day.split("/").map(Number);
				const [dayB, monthB, yearB] = b.day.split("/").map(Number);

				if (yearA !== yearB) yearA - yearB
				if (monthA !== monthB) monthA - monthB
				return dayA - dayB
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
		// เพราะเดือนของ new Date() จะเริ่มนับจาก 0 ไม่ใช่ 1
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
						<View
							style={{
								flexDirection: "row",
								flex: 1,
							}}
						>
							<Text
								style={
									styles.title	
								}
							>
								{item.subject_name}
							</Text>
							<TouchableOpacity
								onPress={() => {
									console.log(item);
									navigation.navigate("StackAdd", {
										item: item,
										isEdit: true,
									});
								}}
							>
								<View style={styles.list2}>
									<FontAwesome name="edit" size={20} color="green" />
								</View>
							</TouchableOpacity>
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
							<View style={styles.list}>
								<FontAwesome name="trash" size={20} color="red" />
							</View>
						</TouchableOpacity>
						</View>

						<Text style={styles.title2}>
							{item.sub_id} หมู่เรียน {item.sec}
						</Text>
						<Text style={styles.subtitle}>ห้อง {item.room}</Text>
						<Text style={styles.subtitle}>วันที่ {item.day}</Text>
						<Text style={styles.subtitle}>เวลา {item.time}</Text>
						{
							checkDate(item.day) === "สอบวันนี้" ? (
								<Text style={[styles.subtitle4,{color: "green" }]}>{checkDate(item.day)}</Text>
							) : checkDate(item.day) === "สอบเร็วๆนี้" ? (
								<Text style={[styles.subtitle4,{color: "red" }]}>{checkDate(item.day)}</Text>
							) : checkDate(item.day) === "ใกล้ถึงวันสอบ" ? (
								<Text style={[styles.subtitle4,{color: "orange" }]}>{checkDate(item.day)}</Text>
							) : checkDate(item.day) === "สอบไปแล้ว" ? (
								<Text style={[styles.subtitle4,{color: "gray" }]}>{checkDate(item.day)}</Text>
							) : null
						}
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
		flex: 1,
	},
	title2: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 1,
	},
	subtitle4: {
		fontSize: 16,
		marginBottom: 1,
		alignSelf: "center",
		fontWeight: "bold",
		marginTop: 10,
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
	list: {
		flexDirection: "row-reverse",
		paddingLeft: 10,
	},
	list2: {
		flexDirection: "row-reverse",
		paddingLeft: 6,
	},
});
