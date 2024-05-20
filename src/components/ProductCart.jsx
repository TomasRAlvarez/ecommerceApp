import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const ProductCart = ({ item, handleRemove }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: item.images[0] }} style={styles.image} />
			<View style={styles.details}>
				<Text style={styles.name}>{item.title}</Text>
				<Text style={styles.price}>${item.price}</Text>
			</View>
			<View style={styles.quantityContainer}>
				<Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
				<Text>Total: ${item.price * item.quantity}</Text>
			</View>
			<View>
				<TouchableOpacity onPress={() => handleRemove(item.id)}>
					<MaterialIcons name='delete' size={24} color='black' />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ProductCart;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: colors.background,
		borderRadius: 5,
		shadowColor: colors.text,
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 2,
	},
	image: {
		width: 80,
		height: 80,
		marginRight: 10,
		borderRadius: 5,
	},
	details: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
	},
	price: {
		color: "grey",
	},
	quantityContainer: {
		alignItems: "left",
		marginRight: 20,
	},
	quantity: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
