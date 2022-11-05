import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { actions } from '../../../Redux/action';
import './style.css';
import { MdCategory } from 'react-icons/md';
import Alert from 'react-bootstrap/Alert';
import { GoAlert } from 'react-icons/go';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const mapDispatchToProps = (dispatch) => ({
    addCategory: (category) => dispatch(actions.addNewCategory(category)),
})

export default connect(null, mapDispatchToProps)(function AddCategory(props) {
    const { addCategory, setCategoryCourse } = props;
    const categoryName = useRef();
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleClose = () => {
        setShowAddCategory(false);
        setShowAlert(false)
    }

    const saveNewCategory = () => {
        if (categoryName.current.value !== '') {
            addCategory({ name: categoryName.current.value, courseId: '123456789' })
            handleClose()
            setShowAlert(false)
            setCategoryCourse(categoryName.current.value)
        }
        else {
            setShowAddCategory(true)
            setShowAlert(true)
        }
    };

    return (
        <div>
            <>
                <div className='add-button' aria-label="add" onClick={() => setShowAddCategory(true)}>
                    <AiOutlinePlusCircle />
                </div>
                <Modal show={showAddCategory} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <span className="icon-add-category"><MdCategory /></span>
                        <Modal.Title className="title-add-category">Add New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-input">
                        Category Name:
                        <input className="m-3" type="text" ref={categoryName} />
                        {showAlert && <Alert className='alert-empty-input' key="danger" variant="danger">
                            <GoAlert /> You must enter a category name!
                        </Alert>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn-save" onClick={() => saveNewCategory()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
})