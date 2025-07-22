import { useContext, useEffect } from "react";
import { GameContext } from "./context/GameContext";
import TossPhase from "./TossPhase";
import InningChoicePhase from "./InningChoicePhase";
import Inning1Phase from "./Inning1Phase";
import Inning2Phase from "./Inning2Phase";
import GameOver from "./GameOver";

const App = () => {
  const { gameState, startInning2, fetchStatus, reset } =
    useContext(GameContext);

  useEffect(() => {
    // Fetch initial game state or any setup needed)
    fetchStatus();
  }, []);

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>🏏 Cricket Game</h1>
      <h3>Current Phase: {gameState.phase}</h3>
      {gameState.phase === "TOSS" && <TossPhase />}
      {gameState.phase === "INNING_CHOICE" && <InningChoicePhase />}
      {gameState.phase === "INNING1" && <Inning1Phase />}
      {gameState.phase === "INNING_END" && (
        <div>
          <h2>Inning 1 Completed!</h2>
          <p>
            Final Score: {gameState.inning1Score} / {gameState.inning1Wickets}
          </p>
          <p>Target Score: {gameState.inning1Score + 1}</p>
          <button onClick={startInning2}>Start Inning 2</button>
        </div>
      )}
      {gameState.phase === "INNING2" && <Inning2Phase />}
      {gameState.phase === "GAME_OVER" && <GameOver />}
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default App;
