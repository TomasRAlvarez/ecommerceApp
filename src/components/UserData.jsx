import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const UserData = ({ user, handleUserImage, image, imageFromBase, handleLogOut }) => {
	if (!image && imageFromBase) {
		image = imageFromBase.image;
	}

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => handleUserImage()}>{image ? <Image source={{ uri: image }} style={styles.image} /> : <Image source={require("../../assets/default-profile.jpg")} style={styles.image} />}</TouchableOpacity>
				<Text style={styles.username}>{user}</Text>
				<TouchableOpacity style={styles.editIcon} onPress={handleLogOut}>
					<MaterialIcons name='logout' size={24} color='black' />
				</TouchableOpacity>
			</View>
			<View style={styles.body}>
				<View style={styles.personalData}>
					<Text style={styles.title}>Datos Personales</Text>
				</View>
				<Text>{user}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 16,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	username: {
		marginLeft: 16,
		fontSize: 18,
		fontWeight: "bold",
	},
	body: {
		borderTopWidth: 1,
		borderTopColor: "#eee",
		paddingTop: 16,
	},
	personalData: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	editIcon: {
		padding: 4,
	},
});

export default UserData;
