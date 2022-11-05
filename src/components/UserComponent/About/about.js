import React from 'react'
import './style.css'
import {TbMessageDots} from 'react-icons/tb';

export default function About(props) {

    return (
        <div className="about-container">
            <div className='div-line row'>
                <div className='col-5 div-line-icon'></div>
                <div className='col-2 div-icon-between'><TbMessageDots/></div>
                <div className='col-5 div-line-icon'></div>
            </div>
            <h2>About</h2>
            the truth?<br />

            Fitness is one of the pain points in life.<br />

            We know how important it is, we know how much it is consumed, we feel it on our bodies... but we barely manage to free up time, mind and brains and the ability to free up our tired evenings, to pamper the body a little more.<br />

            Tired of gym subscriptions that don't fill up, leaving the house in the heat or cold, in short, sports are not for us.<br />

            Precisely because of this, the interview with <p>Sagit Belson</p> gave me hope.<br />

            The model she offers is especially suitable for busy, busy and tired women (whoever isn't, get up!), the core of which is ten to twenty minutes of training every morning - only about an hour and a half of training for the whole week (!).<br />

            And that, she claims, is worth much more than two hour-long gym classes each, or a boring daily walk.<br />

            It gave me hope personally.<br />

            For an interview full of movement.<br />
        </div>

    )
}