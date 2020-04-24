import React from 'react';

const TimerControl = (props) => {
    return (
        <div className="length-control">
            <div id={props.titleID}>
                {props.title}
            </div>
            <button 
                id={props.minID} 
                className="btn-level" 
                value="-" 
                onClick={props.onClick}
            >
                <i className="fa fa-arrow-down fa-2x" />
            </button>

            <div id={props.lengthID} className="btn-level">
                {props.length}
            </div>

            <button
                id={props.addID} 
                className="btn-level" 
                value="+" 
                onClick={props.onClick}
            >
                <i className="fa fa-arrow-up fa-2x"/>
            </button>
        </div>
    )
}

export default TimerControl;