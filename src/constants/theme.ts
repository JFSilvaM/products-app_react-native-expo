/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";
import { Icon } from "@expo/ui";

export const Colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    primary: "#3D64F4",
  },
  dark: {
    text: "#ffffff",
    background: "#1F2B43",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    primary: "#3D64F4",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Icons = {
  mail: Icon.select({
    ios: "mail.fill",
    android: import("@expo/material-symbols/mail.xml"),
  }),
  lockClosed: Icon.select({
    ios: "lock.fill",
    android: import("@expo/material-symbols/lock.xml"),
  }),
  arrowForward: Icon.select({
    ios: "arrow.forward",
    android: import("@expo/material-symbols/arrow_forward.xml"),
  }),
  person: Icon.select({
    ios: "person.fill",
    android: import("@expo/material-symbols/person.xml"),
  }),
  logout: Icon.select({
    ios: "rectangle.portrait.and.arrow.right",
    android: import("@expo/material-symbols/logout.xml"),
  }),
};
