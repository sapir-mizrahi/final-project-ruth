import React from 'react'
import './style.css'
import { MdOutlineTipsAndUpdates } from 'react-icons/md';

export default function Tips(props) {

    return (
        <div className="about-container">
            <div className='div-line row'>
                <div className='col-5 div-line-icon'></div>
                <div className='col-2 div-icon-between'><MdOutlineTipsAndUpdates /></div>
                <div className='col-5 div-line-icon'></div>
            </div>
            <h2>5 tips for proper fitness</h2>


            1. Physical examination<br />
            Before you sign up for the gym, go to your family doctor and do medical tests to make sure your health allows it.<br />
            <br />
            2. Training program<br />
            At the time of registration at the Afula gym, it is recommended to create an organized training program together with a physical fitness trainer.
            <br />
            <br />
            3. Building an effort bar<br />
            It is important to build an effort bar and train gradually, start with twice a week, do training at a level of difficulty that suits you and persevere over time. This is the only way you can improve your fitness level and gradually increase the number of training sessions.<br />
            <br />
            4. Proper nutrition<br />
            - It is important to follow a balanced diet and an organized training routine. Puts personal trainers at the service of his trainees who can give guidance and prevent situations of imbalance.<br />
            <br />
            5. Night is a good time to sleep<br />
            . It's all well and good when you train during the day, but if the training is postponed to the night, it may harm the quality of sleep and postpone it to later hours. Continuous sleep of six to eight
            hours a night is essential for our health, especially during training, and avoiding training at night will make it easier for you to maintain it.<br />


        </div>

    )
}