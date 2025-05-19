import { Modal, ModalProps, View } from "react-native";

interface props extends ModalProps {}

const CustomModal = (props: props) => {
	const { className, children, ...otherPros } = props;

	return (
		<Modal className="" animationType="fade" transparent={true} {...otherPros}>
			<View className="flex-1 bg-[#0003] justify-center align-center">
				<View className="bg-white mx-4 px-4 py-3 rounded  shadowlg shadow-neutral-500">
					{children}
				</View>
			</View>
		</Modal>
	);
};

export default CustomModal;
