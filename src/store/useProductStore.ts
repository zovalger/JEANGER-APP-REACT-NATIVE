import { create } from "zustand";
import { Product } from "../products/interfaces/product.interface";
import products_testdata from "../testdata/products_testdata";

export interface ForeignExchange {
	euro: number;
	dolar: number;
	date: Date;
	bankBusinessDate: string;
}

interface ProductStore {
	products: Product[];
}

const useProductStore = create<ProductStore>((set) => ({
	products: products_testdata,
	removeAllProducts: () => set((state) => ({ ...state, products: [] })),
}));

export default useProductStore;
