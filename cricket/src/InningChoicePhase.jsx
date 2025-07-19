import React from "react";

const InningChoicePhase = ({
  handleInningChoice,
  isUserBatFirst,
  startGame,
  tossResult,
}) => {
  // console.log("handleInning");
  return (
    <div>
      {/* {console.log(tossResult, isUserBatFirst)} */}
      {tossResult === "won" ? (
        <div>
          <h2>You have won the toss!</h2>
          {!isUserBatFirst ? (
            <div>
              <p>Choose to bat or bowl:</p>
              <button onClick={() => handleInningChoice("Bat")}>Bat</button>
              <button onClick={() => handleInningChoice("Bowl")}>Bowl</button>
            </div>
          ) : (
            <div>
              You choose to {isUserBatFirst === "yes" ? "bat" : "bowl"} first.
            </div>
          )}
        </div>
      ) : (
        tossResult === "lost" && (
          <div>
            <h2>Opponent have won the toss!</h2>
            <p>Opponent choose to {isUserBatFirst === "no" ? "bat" : "bowl"}</p>
          </div>
        )
      )}
      {isUserBatFirst && (
        <div>
          <h2>Game Ready to Start!</h2>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
};

export default InningChoicePhase;
