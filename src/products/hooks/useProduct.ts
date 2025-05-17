import useProductStore from "@/src/store/useProductStore";

const useProduct = (productId?: string) => {
	const products = useProductStore((state) => state.products);

	return { products };
};

export default useProduct;
