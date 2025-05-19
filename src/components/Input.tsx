import { TextInput, TextInputProps } from "react-native";

interface props extends TextInputProps {}

const Input = (props: props) => {
	const { className, ...otherPros } = props;

	return <TextInput {...otherPros} className={` ${className}`} />;
};

export default Input;
