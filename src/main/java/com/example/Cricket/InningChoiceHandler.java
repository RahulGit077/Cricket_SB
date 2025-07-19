package com.example.Cricket;

public class InningChoiceHandler {
    public String handleInningChoice(String choice, GameState gameState){
        if(gameState.phase!=Phase.INNING_CHOICE)
            return "Invalid state or toss not won.";
        if(gameState.toss==-1) return "";
        gameState.isUserBatFirst=choice.equalsIgnoreCase("Bat")?1:-1;
        return "You chose to "+choice+" first.";
    }
}
