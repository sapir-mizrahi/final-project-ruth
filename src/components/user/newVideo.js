import React, { useState } from 'react'
import { click } from '@testing-library/user-event/dist/click';
import VideoThumbnail from 'react-video-thumbnail'; // use npm published version
import video from '../../video/video.mp4';
import VideoPortal from './videos';
import { Button } from '@mui/material';
import ReactPlayer from 'react-player/lazy'
const Video = () => {
    const handleclick=()=>{
    }
    return (
        <div >
            <ReactPlayer url={video} />

</div>
)}
export default Video;