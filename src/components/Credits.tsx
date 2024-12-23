import { useState } from "react";

const Credits: React.FC = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
    
      const toggleOpen = () => {
        setIsOpen(prevState => !prevState);
      };
    return (
        <div className={`absolute top-4 right-32 md:left-[520px] md:right-0 ${isOpen ? 'z-50' : 'z-40'} mb-12`}>
            <button
                onClick={toggleOpen}
                className="px-4 py-2 rounded shadow border-2 border-black hover:bg-gray-200 shadow shadow-black bg-white text-sm md:text-3xl font-semibold"
            >
                Credits
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
                        <p className="text-4xl">Persona 5 © ATLUS. © SEGA. All rights reserved.</p>
                        <br></br><br></br>
                        <p className="text-4xl">All character drawings and assets by ATLUS.</p>
                        <br></br><br></br>
                        <p className="text-4xl">Persona 5 font by <u><a href="https://fontspace.io/persona-5-font/">Fontspace.</a></u></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Credits;