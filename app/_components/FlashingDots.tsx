import React from 'react';
import styled, { keyframes } from 'styled-components';

const flash = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.2; }
`;

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1em; /* Match the line-height of surrounding text */
  vertical-align: middle; /* Ensures it's aligned with the text */
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  background-color: red;
  border-radius: 50%;
  animation: ${flash} 3s infinite;
`;

const FlashingDot = () => {
  return (
    <Container>
      <Dot />
    </Container>
  );
};

export default FlashingDot;
