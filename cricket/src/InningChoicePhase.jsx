import React, { useContext } from "react";
import { GameContext } from "./context/GameContext";

const InningChoicePhase = () => {
  const { handleInningChoice, gameState, startGame } = useContext(GameContext);

  return (
    <div className="inning-choice-phase">
      {gameState.toss === 1 ? (
        <div className="toss-result">
          <h2>You have won the toss!</h2>
          {!gameState.isUserBatFirst ? (
            <div>
              <p>Choose to bat or bowl:</p>
              <button onClick={() => handleInningChoice("Bat")}>Bat</button>
              <button onClick={() => handleInningChoice("Bowl")}>Bowl</button>
            </div>
          ) : (
            <div>
              You choose to {gameState.isUserBatFirst === 1 ? "bat " : "bowl "}
              first.
            </div>
          )}
        </div>
      ) : (
        gameState.toss === -1 && (
          <div>
            <h2>Opponent have won the toss!</h2>
            <p>
              Opponent choose to
              {gameState.isUserBatFirst === -1 ? " bat " : " bowl "} first.
            </p>
          </div>
        )
      )}
      {(gameState.isUserBatFirst === 1 || gameState.isUserBatFirst === -1) && (
        <div>
          <h2>Game Ready to Start!</h2>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
};

export default InningChoicePhase;
