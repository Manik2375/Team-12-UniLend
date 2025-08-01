import NavBar from "@/src/(frontend)/components/standard/Navbar";
import WidePreview from "@/src/(frontend)/components/standard/WidePreview";
import { getOrderHistory, Order } from "@/src/api/firestore/order";
import { useAuth } from "@/src/context/AuthContext";
import { RelativePathString, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function TradeHistory() {
  const { user } = useAuth();

  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const fetchWatchList = async () => {
        if (!user) {
          console.error("User not authenticated in fetchWatchList function");
          return;
        }
        try {
          setLoading(true);
          const orderHistory = await getOrderHistory(user.uid);
          if (orderHistory.length === 0) {
            return;
          }
          setOrderHistory(orderHistory);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching watchLists", error);
        }
      };

      fetchWatchList();
    }, [user])
  );

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          User not authenticated
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar title={"Trade History"} />
      {loading ? (
        <Text style={{ color: "white", textAlign: "center" }}>Loading...</Text>
      ) : orderHistory.length === 0 ? (
        <Text
          style={{
            fontSize: 18,
            color: "beige",
            textAlign: "center",
            fontFamily: "Rosarivo",
            fontWeight: "semibold",
            marginTop: 100
          }}
        >
          No items traded yet -_-
        </Text>
      ) : (
        <FlatList
          ItemSeparatorComponent={() => {
            return <View style={{ height: 10 }} />;
          }}
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          data={orderHistory}
          renderItem={({ item }) => {
            const orderItem = item.item;
            console.log("test");
            return (
              <WidePreview
                title={orderItem.title}
                middleText={
                  orderItem.type === "sell"
                    ? orderItem.price + "/-"
                    : orderItem.price + "/m"
                }
                bottomText={`Seller name(temp): ${item.sellerId}`}
                imageId={orderItem.images as string}
                buttonLink={
                  `/orderHistory/${orderItem.id}` as RelativePathString
                }
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1C161E",
    padding: 10,
  },
  scroll: {
    gap: 10,
  },
});
