import React, { useRef, useState } from 'react';
import '../../../styles/pay.css';
import credit from '../../../img/credit3.png';
import './style.css'
import Card from 'react-bootstrap/Card';
import { actions } from '../../../Redux/action'
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { GrMoney } from 'react-icons/gr';
import Login from '../../Login/login'
import { useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';

function mapStateToProps(state) {
  return {
    currentPackageForBuy: state.packagesReducer.currentPackageForBuy,
    currentUserID: state.usersReducer._id,
  }
}
const mapDispatchToProps = (dispatch) => ({
  createNewPackageForUser: (details) => dispatch(actions.createNewPackageForUser(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(function Pay(props) {
  const { currentPackageForBuy, createNewPackageForUser } = props;
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardDateYear, setCardDateYear] = useState('');
  const [cardDateMonth, setCardDateMonth] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [showValidateArray, setShowValidateArray] = useState(false);
  const history = useHistory();


  const saveCardDetails = () => {
    if (cardNumber === '' || cardName === '' || cardCVV === '') {
      setShowValidateArray(true)
    }
    else {
      setShowValidateArray(false)

      if (!JSON.parse(localStorage.getItem('user-info'))) {
        setIsShowLogin(true)
      }
      else {
        createNewPackageForUser({ userId: JSON.parse(localStorage.getItem('user-info'))._id, packageForBuy: currentPackageForBuy }).then(() => {
          history.push('/homeUser')
        })
      }
    }

  }
  return (
    <div className='pay-container row'>
      <div className="login-wrap col-6">

        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="./css/main.css" />
        <title>Credit Card - Input Form</title>
        <div class="container">
          <div class="form">
            <form action="#">
              <div class="flex-row">
                <label for="card-number" class="card-title">Card Number</label>
                <input name="card-number" class="card-number" type="text" onChange={(e) => setCardNumber(e.target.value)} />
              </div>
              <div class="flex-row">
                <label for="card-name" class="card-title">Holder Name</label>
                <input name="card-name" class="card-name" type="text" onChange={(e) => setCardName(e.target.value)} />
              </div>
              <div class="flex-row">
                <table>
                  <tr>
                    <td class="table-column">
                      <label for="month" class="card-title">Expiration Date</label>
                      <div className='row'>
                        <select name="month" id="month-select" onSelect={(e) => setCardDateMonth(e)}>
                          <option value="Month" selected disabled>Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                        <select name="year" id="year-select" onSelect={(e) => setCardDateYear(e.target.value)}>
                          <option value="Year" selected disabled>Year</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                        </select>
                      </div>
                    </td>
                    <td class="table-column">
                      <label for="card-cvv" class="card-title">CVV</label>
                      <input name="card-cvv" class="card-cvv" type="text" onChange={(e) => setCardCVV(e.target.value)} />
                    </td>
                  </tr>
                </table>
              </div>

            </form>
            <div class="flex-row">
              {showValidateArray &&
                <Alert key='danger' variant='danger'>
                  All fields are Requierd
                </Alert>
              }
              <button class="card-submit-btu" onClick={() => saveCardDetails()} >Submit</button>
            </div>

            <div class="card-image-shadow"><img class="card-image" src={credit} alt="Card image" /></div>
          </div>
        </div>
      </div>
      {isShowLogin && <div className='login-page-pay'>
        <Login page='pay-page' setIsShowLogin={setIsShowLogin} />
      </div>
      }
      <div className='div-details-course col-5'>
        <Card className='inner card-package-details' style={{ width: '18rem' }} >
          <Card.Header variant="top" src="holder.js/100px180" className='player-header'>
            <img
              className='img-package-details'
              src={currentPackageForBuy.imgSrc}
            />
          </Card.Header>
          <Card.Body className='body-card-package-details'>
            <Card.Title className='card-title-package-details'>{currentPackageForBuy.name}</Card.Title>
            <Card.Text className='package-description'>
              {currentPackageForBuy.description}
            </Card.Text>
            <div className=''>
              <Card.Text className='package-courses-title'>
                The courses participating in the package :
              </Card.Text>
              <Accordion>
                {currentPackageForBuy.arrCourses.map((item, index) => {
                  return <Accordion.Item eventKey={index} >
                    <Accordion.Header className=''>{item.name}</Accordion.Header>
                    <Accordion.Body>
                      {item.description}
                    </Accordion.Body>
                  </Accordion.Item>
                })}
              </Accordion>
            </div>

            <div className='div-price'><p className='icon-money div-price'><GrMoney /></p> {currentPackageForBuy.price}</div>
            {/* <Button variant="primary" className='buy-button' onClick={() => {}}>Go somewhere</Button> */}
          </Card.Body>
        </Card>

      </div>
    </div >

  );
})
