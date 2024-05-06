import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import AddToCart from "../components/AddToCart";

const ItemDetail = ({ navigation, route }) => {
	const { product: prodDetail } = route.params;

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: prodDetail.title,
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Text style={styles.txtTitle}>{prodDetail.title}</Text>
			<View style={styles.imgContainer}>
				<Image style={styles.img} source={{ uri: prodDetail.images[0] }} resizeMode='cover' />
			</View>
			<View style={styles.detailContainer}>
				<Text style={styles.txtDescription}>{prodDetail.description}</Text>
				<View style={styles.statsContainer}>
					<Text style={styles.txtRating}>
						{prodDetail.rating}/5
						<AntDesign name='staro' size={26} color='black' />
					</Text>
					<Text style={styles.txtPrice}>${prodDetail.price}</Text>
				</View>
			</View>
			<AddToCart product={prodDetail} />
		</View>
	);
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
