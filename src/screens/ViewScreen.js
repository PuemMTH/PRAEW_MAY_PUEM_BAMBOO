import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import data from "../data/subject.json";

const itemsPerPage = 10;

const ViewScreen = ({ route, navigation }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const filterData = (text) => {
		const filtered = text
			? data.filter(
					({ subject_name, sub_id }) =>
						// Note: ใช้ includes เพื่อค้นหาคำที่มีอยู่ใน String
						subject_name.toLowerCase().includes(text.toLowerCase()) ||
						// Note: ใช้ includes เพื่อค้นหาคำที่มีอยู่ใน String
						sub_id.toLowerCase().includes(text.toLowerCase())
			)
			: data;
		setFilteredData(filtered);
	};
	
	useEffect(() => {
		filterData(searchText);
	}, [searchText]);

	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = searchText
		? filteredData.slice(startIndex, endIndex)
		: data.slice(startIndex, endIndex);

	const renderItem = ({ item }) => (
		<View style={styles.card}>
			<Text style={styles.itemText}>{item.subject_name}</Text>
			<Text style={styles.itemText}>{item.sub_id}</Text>
			<TouchableOpacity
				style={{
					position: "absolute",
					right: 10,
					top: 10,
				}}
			>
				<FontAwesome
					name="calendar-plus-o"
					size={20}
					color="green"
					onPress={() => {
						navigation.navigate("StackAdd", { item: item });
					}}
				/>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<FontAwesome
					name="search"
					size={20}
					color="gray"
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Search..."
					onChangeText={(text) => setSearchText(text)}
					value={searchText}
				/>
			</View>
			<FlatList
				data={displayedData}
				renderItem={renderItem}
				keyExtractor={(item) => item._id.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 20,
		backgroundColor: "#FDF0F0",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#333333",
		alignSelf : "center",
		marginTop: 20,
	},
	item: {
		backgroundColor: "#FFFFFF",
		padding: 16,
		marginBottom: 8,
		elevation: 2,
		borderRadius: 8,
	},
	itemText: {
		fontSize: 16,
		color: "#333333",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		backgroundColor: "#fff",
		borderRadius: 4,
	},
	searchIcon: {
		marginRight: 10,
		marginLeft: 16,
		color: "#000",
		
	},
	card: {
		backgroundColor: "#FFFFFF",
		padding: 16,
		marginBottom: 8,
		elevation: 2,
		borderRadius: 8,
	},
	searchInput: {
		flex: 1,
		height: 40,
		borderColor: "transparent",
		borderWidth: 1,
		paddingHorizontal: 8,
		borderRadius: 8,
		backgroundColor : "#fff",
	},
});

export default ViewScreen;
