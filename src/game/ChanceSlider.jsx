import React from 'react';
import './ChanceSlider.css';

const getChanceToWin = (first, second) => {
    const { first: firstDistribution, second: secondDistribution} = getDistribution(first.score, second.score);
    const bayes = getBayes(
        { winrate: first.winrate || 1, distribution: firstDistribution },
        { winrate: second.winrate || 1, distribution: secondDistribution }
    );
    return { first: (bayes.first * 100).toFixed(0), second: (bayes.second * 100).toFixed(0) };
};
  
const getBayes = (first, second) => {
    const teamFirstP = first.winrate;
    const teamSecondP = second.winrate;
    const coeff = first.distribution * teamFirstP + second.distribution * teamSecondP;
    return {
        first: round((first.distribution * teamFirstP) / coeff),
        second: round((second.distribution * teamSecondP) / coeff)
    };
};
  
const getDistribution = (firstScore, secondScore) => {
    const distribution = { first: 0.5, second: 0.5 };
    const delta = Math.abs(firstScore - secondScore);
    distribution.first += firstScore > secondScore ? delta * 0.05 : delta * -0.05;
    distribution.second += firstScore < secondScore ? delta * 0.05 : delta * -0.05;
    return distribution;
};
  
const round = (value, fixed = 3) => +(Math.round(`${value}e+${fixed}`) + `e-${fixed}`);  

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

            const { first: redTeamChance, second: blackTeamChance } = getChanceToWin(
                { winrate: redWinrate, score: redTeamGoals }, 
                { winrate: blackWinrate, score: blackTeamGoals }
            );
            
            this.setState({ redTeamChance, blackTeamChance });
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
