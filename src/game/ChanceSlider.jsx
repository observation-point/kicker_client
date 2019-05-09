import React from 'react';
import './ChanceSlider.css';

const round = (value, fixed = 3) => +(Math.round(`${value}e+${fixed}`) + `e-${fixed}`);

// const userWinAbsoluteProbability = (winCount, lossCount) => round(winCount / (winCount + lossCount));

// const teamWinAbsoluteProbability = (first, second) => round(
//   (userWinAbsoluteProbability(first.w, first.l) + userWinAbsoluteProbability(second.w, second.l)) / 2
// );

// { team: [], distribution: number; }
const getBayes = (first, second) => {
    // const teamFirstP = teamWinAbsoluteProbability(first.team[0], first.team[1]);
    // const teamSecondP = teamWinAbsoluteProbability(second.team[0], second.team[1]);
    const teamFirstP = first.winrate;
    const teamSecondP = second.winrate;

    const coeff =
        first.distribution * teamFirstP + second.distribution * teamSecondP;

    return {
        first: round((first.distribution * teamFirstP) / coeff),
        second: round((second.distribution * teamSecondP) / coeff)
    };
};

class ChanceSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redTeamChance: 50,
            blackTeamChance: 50
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            const { redWinrate, blackWinrate, goals } = nextProps;

            const redTeamGoals = goals.filter(item => item.team === 'RED').length;
            const blackTeamGoals = goals.filter(item => item.team === 'BLACK').length;

            const underdogDistribution =
                redTeamGoals !== blackTeamGoals
                    ? redTeamGoals < blackTeamGoals
                        ? (redTeamGoals === 0
                              ? 0.5
                              : redTeamGoals) / ( redTeamGoals === 0 && blackTeamGoals === 1 ? 1.5 : blackTeamGoals)
                        : (blackTeamGoals === 0
                              ? 0.5
                              : blackTeamGoals) / ( blackTeamGoals === 0 && redTeamGoals === 1 ? 1.5 : redTeamGoals)
                    : 0.5;

            const redDistribution =
                redTeamGoals === blackTeamGoals
                    ? 0.5
                    : redTeamGoals < blackTeamGoals
                    ? underdogDistribution
                    : 1 - underdogDistribution;

            const blackDistribution =
                redTeamGoals === blackTeamGoals
                    ? 0.5
                    : redTeamGoals > blackTeamGoals
                    ? underdogDistribution
                    : 1 - underdogDistribution;

            const { first, second } = getBayes(
                { winrate: redWinrate || 1, distribution: redDistribution },
                { winrate: blackWinrate || 1, distribution: blackDistribution }
            );

            this.setState({ redTeamChance: (first * 100).toFixed(0), blackTeamChance: (second * 100).toFixed(0) });
        }
    }

    render() {
        const { redTeamChance, blackTeamChance } = this.state;

        return (
            <div className="chance_slider">
                <div className="chance_red">{redTeamChance}</div>
                <div className="chance_black">{blackTeamChance}</div>
                <div
                    className="chance_circle"
                    style={{ left: redTeamChance + '%' }}
                />
                <div className="chance_line" />
            </div>
        );
    }
}

export default ChanceSlider;
