import React, { Component } from 'react';
import * as axios from 'axios';
import config from '../config/config';
import './Leaderboard.css';

class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersStats: null
        };
    }

    async componentDidMount() {
        const { data: leaderboardData } = await axios({
            method: 'get',
            url: config.api_url + '/leaderboard'
        });

        if (leaderboardData.usersStats) {
          const usersStats = leaderboardData.usersStats.sort((prevStat, nextStat) => nextStat.rating - prevStat.rating);
          this.setState({ usersStats });
        }

    }

    render() {
        const { usersStats } = this.state;
        // interface UserStats {
        //   userId: number;
        //   avatar: string;
        //   fullname: string;
        //   rating: number;
        //   gamesCount: number;
        //   winsInAttack: number;
        //   winsInDefense: number;
        // }

        return (
            <div className="leaderboard">
                {usersStats ? (
                    <table className={'Table'} cellpadding="5">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Rating</th>
                            <th>Games</th>
                            <th>Wins</th>
                            <th>Winrate</th>
                            <th>Winrate(A)</th>
                            <th>Winrate(D)</th>
                          </tr>
                        </thead>
                        <tbody>
                            {usersStats.map((field, index) => {
                                const totalWinrate = field.winGamesCount / (field.gamesCount - field.winGamesCount);
                                return (
                                    <>
                                      <tr>
                                        <td style={{ textAlign: 'left' }} key={field.userId + index}>{field.fullname}</td>
                                        <td key={field.userId + index}>{field.rating}</td>
                                        <td key={field.userId + index}>{field.gamesCount}</td>
                                        <td key={field.userId + index}>{field.winGamesCount}</td>
                                        <td key={field.userId + index}>{totalWinrate.toFixed(2)}</td>
                                        <td key={field.userId + index}>{field.winrateAttack}</td>
                                        <td key={field.userId + index}>{field.winrateDefense}</td>
                                      </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                ) : null}
            </div>
        );
    }
}

export default Leaderboard;
