import { create } from "zustand";
import { ForeignExchange } from "../foreign_exchange/interfaces/ForeignExchange.interface";

interface ForeignExchangeStore {
	foreignExchange: ForeignExchange;
}

const useForeignExchangeStore = create<ForeignExchangeStore>((set) => ({
	foreignExchange: {
		euro: 105.63515899,
		dolar: 94.763,
		date: new Date().toString(),
		bankBusinessDate: "19/5/2025",
	},
	removeAllForeignExchanges: () =>
		set((state) => ({ ...state, foreignExchanges: [] })),
}));

export default useForeignExchangeStore;
