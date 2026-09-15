import FlipCameraButton from "@/theme/components/camera/flip-camera-button";
import GalleryButton from "@/theme/components/camera/gallery-button";
import ReturnCancelButton from "@/theme/components/camera/return-cancel-button";
import ShutterButton from "@/theme/components/camera/shutter-button";
import { ThemedText } from "@/theme/components/themed-text";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({ quality: 0.7 });

    if (!picture?.uri) return;
  };

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const onReturnCancel = () => router.dismiss();

  return !permission ? (
    <View />
  ) : !permission.granted ? (
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

      <TouchableOpacity onPress={requestPermission}>
        <ThemedText type="subtitle">Solicitar permiso</ThemedText>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

      <ShutterButton onPress={onShutterButtonPress} />

      <FlipCameraButton onPress={toggleCameraFacing} />

      <GalleryButton onPress={() => {}} />

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
