package com.example.Cricket;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {
    private final GameState gameState = new GameState();
    private final TossHandler tossHandler = new TossHandler();
    private final InningChoiceHandler inningChoiceHandler = new InningChoiceHandler();
    private final Inning1 inning1 = new Inning1();
    private final Inning2 inning2 = new Inning2();
    @GetMapping("/status")
    public GameState getStatus(){
        return gameState;
    }

    @PostMapping("/toss")
    public Map<String, Object> toss(@RequestParam String choice){
        String msg = tossHandler.handleToss(choice,gameState);
        return Map.of(
                "message", msg,
                "tossResult", gameState.toss,
                "phase", gameState.phase,
                "isUserBatFirst", gameState.isUserBatFirst
        );
    }

    @PostMapping("/inning-choice")
    public Map<String, Object> chooseInning(@RequestParam String choice){
        String msg = inningChoiceHandler.handleInningChoice(choice,gameState);
        return Map.of(
                "message",msg,
                "isUserBatting", gameState.isUserBatFirst,
                "phase",gameState.phase
        );
    }
    @PostMapping("/start-game")
    public Map<String,Object> start(){
        gameState.phase=Phase.INNING1;
        return Map.of(
                "message", "Game Starts!..",
                "runs", gameState.inning1Score,
                "balls", gameState.inning1Balls,
                "wicket", gameState.inning1Wickets
        );
    }

    @PostMapping("/inning-1")
    public Map<String,Object> playInning1(@RequestParam String runs){
        int choice;
        try{
            choice=Integer.parseInt(runs);
        } catch (Exception e){
            return Map.of(
                    "error",e
            );
        }
        List<String> msg;
        if(gameState.isUserBatFirst==1)
            msg = inning1.bat(choice,gameState);
        else
            msg = inning1.bowl(choice,gameState);
        int opp=msg.get(0).charAt(0)-'0';
        return Map.of(
                "message", msg.toString(),
                "opponent", opp,
                "runs", gameState.inning1Score,
                "balls", gameState.inning1Balls,
                "wicket", gameState.inning1Wickets,
                "inningOver", gameState.phase==Phase.INNING_END
        );
    }
    @PostMapping("start-inning-2")
    public String startInning2(){
        gameState.phase=Phase.INNING2;
        return "Inning 2 starts!!";
    }

    @PostMapping("inning-2")
    public Map<String, Object> playInning2(@RequestParam String runs){
        int choice;
        try{
            choice = Integer.parseInt(runs);
        }
        catch (Exception e){
            return Map.of(
                    "message", e
            );
        }
        List<String> msg;
        if(gameState.isUserBatFirst==1)
            msg=inning2.bowl(choice,gameState);
        else
            msg=inning2.bat(choice,gameState);
        int opp=msg.get(0).charAt(0)-'0';
        return Map.of(
                "message", msg.toString(),
                "opponent", opp,
                "runs", gameState.inning2Score,
                "balls", gameState.inning2Balls,
                "wicket", gameState.inning2Wickets,
                "inningOver", gameState.phase==Phase.GAME_OVER
        );
    }

    @PostMapping("reset")
    public String reset(){
        gameState.reset();
        return "Game reset.";
    }
}
