import styles from './gobang.module.css'

function Square(props) {
    return (
        <button className={styles.square} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                {Array.from(Array(15), (v,k) =>k).map(item =>
                    <div key={item} className={styles.boardRow}>
                        {Array.from(Array(15), (v,k) =>k).map(index => this.renderSquare(item*15+index))}
                    </div>
                )}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className={styles.game}>
                <div>
                    <Board
                    squares={current.squares}
                    onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className={styles.gameInfo}>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

export default function gobang() {
    return (
        <Game />
    )
}

//可以赢的方式
let canWin = [];

//横线赢的方式
for(let i = 0; i<15;i++){
        //横线有十一种不重复的五个点，下面同理
    for(let j = 0;j<11; j++){
        //连成五个子
        canWin.push([i*15+j, i*15+j+1, i*15+j+2, i*15+j+3, i*15+j+4]);
    }
}
//竖线赢的方式
for(let i = 0; i<11;i++){
    for(let j = 0;j<15; j++){
        //连成五个子
        canWin.push([i*15+j, (i+1)*15+j, (i+2)*15+j, (i+3)*15+j, (i+4)*15+j]);
    }
}
//正斜线赢的方式
for(let i = 0; i<11;i++){
    for(let j = 0;j<11; j++){
        //连成五个子
        canWin.push([i*15+j, (i+1)*15+j+1, (i+2)*15+j+2, (i+3)*15+j+3, (i+4)*15+j+4]);
    }
}
//反斜线赢的方式
for(let i = 0; i<11;i++){
    for(let j = 14;j>3; j--){
        //连成五个子
        canWin.push([i*15+j, (i+1)*15+j-1, (i+2)*15+j-2, (i+3)*15+j-3, (i+4)*15+j-4]);
    }
}

function calculateWinner(squares) {
    for (let i = 0; i < canWin.length; i++) {
        const [a, b, c, d, e] = canWin[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            return squares[a];
        }
    }
    return null;
}
