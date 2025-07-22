import React, { useContext } from "react";
import { GameContext } from "./context/GameContext";

const Inning1Phase = () => {
  const { handleInning1, userChoice, opponentChoice, gameState } =
    useContext(GameContext);

  return (
    <div>
      <h3>
        Score : {gameState.inning1Score + " / " + gameState.inning1Wickets}
      </h3>
      <h3>
        Overs :{" "}
        {Math.floor(gameState.inning1Balls / 6) +
          "." +
          (gameState.inning1Balls % 6)}
      </h3>
      <div>
        {gameState.isUserBatFirst === "yes" ? "Hit the Ball" : "Bowl the Ball"}
      </div>
      {gameState.phase === "INNING1" && (
        <div>
          {gameState.isUserBatFirst === "yes" && (
            <button onClick={() => handleInning1(0)}>0</button>
          )}
          <button onClick={() => handleInning1(1)}>1</button>
          <button onClick={() => handleInning1(2)}>2</button>
          <button onClick={() => handleInning1(3)}>3</button>
          <button onClick={() => handleInning1(4)}>4</button>
          <button onClick={() => handleInning1(5)}>5</button>
          <button onClick={() => handleInning1(6)}>6</button>
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
  );
};

export default Inning1Phase;
