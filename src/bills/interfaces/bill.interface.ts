import { CurrencyType } from "@/src/enums";
import { ForeignExchange } from "@/src/foreign_exchange/interfaces/ForeignExchange.interface";

export interface BillItem {
	productId: string;
	quantity: number;
	cost: number;
	currencyType: CurrencyType;
}

export interface BillTotals {
	BSF: number;
	USD: number;
}

export interface Bill {
	_id: string;
	name: string;
	date: Date;
	items: BillItem[];
	foreignExchange: ForeignExchange;
	totals: BillTotals;
}
