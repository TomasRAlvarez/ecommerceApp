import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import categories from "../data/categories.json";
import Category from "../components/Category";
const Home = ({ route, navigation }) => {
	return (
		<View style={styles.container}>
			<FlatList keyExtractor={(e) => e} data={categories.sort()} renderItem={({ item }) => <Category navigation={navigation} category={item} />} />
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: "grey",
	},
});
