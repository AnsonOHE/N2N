import './App.css';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';

function App() {
    const spades= ['@', '#', '^', '*']

    const [cards, setCards] = useState([])
    const [player, setPlayer] = useState(0)
    const [isDisable, setIsDisable] = useState(false)
    const [playerCards, setPlayerCards] = useState([])
    const [display, setDisplay] = useState(false)
    const [winner, setWinner] = useState(0)
    
    function checkPlayer () {
        if (player === 0 || player === null) {
            alert('The number of player is invalid or empty')
        } else if (player === 1) {
            alert('The number of player must be more than 1')
        } else if (player > 4) {
            alert('The maximum number of player is only 4')
        } else {
            setIsDisable(true)
            alert('Let\'s start the game')
            for (var i = 1; i <= 13; i++) {
                spades.map((spade) => {
                    switch (i) {
                        case 1:
                            cards.push('A'+spade)
                            break;
                        case 11:
                            cards.push('J'+spade)
                            break;
                        case 12:
                            cards.push('Q'+spade)
                            break;
                        case 13:
                            cards.push('K'+spade)
                            break;
                        default:
                            cards.push(i+spade)
                            break;
                    }
                });
            }
            setDisplay(false)
        }
    }
    
    function shuffleCard () {
        setDisplay(false)
        setPlayerCards([])
        setCards(cards.sort(() => Math.random() - 0.5))
        let players = []
        for (let index = 0; index < player; index++) {
            let playerCard = []
            cards.forEach((card, i) => {
                if (i%player === index) {
                    playerCard.push(card)
                }
            });
            players.push(playerCard)
        }
        setDisplay(true)
        setPlayerCards(players)

        var largest = 0
        var max = 1

        players.forEach((player, index) => {
            var count = 0
            player.find(card => {
                if ('A' === card[0]) {
                    count++
                }

                if ('A*' === card) {
                    largest = index
                }
            })

            if (count > max) {
                max = count
                setWinner(index+1)
            } else if (count === max) {
                if (index === largest) {
                    setWinner(index+1)
                } else {
                    setWinner(largest+1)
                }
            }
        })
    }

    function resetPlayer () {
        setIsDisable(false)
        setCards([])
        setPlayer('')
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>Question 2</div>
                {!isDisable&&<div>
                    <p>Enter the number of player</p>
                    <input type={'number'} step={1} min={1} max={4} onChange={(e) => setPlayer(e.target.value)} disabled={isDisable} />
                    <button type={'button'} onClick={() => checkPlayer()} disabled={isDisable}>Submit</button>
                </div>}
                {isDisable && (<div>
                    <div>The total number of player is: {player}</div>
                    <div>
                        <button type={'button'} onClick={() => { shuffleCard() }}>Give new card</button>
                        <button type={'button'} onClick={() => { resetPlayer() }}>Reset player</button>
                    </div>
                    {display && <>
                        <br />
                        <table>
                            <tbody>{playerCards && playerCards.map((playerCard, index) => {
                                        return <tr key={index}>
                                                {playerCard.length>0?
                                                <><td>Player {index+1}</td><td>:</td><td>{playerCard.map((card, index) => {
                                                    return index===(playerCard.length-1)?card:card+', '
                                                })}</td></>:<><td>Player {index+1}</td><td>null</td></>}
                                            </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        <h1>Congratulations!</h1>
                        <h3>The winner is player #{ winner }!</h3>
                    </>}
                </div>)}
            </header>
        </div>
    );
}

export default App;
