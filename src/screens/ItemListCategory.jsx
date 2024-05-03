import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import products from "../data/products.json";
import ItemCard from "../components/ItemCard";
import { colors } from "../constants/colors";

const ItemListCategory = ({ navigation, route }) => {
	const { category: categorySelected } = route.params;
	const [productsFilter, setProductsFilter] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: categorySelected,
		});
	}, [navigation]);

	useEffect(() => {
		const prodFil = products.filter((product) => product.category === categorySelected);

		setProductsFilter(prodFil);

		if (searchValue) {
			const prodSearch = prodFil.filter((product) => {
				let prodTitle = product.title.toLowerCase();
				return prodTitle.includes(searchValue.toLowerCase());
			});
			setProductsFilter(prodSearch);
		}
	}, [categorySelected, searchValue]);

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<TextInput style={styles.txtInput} value={searchValue} onChangeText={(e) => setSearchValue(e)} placeholder='Buscar...' />
			</View>
			<FlatList data={productsFilter} keyExtractor={(prod) => prod.id} renderItem={({ item }) => <ItemCard product={item} navigation={navigation} />} numColumns={2} showsVerticalScrollIndicator={false} />
		</View>
	);
};

export default ItemListCategory;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
	},

	searchContainer: {
		width: "100%",
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	txtInput: {
		width: "80%",
		height: 30,
		margin: 10,
		backgroundColor: colors.background,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.primary,
		padding: 5,
	},
});
