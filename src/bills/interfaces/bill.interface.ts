import { CurrencyType } from "@/src/enums";
import { IForeignExchange } from "@/src/foreign_exchange/interfaces/ForeignExchange.interface";

export interface IBillItem {
	productId: string;
	quantity: number;
	cost: number;
	currencyType: CurrencyType;
}

export interface IBillTotals {
	BSF: number;
	USD: number;
}

export interface IBill {
	_id: string;
	name: string;
	date: Date;
	items: IBillItem[];
	foreignExchange: IForeignExchange;
	totals: IBillTotals;
}
