"use client";
import { createGlobalStyle } from "styled-components";
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";

export const GlobalStyles = createGlobalStyle`

:root {
  --background: #FFFFDFA;
  --red: #E52E4D;
  --primary: #5429cc;
  --green: #33CC95;
  --text: #333333;
  --white: #FFFFFF;
  --primary-lighter: #5f30e0;
  --gray-border: #d8d6de;
  --gray-text: #a1a7bb;
}

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  text-decoration: none;
  }
html {
  @media (max-width: 1080px) {
    font-size: 93.75%;
  }
  @media (max-width: 720px) {
    font-size: 87.5%;
  }
}
body {
  font-family: 'Cormorant SC', serif;
  background: var(--background);
  @media (max-width: 1080px) {
    font-size: 93.75%;
  }
  @media (max-width: 720px) {
    font-size: 87.5%;
  }
}
input,
button,
textarea {
  font: 400 18px Roboto, sans-serif;
}
button,
svg {
  cursor: pointer;
}

`;

export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [GlobalStyles] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = GlobalStyles.styles();
    GlobalStyles.flush();
    return <>{styles}</>;
  });

  return <StyleRegistry registry={GlobalStyles}>{children}</StyleRegistry>;
}
