import { ScrollView, Text } from "react-native";
import useProduct from "../hooks/useProduct";

const ProductsScreen = () => {
	const { products } = useProduct();

	return (
		<ScrollView>
			<Text>{products.length}</Text>

			{products.map((item) => (
				<Text key={item._id}>{item.name}</Text>
			))}
		</ScrollView>
	);
};

export default ProductsScreen;
