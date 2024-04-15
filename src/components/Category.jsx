import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const Category = ({ navigation, category }) => {
	return (
		<Pressable style={styles.container} onPress={() => navigation.navigate("ItemListCategory", { category })}>
			<Text style={styles.text}>{category}</Text>
		</Pressable>
	);
};

export default Category;

const styles = StyleSheet.create({
	container: {
		width: "50%",
		backgroundColor: "white",
		alignSelf: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 50,
	},

	text: {
		fontSize: 20,
	},
});
