import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../../styles/global";

interface CommentProps {
  textComment: string;
  dateComment: string;
  userAvatar: string;
  isEven: boolean;
}

const Comment: React.FC<CommentProps> = ({
  textComment,
  dateComment,
  userAvatar,
  isEven,
}) => {
  return (
    <View
      style={[
        styles.containerComments,
        isEven ? styles.evenComment : styles.oddComment,
      ]}
    >
      {!isEven && (
        <Image
          style={[styles.containerAvatar, styles.avatarLeft]}
          source={{ uri: userAvatar }}
        />
      )}
      <View style={styles.containerText}>
        <Text style={styles.text}>{textComment}</Text>
        <View>
          <Text style={styles.textData}>{dateComment}</Text>
        </View>
      </View>
      {isEven && (
        <Image
          style={[styles.containerAvatar, styles.avatarRight]}
          source={{ uri: userAvatar }}
        />
      )}
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  containerComments: {
    flexDirection: "row",
    marginBottom: 16,
  },
  evenComment: {
    justifyContent: "flex-end",
  },
  oddComment: {
    justifyContent: "flex-start",
  },
  containerAvatar: {
    width: 28,
    height: 28,
    borderColor: colors.darkText,
    borderWidth: 1,
    borderRadius: 28,
  },
  containerText: {
    backgroundColor: colors.darkGrey,
    borderRadius: 8,
    padding: 16,
    maxWidth: "70%",
  },
  text: {
    fontFamily: "RobotoRegular",
    fontSize: 14,
  },
  textData: {
    fontFamily: "RobotoRegular",
    fontSize: 12,
    color: colors.darkGrey,
  },
  avatarLeft: {
    marginRight: 16,
  },
  avatarRight: {
    marginLeft: 16,
  },
});
