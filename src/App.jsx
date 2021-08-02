import { useState } from "react";
import styled from "styled-components";
import { evaluate } from "mathjs";
import "./App.css"
import buttons from "./buttons.json";

const App = () => {
  const [screen, setScreen] = useState([0]);

  const handleClick = (val) => {
    if (val === "clear") {
      setScreen([0])
    } else if (val === "=") {
      let currentStr = screen.join("")
      let total = evaluate(currentStr)
      setScreen([total])
    } else {
      let newArr = [...screen, val]
      if (newArr[0] === 0) {
        newArr.shift()
      }
      setScreen(newArr)
    }
  }

  return (
    <div className="calc">
      <div className="screen-wrapper">
        <h1>{screen}</h1>
      </div>
      <ButtonWrapper>
        {buttons.map((item, index) => (
          <StyledButton
            key={index}
            className={item.style}
            onClick={() => handleClick(item.value)}
          >
            {item.displayValue}
          </StyledButton>
        ))}
      </ButtonWrapper>
    </div>
  );
};

const ButtonWrapper = styled.div`
  border: 5px black;
  height: 500px;
  width: 400px;
  display: grid;
  grid-template-areas:
    "clear clear clear ."
    ". . . ."
    ". . . ."
    ". . . ."
    "zero zero . .";
  .clear {
    grid-area: clear;
  }
  .zero {
    grid-area: zero;
  }
`;

const StyledButton = styled.button`
cursor: pointer;
color: white;
background: grey;
font-family: 'Roboto Mono', monospace;
font-size: 2rem;

`;

export default App;