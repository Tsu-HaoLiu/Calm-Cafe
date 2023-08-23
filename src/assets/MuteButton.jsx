import React from 'react'

const MuteButton = (props) => {
    return (
        <svg fill={props.fill} className="hover:fill-white" viewBox="0 0 24 24" id="mute-2" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color" stroke="#000000" stroke-width="0.00024000000000000003">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"/>
            <g id="SVGRepo_iconCarrier">
            <path id="primary" d="M17.45,2.11a1,1,0,0,0-1,.08L9.84,7H6A2,2,0,0,0,4,9v6a2,2,0,0,0,2,2H9.84l6.57,4.81a1,1,0,0,0,1,.08A1,1,0,0,0,18,21V3A1,1,0,0,0,17.45,2.11Z" fill={props.fill} className="hover:fill-white"/>
            <path id="secondary" d="M21.8,4.78a1,1,0,0,0-1.39-.22l-18,13.26A1,1,0,0,0,3,19.63a.94.94,0,0,0,.59-.2l18-13.26A1,1,0,0,0,21.8,4.78Z" fill='#ff0000'/>
                </g>
        </svg>
    )
}

export default MuteButton
