import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { colors } from "../constants/colors.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/shop/shopSlice.js";

const Category = ({ navigation, category }) => {
	const dispatch = useDispatch();

	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				dispatch(setCategorySelected(category));
				navigation.navigate("ItemListCategory", { category });
			}}>
			<MaterialIcons style={styles.icon} name='category' size={24} color='black' />
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
	},

	text: {
		fontSize: 15,
	},
});
