import React, { useState, useRef } from "react";
// import MusicCard from './musicBar';
import '../../styles/video.css'


export default function VideoPlayer({ src, poster }) {
    const videoRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(true);


    const handleClick = () => {
        setOpen(true)
        setShow(false)
    }

    // useEffect(() => {
    //     const video = videoRef.current;
    //     if (!video) return;
    //     const muxPlayerInitTime = Date.now();
    //     mux.monitor(video, {
    //         debug: true,
    //         data: {
    //             env_key: "ENV_KEY", // required

    //             // Metadata
    //             player_name: "Custom Player",
    //             player_init_time: muxPlayerInitTime,
    //             video_cdn: "cdn-1"

    //             // ... and other metadata
    //         }
    //     });
    // }, [src, videoRef]);

    return (


        <>
            {show &&
                <video className="card" controls ref={videoRef} poster={poster} src={src} onClick={handleClick} />
            }

            {/* {open &&
                <MusicCard src={src}></MusicCard>
            } */}
        </>
    );
}



