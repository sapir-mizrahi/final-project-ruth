import React, { useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../Redux/action'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { MdPlayLesson } from 'react-icons/md';
import { FiSave } from 'react-icons/fi';
import './style.css';
import ReactPlayer from 'react-player';

function mapStateToProps(state) {
  return {
    arrLessons: state.lessonsReducer.arrLessons,
    arrStages: state.stagesReducer.arrStages
  }
}
const mapDispatchToProps = (dispatch) => ({
  setArrLessons: (lesson) => dispatch(actions.setArrLessons(lesson)),
  setArrStages: (stage) => dispatch(actions.setArrStages(stage)),
  resetArrLessons: () => dispatch(actions.resetArrLessons()),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Stage(props) {

  const { item, setArrLessons, arrLessons, setArrStages, arrStages, resetArrLessons,
    setDisabledAddStage } = props;
  const [show, setShow] = useState(false);
  const [nameVideo, setNameVideo] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [lessonSort, setLessonSort] = useState('');
  const [lessonURLVideo, setLessonURLVideo] = useState('');
  const [stageSort, setStageSort] = useState('');
  const [showSaveStageIcon, setShowSaveStageIcon] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveLesson = async () => {
    const newLesson = {
      name: lessonName,
      sort: lessonSort,
      URLVideo: lessonURLVideo
    }
    await setArrLessons(newLesson)
    setNameVideo('')
    handleClose()
  }
  const saveCurrentStage = async () => {
    const newStage = {
      name: `Stage number ${item}`,
      sort: stageSort,
      arrLessonsByStage: arrLessons
    }
    await setArrStages(newStage);
    setShowSaveStageIcon(false);
    resetArrLessons();
    setDisabledAddStage(false);
  }

  const handleFiles = async (files) => {
    setNameVideo(files[0].name)
    let url = URL.createObjectURL(files[0]);
    local_image(url)
  }
  const local_image = async (url) => {
    let blob = await fetch(url).then(r => r.blob());
    var file = new File([blob], "thisVideo.mp4", { type: "video/mp4", lastModified: new Date().getTime() })
    setLessonURLVideo(file)
  }
  return (
    <div className='stages-container'>
      <div className='row'>
        <h3 className='col-11 title-number-stage'>Stage number {item}</h3>
        {showSaveStageIcon && <h3 className='col-1 save-stage' onClick={() => saveCurrentStage()}><FiSave /></h3>}

      </div>
      <div className='row'>
        <div className='col'>
          <Form.Control type="text" placeholder="Sort" onChange={(e) => setStageSort(e.target.value)} />
        </div>
        <div className='col'>
          <Button className='btn-add-lesson' onClick={handleShow}>ADD LESSON</Button>
        </div>
        <div className='col'>
          {arrStages.length - 1 == item && arrLessons.length > 0 && arrLessons.map((item, index) =>
            <div className='arr-lessons'>{<p className='icon-lesson'><MdPlayLesson /></p>}{item.name}</div>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className='title-inputs-lesson'>Lesson name</Form.Label>
          <Form.Control type="text" placeholder="name" onChange={(e) => setLessonName(e.target.value)} />
          <Form.Label className='title-inputs-lesson'>Sort</Form.Label>
          <Form.Control type="text" placeholder="Sort" onChange={(e) => setLessonSort(e.target.value)} />
          <Form.Label className='title-inputs-lesson'>Add video link</Form.Label>
          <Form.Control type="text" placeholder="video link" onChange={(e) => setLessonURLVideo(e.target.value)} className='input-form-global' />
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn-save-lesson' variant="primary" onClick={() => handleSaveLesson()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
})


