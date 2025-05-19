import { initialValuesBill } from "@/src/config/initialValues";
import { IBill } from "../interfaces/bill.interface";

export const addBillToList = (billList: IBill[], bill: IBill | null): IBill[] => {
	if (!bill) return billList;

	if (!bill.items.length) return billList;

	const oldBillIndex = billList.findIndex((item) => item._id === bill._id);

	if (oldBillIndex < 0) return [...billList, bill];

	billList[oldBillIndex] = bill;

	return billList;
};

export const getOneBillAndRemove = (
	billList: IBill[],
	billId: string
): [IBill, IBill[]] => {
	const selectedBill = billList.find((bill) => bill._id === billId);

	if (!selectedBill) return [initialValuesBill, billList];

	const newBillList = billList.filter((bill) => bill._id !== billId);

	return [selectedBill, newBillList];
};

export const deleteOneBillFromList = (
	billList: IBill[],
	billId: string
): IBill[] => billList.filter((item) => item._id !== billId);
