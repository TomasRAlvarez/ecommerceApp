import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setProductIdSelected } from "../features/shop/shopSlice";

const ItemCard = ({ product, navigation }) => {
	const dispatch = useDispatch();
	const handleNavigate = () => {
		dispatch(setProductIdSelected(product.title));
		navigation.navigate("ItemDetail", { productId: product.id });
	};

	return (
		<Pressable style={styles.container} onPress={handleNavigate}>
			<View style={styles.imgContainer}>
				<Image style={styles.img} source={{ uri: product.images[0] }} resizeMode='cover' />
			</View>
			<View style={styles.txtContainer}>
				<Text style={styles.txtTitle}>{product.title}</Text>
				<Text style={styles.txtPrice}>${product.price}</Text>
			</View>
			<View style={styles.priceContainer}></View>
		</Pressable>
	);
};

export default ItemCard;

const styles = StyleSheet.create({
	container: {
		width: 170,
		height: 250,
		marginTop: 10,
		marginBottom: 10,
		marginHorizontal: 9,
		backgroundColor: "white",
		borderRadius: 10,
		alignItems: "center",
		elevation: 10,
	},

	imgContainer: {
		margin: 5,
	},

	img: {
		width: 150,
		height: 150,
	},

	txtContainer: {
		width: "80%",
		height: 80,
		justifyContent: "space-evenly",
		marginBottom: 5,
	},

	txtTitle: {
		fontSize: 15,
	},

	txtPrice: {
		fontWeight: "bold",
	},
});
