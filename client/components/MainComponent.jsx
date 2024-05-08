import React, { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import {
  Button,
  Box,
  Container,
  Paper,
  List,
  ListItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import SpaceAround from "../subComponents/SpaceAround";
import MessageCard from "../subComponents/MessageCard";

// MAIN COMPONENT

const MainComponent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const paperRef = useRef(null); // Ref for Paper component
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
  const [chat, setChat] = useState([
    {
      user: "human",
      message: "Get a quote",
      response: "Believe you can and you're halfway there. - Talha Sher.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  /* FORM SUBMISSION HANDLER*/

  const formSubmission = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    setIsLoading(true);

    const prompt = input;

    axios.post("/", { prompt, history }, headers).then((res) => {
      let ai = {
        user: "human",
        message: prompt,
        response: res.data,
      };
      setHistory((prev) => [
        ...prev,
        { role: "user", parts: [{ text: prompt }] },
        { role: "model", parts: [{ text: res.data }] },
      ]);
      setChat((prev) => [...prev, ai]);
      setIsLoading(false);
    });
    setInput("");
  };

  /* INPUT CHANGE HANDLER */

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const skeleton = (
    <>
      <Box sx={{ width: isNonMobile ? "120vh" : "28vh" }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    </>
  );

  useEffect(() => {
    // Scroll to the bottom of the Paper component
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [chat, isLoading]);

  return (
    <>
      <Box height="100vh">
        <Box margin="0.5rem 0">
          <NavBar />
        </Box>
        <SpaceAround>
          <Container>
            <Paper ref={paperRef} style={{ height: "75vh", overflow: "auto" }}>
              <List>
                {chat.map((singleChat, i) => (
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: 0,
                    }}
                    key={i}
                  >
                    {/* USER MESSAGE */}
                    <MessageCard
                      role={singleChat.user}
                      message={singleChat.message}
                    />

                    {/* AI RESPONSE */}

                    <MessageCard role="ai" message={singleChat.response} />
                  </ListItem>
                ))}
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 0,
                  }}
                >
                  {isLoading && (
                    <MessageCard role="ai" message={skeleton} type="loading" />
                  )}
                </ListItem>
              </List>
            </Paper>
          </Container>
        </SpaceAround>
        {/* FORM */}
        <Box margin="1rem 0" sx={{ width: "100%" }}>
          <form onSubmit={formSubmission}>
            <SpaceAround>
              <Box
                width={isNonMobile ? "70%" : "100%"}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              >
                <Box display="flex" sx={{ margin: "1rem 1rem" }}>
                  <TextField
                    sx={{
                      border: "none",
                      width: "100%",
                      marginRight: "1rem",
                      color: "black",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                    value={input}
                    onChange={inputChangeHandler}
                    placeholder="Your prompt..."
                    required
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                    }}
                    type="submit"
                    disabled={isLoading}
                  >
                    send
                  </Button>
                </Box>
              </Box>
            </SpaceAround>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default MainComponent;
