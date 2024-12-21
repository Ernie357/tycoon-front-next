import React, { useState } from 'react';
import { GameState } from '../../types/gameTypes';

interface Props {
    roomCode: string,
    host: string,
    userCount: number
}

const RoomInfo: React.FC<Props> = (props: Props) => {
  return (
    <div className='text-2xl border-b-2 border-black flex items-center p-4'>
        <p 
            key={props.roomCode} 
            className=''
        >
            <b>Host:</b> {props.host} &nbsp;&nbsp;|&nbsp;&nbsp; 
            <b>Room Code:</b> {props.roomCode} &nbsp;&nbsp;|&nbsp;&nbsp; 
            <b>Number of Players:</b> {props.userCount} / 4
        </p>
    </div>
  );
};

export default RoomInfo;