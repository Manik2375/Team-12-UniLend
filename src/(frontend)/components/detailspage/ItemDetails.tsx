import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type detailsProps = {
  data: any;
};

const ItemDetails = (props: detailsProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imgUploaded} source={props.data.img} />
      <Text numberOfLines={2} style={styles.title}>
        {props.data.name}
      </Text>
      <Text numberOfLines={2} style={styles.pub}>
        {props.data.publorAuth}
      </Text>
      <Text numberOfLines={1} style={styles.itemtag}>
        {props.data.tag}
      </Text>
      <Text style={styles.itemdisc} numberOfLines={3}>
        {props.data.disc}
      </Text>
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  imgUploaded: {
    height: 318,
    width: 207,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "black",
  },
  title: {
    fontSize: 24,
    fontFamily: "Amiri",
    textAlign: "center",
    lineHeight: 25,
    color: "#F5F5DC",
    textTransform: "capitalize",
  },
  pub: {
    textTransform: "uppercase",
    fontFamily: "Rosarivo",
    fontSize: 16,
    color: "#F5F5DC",
    lineHeight: 16,
  },
  itemtag: {
    fontFamily: "Rosarivo",
    fontSize: 12,
    textTransform: "capitalize",
    lineHeight: 12,
    color: "#FFFFFF",
  },
  itemdisc: {
    fontSize: 12,
    lineHeight: 16,
    color: "#FFFFFF",
    textOverflow: "",
    paddingLeft: 10,
    paddingRight:10
  },
});
