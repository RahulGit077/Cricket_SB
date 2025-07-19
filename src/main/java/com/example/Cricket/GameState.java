package com.example.Cricket;

public class GameState {

    public int toss; // true if user won toss
    public int maxBalls = 12;
    public int maxWickets = 2;
    public int isUserBatFirst;
    public int inning1Score = 0;
    public int inning2Score = 0;
    public int inning1Wickets = 0;
    public int inning2Wickets = 0;
    public int inning1Balls = 0;
    public int inning2Balls = 0;
    public boolean isGameOver = false;
    public int isUserWon;
    public Phase phase = Phase.TOSS;

    public void reset() {
        toss = 0;
        maxBalls = 12;
        maxWickets = 2;
        isUserBatFirst = 0;
        inning1Score = inning2Score = inning1Wickets = inning2Wickets = 0;
        inning1Balls = inning2Balls = 0;
        isGameOver = false;
        isUserWon = 0;
        phase = Phase.TOSS;
    }
}
