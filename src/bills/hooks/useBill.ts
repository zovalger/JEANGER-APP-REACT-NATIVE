import useBillStore from "@/src/store/useBillStore";
import { IBill } from "../interfaces/bill.interface";

const useBill = (billId?: string) => {
	const bills = useBillStore((state) => state.bills);
	const currentBill = useBillStore((state) => state.currentBill);
	const onSetCurrentBill = useBillStore((state) => state.onSetCurrentBill);

	const setCurrentBill = (bill: IBill) => {
		onSetCurrentBill(bill);
	};

	return { bills, currentBill, setCurrentBill };
};

export default useBill;
