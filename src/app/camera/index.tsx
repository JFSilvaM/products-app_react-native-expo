import { useCameraStore } from "@/store/useCameraStore";
import ConfirmImageButton from "@/theme/components/camera/confirm-image-button";
import FlipCameraButton from "@/theme/components/camera/flip-camera-button";
import GalleryButton from "@/theme/components/camera/gallery-button";
import RetakeImageButton from "@/theme/components/camera/retake-image-button";
import ReturnCancelButton from "@/theme/components/camera/return-cancel-button";
import ShutterButton from "@/theme/components/camera/shutter-button";
import { ThemedText } from "@/theme/components/themed-text";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CameraScreen = () => {
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const { addSelectedImage } = useCameraStore();

  const [facing, setFacing] = useState<CameraType>("back");
  const [selectedImage, setSelectedImage] = useState<string>();

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({ quality: 0.7 });

    if (!picture?.uri) return;

    setSelectedImage(picture.uri);
  };

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const onReturnCancel = () => router.dismiss();

  const onRetakePhoto = () => setSelectedImage(undefined);

  const onRequestPermissions = async () => {
    try {
      const { status: cameraPermissionStatus } =
        await requestCameraPermission();
      if (cameraPermissionStatus !== "granted") {
        Alert.alert("Lo siento", "Necesitamos permiso para usar la cámara");
        return;
      }

      const sharingIsAvailable = await Sharing.isAvailableAsync();
      if (!sharingIsAvailable) {
        Alert.alert("Lo siento", "Necesitamos permiso para usar la galería");
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Algo salió mal con los permisos");
    }
  };

  const onPictureAccepted = async () => {
    if (!selectedImage) return;

    await Sharing.shareAsync(selectedImage, {
      UTI: "image/jpeg",
      mimeType: "image/jpeg",
    });

    addSelectedImage(selectedImage);

    router.dismiss();
  };

  const onPickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) return;

    result.assets.forEach((asset) => addSelectedImage(asset.uri));

    router.dismiss();
  };

  return !cameraPermission ? (
    <View />
  ) : !cameraPermission.granted ? (
    <View
      style={{
        ...styles.container,
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.message}>
        Necesitamos permiso para usar la cámara y la galería
      </Text>

      <TouchableOpacity onPress={onRequestPermissions}>
        <ThemedText type="subtitle">Solicitar permiso</ThemedText>
      </TouchableOpacity>
    </View>
  ) : selectedImage ? (
    <View style={styles.container}>
      <Image source={{ uri: selectedImage }} style={styles.camera} />

      <ConfirmImageButton onPress={onPictureAccepted} />

      <RetakeImageButton onPress={onRetakePhoto} />

      <ReturnCancelButton onPress={onReturnCancel} />
    </View>
  ) : (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

      <ShutterButton onPress={onShutterButtonPress} />

      <FlipCameraButton onPress={toggleCameraFacing} />

      <GalleryButton onPress={onPickImages} />

      <ReturnCancelButton onPress={onReturnCancel} />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
