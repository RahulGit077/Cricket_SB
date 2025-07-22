import { createContext, useContext, useState, useEffect } from "react";

const URL = import.meta.env.VITE_URL || "http://localhost:8080";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null);
  const [message, setMessage] = useState("");
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

  const handleToss = async (choice) => {
    try {
      await fetch(`${URL}/toss?choice=${choice}`, { method: "POST" });
      fetchStatus();
    } catch (error) {
      console.error("Error during toss:", error);
    }
  };

  const handleInningChoice = async (choice) => {
    try {
      await fetch(`${URL}/inning-choice?choice=${choice}`, { method: "POST" });
      fetchStatus();
    } catch (error) {
      console.error("Error during inning choice:", error);
    }
  };

  const startGame = async () => {
    try {
      await fetch(`${URL}/start-game`, { method: "POST" });
      fetchStatus();
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
      setUserChoice(runs);
      setOpponentChoice(data.opponent);
      fetchStatus();
    } catch (error) {
      console.error("Error handling inning 1:", error);
    }
  };

  const startInning2 = async () => {
    try {
      await fetch(`${URL}/start-inning-2`, { method: "POST" });
      setUserChoice("");
      setOpponentChoice("");
      fetchStatus();
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
      setUserChoice(runs);
      setOpponentChoice(data.opponent);
      fetchStatus();
    } catch (error) {
      console.error("Error handling inning 2:", error);
    }
  };

  const reset = async () => {
    try {
      await fetch(`${URL}/reset`, { method: "POST" });
      setGameState(null);
      setMessage("");
      setUserChoice("");
      setOpponentChoice("");
      fetchStatus();
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        message,
        userChoice,
        opponentChoice,
        handleToss,
        fetchStatus,
        handleInningChoice,
        startGame,
        handleInning1,
        startInning2,
        handleInning2,
        reset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
