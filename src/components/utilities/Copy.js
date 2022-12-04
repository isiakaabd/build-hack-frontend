import React from "react";
import t from "prop-types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCopy from "components/hooks/useCopy";

const Copy = ({ text, name, ...props }) => {
  const { copyToClipBoard } = useCopy();

  return (
    <button
      {...props}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#fff",
      }}
      onClick={() => copyToClipBoard(text, name)}
    >
      <ContentCopyIcon />
    </button>
  );
};

Copy.propTypes = {
  name: t.string,
  text: t.string,
};

export default Copy;
