import { Host, Icon, IconName } from "@expo/ui";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName: IconName;
  onPress: () => void;
}

export const FAB = ({ style, iconName, onPress }: Props) => (
  <TouchableOpacity
    style={[
      {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        shadowColor: "black",
        backgroundColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
          width: 0,
          height: 10,
        },
      },
      style,
    ]}
    onPress={onPress}
  >
    <Host matchContents>
      <Icon name={iconName} size={30} color="white" onPress={onPress} />
    </Host>
  </TouchableOpacity>
);
