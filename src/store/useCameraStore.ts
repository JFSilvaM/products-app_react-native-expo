import { create } from "zustand";

interface TemporalCameraStoreStage {
  selectedImages: string[];
  addSelectedImage: (image: string) => void;
  clearImages: () => void;
}

export const useCameraStore = create<TemporalCameraStoreStage>()((set) => ({
  selectedImages: [],
  addSelectedImage: (image) =>
    set((state) => ({ selectedImages: [...state.selectedImages, image] })),
  clearImages: () => set({ selectedImages: [] }),
}));
