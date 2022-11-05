import React, { useState } from 'react'
import './style.css'
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { FaRegEye } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

function mapStateToProps(state) {
    return {
        currentVideoLesson: state.lessonsReducer.currentVideoLesson,
    }
}

export default connect(mapStateToProps, null)(function VideoLesson(props) {
    const { currentVideoLesson } = props;
    const { name } = useParams();
    const [watchedVideo, setWatchedVideo] = useState(false);

    return (
        <>
            <div className='title-video-name row'>
                {name}
            </div>
            <div className="video-lesson-container row">
                <ReactPlayer
                    className='react-player'
                    playing={true}
                    url={currentVideoLesson}
                    controls={true}
                    light={false}
                    volume={7}
                    pip
                />
            </div>
        
            <div className='div-watched row'>
                <Button className={watchedVideo ? 'div-watched-true ' : 'btn-watched'} onClick={() => setWatchedVideo(true)}>
                    {watchedVideo ? <>Well done !! < AiOutlineLike /></> : <>I watched the video < FaRegEye /></>}</Button>
            </div>
        </>
    )
})