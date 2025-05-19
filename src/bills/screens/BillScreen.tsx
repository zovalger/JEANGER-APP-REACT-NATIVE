import Input from "@/src/components/Input";
import {
	initialValuesBill,
	initialValuesForeignExchange,
} from "@/src/config/initialValues";
import { CurrencyType } from "@/src/enums";
import useForeignExchange from "@/src/foreign_exchange/hooks/useForeignExchange";
import {
	getOnlyFavoriteProduct,
	searchProductsByWord,
	sortProductByPriority,
} from "@/src/products/helpers/Product.helpers";
import useProduct from "@/src/products/hooks/useProduct";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import {
	clearBill,
	deleteItemInBill,
	updateBillItem,
} from "../helpers/Bill.helpers";
import useBill from "../hooks/useBill";
import { BillItem } from "../interfaces/bill.interface";

const regExpAdder = /^(\+|\-)\d{1,}/i;

interface propssss {
	data: BillItem;
	onDeleteItem?(productId: string): void;
}

function BillProductVisorItem({ data, onDeleteItem }: propssss) {
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

	useEffect(() => {
		return () => {};
	}, []);

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
		<TouchableOpacity
			onPress={() => {
				handdleOpenView();
			}}
		>
			<View>
				<View>
					<Text>{quantity}</Text>
					<Text>{name}</Text>
				</View>

				<View>
					<View>
						<Text>
							{BSF.toFixed(2)} {CurrencyType.BSF}
						</Text>
					</View>
				</View>

				<View>
					<View>
						<Text>
							{(BSF * quantity).toFixed(2)} {CurrencyType.BSF}
						</Text>
					</View>
				</View>

				<View>
					<Button
						title="eliminar"
						onPress={() => {
							handdleDelete();
						}}
					/>
				</View>
			</View>

			{openView && (
				// <BillProductVisorItemViewForm
				// 	data={data}
				// 	onClose={handdleCloseView}
				// />

				<View>
					<View>
						<View>
							<View>
								<Input
									autoFocus
									placeholder="Cantidad"
									onKeyPress={({ nativeEvent: { key } }) => {
										if (key === "Enter") onSubmit();
									}}
									keyboardType="decimal-pad"
									value={qu.toString()}
									onChange={({ nativeEvent: { text } }) =>
										setQu(parseFloat(text))
									}
								/>

								<Button title=">" onPress={() => onSubmit()} />
							</View>
						</View>
					</View>
				</View>
			)}
		</TouchableOpacity>
	);
}

