import { Link } from "expo-router";
import { ScrollView } from "react-native";

export default function Index() {
	return (
		<ScrollView className="flex flex-row">
			<Link className="p-4" href={"/dashboard"}>
				dashboard
			</Link>
			<Link className="p-4" href={"/auth/singin"}>
				sing in
			</Link>
			<Link className="p-4" href={"/auth/singout"}>
				sing out
			</Link>
		</ScrollView>
	);
}
