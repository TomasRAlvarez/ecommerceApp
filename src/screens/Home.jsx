import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "../components/Category";
import { useGetCategoriesQuery, useGetProductsQuery } from "../services/shopService";
import TopProducts from "../components/TopProducts";

const Home = ({ navigation }) => {
	const { data: categoriesData } = useGetCategoriesQuery();
	const { currentData: productsData, isLoading } = useGetProductsQuery();

	const [top10Products, setTop10Products] = useState([]);

	useEffect(() => {
		// Obtengo los 10 productos con mejor rating
		if (!isLoading && productsData) {
			const sortedData = [...productsData].sort((a, b) => b.rating - a.rating);
			const top10 = sortedData.slice(0, 10);
			setTop10Products(top10);
		}
	}, [isLoading, productsData]);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Inicio",
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<View style={styles.categoryList}>
				<Text style={styles.text}>Categorias</Text>
				<FlatList keyExtractor={(e) => e} data={categoriesData} renderItem={({ item }) => <Category navigation={navigation} category={item} />} horizontal showsHorizontalScrollIndicator={false} />
			</View>
			<Text style={styles.text}>Mejores Productos🔥</Text>
			<View style={styles.top10List}>
				<FlatList keyExtractor={(e) => e.id} data={top10Products} renderItem={({ item }) => <TopProducts navigation={navigation} product={item} />} numColumns={2} showsVerticalScrollIndicator={false} />
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "flex-start",
	},
	categoryList: {
		marginTop: 10,
		marginBottom: 20,
	},
	text: {
		fontSize: 20,
		marginLeft: 10,
		marginBottom: 5,
		fontWeight: "bold",
	},
	top10List: {
		width: "100%",
		height: "72%",
		alignItems: "center",
		marginBottom: 100,
	},
});
