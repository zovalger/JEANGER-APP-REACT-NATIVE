import { TextInput, TextInputProps } from "react-native";

interface props extends TextInputProps {
	
}

const Input = (props: props) => {
	const { className } = props;

	return <TextInput {...props} className={` ${className}`} />;
};

export default Input;