const BillScreen = () => {
	const { foreignExchange } = useForeignExchange();
	const { products, getProduct } = useProduct();
	const { currentBill, setCurrentBill } = useBill();

	const [inputValue, setInputValue] = useState("");
	const [adderValue, setAdderValue] = useState<null | number>(null);
	const [productList, setProductList] = useState<string[]>([]);

	const [selected, setSelected] = useState<number>(-1);

	// *******************************************************************
	// 													Fuctions
	// *******************************************************************

	const refreshShowList = (search: string) => {
		if (search.length < 2) {
			setProductList([]);
			setSelected(-1);
			return;
		}

		const resultSearch = searchProductsByWord(search, products);

		const productsIds = sortProductByPriority(resultSearch).map(
			(product) => product._id
		);

		setProductList(productsIds);
	};

	useEffect(() => {
		refreshShowList(inputValue);
	}, [inputValue]);

	const addProductToBill = (productId: string, quantity?: number) => {
		const newItemBill: BillItem = {
			productId,
			quantity: quantity ? quantity : adderValue ? adderValue : 1,
			cost: getProduct(productId).cost,
			currencyType: getProduct(productId).currencyType,
		};

		const newBill = updateBillItem(currentBill, newItemBill, foreignExchange);

		setCurrentBill(newBill);
	};

	// *******************************************************************
	// 													controls
	// *******************************************************************

	const onChange = (value: string) => setInputValue(value);

	const moveSelected = (direction: number) => {
		const brutePos = selected + direction;

		const newPos =
			brutePos < 0
				? productList.length - 1
				: brutePos >= productList.length
				? 0
				: brutePos;

		setSelected(newPos);
	};

	const moveSelectedToPos = (index: number) => {
		setSelected(index);
	};

	const onEnter = (position?: number) => {
		const matching = inputValue.match(regExpAdder);

		let newInputText = inputValue;
		let quantity = adderValue || 1;

		if (matching) {
			quantity = parseInt(matching[0]);
			newInputText = inputValue.trim().replace(regExpAdder, "");
		}

		if (selected > -1 || position !== undefined) {
			const productId =
				productList[position !== undefined ? position : selected];
			addProductToBill(productId, quantity);

			quantity = 0;
			newInputText = "";
		}

		//todo: añadir a la lista

		setAdderValue(quantity || null);
		setInputValue(newInputText);
		setSelected(-1);
	};

	const onClear = () => {
		setInputValue("");
		setAdderValue(null);
		setSelected(-1);
	};

	// *******************************************************************
	// 													Selector
	// *******************************************************************

	const showLimitedProducts = (arr: string[]) => {
		const limited = arr.slice(0, 15);

		return limited.map((_id, index) => {
			// <BillProductItem
			// 	key={_id}
			// 	_id={_id}
			// 	index={index}
			// 	selected={selected}
			// 	onClick={() => {
			// 		onEnter(index);
			// 	}}

			return (
				<TouchableOpacity key={_id} onPress={() => onEnter(index)}>
					<View>
						<View>
							<Text>{getProduct(_id).name}</Text>
						</View>

						{/* <View>
							<View>
								<View>
									<Text>{Math.round(BSF)}</Text>
									<Text>{CurrencyType.BSF}</Text>
								</View>
								<View>
									<Text>{divisaCost.toFixed(2)}</Text>
									<Text>
										{currencyType == CurrencyType.EUR
											? CurrencyType.EUR
											: CurrencyType.USD}
									</Text>
								</View>
							</View>
						</View> */}
					</View>
				</TouchableOpacity>
			);
		});
	};

	// *******************************************************************
	// 													Visor
	// *******************************************************************

	const [deletedFavorites, setDeletedFavorites] = useState<string[]>([]);

	const { totals, items } = currentBill || initialValuesBill;

	const sortByPriority = sortProductByPriority(products);

	const productsFavorites = getOnlyFavoriteProduct(sortByPriority);

	const productsBillItemsFavoritesByPriority = productsFavorites
		.map((prod) => {
			const { _id, currencyType, cost } = prod;

			const billItem = items.find((item) => item.productId === _id);

			return billItem || { productId: _id, quantity: 0, currencyType, cost };
		})
		.filter((item) => !deletedFavorites.includes(item.productId));

	const remainingBillItem = items.filter(
		(prod) =>
			!productsBillItemsFavoritesByPriority.some(
				(item) => item.productId === prod.productId
			)
	);

	useEffect(() => {
		if (!currentBill) return;

		const toRemoveFromDeleted = deletedFavorites.filter((id) =>
			currentBill.items.some((item) => item.productId == id)
		);

		setDeletedFavorites((prev) =>
			prev.filter((_id) => !toRemoveFromDeleted.includes(_id))
		);

		return () => {};
	}, [currentBill]);

	// *******************************************************************
	// 													Functions
	// *******************************************************************

	const [submiting, setSubmiting] = useState(false);

	const openView = () => {
		if (!currentBill || !currentBill.items.length) return;
		setSubmiting(true);
	};

	const closeView = () => {
		setSubmiting(false);
	};

	const onDelete = async () => {
		setDeletedFavorites([]);
		setCurrentBill(clearBill());
	};

	// *******************************************************************
	// 													items
	// *******************************************************************

	const onDeleteItem = (productId: string) => {
		// todo: añadir al array de favoritos eliminados
		if (deletedFavorites.includes(productId)) return;
		setDeletedFavorites((prev) => [...prev, productId]);
	};

	// *******************************************************************
	// 													BillProductVisorItem
	// *******************************************************************

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<ScrollView>
			<View>
				<Input
					placeholder="Buscar"
					value={inputValue}
					onChangeText={(text) => onChange(text)}
					onKeyPress={({ nativeEvent: { key } }) => {
						if (key === "Escape") onClear();
						if (key === "ArrowUp") moveSelected(-1);
						if (key === "ArrowDown") moveSelected(1);
						if (key === "Enter") onEnter();
					}}
				/>
			</View>

			{/* ******************************* Selector del buscador ************************************ */}

			<View>
				{productList.length > 0 && (
					<View>{showLimitedProducts(productList)}</View>
				)}
			</View>

			{/* ******************************* visor ************************************ */}

			<View>
				{/* // todo: que no se desordenen al agregarlos a la factura  */}
				{productsBillItemsFavoritesByPriority.map((data) => (
					<BillProductVisorItem
						key={uuid.v4()}
						data={data}
						onDeleteItem={onDeleteItem}
					/>
				))}

				{currentBill &&
					remainingBillItem.map((item) => (
						<BillProductVisorItem key={uuid.v4()} data={item} />
					))}

				<View>
					<View>
						<View>
							<Button
								title="Eliminar"
								onPress={() => {
									onDelete();
								}}
							/>

							<Button title="añadir" onPress={() => openView()} />
						</View>
					</View>
					<View>
						<View>
							<View>
								<Text>SubTotal</Text>
							</View>

							<View>
								<Text>
									{(totals.BSF * (1 / 1.16)).toFixed(2)} {CurrencyType.BSF}
								</Text>
							</View>
						</View>

						<View>
							<View>
								<Text>iva 16%</Text>
							</View>

							<View>
								<Text>
									{(totals.BSF - totals.BSF * (1 / 1.16)).toFixed(2)}{" "}
									{CurrencyType.BSF}
								</Text>
							</View>
						</View>

						<View>
							<View>
								<Text>Total</Text>
							</View>

							<View>
								<Text>
									{totals.USD.toFixed(2)} {CurrencyType.USD}
								</Text>
								<Text>
									{totals.BSF.toFixed(2)} {CurrencyType.BSF}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default BillScreen;
