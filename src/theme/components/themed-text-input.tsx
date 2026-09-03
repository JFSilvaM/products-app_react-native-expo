import { ImageSourcePropType, Text, TextInputProps, View } from "react-native";

type SFSymbolsType = string;

interface Props extends TextInputProps {
  icon?: SFSymbolsType | ImageSourcePropType;
}

const ThemedTextInput = ({ icon, ...rest }: Props) => {
  return (
    <View>
      <Text>ThemedTextInput</Text>
    </View>
  );
};

export default ThemedTextInput;
