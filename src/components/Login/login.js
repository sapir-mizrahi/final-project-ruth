import '../../styles/log.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { actions } from '../../Redux/action'
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

function mapStateToProps(state) {
    return {
        isUserManager: state.usersReducer.isUserManager,
        currentUserID: state.usersReducer._id,
        currentPackageForBuy: state.packagesReducer.currentPackageForBuy,
    }
}
const mapDispatchToProps = (dispatch) => ({
    createNewUser: (user) => dispatch(actions.createNewUser(user)),
    loginUser: (name) => dispatch(actions.loginUser(name)),
    createNewPackageForUser: (details) => dispatch(actions.createNewPackageForUser(details)),
    getPackagesByCurrentUser: (name) => dispatch(actions.getPackagesByCurrentUser(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
    const { createNewUser, isUserManager, loginUser, page, createNewPackageForUser,
        setIsShowLogin, currentPackageForBuy, getPackagesByCurrentUser } = props;

    const [userNameEmail, setUserNameEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [birthDate, setBirthDate] = useState();
    const [showAlertNeedSignIn, setshowAlertNeedSignIn] = useState(false);
    const [showAlertNeedSignUp, setshowAlertNeedSignUp] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const history = useHistory();
    let userDetails = JSON.parse(localStorage.getItem('user-info'));

    const handleSignIn = async () => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userNameEmail)) {
            await loginUser({ userNameEmail: userNameEmail, password: password }).then(async() => {
                if (JSON.parse(localStorage.getItem('user-need-signup'))) {
                    setshowAlertNeedSignUp(true)
                    setIsShowLogin(true)
                }
                else {
                    debugger
                  await  getPackagesByCurrentUser(userDetails._id)
                    if (page !== 'pay-page') {
                        if (JSON.parse(localStorage.getItem('kind-of-user')) === 'manager') {
                            history.push('/statistic')
                        }
                        else {
                            history.push('/homeUser')
                        }
                    }
                    else {
                        createNewPackageForUser({ userId: JSON.parse(localStorage.getItem('user-info'))._id, packageForBuy: currentPackageForBuy }).then(() => {
                            history.push('/homeUser')
                        })
                    }
                    setIsShowLogin(false)

                }
                setValidateEmail(false)

            });
        }
        else {
            setValidateEmail(true)
        }
    }

    const handleSignUp = async () => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            const user = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                birthDate: birthDate
            }
            await createNewUser(user).then(() => {
                if (JSON.parse(localStorage.getItem('user-need-signin'))) {
                    setshowAlertNeedSignIn(true)
                }
                else {
                    getPackagesByCurrentUser(userDetails._id)
                    if (page !== 'pay-page') {
                        if (isUserManager) {
                            history.push('/statistic')
                        }
                        else {
                            history.push('/homeUser')
                        }
                    }
                    else {
                        createNewPackageForUser({ userID: JSON.parse(localStorage.getItem('user-info'))._id, packageForBuy: currentPackageForBuy }).then(() => {

                            history.push('/homeUser')
                        })
                    }
                    setIsShowLogin(false)
                }
                setValidateEmail(false)
            })
        }
        else {
            setValidateEmail(true)
        }
    }

    return (
        <div className="login-wrap-1">
            <div className="login-html">
                <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
                <div className="login-form">
                    <div className="sign-in-htm">
                        <div className="group">
                            <label htmlFor="user" className="label">Username-email</label>
                            <input id="user" className={"input"} type={"text"} onChange={e => setUserNameEmail(e.target.value)} />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Password</label>
                            <input id="pass" className="input" data-type="password" type={"password"} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="group">
                            <input id="check" type="checkbox" className="check"
                            />
                            <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                        </div>
                        <div className="group">
                            <input type="button" onClick={handleSignIn} className="button" value="Sign In" />
                        </div>
                        {showAlertNeedSignUp && <Alert key='danger' variant='danger'>
                            Your email address is not in the system.<br />
                            You need to SignUp.
                        </Alert>
                        }
                        {validateEmail && <Alert key='danger' variant='danger'>
                            Please enter a valid email address
                        </Alert>
                        }
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <a href="#forgot">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="sign-up-htm" >
                        <div className="group">
                            <label htmlFor="user" className="label">First name</label>
                            <input id="user" className="input" type={"text"} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className="group">
                            <label htmlFor="user" className="label">Last name</label>
                            <input id="user" className="input" type={"text"} onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Email Address</label>
                            <input id="email" className="input" type={"email"} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Password</label>
                            <input id="pass" className="input" data-type="password" type={"password"} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="group">
                            <label htmlFor="pass" className="label">Birth date</label>
                            <input id="date" className="input" type={"date"} onChange={e => setBirthDate(e.target.value)} />
                        </div>
                        <div className="group">
                            <input type="button" onClick={handleSignUp} className="button" value="Sign Up" />
                        </div>
                        {showAlertNeedSignIn && <Alert key='danger' variant='danger'>
                            We know you!<br />
                            Your email address is already in the system...<br />
                            You only need to Sign-In.<br />
                        </Alert>
                        }
                        {validateEmail && <Alert key='danger' variant='danger'>
                            Please enter a valid email address
                        </Alert>
                        }

                        <div className="foot-lnk">
                            <label htmlFor="tab-1"> Member?</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})