import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const secureStorageAdapter = {
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la información");
    }
  },

  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la información");
      return null;
    }
  },

  deleteItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar la información");
    }
  },
};
