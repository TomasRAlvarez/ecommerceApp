import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemCard from "./ItemCard";

const TopProducts = ({ navigation, product }) => {
	return <ItemCard product={product} navigation={navigation} />;
};

export default TopProducts;

const styles = StyleSheet.create({});
