import { initialValuesBill } from "@/src/config/initialValues";
import { Bill } from "../interfaces/bill.interface";

export const addBillToList = (billList: Bill[], bill: Bill | null): Bill[] => {
	if (!bill) return billList;

	if (!bill.items.length) return billList;

	const oldBillIndex = billList.findIndex((item) => item._id === bill._id);

	if (oldBillIndex < 0) return [...billList, bill];

	billList[oldBillIndex] = bill;

	return billList;
};

export const getOneBillAndRemove = (
	billList: Bill[],
	billId: string
): [Bill, Bill[]] => {
	const selectedBill = billList.find((bill) => bill._id === billId);

	if (!selectedBill) return [initialValuesBill, billList];

	const newBillList = billList.filter((bill) => bill._id !== billId);

	return [selectedBill, newBillList];
};

export const deleteOneBillFromList = (
	billList: Bill[],
	billId: string
): Bill[] => billList.filter((item) => item._id !== billId);
