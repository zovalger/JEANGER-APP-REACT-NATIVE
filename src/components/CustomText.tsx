import { Text, TextProps } from "react-native";

interface props extends TextProps {}

const CustomText = (props: props) => {
	const { className, ...otherPros } = props;

	return <Text {...otherPros} className={` ${className}`}></Text>;
};

export default CustomText;
