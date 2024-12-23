import { useState } from "react";

const Rules: React.FC = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
    
      const toggleOpen = () => {
        setIsOpen(prevState => !prevState);
      };
    return (
        <div className={`${isOpen ? 'z-50' : 'z-40'}`}>
            <button
                onClick={toggleOpen}
                className="px-4 py-2 rounded shadow border-2 border-black hover:bg-gray-200 shadow shadow-black bg-white text-sm md:text-3xl font-semibold"
            >
                How to Play
            </button>
            {isOpen && (
                <div className="fixed top-0 left-0 h-full w-full md:w-1/2 bg-gradient-to-b from-orange-500 to-yellow-500 md:border-r-2 border-black shadow-2xl shadow-black z-50">
                    <div className="border-b-2 border-black shadow shadow-black p-4">
                        <button 
                            onClick={toggleOpen} 
                            className="text-sm md:text-3xl font-semibold px-4 py-2 shadow shadow-black border-black border-2 hover:bg-gray-200 bg-white h-12"
                            >
                            Close
                        </button>
                    </div>
                    <div className="p-5 h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <h2 className="text-4xl mb-3"><b><u>Objective</u></b></h2>
                        <p className="mb-8 text-3xl">
                            The goal of Tycoon is simply to run out of the cards in your hand. The earlier
                            you run out of cards, the more points you get for the round. The player with the most 
                            points after 3 rounds is the winner.
                        </p>
                        <h2 className="text-4xl mb-3"><b><u>How to Play Cards</u></b></h2>
                        <p className="mb-8 text-3xl">
                            You can only play cards on your turn. If there are no active cards, or you have reset the turn, 
                            you can freely play up to 4 cards. If multiple cards are played, 
                            they must be the same value (ex: 2 Queens, 3 Aces, 4 Fives, etc.). 
                            <br></br><br></br>
                            If there are active cards, and you are following up another player's cards,
                            you must play cards of a higher value. Additionally, you must play the exact same
                            number of cards that they played.
                        </p>
                        <h2 className="text-4xl mb-3"><b><u>Specific Card Rules</u></b></h2>
                        <p className="mb-8 text-3xl">
                            <b>Joker: </b>The Joker is the highest value card in the game. It also
                            acts as a wildcard that can replicate another card being played. For example,
                            a Queen and a Joker played simply acts as 2 Queens.
                            <br></br><br></br>
                            <b>Two: </b>The Two cards are the second highest value card in the game behind Jokers.
                            <br></br><br></br>
                            <b>Eight: </b>The Eight cards act as an instant turn reset. This means that the current
                            active cards are reset, and the player that played the Eight(s) can play instantly play whatever they want.
                            <br></br><br></br>
                            <b>Three of Spades: </b>This specific card is the only one that can beat a Joker.
                            When played to beat a Joker, the turn is instantly reset to the player that played the 
                            Three of Spades, similar to playing an Eight.
                        </p>
                        <h2 className="text-4xl mb-3"><b><u>Events</u></b></h2>
                        <p className="mb-8 text-3xl">
                            <b>Turn Reset: </b>If the every other player passes their turn, or a special
                            card like an Eight is played, the turn is reset to the person that played the
                            last card. In this case, the player that reset the turn can play whatever they
                            want. 
                            <br></br><br></br>
                            <b>Revolution: </b>If a player plays 4 cards, a revolution begins.
                            From this point forward, the values of cards are reversed, meaning that Twos
                            are the lowest and Threes are the highest. Jokers remain the highest value card.
                            This effect remains until the next round starts or another revolution is caused, in
                            which case the game is back to normal.
                            <br></br><br></br>
                            <b>Trade: </b>Between each round, players are required to trade cards to other
                            players. The Tycoon and the Beggar must trade 2 cards to each other, and the Rich
                            and the Poor must trade 1 card to each other. The Tycoon and the Rich can trade whatever
                            cards they want, but the Poor and the Beggar must trade their highest value cards.
                        </p>
                        <h2 className="text-4xl mb-3"><b><u>Points and Standings</u></b></h2>
                        <p className="mb-8 text-3xl">
                            By the end of each round, each player will have a rank. The order of ranks 
                            from highest points to lowest goes as follows: Tycoon with 30 points, Rich with
                            20 points, Poor with 10 points, and Beggar with 0 points. These points are added
                            to the previous total for each player. At the end of 3 rounds, the final points 
                            are determined, and the player with the highest is the winner.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rules;