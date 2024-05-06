import React from "react";
import { Avatar } from "@mui/material";
import { Box, useMediaQuery, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MessageCard = ({ role, message, type }) => {
  const isHuman = role === "human";
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const width = isNonMobile ? "100%" : "90%";
  const isLoading = type === "loading";
  return (
    <>
      <Box display="flex" flexDirection="row" width="90%" margin="0.6rem 0">
        {isHuman ? (
          <Avatar alt="human" src="/images/humanavatar.png" />
        ) : (
          <Avatar alt="human" src="/images/robotAvatar.jpg" />
        )}

        <Box
          minWidth={width}
          minHeight="3rem"
          sx={{
            backgroundColor: "#c3c3c3de",
            marginLeft: "1rem",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <Typography sx={{ fontWeight: "light", marginLeft: "1rem" }}>
              {message}
            </Typography>
          ) : (
            <Typography sx={{ fontWeight: "light", marginLeft: "1rem" }}>
              <ReactMarkdown>{message}</ReactMarkdown>
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MessageCard;
