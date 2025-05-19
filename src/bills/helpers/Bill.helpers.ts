import {
	initialValuesBill,
	initialValuesForeignExchange,
} from "@/src/config/initialValues";
import { CurrencyType } from "@/src/enums";
import { IForeignExchange } from "@/src/foreign_exchange/interfaces/ForeignExchange.interface";
import { IBill, IBillItem } from "../interfaces/bill.interface";

const calculateTotals = (
	bill: IBill,
	foreignExchange: IForeignExchange = initialValuesForeignExchange
): IBill => {
	const { items } = bill;

	const USD = items.reduce((total: number, item: IBillItem) => {
		const { cost, currencyType, quantity } = item;

		let toSum = cost * quantity;

		if (currencyType === CurrencyType.EUR)
			toSum = (toSum * foreignExchange.euro) / foreignExchange.dolar;
		if (currencyType === CurrencyType.BSF)
			toSum = toSum / foreignExchange.dolar;

		return total + toSum;
	}, 0);

	return {
		...bill,
		foreignExchange,
		totals: { USD, BSF: USD * foreignExchange.dolar },
	};
};

// todo: comentar paso
export const updateBillItem = (
	bill: IBill | null,
	billItem: IBillItem,
	foreignExchange: IForeignExchange | null
): IBill => {
	const currentBill = bill || initialValuesBill;
	const foreignExchangeCurrent =
		foreignExchange || initialValuesForeignExchange;

	let newItems: IBillItem[] = currentBill.items;

	const oldBillItem = currentBill.items.find(
		(item) => item.productId === billItem.productId
	);

	const oldQuantity = oldBillItem ? oldBillItem.quantity : 0;

	const newQuantity = oldQuantity + billItem.quantity;

	// todo: anadirlo

	if (!oldBillItem && newQuantity > 0) {
		newItems = [...newItems, billItem];
	} else if (!oldBillItem) return currentBill;

	// todo quitarlo
	if (newQuantity <= 0) {
		newItems = newItems.filter((item) => item.productId !== billItem.productId);
	}

	// todo actualizarlo
	if (newQuantity > 0) {
		newItems = newItems.map((item) =>
			item.productId === billItem.productId
				? { ...item, quantity: newQuantity }
				: item
		);
	}

	const newBillWithTotals = calculateTotals(
		{
			...currentBill,
			items: newItems,
		},
		foreignExchangeCurrent
	);

	return newBillWithTotals;
};

// todo: comentar paso
export const setOneBillItem = (
	bill: IBill | null,
	billItem: IBillItem,
	foreignExchange: IForeignExchange | null
): IBill => {
	const currentBill = bill || initialValuesBill;
	const foreignExchangeCurrent =
		foreignExchange || initialValuesForeignExchange;

	let newItems: IBillItem[] = currentBill.items;

	const oldBillItem = currentBill.items.find(
		(item) => item.productId === billItem.productId
	);

	const newQuantity = billItem.quantity;

	// todo: anadirlo

	if (!oldBillItem && newQuantity > 0) {
		newItems = [...newItems, billItem];
	} else if (!oldBillItem) return currentBill;

	// todo actualizarlo
	if (newQuantity > 0) {
		newItems = newItems.map((item) =>
			item.productId === billItem.productId
				? { ...item, quantity: newQuantity }
				: item
		);
	}

	const newBillWithTotals = calculateTotals(
		{
			...currentBill,
			items: newItems,
		},
		foreignExchangeCurrent
	);

	return newBillWithTotals;
};

export const deleteItemInBill = (
	bill: IBill | null,
	foreignExchange: IForeignExchange | null,
	productId: string
): IBill => {
	const currentBill = bill || initialValuesBill;

	const { items } = currentBill;

	currentBill.items = items.filter((item) => item.productId !== productId);

	return calculateTotals(currentBill, foreignExchange || undefined);
};

export const clearBill = (): IBill => {
	return initialValuesBill;
};
