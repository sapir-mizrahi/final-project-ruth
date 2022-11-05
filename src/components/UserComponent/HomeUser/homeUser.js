import React, { useEffect } from "react"
import Card from 'react-bootstrap/Card';
import './style.css'
import { MdSportsHandball } from 'react-icons/md'
import { GiFruitBowl } from 'react-icons/gi';
import { RiBasketballLine } from 'react-icons/ri';
import { actions } from '../../../Redux/action'
import { connect } from 'react-redux';
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function mapStateToProps(state) {
    return {
        packagesByUser: state.packagesByUserReducer.packagesByUser,
        courseDetails: state.coursesReducer.courseDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
    getCourseDetailsByCourseId: (courseId) => dispatch(actions.getCourseDetailsByCourseId(courseId)),
    setCurrentVideoLesson: (url) => dispatch(actions.setCurrentVideoLesson(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(function HomeUser(props) {
    const { packagesByUser, getCourseDetailsByCourseId,
        courseDetails, setCurrentVideoLesson } = props;
    const [showModalCourseDetails, setShowModalCourseDetails] = useState(false);
    const [currentCourseName, setCurrentCourseName] = useState('');
    const [filterCoursesForShow, setFilterCoursesForShow] = useState([]);
    const [filterCategoryForShow, setFilterCategoryForShow] = useState([]);
    const [allCoursesByCurrentUser, setAllCoursesByCurrentUser] = useState([]);

    const history = useHistory();
    const handleClose = () => setShowModalCourseDetails(false);
    const handleShow = () => setShowModalCourseDetails(true);
    let userDetails = JSON.parse(localStorage.getItem('user-info'));

    useEffect(async () => {
        await getAllCoursesByCurrentUser()
    }, []);
    const getAllCoursesByCurrentUser = async () => {
        let tempArrCategory = []
        let tempArrCourses = []
            await Array.isArray(packagesByUser.packages) && packagesByUser.packages.length && packagesByUser.packages?.map(async (itemPackage) => {
                await itemPackage?.packageForBuy?.arrCourses.map(async (course) => {
                    if (!(tempArrCategory.includes(course.categoryName))) tempArrCategory.push(course.categoryName)
                    tempArrCourses.push(course)
                })
            })
            await setFilterCoursesForShow(tempArrCourses)
            await setAllCoursesByCurrentUser(tempArrCourses)
            await setFilterCategoryForShow(tempArrCategory)
    }
    const getCourseDetails = (courseId, courseName) => {
        getCourseDetailsByCourseId(courseId)
        setCurrentCourseName(courseName)
        handleShow()
    }
    const handleClickShowLesson = (lessonURL) => {
        setCurrentVideoLesson(lessonURL)
        history.push(`/videolesson/${currentCourseName}`)
    }
    const filterByCategory = async (currentCategory) => {
        let arrHelp = [];
        arrHelp = allCoursesByCurrentUser.filter(x => x.categoryName === currentCategory)
        setFilterCoursesForShow(arrHelp)
    }
    const FilterByTyping = (value) => {
        let filtered_array = allCoursesByCurrentUser.filter(user => user.name.includes(value))
        setFilterCoursesForShow(filtered_array)
    }
    const resetFilters = () => {
        setFilterCoursesForShow(allCoursesByCurrentUser)
    }
    return (
        <div>
            <div className="header-wellcome">Wellcome {userDetails.firstName} {userDetails.lastName}</div>
            <div className="col-3 filter-div">
                <h4>Filter By Category</h4>
                <Form className="row">
                    {filterCategoryForShow?.map((item, index) =>
                        item !== '' && <div key={index} className="mb-3">
                            <Form.Check
                                label={item}
                                name="group1"
                                type='radio'
                                id={`check-api-'radio'-1`}
                                onClick={() => filterByCategory(item)}
                            />
                        </div>
                    )}
                </Form>
                <h4>Filter By Course name</h4>
                <input type="dark" placeholder="Search" onChange={(e) => FilterByTyping(e.target.value)} />
                <div> <Button variant="light" onClick={() => resetFilters()}>Reset Filters</Button></div>
            </div>
            <div className="all-courses-by-user col-9 row">
                {Array.isArray(filterCoursesForShow) && filterCoursesForShow.length ? filterCoursesForShow.map((itemCourse) =>
                    <>
                        <div className="div-card-item col-4">
                            <Card className="course-card-container" border="info">
                                <Card.Header className="card-header-course">{itemCourse.name}</Card.Header>
                                <div className="icon-sport">
                                    <span className="icon-red"><MdSportsHandball /></span>
                                    <span className="icon-blue"><GiFruitBowl /></span>
                                    <span className="icon-yellow"><RiBasketballLine /></span>
                                </div>
                                <Card.Body className="card-home-user ">
                                    <div className="row">
                                        <Card.Title style={{ color: '#20658d' }}>Category name:</Card.Title>
                                        <Card.Title style={{ color: '#20658d' }}>{itemCourse.categoryName}</Card.Title>
                                        <Card.Text>
                                            {itemCourse.description}
                                        </Card.Text>

                                    </div>
                                    <button className="button-show-cours" onClick={() => getCourseDetails(itemCourse._id, itemCourse.name)}>Show Course </button>

                                </Card.Body>
                            </Card>
                        </div>
                    </>

                ) :
                    <div className="no-package-to-show">
                        <BiError />
                        Opss...<br />
                        No package to show....<br />
                        do you want to buy?<br />
                        <Button className="btn-go-to-package" onClick={() => history.push('/')}>Go to package page {'->'}</Button>
                    </div>
                }
            </div>


            <Modal show={showModalCourseDetails} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{currentCourseName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Array.isArray(courseDetails?.courseDetails?.arrStagesByCourse) && courseDetails?.courseDetails?.arrStagesByCourse.map((itemStage) =>
                        <div className="course-details-modal">
                            <div className="item-stage-name-modal">{itemStage.name}:</div>
                            <div className="arr-lessons-by-stages-modal">
                                {Array.isArray(itemStage?.arrLessonsByStage) && itemStage?.arrLessonsByStage.map((itemLesson, indexLesson) =>
                                    <>
                                        <div className="number-of-lesson-modal">Lesson number {indexLesson + 1}:</div>
                                        <div className="item-lesson-name-modal"> {itemLesson.name}</div>
                                        <button className="item-lesson-btn-modal" onClick={() => handleClickShowLesson(itemLesson.URLVideo)}>Go to lesson video {'->'} </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ backgroundColor: 'black' }} onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

