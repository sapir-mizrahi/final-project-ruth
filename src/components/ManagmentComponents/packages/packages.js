import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { actions } from '../../../Redux/action'
import { connect } from 'react-redux';
import { MdSportsHandball, MdOutlineSportsBasketball } from 'react-icons/md'
import { GiFruitBowl } from 'react-icons/gi';
import Form from 'react-bootstrap/Form';
import './style.css';
import { HiPlusSm } from 'react-icons/hi';
import { IoIosRemove } from 'react-icons/io';
import { BiImageAdd } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';
import { BiSave } from 'react-icons/bi';

function mapStateToProps(state) {
    return {
        allCourses: state.coursesReducer.courses
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllCourses: () => dispatch(actions.getAllCourses()),
    createNewPackage: (newPackage) => dispatch(actions.createNewPackage(newPackage))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Packages(props) {
    const { getAllCourses, allCourses, createNewPackage } = props;
    const [packageName, setPackageName] = useState('');
    const [arrCartCourses, setArrCartCourses] = useState([]);
    const [arrCartCoursesIndex, setArrCartCoursesIndex] = useState([]);
    const [packagePrice, setPackagePrice] = useState(0);
    const [packageImg, setPackageImg] = useState('');
    const [packageDescription, setPackageDescription] = useState('');
    const [show, setShow] = useState(false);
    const history = useHistory();
    useEffect(() => {
        initGetAllCourses();
    }, []);

    const initGetAllCourses = async () => {

        await getAllCourses();
    }
    const addCourseToPackage = (index, itemCourse, kindOfBtn) => {
        if (kindOfBtn === 'add') {
            setArrCartCoursesIndex([...arrCartCoursesIndex, index]);
            setArrCartCourses([...arrCartCourses, itemCourse])
        }
        else {
            setArrCartCoursesIndex(arrCartCoursesIndex.filter(x => x !== index));
            setArrCartCourses(arrCartCourses.filter(x => x._id !== itemCourse._id));
        }
    }
    const onChangeHandlerImg = (event) => {
        const reader = new FileReader();
        const file = event;
        reader.onloadend = () => {
            setPackageImg(reader.result);
        };
        reader.readAsDataURL(file);
        var fileToUpload = event
        var myFile = new FormData();
        myFile.append("file", fileToUpload);
    }
    const savePackage = () => {
        const newPackage = {
            name: packageName,
            description: packageDescription,
            imgSrc: packageImg,
            price: packagePrice,
            arrCourses: arrCartCourses
        }
        createNewPackage(newPackage);
        setShow(true);
        function myGreeting() {
            setShow(false);
            history.push('/')
        }
    }
    const navigateToPages = (page) => {
        history.push(`/${page}`)
    }
    return (
        <>
            <div className="buttons-for-navigat row">
                <div className="btn-nabigate col" onClick={() => navigateToPages('courses')}>Create new course</div>
                <div className="btn-nabigate-choosed col" onClick={() => navigateToPages('packages')}>Create new Packade</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('statistic')}>Statistic</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('requests-user')}>Reqests from users</div>
            </div>
            <div className='packege-con'>
                <div className='title-create-package'>Create a New Package</div>
                <div className='row package-name'>
                    <Form.Label className='title-inputs-package-name'>Package name</Form.Label>
                    <Form.Control placeholder="Package name" className='input-form-global' onChange={(e) => setPackageName(e.target.value)} />
                </div>
                <div className='row package-description'>
                    <Form.Label className='title-inputs-package-description'>Package description</Form.Label>
                    <Form.Control placeholder="Package description" as="textarea" className='input-form-global' rows={4} onChange={(e) => setPackageDescription(e.target.value)} />
                </div>

                <div className='package-img row'>
                    <Form.Label className='title-inputs-package-img'>Upload image</Form.Label>
                    <form className='package-img-div row' noValidate autoComplete="off" style={{
                        display: 'flex'
                    }}>
                        <label className='lable-upload-img' for="profileImg">
                            <div className='icon-add-img'><BiImageAdd /></div>
                            {packageImg !== '' && <img className={packageImg !== '' ? "package-img-img" : ''} referrerpolicy="no-referrer" src={packageImg} />}
                        </label>
                        <input
                            type={"file"}
                            id="profileImg"
                            htmlFor="myInput"
                            accept="image/*"
                            style={{
                                display: 'none',
                                cursor: 'pointer'
                            }}
                            onChange={(e) => onChangeHandlerImg(e.target.files[0])}
                        /></form>
                </div>
                <div className='package-price row'>
                    <Form.Label className='title-inputs-package-price'>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price" onChange={(e) => setPackagePrice(e.target.value)} className='input-form-global' />
                </div>
                <div className='row container-card-package'>
                    {allCourses && allCourses.map((item, index) => {
                        return item.name !== '' &&
                            <Card key={index} className="course-card-container-package" border="info">
                                <Card.Header className="card-header-course-packeges">
                                    {item.name}
                                </Card.Header>
                                <div className='card-body'>
                                    <div className="icon-sport"><MdSportsHandball /> <GiFruitBowl /> <MdOutlineSportsBasketball /></div>
                                    <div className="card-home-user">
                                        <div className='title-card-package'>{item.categoryName}</div>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                    </div>
                                    <button
                                        className={`btn-${arrCartCoursesIndex.includes(index) ? 'remove' : 'add'}-course`}
                                        onClick={() => addCourseToPackage(index, item, arrCartCoursesIndex.includes(index) ? 'remove' : 'add')}>
                                        {arrCartCoursesIndex.includes(index) ? <><IoIosRemove /><span>Remove</span></> : <><HiPlusSm /><span>Add to Package</span></>}
                                    </button>
                                </div>
                            </Card>

                    })}
                </div>
                <div><Button className='btn-save-package' onClick={() => savePackage()}>Save package</Button></div>
            </div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
            >
                <Modal.Header className='modal-header-save' closeButton>
                    <BiSave />
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title className='modal-title-saved' id="contained-modal-title-vcenter">
                        The package has been saved successfully
                    </Modal.Title>
                </Modal.Body>

            </Modal>
        </>
    )
});
