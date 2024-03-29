import React from "react";
import { useTheme } from "@mui/material";

function PlayStore() {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        fill={theme.palette.common.white}
        d="M9.387 10.369L.94 1.004a.32.32 0 00-.458 0c-.066 0-.131.065-.131.13v18.858c0 .193.196.322.392.258.066 0 .131-.065.197-.13l8.446-9.364c.13-.129.13-.258 0-.387zM17.047 9.917a117.595 117.595 0 01-3.601-2.196c-.131-.065-.328-.065-.393.064l-2.291 2.584a.31.31 0 000 .452l2.291 2.583c.131.13.262.13.393.065 1.375-.84 2.619-1.615 3.6-2.196.394-.194.46-.71.263-1.033-.066-.13-.131-.259-.262-.323zM10.303 11.337a.32.32 0 00-.458 0l-6.94 7.621a.31.31 0 000 .452c.131.065.262.13.393.065a567.994 567.994 0 008.97-5.36c.13-.065.196-.324.13-.453l-.065-.064-2.03-2.26zM9.78 9.787a.32.32 0 00.458 0l2.03-2.26a.31.31 0 000-.452l-.066-.065a567.907 567.907 0 00-8.97-5.36c-.13-.13-.327-.065-.458.065-.065.129-.065.323.066.387l6.94 7.685z"
      ></path>
    </svg>
  );
}

export default React.memo(PlayStore);
