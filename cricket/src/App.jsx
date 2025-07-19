import { useEffect, useState } from "react";
import TossPhase from "./TossPhase";
import InningChoicePhase from "./InningChoicePhase";
import Inning1Phase from "./Inning1Phase";
import Inning2Phase from "./Inning2Phase";
import GameOver from "./GameOver";

const App = () => {
  const URL = "http://localhost:8080";
  const [gameState, setGameState] = useState(null);
  const [message, setMessage] = useState("");
  const [tossResult, setTossResult] = useState("");
  const [isUserBatFirst, setIsUserBatFirst] = useState("");
  const [inningScore, setInningScore] = useState(0);
  const [inningWickets, setInningWickets] = useState(0);
  const [inningBalls, setInningBalls] = useState(0);
  const [userChoice, setUserChoice] = useState("");
  const [opponentChoice, setOpponentChoice] = useState("");

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${URL}/status`);
      const data = await res.json();
      setGameState(data);
    } catch (error) {
      console.error("Error fetching game status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleToss = async (choice) => {
    try {
      const res = await fetch(`${URL}/toss?choice=${choice}`, {
        method: "POST",
      });
      const data = await res.json();
      setTossResult(data.tossResult ? "won" : "lost");
      if (!data.tossResult) {
        console.log(data.isUserBatFirst, isUserBatFirst, data.tossResult);
        setIsUserBatFirst(data.isUserBatFirst === "true" ? "yes" : "no");
      }
      console.log(data, isUserBatFirst);
      fetchStatus();
    } catch (error) {
      console.error("Error during toss:", error);
    }
  };

  const handleInningChoice = async (choice) => {
    try {
      const res = await fetch(`${URL}/inning-choice?choice=${choice}`, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      setIsUserBatFirst(data.isUserBatFirst ? "yes" : "no");
      setMessage(data.message);
    } catch (error) {
      console.error("Error during inning choice:", error);
    }
  };

  const startGame = async () => {
    console.log("Starting game...");
    try {
      const res = await fetch(`${URL}/start-game`, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      setMessage(data.message);
      fetchStatus(); // Refresh game state after starting the game
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const handleInning1 = async (runs) => {
    try {
      const res = await fetch(`${URL}/inning-1?runs=${runs}`, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      setMessage(data.message);
      fetchStatus(); // Refresh game state after inning 1
      setInningScore(data.runs);
      setInningWickets(data.wicket);
      setInningBalls(data.balls);
      setUserChoice(runs);
      setOpponentChoice(data.opponent);
      console.log(
        "inngingScore",
        inningScore,
        "inningWickets",
        inningWickets,
        "inningBalls",
        inningBalls
      );
    } catch (error) {
      console.error("Error during inning 1:", error);
    }
  };

  const startInning2 = async () => {
    try {
      const res = await fetch(`${URL}/start-inning-2`, {
        method: "POST",
      });
      fetchStatus(); // Refresh game state after starting inning 2
      setInningBalls(0);
      setInningScore(0);
      setInningWickets(0);
      setUserChoice("");
      setOpponentChoice("");
    } catch (error) {
      console.error("Error starting inning 2:", error);
    }
  };

  const handleInning2 = async (runs) => {
    try {
      const res = await fetch(`${URL}/inning-2?runs=${runs}`, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      setMessage(data.message);
      fetchStatus(); // Refresh game state after inning 2
      setInningScore(data.runs);
      setInningWickets(data.wicket);
      setInningBalls(data.balls);
      setUserChoice(runs);
      setOpponentChoice(data.opponent);
    } catch (error) {
      console.error("Error during inning 2:", error);
    }
  };

  const reset = async () => {
    try {
      const res = await fetch(`${URL}/reset`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error during reset:", error);
    }
    setGameState(null);
    setMessage("");
    setTossResult("");
    setIsUserBatFirst("");
    setInningScore(0);
    setInningWickets(0);
    setInningBalls(0);
    setUserChoice("");
    setOpponentChoice("");
    console.log("Game reset");
    fetchStatus(); // Refresh game state after reset
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>🏏 Cricket Game</h1>
      <h3>Current Phase: {gameState.phase}</h3>
      {(gameState.phase === "TOSS" || gameState.phase === "INNING_CHOICE") && (
        <TossPhase handleToss={handleToss} tossResult={tossResult} />
      )}
      {gameState.phase === "INNING_CHOICE" && (
        <InningChoicePhase
          handleInningChoice={handleInningChoice}
          isUserBatFirst={isUserBatFirst}
          // log={console.log(tossResult, isUserBatFirst)}
          startGame={startGame}
          tossResult={tossResult}
        />
      )}
      {(gameState.phase === "INNING1" || gameState.phase === "INNING_END") && (
        <Inning1Phase
          handleInning1={handleInning1}
          isUserBatFirst={isUserBatFirst}
          inningBalls={inningBalls}
          inningScore={inningScore}
          inningWickets={inningWickets}
          userChoice={userChoice}
          opponentChoice={opponentChoice}
          gameState={gameState}
        />
      )}
      {gameState.phase === "INNING_END" && (
        <div>
          <h2>Inning 1 Completed!</h2>
          <p>
            Final Score: {inningScore} / {inningWickets}
          </p>
          <p>Target Score: {inningScore + 1}</p>
          <button onClick={() => startInning2()}>Start Inning 2</button>
        </div>
      )}
      {(gameState.phase === "INNING2" || gameState.phase === "GAME_OVER") && (
        <Inning2Phase
          handleInning2={handleInning2}
          isUserBatFirst={isUserBatFirst}
          inningBalls={inningBalls}
          inningScore={inningScore}
          inningWickets={inningWickets}
          userChoice={userChoice}
          opponentChoice={opponentChoice}
          gameState={gameState}
        />
      )}
      {gameState.phase === "GAME_OVER" && <GameOver gameState={gameState} />}
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default App;
