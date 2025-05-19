import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

import CustomModal from "@/src/components/CustomModal";
import CustomText from "@/src/components/CustomText";
import Input from "@/src/components/Input";
import { initialValuesForeignExchange } from "@/src/config/initialValues";
import { CurrencyType } from "@/src/enums";
import useForeignExchange from "@/src/foreign_exchange/hooks/useForeignExchange";
import useProduct from "@/src/products/hooks/useProduct";
import { deleteItemInBill, updateBillItem } from "../helpers/Bill.helpers";
import useBill from "../hooks/useBill";
import { IBillItem } from "../interfaces/bill.interface";

interface props {
	data: IBillItem;
	onDeleteItem?(productId: string): void;
}

function BillItem({ data, onDeleteItem }: props) {
	const { currentBill, setCurrentBill } = useBill();
	const { foreignExchange } = useForeignExchange();
	const { getProduct } = useProduct();

	const { quantity, productId } = data;
	const { name, cost, currencyType } = getProduct(data.productId);

	const [openView, setOpenView] = useState(false);

	const handdleOpenView = () => {
		setOpenView(true);
	};
	const handdleCloseView = () => {
		setOpenView(false);
	};

	const handdleDelete = async () => {
		if (onDeleteItem) onDeleteItem(productId);
		setCurrentBill(deleteItemInBill(currentBill, foreignExchange, productId));
	};

	let d = foreignExchange || initialValuesForeignExchange;

	const divisaRef = currencyType === CurrencyType.USD ? d.dolar : d.euro;
	const BSF = currencyType === CurrencyType.BSF ? cost : cost * divisaRef;

	// *******************************************************************
	// 													modal
	// *******************************************************************

	const [qu, setQu] = useState(0);

	const onSubmit = () => {
		const newBill = updateBillItem(
			currentBill,
			{ ...data, quantity: qu },
			foreignExchange
		);
		setCurrentBill(newBill);
		handdleCloseView();
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<>
			<TouchableOpacity
				onPress={() => {
					handdleOpenView();
				}}
			>
				<View className="flex-row align-middle ">
					<View className="flex-row flex-1">
						<Text className="min-w-8  mx-2 text-center ">{quantity}</Text>
						<Text>{name}</Text>
					</View>

					<View className="flex-row justify-between flex-1">
						<View>
							<Text>
								{BSF.toFixed(2)} {CurrencyType.BSF}
							</Text>
						</View>
						<View>
							<Text>
								{(BSF * quantity).toFixed(2)} {CurrencyType.BSF}
							</Text>
						</View>
					</View>

					<View>
						<TouchableOpacity
							onPress={() => {
								handdleDelete();
							}}
						>
							<Text> x</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>

			{/* modal */}

			<CustomModal onRequestClose={handdleCloseView} visible={openView}>
				<CustomText>Cantidad</CustomText>
				<Input
					autoFocus
					placeholder="Cantidad"
					onKeyPress={({ nativeEvent: { key } }) => {
						if (key === "Enter") onSubmit();
					}}
					keyboardType="decimal-pad"
					value={qu.toString()}
					onChange={({ nativeEvent: { text } }) => setQu(parseFloat(text))}
				/>

				<Button title=">" onPress={() => onSubmit()} />
			</CustomModal>
		</>
	);
}

export default BillItem;
