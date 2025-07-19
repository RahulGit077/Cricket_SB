package com.example.Cricket;

import java.util.ArrayList;
import java.util.Random;
import java.util.List;

public class Inning1 {
    private final Random random = new Random();
    public List<String> bat(int choice,GameState gameState){
        int bowl = random.nextInt(6)+1;
        List<String> result = new ArrayList<>();
        result.add(bowl+"");
        gameState.inning1Balls++;
        if(choice==bowl){
            gameState.inning1Wickets++;
            result.add("wicket");
        }
        else {
            gameState.inning1Score += choice;
            result.add(choice+" runs");

        }
        if(gameState.inning1Wickets>=gameState.maxWickets){
            result.add(" All out!!");
            gameState.phase = Phase.INNING_END;
        }
        if(gameState.inning1Balls>=gameState.maxBalls) {
            result.add(" Inning over!!\n");
            gameState.phase=Phase.INNING_END;
        }
        return result;
    }
    public List<String> bowl(int choice, GameState gameState){
        int bat = random.nextInt(6)+1;
        gameState.inning1Balls++;
        List<String> result = new ArrayList<>();
        result.add(bat+"");
        if(choice==bat){
            gameState.inning1Wickets++;
            result.add("wicket");
        }
        else {
            gameState.inning1Score += bat;
//            result.append(bat);
            result.add(bat+" runs");
        }
        if(gameState.inning1Wickets>=gameState.maxWickets){
            result.add("All out!!");
            gameState.phase = Phase.INNING_END;
        }
        if(gameState.inning1Balls>=gameState.maxBalls) {
            result.add("Inning over!!");
            gameState.phase=Phase.INNING_END;
        }
        return result;
    }
}
