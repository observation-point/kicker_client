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
        //   fullname: string;
        //   rating: number;
        //   gamesCount: number;
        //   winsInAttack: number;
        //   winsInDefense: number;
        // }

        return (
            <div className="leaderboard">
                {usersStats ? (
                    <table className={'Table'}>
                        <thead>
                          <tr>
                            {Object.keys(usersStats[0]).map((field, index) => (
                                <th key={index}>{field}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                            {usersStats.map((field, index) => {
                                return (
                                    <>
                                      <tr>
                                        <td key={index}>{field.fullname}</td>
                                        <td key={index}>{field.rating}</td>
                                        <td key={index}>{field.gamesCount}</td>
                                        <td key={index}>{field.winsInAttack}</td>
                                        <td key={index}>{field.winsInDefense}</td>
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
