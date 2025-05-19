import { create } from "zustand";
import { IBill } from "../bills/interfaces/bill.interface";
import { initialValuesBill } from "../config/initialValues";

interface IBillStore {
	bills: IBill[];
	currentBill: IBill | null;
	onSetCurrentBill(bill: IBill): void;
}

const useBillStore = create<IBillStore>((set) => ({
	bills: [],
	currentBill: initialValuesBill,
	onSetCurrentBill: (bill: IBill) => {
		set((state) => ({ ...state, currentBill: bill }));
	},

	// {
	// 	_id: "sadasda",
	// 	name: "asdasda",
	// 	date: new Date(),
	// 	items: [
	// 		{
	// 			productId: "64ea2f45abe42c738578b3be",
	// 			cost: 0.11,
	// 			currencyType: CurrencyType.USD,
	// 			quantity: 1,
	// 		},
	// 	],
	// 	foreignExchange: {
	// 		euro: 105.63515899,
	// 		dolar: 94.763,
	// 		date: new Date().toString(),
	// 		bankBusinessDate: "19/5/2025",
	// 	},
	// 	totals: {
	// 		BSF: 0,
	// 		USD: 0,
	// 	},
	// }
	removeAllBills: () => set((state) => ({ ...state, bills: [] })),
}));

export default useBillStore;
