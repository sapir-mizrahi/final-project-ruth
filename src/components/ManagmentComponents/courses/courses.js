import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Stage from '../stages/stage'
import AddCategory from '../categories/category.js';
import './style.css'
import { connect } from 'react-redux';
import { actions } from '../../../Redux/action'
import Form from 'react-bootstrap/Form';
import { BsCalendar2Plus } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';
import { useHistory } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        allCategories: state.categoriesReducer.categories,
        currentCourseID: state.currentCourseReducer._id,
        arrStages: state.stagesReducer.arrStages
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(actions.getAllCategories()),
    createNewCourse: (course) => dispatch(actions.createNewCourse(course)),
    setCourseDetails: (course) => dispatch(actions.setCourseDetails(course)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Courses(props) {
    const { getAllCategories, allCategories, createNewCourse, arrStages, setCourseDetails, currentCourseID } = props;
    const [amountStages, setAmountStages] = useState([1]);
    const [iStage, setIStage] = useState(2);
    const [showAddStages, setShowAddStages] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [categoryCourse, setCategoryCourse] = useState('');
    const [disabledAddStage, setDisabledAddStage] = useState(true);
    const [showSavedCoursePage, setShowSavedCoursePage] = useState(false);

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleClickAddStage = () => {
        setIStage(iStage + 1);
        setAmountStages([...amountStages, iStage])
        setDisabledAddStage(true)
    }

    const handleClickSaveCourse = async () => {
        await createNewCourse({ name: courseName, description: courseDescription, categoryName: categoryCourse }).then(course => {
            setShowAddStages(true);
        })
    }

    const saveCourseDetails = async () => {
        await setCourseDetails({ arrStagesByCourse: arrStages, currentCourseID: currentCourseID });
        setShowSavedCoursePage(true)
    }

    const addNewCourse = () => {
        setShowSavedCoursePage(false)
    }
    const history = useHistory();
    const navigateToPages = (page) => {
        history.push(`/${page}`)
    }
    return (
        <div>
            <div className="buttons-for-navigat row">
                <div className="btn-nabigate-choosed col" onClick={() => navigateToPages('courses')}>Create new course</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('packages')}>Create new Packade</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('statistic')}>Statistic</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('requests-user')}>Reqests from users</div>
            </div>
            {!showSavedCoursePage ?
                <>
                    <div className="grid-board">
                        <div className="courses-container">
                            <div className='row courses-heder'><h1>Courses</h1></div>
                            <div className='row cours-name'>
                                <Form.Label className='title-inputs'>Course name</Form.Label>
                                <Form.Control className='global-input' onChange={(e) => setCourseName(e.target.value)} type="text" placeholder="Course name" />
                            </div>
                            <div className='row course-description'>
                                <Form.Label className='title-inputs'>Course description</Form.Label>
                                <Form.Control className='global-input' placeholder="Course description" as="textarea" rows={4} onChange={(e) => setCourseDescription(e.target.value)} />
                            </div>
                            <Form.Label className='title-inputs'>Category name</Form.Label>
                            <div className='row category-name'>
                                <div className='col choose-category'>
                                    <Form.Select className='global-input select-category' onChange={(e) => setCategoryCourse(e.target.value)} aria-label="Default select example">
                                        <option>Choose category</option>
                                        {allCategories?.categories && allCategories?.categories?.map(item => {
                                            return <option value={item.name}>{item.name}</option>
                                        })}
                                    </Form.Select>
                                </div>
                                <div className='col or-div'>Or</div>
                                <div className='col'>
                                    <p className='p-add-category'>Add category</p>
                                    <div className='add-button-div'>
                                        <AddCategory setCategoryCourse={setCategoryCourse} />
                                    </div>
                                </div>
                            </div>
                            <div className='row div-save-course' >
                                <Button className='btn-save-course' onClick={() => handleClickSaveCourse()}>Save and add stages</Button>
                            </div>
                            {showAddStages &&
                                <>
                                    <div className='row number-of-states'>
                                        <Form.Label className='title-inputs'>Stages</Form.Label>
                                        <Button disabled={disabledAddStage} variant="contained" className='btn-add-stage' onClick={() => handleClickAddStage()}><BsCalendar2Plus /> Add Stage</Button>
                                        {amountStages && amountStages.map((item, index) =>
                                            <Stage setDisabledAddStage={setDisabledAddStage} item={item}></Stage>
                                        )}
                                    </div>
                                    <div className='row'>
                                        <Button variant="contained" className='btn-save-course-and-stages' onClick={() => saveCourseDetails()}>Save Course</Button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
                : <div className='saved-course-message-container'>
                    <div className='message-saved-successfully'>The course {courseName} was successfully saved!</div>
                    <div className='icon-save'><BiSave /></div>
                    <Button variant="contained" className='btn-more-course' onClick={() => addNewCourse()}>Add new course</Button>
                </div>}
        </div>
    )
})