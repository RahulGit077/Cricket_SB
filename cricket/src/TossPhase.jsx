import React, { useContext } from "react";
import { GameContext } from "./context/GameContext";

const TossPhase = () => {
  const { handleToss, tossResult } = useContext(GameContext);

  return (
    <div>
      <h2>Toss Time</h2>
      {!tossResult && (
        <div>
          <button onClick={() => handleToss("heads")}>Heads</button>
          <button onClick={() => handleToss("tails")}>Tails</button>
        </div>
      )}
      {tossResult && (
        <div>
          <p>Toss Result: {tossResult}</p>
        </div>
      )}
    </div>
  );
};

export default TossPhase;
