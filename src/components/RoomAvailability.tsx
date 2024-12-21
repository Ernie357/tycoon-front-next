import React, { useState } from 'react';
import { GameState } from '../../types/gameTypes';
import axios from 'axios';
import { HiOutlineRefresh } from 'react-icons/hi';
import RoomInfo from './RoomInfo';


const AvailableRooms = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<GameState[]>([]);

  const toggleOpen = () => {
    if(!isOpen) {
      retrieveAndSetRooms();
    }
    setIsOpen(prevState => !prevState);
  };

  const refreshRooms = () => {
    retrieveAndSetRooms();
  };

  const retrieveAndSetRooms = async () => {
    const roomResponse: GameState[] = (await axios.get(`https://api.personatycoon.com/rooms`)).data;
    setRooms(roomResponse);
  };

  const roomElements = rooms.map((room: GameState) => {
    return (
      <RoomInfo 
        roomCode={room.roomCode}
        host={room.host}
        userCount={room.users.length}
      />
    );
  });

  return (
    <div className={`absolute top-4 left-4 ${isOpen ? 'z-50' : 'z-40'} mb-12`}>
      <button
        onClick={toggleOpen}
        className="px-4 py-2 rounded shadow border-2 border-black hover:bg-gray-200 shadow shadow-black bg-white text-sm md:text-xl font-semibold"
      >
        Show Available Rooms
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-full md:w-1/2 bg-gradient-to-b from-orange-500 to-yellow-500 md:border-r-2 border-black shadow-2xl shadow-black z-50">
          <div className="flex items-center gap-8 border-b-2 border-black shadow shadow-black p-4">
            <button 
              onClick={toggleOpen} 
              className="text-sm md:text-xl font-semibold px-4 py-2 shadow shadow-black border-black border-2 hover:bg-gray-200 bg-white h-12"
            >
              Close Available Rooms
            </button>
            <div className="flex">
              <button
                onClick={refreshRooms}
                className="h-12 text-2xl font-bold px-4 py-2 shadow shadow-black border-black border-2 hover:bg-gray-200 bg-white"
              >
                <HiOutlineRefresh />
              </button>
            </div>
          </div>
          <div className="mt-4 h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {roomElements}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableRooms;