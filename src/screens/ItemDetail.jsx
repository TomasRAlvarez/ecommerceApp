import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ItemDetail = ({ route }) => {
	const { product: productDetail } = route.params;
	return (
		<View>
			<Text>{productDetail.id}</Text>
		</View>
	);
};

export default ItemDetail;

const styles = StyleSheet.create({});
