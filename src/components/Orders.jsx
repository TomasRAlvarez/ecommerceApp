import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useGetOrdersByUserQuery } from "../services/shopService";

const Orders = ({ navigation }) => {
	const [orders, setOrders] = useState([]);
	const user = useSelector((state) => state.userReducer.value.user);
	const { data: ordersByUser, isLoading } = useGetOrdersByUserQuery();

	useEffect(() => {
		if (!isLoading && ordersByUser) {
			const filteredOrders = Object.entries(ordersByUser)
				.filter(([orderId, order]) => order.user === user)
				.map(([orderId, order]) => {
					const totalQuantity = order.CartItems.reduce((total, item) => total + item.quantity, 0);
					return { id: orderId, ...order, totalQuantity };
				});
			setOrders(filteredOrders);
		}
	}, [user, ordersByUser, isLoading, navigation]);

	if (orders) {
		return (
			<View style={styles.card}>
				<Text style={styles.title}>Ordenes</Text>
				{orders.map((userOrders) => (
					<View key={userOrders.id}>
						<View style={styles.orderRow}>
							<Text style={styles.orderText}>{userOrders.id}</Text>
							<Text style={styles.orderText}>x {userOrders.totalQuantity}</Text>
							<Text style={styles.orderText}>${userOrders.total}</Text>
						</View>
						<View style={styles.orderRow}>
							<Text style={styles.dateText}>{userOrders.date}</Text>
						</View>
					</View>
				))}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 16,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 16,
	},
	orderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	orderText: {
		fontSize: 14,
	},
	dateText: {
		fontSize: 14,
		color: "grey",
	},
});

export default Orders;
