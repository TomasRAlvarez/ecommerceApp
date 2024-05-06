import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";

const AddToCart = ({ product }) => {
	const [quantity, setQuantity] = useState(1);

	return (
		<View style={styles.container}>
			<View style={styles.quantityContainer}>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							quantity !== 0 ? setQuantity(quantity - 1) : setQuantity(0);
						}}>
						<FontAwesome6 name='minus' size={20} color='black' />
					</TouchableOpacity>
					<Text style={styles.quantity}>{quantity}</Text>
					<TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity + 1)}>
						<FontAwesome6 name='add' size={20} color='black' />
					</TouchableOpacity>
				</View>
				<Text style={styles.total}>Total: ${(product.price * quantity).toFixed(2)}</Text>
			</View>

			<TouchableOpacity style={styles.addToCartButton}>
				<Text style={styles.addToCartButtonText}>Añadir al carrito</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddToCart;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: 130,
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		marginTop: 15,
		alignItems: "center",
		justifyContent: "space-evenly",
	},

	quantityContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-evenly",
		marginBottom: 10,
	},

	button: {
		alignSelf: "center",
	},

	quantity: {
		marginHorizontal: 15,
		fontSize: 25,
	},

	total: {
		marginLeft: 10,
		fontSize: 18,
	},

	addToCartButton: {
		width: "80%",
		backgroundColor: colors.primary,
		paddingVertical: 10,
		borderRadius: 5,
	},

	addToCartButtonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
	},
});
