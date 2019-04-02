import React from 'react';

const NOT_A_DATE = '- : -';

class Goals extends React.Component {

    constructor(props) {
        super(props);
        console.log("Goal props", props);
        this.state = {
            time: 0,
            isOn: false
        }

        this.timer = setInterval(() => this.setState({
            time: this.props.startGame ? Date.now() - new Date(this.props.startGame) : NOT_A_DATE
        }), 1);
    }

    render() {
        const minutes = new Date(this.state.time).getMinutes();
        const seconds = new Date(this.state.time).getSeconds();
        return (
            <div className="goals">
                <div style={{ color: 'red' }}>{this.props.goals.filter(item => item.side === 'RED').length}</div>
                <div className="timer" style={{ color: 'white' }}>{
                    

                    this.state.time === NOT_A_DATE ?
                        NOT_A_DATE :
                        `${minutes > 10 ? minutes : '0'+minutes} : ${seconds > 10 ? seconds : '0'+seconds}` 
                }</div>
                <div style={{ color: 'white' }}>{this.props.goals.filter(item => item.side === 'BLACK').length}</div>
            </div>
        );
    }
};

export default Goals;