package com.example.Cricket;

import java.util.Random;
import java.util.List;
import java.util.ArrayList;

public class Inning2 {
    private final Random random = new Random();
    private void calcResult(GameState gameState){
        if(gameState.inning1Score==gameState.inning2Score){
            gameState.isUserWon=0;
            return;
        }
        if (gameState.isUserBatFirst==1) {
            gameState.isUserWon = gameState.inning1Score > gameState.inning2Score ? 1 : -1;
        } else {
            gameState.isUserWon = (gameState.inning1Score < gameState.inning2Score) ? 1 : -1;
        }
    }
    public List<String> bat(int choice, GameState gameState){
        gameState.inning2Balls++;
        List<String> result = new ArrayList<>();
        int bowl = random.nextInt(6)+1;
        result.add(bowl+"");
        if(choice==bowl){
            gameState.inning2Wickets++;
            result.add("Wicket!!");
        }
        else{
            gameState.inning2Score+=choice;
        }
        if(gameState.inning2Score>gameState.inning1Score){
            result.add("Target chased!!");
            calcResult(gameState);
            gameState.phase=Phase.GAME_OVER;
        }
        if(gameState.inning2Wickets>gameState.maxWickets){
            result.add("All out!!");
            calcResult(gameState);
            gameState.phase=Phase.GAME_OVER;
        }
        if(gameState.inning2Balls>gameState.maxBalls){
            result.add("Inning over!!");
            calcResult(gameState);
            gameState.phase=Phase.GAME_OVER;
        }
        return result;
    }
    public List<String> bowl(int choice, GameState gameState){
        gameState.inning2Balls++;
        List<String> result = new ArrayList<>();
        int bat = random.nextInt(7);
        result.add(bat+"");
        if(choice==bat){
            gameState.inning2Wickets++;
            result.add("Wicket!!");
        }
        else{
            gameState.inning2Score+=bat;
        }
        if(gameState.inning2Score>gameState.inning1Score){
            result.add("Target chased!!");
            calcResult(gameState);
            gameState.phase=Phase.GAME_OVER;
        }
        if(gameState.inning2Wickets>gameState.maxWickets){
            result.add("All out!!");
            calcResult(gameState);
            gameState.phase=Phase.GAME_OVER;
        }
        if(gameState.inning2Balls>gameState.maxBalls){
            result.add("Inning over!!");
            calcResult(gameState);
            gameState.phase=Phase.GAME_OVER;
        }
        return result;
    }
}
