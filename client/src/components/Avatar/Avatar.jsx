import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const AvatarTemp = ({ size, image, bgColor, color, text = "U" }) => (
  <Stack direction="row" spacing={2}>
    <Avatar alt={text} src={image} />
  </Stack>
);

export default AvatarTemp;
