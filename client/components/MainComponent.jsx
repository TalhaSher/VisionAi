import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import {
  Box,
  Toolbar,
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
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
  const [chat, setChat] = useState([
    {
      user: "human",
      message: "Get a famous inspirational quote",
      response: "You cannot find peace by avoiding life' - Virginia Woolf.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* FORM SUBMISSION HANDLER*/

  const formSubmission = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    setIsLoading(true);

    const prompt = input;

    axios.post("/", { prompt }, headers).then((res) => {
      let ai = {
        user: "human",
        message: prompt,
        response: res.data,
      };
      console.log(ai);
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
      <Box sx={{ width: isNonMobile ? "120vh" : "100vh" }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    </>
  );

  // useEffect(() => {
  //   axios.get("/").then(async (res) => {
  //     let ai = ;
  //     setChat((prev) => [...prev, ai]);
  //   });
  // }, []);

  return (
    <>
      <Box>
        <NavBar />
      </Box>
      <Toolbar />
      <SpaceAround>
        <Container>
          <Paper style={{ height: "80vh", overflow: "auto" }}>
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
                {isLoading && <MessageCard role="ai" message={skeleton} />}
              </ListItem>
            </List>
          </Paper>
        </Container>
      </SpaceAround>
      {/* FORM */}
      <Box margin="1rem 0" sx={{ width: "100%" }}>
        <form onSubmit={formSubmission}>
          <SpaceAround>
            <Box width="70%" sx={{ backgroundColor: "white", borderRadius: 1 }}>
              <Box display="flex" sx={{ margin: "1rem 1rem" }}>
                <TextField
                  sx={{
                    borderRadius: "30px",
                    width: "100%",
                    marginRight: "1rem",
                    color: "black",
                  }}
                  value={input}
                  onChange={inputChangeHandler}
                  required
                />
                <button>send</button>
              </Box>
            </Box>
          </SpaceAround>
        </form>
      </Box>
    </>
  );
};

export default MainComponent;
