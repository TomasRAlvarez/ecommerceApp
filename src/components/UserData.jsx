import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const UserData = ({ user }) => {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<MaterialIcons name='account-circle' size={50} color='black' />
				<Text style={styles.username}>{user}</Text>
			</View>
			<View style={styles.body}>
				<View style={styles.personalData}>
					<Text style={styles.title}>Datos Personales</Text>
					<TouchableOpacity style={styles.editIcon}>
						<MaterialIcons name='edit' size={20} color='black' />
					</TouchableOpacity>
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
		marginBottom: 16,
	},
	username: {
		marginLeft: 16,
		fontSize: 20,
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
