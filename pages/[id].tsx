import { useEffect, useMemo, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import UserBox from "../src/components/UserBox";
import { GameState, CardType, User, Message } from "../types/gameTypes";
import getRelevantCard from "../helpers/gameHelpers/getRelevantCard";
import PlayController from "../src/components/PlayController";
import TradeController from "../src/components/TradeController";
import getTradeName from "../helpers/gameHelpers/getTradeName";
import ChatBox from "../src/components/ChatBox";
import EventLog from "../src/components/EventLog";
import DialogueBox from "../src/components/DialogueBox";
import Ad from "../src/components/Ad";
import { useRouter } from "next/router";


const Game: React.FC = () => {
    const router = useRouter();
    const { id, playerName, playerImage } = router.query;
    const defaultGameState: GameState = {
        activeCards: [],
        roundNumber: 0,
        users: [],
        turnPlayer: '',
        passCount: 0,
        activeUsers: [],
        revolution: false,
        betweenRounds: false,
        numTradesMade: 0,
        tycoonLost: false,
        gameIsActive: false,
        host: '',
        messages: [],
        roomCode: id && typeof(id) === 'string' ? id : '',
        isRoomPrivate: false
    };
    const [gameState, setGameState] = useState<GameState>(defaultGameState);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
    const gameStateRef = useRef(gameState);  
    const shouldShowAds = id && location.pathname === `/${id}`;

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    const startGame = () => {
        gameState.users.length === 4 && socket?.emit('start game', id);
    }
    const playCards = () => {
        if(selectedCards.length === 0) {
            return;
        }
        if(activeCards.length > 0 && selectedCards.length !== gameState.activeCards.length) {
            return;
        }
        if(selectedCards.length === 4) {
            console.log('revolution!');
            socket?.emit('revolution', id);
            socket?.emit('play cards', id, selectedCards, playerName);
            setSelectedCards([]);
            return;
        }
        const relevantSelectedCard = getRelevantCard(selectedCards);
        const relevantActiveCard = getRelevantCard(gameState.activeCards);
        if(relevantSelectedCard.faceValue === 'Joker' && relevantActiveCard.faceValue !== 'Joker') {
            socket?.emit('play cards', id, selectedCards, playerName);
            setSelectedCards([]);
            return; 
        }
        if(relevantSelectedCard.faceValue === '3' && relevantSelectedCard.suit === 'Spades' && relevantActiveCard.faceValue === 'Joker') {
            socket?.emit('play cards', id, selectedCards, playerName);
            socket?.emit('reset turn', id, playerName);
            setSelectedCards([]);
            return;
        }
        if(gameState.revolution && gameState.activeCards.length > 0 && +relevantSelectedCard.numberValue >= +relevantActiveCard.numberValue) {
            return;
        }
        if(!gameState.revolution && gameState.activeCards.length > 0 && +relevantSelectedCard.numberValue <= +relevantActiveCard.numberValue) {
            if(relevantActiveCard.faceValue !== '8') {
                return;
            }
        }
        socket?.emit('play cards', id, selectedCards, playerName);
        if(relevantSelectedCard.faceValue === '8') {
            socket?.emit('reset turn', id, playerName);
        } 
        setSelectedCards([]);
    }
    const passTurn = () => {
        socket?.emit('pass turn', id, playerName);
    }
    const tradeCards = (rank: string) => {
        socket?.emit('trade cards', id, playerName, getTradeName(rank, gameState.users), selectedCards);
        setSelectedCards([]);
    }

    useEffect(() => {
        if(gameState.passCount >= gameState.activeUsers.length - 1 && gameState.passCount !== 0 && playerName === gameState.host) {
            socket?.emit('reset turn', id, gameState.turnPlayer);
        }
    }, [gameState.passCount]);
    useEffect(() => {
        if(gameState.activeUsers.length === 1 && gameState.roundNumber < 4) {
            socket?.emit('between round start', id);
        }
    }, [gameState.activeUsers.length]);
    useEffect(() => {
        if(gameState.numTradesMade === 4 && gameState.roundNumber < 4) {
            socket?.emit('start new round', id);
        }
    }, [gameState.numTradesMade]);
    useEffect(() => {
        if(gameState.roundNumber === 4) {
            socket?.emit('end game', id);
        }
    }, [gameState.roundNumber]);
    useEffect(() => {
        const newSocket: Socket = io('https://api.personatycoon.com', { transports: ['websocket', 'polling', 'flashsocket'] });
        setSocket(newSocket);
        newSocket.on('connect', () => {
            const stringState = localStorage.getItem('gameState');
            const state: GameState = stringState ? JSON.parse(stringState) : null;
            if(state && state.roomCode && state.roomCode === id) {
                newSocket.emit('join', state, id, playerName, playerImage);
            } else {
                newSocket.emit('join', null, id, playerName, playerImage);
            }
            localStorage.removeItem('gameState');
        });
        newSocket.on('update game state', (newState: GameState) => {
            setGameState(newState);
        });
        newSocket.on('room join error', (reasonForError: string) => {
            alert(reasonForError);
            newSocket.emit('leave', id);
            router.push('/');
        });
        const handleCleanup = () => {
            if (gameStateRef.current) {
                localStorage.setItem('gameState', JSON.stringify(gameStateRef.current));
            }
            newSocket.emit('leave', id);
        };
        window.addEventListener('beforeunload', handleCleanup);
        return () => {
            window.removeEventListener('beforeunload', handleCleanup);
            handleCleanup();
        };
    }, [id, playerName, playerImage]);

    const user: User = useMemo(() => gameState.users.reduce((acc: any, cur: User) => {
        return cur.name === playerName ? cur : acc;
    }, null), [gameState.users]);

    const playerCards = gameState.betweenRounds ?                     
            <TradeController 
                user={user}
                tradeCards={tradeCards}
                selectedCards={selectedCards} 
                setSelectedCards={setSelectedCards} 
                turnPlayer={gameState.turnPlayer}
                betweenRounds={gameState.betweenRounds}
            />
            :
            <div>
                <PlayController 
                    user={user}
                    playCards={playCards}
                    passTurn={passTurn}
                    selectedCards={selectedCards} 
                    setSelectedCards={setSelectedCards} 
                    turnPlayer={gameState.turnPlayer}
                    betweenRounds={gameState.betweenRounds}
                />
            </div>;

    const userBoxes = gameState.users.map(user => <UserBox user={user} host={gameState.host} key={user.name} />);

    const activeCards = gameState.activeCards.map(card => {
        return <img src={`/images/${card.image}`} alt={`${card.faceValue} of ${card.suit}`} className="max-w-16 md:max-w-24" />
    });

    const cardsFromTrade = user ? user.cardsFromTrade.map(card => {
        return <img src={`/images/${card.image}`} alt={`${card.faceValue} of ${card.suit}`} className="max-w-16 md:max-w-24" />
    }) : <></>;

    const chatMessages = gameState.messages.filter((message: Message) => {
        return message.sender !== null;
    });

    console.log(gameState);

    return (
        <div className="bg-persona-red w-screen min-h-screen font-main">
            {shouldShowAds && <Ad />}
            <div className="bg-gradient-to-br from-transparent to-amber-500 flex-col flex 2xl:flex-row gap-6 sm:gap-12 justify-items-center p-6 xl:p-12 2xl:mb-12 border-b-2 border-black shadow 2xl:shadow-2xl 2xl:shadow-black shadow-black shadow-bottom">
                <div className="sm:flex justify-center items-center justify-items-center gap-6 sm:gap-12 grid grid-cols-2 grid-rows-2">
                    { userBoxes }
                </div>
                <div className="flex flex-grow">
                    <EventLog 
                        gameState={gameState}
                        startGame={startGame}
                        playerName={playerName ? playerName.toString() : ''}
                    />
                </div>
            </div>
            { gameState.gameIsActive && <div className="flex flex-col lg:flex-row align-center w-full lg:gap-16 mb-36 lg:mb-0 h-500">
                {user.cards.length > 0 && <div className="w-full lg:w-7/12 ml-0 lg:ml-12 bg-white border-2 shadow-2xl shadow-black border-black h-full ">
                    { playerCards }
                </div>}
                <div className="flex flex-col items-center pt-5 pb-5 h-full w-full lg:w-32-p border-2 border-black shadow-2xl shadow-black bg-white">
                    <h2 className="sm:text-2xl lg:text-4xl"><b>{`${gameState.betweenRounds ? 'Cards From Trade: ' : 'Active Cards: '}`}</b></h2>
                    <br></br>
                    <div className={`${activeCards.length > 3 ? 'flex lg:grid grid-cols-2 grid-rows-2 gap-5' : 'flex gap-5'}`}>
                        {gameState.betweenRounds ? cardsFromTrade : activeCards}
                    </div>
                </div>
            </div>}
            <div>
                <div className="flex h-full p-6 lg:p-12 flex-col lg:flex-row justify-center">
                    <div className="flex flex-col items-center w-full h-96 2xl:w-auto">
                        <ChatBox 
                            user={user} 
                            socket={socket} 
                            messages={chatMessages} 
                            roomCode={gameState.roomCode} 
                        />
                    </div>
                    <div className="w-full justify-center items-center hidden 2xl:flex">
                        { chatMessages.length > 0 && <DialogueBox message={chatMessages[chatMessages.length - 1]} /> }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;