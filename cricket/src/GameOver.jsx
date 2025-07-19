import React from "react";

const GameOver = ({ gameState }) => {
  return (
    <div>
      <h2>Game Over</h2>
      {gameState.isUserBatFirst ? (
        <div>
          <h3>Your Score: {gameState.inning1Score}</h3>
          <h3>Opponent Score: {gameState.inning2Score}</h3>
        </div>
      ) : (
        <div>
          <h3>Opponent Score: {gameState.inning1Score}</h3>
          <h3>Your Score: {gameState.inning2Score}</h3>
        </div>
      )}
      {gameState.isUserWon === 1 ? (
        <h3>Congratulations! You won the game!</h3>
      ) : gameState.isUserWon === 0 ? (
        <h3>It's a draw!</h3>
      ) : (
        <h3>Opponent won the game!</h3>
      )}
    </div>
  );
};

export default GameOver;
