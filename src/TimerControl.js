import React from 'react'

const TimerControl = (props) => {
    return (
        <div className="length-control">
            <div id={props.titleID}>
                {props.title}
            </div>
            <button 
                id={props.minID} 
                className="btn-level" 
                value="" 
                onClick={props.onClick}
            >
                <i/>
            </button>

            <div></div>
            <button></button>
        </div>
    )
}

export default TimerControl;