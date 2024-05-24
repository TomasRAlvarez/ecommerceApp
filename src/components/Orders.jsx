import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useGetOrdersByUserQuery } from "../services/shopService";
import { FontAwesome } from "@expo/vector-icons";

const Orders = ({ navigation }) => {
	const [orders, setOrders] = useState([]);
	const user = useSelector((state) => state.userReducer.value.user);
	let { data: ordersByUser, isLoading, refetch } = useGetOrdersByUserQuery();

	const filterAndSetOrders = (data) => {
		const filteredOrders = Object.entries(data)
			.filter(([orderId, order]) => order.user === user)
			.map(([orderId, order]) => {
				const totalQuantity = order.CartItems.reduce((total, item) => total + item.quantity, 0);
				return { id: orderId, ...order, totalQuantity };
			});
		setOrders(filteredOrders);
	};

	const handleReload = () => {
		refetch().then((response) => {
			filterAndSetOrders(response.data);
		});
	};

	useEffect(() => {
		if (!isLoading && ordersByUser) {
			filterAndSetOrders(ordersByUser);
		}
	}, [user, ordersByUser, isLoading, navigation]);

	return (
		<View style={styles.card}>
			<View style={styles.ordersTitle}>
				<Text style={styles.title}>Ordenes</Text>
				<TouchableOpacity onPress={() => handleReload()}>
					<FontAwesome name='refresh' size={20} color='black' />
				</TouchableOpacity>
			</View>
			{orders.length ? (
				orders.map((userOrders) => (
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
				))
			) : (
				<Text style={styles.noOrdersText}>No hay ordenes creadas</Text>
			)}
		</View>
	);
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
	ordersTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
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
	noOrdersText: { fontSize: 20, textAlign: "center" },
});

export default Orders;
