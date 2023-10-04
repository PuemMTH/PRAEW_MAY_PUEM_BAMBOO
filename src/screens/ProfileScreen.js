import React from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";

const data = [
	{
		id: 1,
		nisit_id: "6421600093",
		username: "ธนภัทร เอี่ยมอาจ",
		work: "Developer 25% for work",
		image: require("../image/Puem.jpg"),
	},
	{
		id: 2,
		nisit_id: "6421600107",
		username: "นภสร พุทธเจริญ",
		work: "Developer 25% for work",
		image: require("../image/Praew.jpg"),
	},
	{
		id: 3,
		nisit_id: "6421600263",
		username: "ศศิธร สีแสด",
		work: "Developer 25% for work",
		image: require("../image/Bam.jpg"),
	},
	{
		id: 4,
		nisit_id: "6421602436",
		username: "ชาลินี แซ่ลี้",
		work: "Developer 25% for work",
		image: require("../image/May.jpg"),
	},
];

const ProfileScreen = () => {
	const renderItem = ({ item }) => (
		
		<View style={styles.box2}>
			<View style={styles.personContainer}>
				<Image source={item.image} style={styles.image} />
				<Text style={styles.nisitId}>{item.nisit_id}</Text>
				<Text style={styles.username}>{item.username}</Text>
				<Text style={styles.work}>{item.work}</Text>
			</View>
		</View>
	);

	return (
		
		<View style={styles.container}>

			<View style={styles.box}>
				<Text style={styles.title}>Exam Schedule</Text>
				<Text style={styles.subtitle}>University: Kasetsart University</Text>
			</View>
			
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
		marginTop: 1,
		backgroundColor : "#FDF0F0",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		color : "#000",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 10,
		color : "#000",
	},
	subtitle2 :{
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 25,
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
		borderWidth: 1.5,
		margin : 10,
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 3,
	},
	nisitId: {
		fontSize: 16,
		color: "#000",
		marginTop: 10,
	},
	work: {
		fontSize: 14,
		color: "gray",
		marginTop: 8,
	},
	box : {
        backgroundColor : "#fff",
        marginTop : 80,
        margin : 5,
        padding : 15,
        borderRadius: 20,
        paddingHorizontal : 50,
        elevation : 2,
    },
    box2 : {
        backgroundColor : "#fff",
        margin : 5,
        marginTop : 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
        paddingHorizontal : 1,
        elevation : 2,
    }
});

export default ProfileScreen;