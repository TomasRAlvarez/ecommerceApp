import { StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import UserData from "../components/UserData";
import Orders from "../components/Orders";
import LoginScreen from "./LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useGetProfileImageQuery, usePostProfileImageMutation } from "../services/shopService";
import { setCameraImage } from "../features/User/userSlice";
import { clearUser } from "../features/User/userSlice";

const Profile = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Perfil",
		});
	}, [navigation]);

	const user = useSelector((state) => state.userReducer.value.user);
	const localId = useSelector((state) => state.userReducer.value.localId);
	const [image, setImage] = useState(null);
	const [isImageFromCamera, setIsImageFromCamera] = useState(false);
	const [imageURI, setImageURI] = useState("");
	const [triggerPostImage, result] = usePostProfileImageMutation();
	const { data: imageFromBase } = useGetProfileImageQuery(localId);
	const dispatch = useDispatch();

	const verifyCameraPermissions = async () => {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();
		return granted;
	};

	const verifyGalleryPermissions = async () => {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		return granted;
	};

	const pickLibraryImage = async () => {
		try {
			setIsImageFromCamera(false);
			const permissionGallery = await verifyGalleryPermissions();
			if (permissionGallery) {
				const result = await ImagePicker.launchImageLibraryAsync({
					base64: true,
					allowsEditing: true,
					aspect: [1, 1],
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					quality: 0.2,
				});

				console.log(result);

				if (!result.canceled) {
					const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
					setImage(image);
					confirmImage();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const pickImage = async () => {
		setIsImageFromCamera(true);

		try {
			const permissionCamera = await verifyCameraPermissions();

			if (permissionCamera) {
				let result = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.All,
					allowsEditing: true,
					aspect: [1, 1],
					base64: true,
					quality: 0.2,
				});
				if (!result.canceled) {
					setImageURI(result.assets[0].uri);
					const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
					setImage(image);
					confirmImage();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUserImage = () => {
		Alert.alert(
			"Editar Foto de perfil",
			"Elija una opcion",
			[
				{
					text: "Seleccionar de la galeria",
					onPress: () => pickLibraryImage(),
				},
				{
					text: "Tomar una foto",
					onPress: () => pickImage(),
				},
			],
			{ cancelable: true }
		);
	};

	const confirmImage = async () => {
		try {
			console.log("A", image);
			dispatch(setCameraImage({ imageCamera: image }));
			triggerPostImage({ image, localId });
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogOut = () => {
		Alert.alert(
			"Cerrar Sesion",
			"¿Seguro quiere cerrar sesion?",
			[
				{
					text: "Confirmar",
					onPress: () => {
						dispatch(clearUser());
						setImage(null);
					},
				},
				{
					text: "Cancelar",
				},
			],
			{ cancelable: true }
		);
	};

	if (user) {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				{image || imageFromBase ? <UserData user={user} handleUserImage={handleUserImage} image={image} imageFromBase={imageFromBase} handleLogOut={handleLogOut} /> : <UserData user={user} handleUserImage={handleUserImage} image={null} imageFromBase={null} handleLogOut={handleLogOut} />}
				<Orders navigation={navigation} />
			</ScrollView>
		);
	} else {
		return <LoginScreen navigation={navigation} />;
	}
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
});
