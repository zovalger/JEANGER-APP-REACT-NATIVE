import { Bill } from "../bills/interfaces/bill.interface";
import { ForeignExchange } from "../foreign_exchange/interfaces/ForeignExchange.interface";


export const initialValuesForeignExchange: ForeignExchange = {
	bankBusinessDate: new Date().toString(),
	dolar: 0,
	euro: 0,
	date: new Date().toString(),
};

export const initialValuesBill: Bill = {
	_id: "",
	name: "",
	date: new Date(),
	items: [],
	totals: { BSF: 0, USD: 0 },
	foreignExchange: initialValuesForeignExchange,
};
