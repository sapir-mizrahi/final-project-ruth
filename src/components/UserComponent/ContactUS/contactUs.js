import React, { useState } from 'react'
import './style.css'
import { MdContactMail } from 'react-icons/md';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { actions } from '../../../Redux/action'
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => ({
    createNewRequest: (req) => dispatch(actions.createNewRequest(req)),
})

export default connect(null, mapDispatchToProps)(function ContactUS(props) {
    const { createNewRequest } = props;

    const [firstAndLastName, setFirstAndLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [note, setNote] = useState('');
    const [showAlertSend, setShowAlertSend] = useState(false);

    const saveContact = () => {
        const newRequest = {
            firstAndLastName: firstAndLastName,
            email: email,
            phoneNumber: phoneNumber,
            note: note
        }
        createNewRequest(newRequest).then(() => {
            setShowAlertSend(true)
        });
    }
    return (
        <div className="contact-us-container">

            <div className='div-line-contact row'>
                <div className='col-5 div-line-icon-contact'></div>
                <div className='col-2 div-icon-between-contact'><MdContactMail /></div>
                <div className='col-5 div-line-icon-contact'></div>
            </div>
            <h2>Contact Us</h2>
            {showAlertSend ? <div>
                <div>Your request has been sent successfully!</div>
                <Button className='btn-save-comment' onClick={() => setShowAlertSend(false)}>Add new request</Button>
            </div> :
                <>
                    <h4>Write to us here ...</h4>
                    <br />
                    <br />
                    <div className='row form-contact'>

                        <div className='col-5'>
                            <div className='row'>
                                <Form.Label className='title-inputs-user-name'>First and Last name: </Form.Label>
                                <Form.Control placeholder="First and Last name" className='input-form-global-user' onChange={(e) => setFirstAndLastName(e.target.value)} />
                            </div>
                            <div className='row'>
                                <Form.Label className='title-inputs-user-name'>Email address :</Form.Label>
                                <Form.Control className='input-form-global-user' type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='row'>
                                <Form.Label className='title-inputs-user-name'>Phone number :</Form.Label>
                                <Form.Control placeholder="Phone number" className='input-form-global-user' onChange={(e) => setPhoneNumber(e.target.value)} />

                            </div>
                            <div className='row'>
                                <Form.Label className='title-inputs-user-name'>Description :</Form.Label>
                                <Form.Control placeholder="Description" as="textarea" className='input-form-global-user' onChange={(e) => setNote(e.target.value)} />

                            </div>
                        </div>
                    </div>
                    <div>
                        <Button className='btn-save-comment' onClick={() => saveContact()}>Send</Button>
                    </div>
                </>
            }
        </div>

    )
})