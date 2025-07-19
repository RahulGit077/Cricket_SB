import React from "react";

const Inning1Phase = ({
  handleInning1,
  isUserBatFirst,
  inningBalls,
  inningScore,
  inningWickets,
  userChoice,
  opponentChoice,
  gameState,
}) => {
  return (
    <div>
      <h3>Score : {inningScore + " / " + inningWickets}</h3>
      <h3>Overs : {Math.floor(inningBalls / 6) + "." + (inningBalls % 6)}</h3>
      <div>{isUserBatFirst === "yes" ? "Hit the Ball" : "Bowl the Ball"}</div>
      {gameState.phase === "INNING1" && (
        <div>
          {isUserBatFirst === "yes" && (
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
