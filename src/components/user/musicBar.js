import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import video from '../../video/video.mp4';


const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

function MusicCard(props) {
  const { classes, theme } = props;

  return (
    // <Card className={classes.card}>
    //   <div className={classes.details}>
    //     <CardContent className={classes.content}>
    //       <Typography component="h5" variant="h5">
    //         {props.data.title}
    //       </Typography>
    //       <Typography variant="subtitle1" color="textSecondary">
    //         {props.data.artist}
    //       </Typography>
          <iframe
            id="video"
            width="230"
            heigh="154"
            src={video
                //  + props.data.videoId
                }
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
    //     </CardContent>
    //     <div className={classes.controls}>
    //       <IconButton aria-label="Previous" onClick={() => props.next("prev")}>
    //         {theme.direction === "rtl" ? (
    //           <SkipNextIcon />
    //         ) : (
    //           <SkipPreviousIcon />
    //         )}
    //       </IconButton>
    //       <IconButton aria-label="Play/pause">
    //         <PlayArrowIcon
    //           className={classes.playIcon}
    //           onClick={() => props.play()}
    //         />
    //       </IconButton>
    //       <IconButton aria-label="Next" onClick={() => props.next("next")}>
    //         {theme.direction === "rtl" ? (
    //           <SkipPreviousIcon />
    //         ) : (
    //           <SkipNextIcon />
    //         )}
    //       </IconButton>
    //     </div>
    //   </div>
    //   <CardMedia
    //     className={classes.cover}
    //     image="/static/images/cards/live-from-space.jpg"
    //     title="Live from space album cover"
    //   />
    // </Card>
  );
}

MusicCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MusicCard);
