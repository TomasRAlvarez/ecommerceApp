import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import products from "../data/products.json";
import ItemCard from "../components/ItemCard";

const ItemListCtegory = ({ navigation, route }) => {
	const { category: categorySelected } = route.params;
	const [productsFilter, setProductsFilter] = useState([]);

	useEffect(() => {
		const prodFil = products.filter((product) => product.category === categorySelected);
		setProductsFilter(prodFil);
	}, [categorySelected]);

	return (
		<View>
			<FlatList data={productsFilter} keyExtractor={(prod) => prod.id} renderItem={({ item }) => <ItemCard product={item} navigation={navigation} />} />
		</View>
	);
};

export default ItemListCtegory;

const styles = StyleSheet.create({});
