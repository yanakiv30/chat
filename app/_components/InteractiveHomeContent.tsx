'use client';

import { useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import GithubSignInButton from "./GithubSignInButton";
import Spinner from "./Spinner";

const InteractiveHomeContent = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const hideButtonsAndShowSpinner = () => {
    setShowButtons(false);
    setShowSpinner(true);

    setTimeout(() => {
      setShowSpinner(false);
      setShowButtons(true);
    }, 20000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
      }}
    >
      {showButtons ? (
        <>
          <GoogleSignInButton px={20} onClick={hideButtonsAndShowSpinner} />
          <GithubSignInButton px={20} onClick={hideButtonsAndShowSpinner} />
        </>
      ) : null}
      {showSpinner ? <Spinner /> : null}
    </div>
  );
};

export default InteractiveHomeContent;