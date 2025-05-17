import useProduct from "@/src/products/hooks/useProduct";
import { ScrollView, TextInput } from "react-native";

const BillScreen = () => {
	const { products } = useProduct();

	return (
		<ScrollView>
			<TextInput id="name" placeholder="" />
		</ScrollView>
	);
};

export default BillScreen;
