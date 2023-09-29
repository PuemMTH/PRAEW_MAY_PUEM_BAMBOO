import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

const data = [
	{
		id: 1,
		nisit_id: "6421600093",
		username: "ธนภัทร เอี่ยมอาจ",
		image: require("../image/Puem.jpg"),
	},
	{
		id: 2,
		nisit_id: "6421600107",
		username: "นภสร พุทธเจริญ",
		image: require("../image/Praew.jpg"),
	},
	{
		id: 3,
		nisit_id: "6421600263",
		username: "ศศิธร สีแสด",
		image: require("../image/Bam.jpg"),
	},
	{
		id: 4,
		nisit_id: "6421602436",
		username: "ชาลินี แซ่ลี้",
		image: require("../image/May.jpg"),
	},
];

const ProfileScreen = () => {
	const renderItem = ({ item }) => (
		<View style={styles.personContainer}>
			<Image source={item.image} style={styles.image} />
			<Text style={styles.username}>{item.username}</Text>
			<Text style={styles.nisitId}>NISIT ID: {item.nisit_id}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Exam Schedule</Text>
			<Text style={styles.subtitle}>University: Kasetsart University</Text>
			<Text style={styles.subtitle}>Student</Text>
			<FlatList
				data={data}
				renderItem={renderItem}
				numColumns={2}
				contentContainerStyle={styles.flatList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
		marginTop: 100,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 10,
	},
	flatList: {
		alignItems: "center",
	},
	personContainer: {
		alignItems: "center",
		marginVertical: 20,
		marginHorizontal: 10,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
	},
	nisitId: {
		fontSize: 16,
		color: "gray",
	},
});

export default ProfileScreen;
