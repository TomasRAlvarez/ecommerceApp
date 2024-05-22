import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import AddToCart from "../components/AddToCart";
import { useGetProductByIdQuery } from "../services/shopService";

const ItemDetail = ({ navigation, route }) => {
	const { productId: prodId } = route.params;
	const { data: product, isLoading, error } = useGetProductByIdQuery(prodId);

	React.useLayoutEffect(() => {
		if (!isLoading) {
			navigation.setOptions({
				headerTitle: product.title,
			});
		}
	}, [navigation, isLoading]);

	if (product) {
		return (
			<View style={styles.container}>
				<Text style={styles.txtTitle}>{product.title}</Text>
				<View style={styles.imgContainer}>
					<Image style={styles.img} source={{ uri: product.images[0] }} resizeMode='cover' />
				</View>
				<View style={styles.detailContainer}>
					<Text style={styles.txtDescription}>{product.description}</Text>
					<View style={styles.statsContainer}>
						<Text style={styles.txtRating}>
							{product.rating}/5
							<AntDesign name='staro' size={26} color='black' />
						</Text>
						<Text style={styles.txtPrice}>${product.price}</Text>
					</View>
				</View>
				<AddToCart navigation={navigation} product={product} />
			</View>
		);
	} else {
		return null;
	}
};

export default ItemDetail;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: "100%",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "top",
		marginTop: 20,
	},

	txtTitle: {
		width: "90%",
		textAlign: "left",
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 15,
	},

	imgContainer: {
		width: "90%",
		height: 300,
		marginBottom: 15,
	},

	img: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
	},

	detailContainer: {
		width: "90%",
		height: 120,
		alignItems: "center",
		justifyContent: "space-between",
	},

	txtDescription: {
		width: "100%",
		maxHeight: 150,
		textAlign: "left",
		fontSize: 15,
	},

	statsContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},

	txtRating: {
		fontSize: 25,
	},

	txtPrice: {
		textAlign: "right",
		fontSize: 25,
		fontWeight: "bold",
	},
});
