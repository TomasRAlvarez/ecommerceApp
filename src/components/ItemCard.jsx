import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const ItemCard = ({ product, navigation }) => {
	return (
		<Pressable onPress={() => navigation.navigate("ItemDetail", { product })}>
			<Text>{product.title}</Text>
		</Pressable>
	);
};

export default ItemCard;

const styles = StyleSheet.create({});
