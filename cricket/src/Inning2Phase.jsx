import React from "react";

const Inning2Phase = ({
  handleInning2,
  inningBalls,
  inningScore,
  inningWickets,
  userChoice,
  opponentChoice,
  gameState,
}) => {
  return (
    <div>
      <h4>Target : {gameState.inning1Score + 1}</h4>
      <h3>Score : {inningScore + " / " + inningWickets}</h3>
      <h3>Overs : {Math.floor(inningBalls / 6) + "." + (inningBalls % 6)}</h3>
      <div>
        {!gameState.isUserBatFirst ? "Hit the Ball" : "Bowl the Ball"}
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
