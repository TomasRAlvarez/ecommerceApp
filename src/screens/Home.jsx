import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import Category from "../components/Category";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
	const categories = useSelector((state) => state.shopReducer.value.categories);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Inicio",
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<FlatList keyExtractor={(e) => e} data={categories} renderItem={({ item }) => <Category navigation={navigation} category={item} />} horizontal showsHorizontalScrollIndicator={false} />
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		height: "15%",
		justifyContent: "flex-start",
	},
});
