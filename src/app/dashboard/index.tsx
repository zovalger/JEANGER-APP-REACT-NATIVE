import { Link } from "expo-router";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    <ScrollView className="flex flex-row">
      <Link className="p-4" href={"/dashboard/bills"}>
        facturas
      </Link>
      <Link className="p-4" href={"/dashboard/products"}>
        productossssr
      </Link>
    </ScrollView>
  );
}
