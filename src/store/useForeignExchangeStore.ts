import { create } from "zustand";
import { IForeignExchange } from "../foreign_exchange/interfaces/ForeignExchange.interface";

interface IForeignExchangeStore {
	foreignExchange: IForeignExchange;
}

const useForeignExchangeStore = create<IForeignExchangeStore>((set) => ({
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
