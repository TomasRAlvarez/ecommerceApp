import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import categories from "../data/categories.json";
import Category from "../components/Category";
const Home = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Inicio",
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<FlatList keyExtractor={(e) => e} data={categories.sort()} renderItem={({ item }) => <Category navigation={navigation} category={item} />} horizontal showsHorizontalScrollIndicator={false} />
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
