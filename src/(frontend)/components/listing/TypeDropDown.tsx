import Line from "@/src/(frontend)/components/standard/Line";
import { getActiveTags, Tag } from "@/src/api/firestore/tags";
import React, { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const TypeDropDown = ({
  handleClick,
  selectedId = null,
}: {
  handleClick: any;
  selectedId?: string | null;
}) => {
  const [categories, setCategories] = useState<Tag[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getActiveTags();
        setCategories(tags);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };

    fetchTags();
  }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.box}>
        <Line />
        {categories.map((category) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                handleClick(category.slug);
              }}
              key={category.id}
            >
              <Text
                style={
                  category.slug === selectedId
                    ? styles.boxClicked
                    : styles.boxUnClick
                }
              >
                {category.name}
              </Text>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default TypeDropDown;

const styles = StyleSheet.create({
  container: {},
  box: {
    flexDirection: "row",
  },
  boxClicked: {
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderColor: "#F5F5DC",
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F5F5DC",
    fontFamily: "Rosarivo",
  },
  boxUnClick: {
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderColor: "#F5F5DC",
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    color: "#F5F5DC",
    fontFamily: "Rosarivo",
  },
});
