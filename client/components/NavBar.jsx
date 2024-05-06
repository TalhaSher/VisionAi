import React from "react";
import { Box, Typography } from "@mui/material";
import SpaceAround from "../subComponents/SpaceAround";

const Navbar = () => {
  return (
    <>
      <SpaceAround>
        <Box
          sx={{
            fontStyle: "italic",
          }}
        >
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            sx={{
              border: "1px solid white",
              padding: "0.5rem 3rem",
              borderRadius: "7%",
            }}
          >
            VisionAi
          </Typography>
        </Box>
      </SpaceAround>
    </>
  );
};

export default Navbar;
