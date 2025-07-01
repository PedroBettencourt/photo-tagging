import { useEffect, useState } from "react";
import { leaderboardClass } from "./Leaderboard.module.css";

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
            async function fetchData(){
                try {
                    const res = await fetch("http://localhost:3000/leaderboard")
                    const json = await res.json();
                    setLeaderboard(json);
                } catch (err) {
                    console.log(err);
                }
            };
    
            fetchData();
                
        }, []);

    return (
        <div className={leaderboardClass}>
            <h1>Leaderboard</h1>
            { !leaderboard && <h2>Loading...</h2>}
            { leaderboard && 
                <ol>
                    <li>
                        <span>Name</span>
                        <span>Score</span>
                    </li>
                    {leaderboard.map(score => (
                        <li key={score.id}>
                            <span>{score.name} </span>
                            <span>{score.score/1000} s</span>
                        </li>
                    ))}
                </ol>
            }
        </div>
    )
}

export default Leaderboard;