import React, { useContext } from "react";
import { GameContext } from "./context/GameContext";

const Inning2Phase = () => {
  const { handleInning2, userChoice, opponentChoice, gameState } =
    useContext(GameContext);

  return (
    <div>
      <h4>Target : {gameState.inning1Score + 1}</h4>
      <h3>
        Score : {gameState.inning2Score + " / " + gameState.inning2Wickets}
      </h3>
      <h3>
        Overs :{" "}
        {Math.floor(gameState.inning2Balls / 6) +
          "." +
          (gameState.inning2Balls % 6)}
      </h3>
      <div>
        {gameState.isUserBatFirst === -1 ? "Hit the Ball" : "Bowl the Ball"}
        {gameState.phase === "INNING2" && (
          <div>
            {!gameState.isUserBatFirst && (
              <button onClick={() => handleInning2(0)}>0</button>
            )}
            <button onClick={() => handleInning2(1)}>1</button>
            <button onClick={() => handleInning2(2)}>2</button>
            <button onClick={() => handleInning2(3)}>3</button>
            <button onClick={() => handleInning2(4)}>4</button>
            <button onClick={() => handleInning2(5)}>5</button>
            <button onClick={() => handleInning2(6)}>6</button>
          </div>
        )}
        {userChoice !== "" && (
          <div>
            <p>User Choice: {userChoice}</p>
          </div>
        )}
        {opponentChoice !== "" && (
          <div>
            <p>Opponent Choice: {opponentChoice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inning2Phase;
