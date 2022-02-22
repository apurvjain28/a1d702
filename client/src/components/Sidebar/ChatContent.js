import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { calcNumUnread } from "../utils/helperFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewNotification: {
    fontWeight: "bold",
    color: "black",
  },
  notification: {
    margin: "auto",
    marginRight: "15%",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  let messageClass;

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const numUnread = calcNumUnread(
    conversation.messages,
    conversation.otherUser.id
  );

  if (numUnread > 0) {
    messageClass = `${classes.previewText} ${classes.previewNotification}`;
  } else {
    messageClass = `${classes.previewText}`;
  }

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={messageClass}>{latestMessageText}</Typography>
      </Box>
      <Badge
        className={classes.notification}
        badgeContent={numUnread}
        color="primary"
      />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.id === ownProps.convoId
      ),
  };
};

export default connect(mapStateToProps, null)(ChatContent);
