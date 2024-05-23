import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { colors } from "../constants/colors.js";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/shop/shopSlice.js";
import { icons } from "../constants/icons.js";

const Category = ({ navigation, category }) => {
	const dispatch = useDispatch();

	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				dispatch(setCategorySelected(category));
				navigation.navigate("ItemListCategory", { category });
			}}>
			<Text style={styles.icon}>{icons[category]}</Text>
			<Text style={styles.text}>{category}</Text>
		</Pressable>
	);
};

export default Category;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "space-evenly",
		margin: 10,
		borderRadius: 50,
	},

	icon: {
		backgroundColor: colors.primary,
		borderRadius: 50,
		padding: 15,
		elevation: 15,
		fontSize: 20,
	},

	text: {
		fontSize: 15,
	},
});
