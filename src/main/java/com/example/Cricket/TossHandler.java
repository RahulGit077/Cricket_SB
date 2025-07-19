package com.example.Cricket;

import java.util.Random;

public class TossHandler {
    private final Random random = new Random();

    public String handleToss(String choice, GameState gameState){
        String[] tossOption = { "Heads", "Tails" };
        String tossResult = tossOption[random.nextInt(2)];
        System.out.println(tossResult);
        gameState.toss = choice.equalsIgnoreCase(tossResult)?1:-1;
        gameState.phase=Phase.INNING_CHOICE;
        if(gameState.toss==1){
            return "You won the toss!";
        }
        else{
            gameState.isUserBatFirst=random.nextBoolean()?1:-1;
            return "Opponent won the toss. Opponent choose to "+(gameState.isUserBatFirst==1?"Bowl":"Bat")+" first.";
        }
    }
}
