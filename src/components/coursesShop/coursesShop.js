import React, { useState, useEffect } from 'react'
import './style.css'
import Login from '../Login/login'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../../img/koser.gif'
import { actions } from '../../Redux/action'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import About from '../UserComponent/About/about';
import ContactUS from '../UserComponent/ContactUS/contactUs';
import Tips from '../UserComponent/Tips/tips';
import { RiDeleteBinLine } from 'react-icons/ri';

function mapStateToProps(state) {
    return {
        allPackages: state.packagesReducer.packages,
        allUsers: state.usersReducer.allUsers,

    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllPackages: () => dispatch(actions.getAllPackages()),
    setCurrentPackageToBuy: (item) => dispatch(actions.setCurrentPackageToBuy(item)),
    getAllUsers: (lesson) => dispatch(actions.getAllUsers(lesson)),
    getAllPackagesByUsers: () => dispatch(actions.getAllPackagesByUsers()),
    deletePackage: (_id) => dispatch(actions.deletePackage(_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(function CoursesShop(props) {
    const { getAllPackages, allPackages, setCurrentPackageToBuy,
        getAllPackagesByUsers, deletePackage, allUsers } = props;
    const [isShowLogin, setIsShowLogin] = useState(false);

    useEffect(async () => {
        initGetAllPackages();
        const { getAllUsers } = props;
        await getAllUsers()
        getAllPackagesByUsers()

    }, []);
    const history = useHistory();

    const handleClickBuy = (item) => {
        setCurrentPackageToBuy(item);
        history.push('/pay')
    }
    const initGetAllPackages = async () => {
        await getAllPackages();
    }
    const deletePackageByID = async (id) => {
        await deletePackage(id).then(() => {
            initGetAllPackages();
        });
    }
    return (
        <div className="courses-list">
            <div className='row'>
                <div className='col-4 login-button-div'>
                    <button className='login-button' onClick={() => setIsShowLogin(!isShowLogin)}>Login</button>
                    {isShowLogin && <div className='login-page'>
                        <Login page='course-shop' setIsShowLogin={setIsShowLogin} />
                    </div>
                    }
                </div>
                <div className='col-4' />
                <div className='col-4 logo-div'>
                    <img className='logo-img' src={logo} />
                </div>
            </div>

            <div className='container-card row'>
                {allPackages && allPackages.map((item) => {
                    return <Card className='col-4 inner' style={{ width: '18rem' }}>
                        <Card.Header variant="top" src="holder.js/100px180" className='player-header' style={{ borderBottom: '1px solid red !importent' }}>
                            <img
                                className='img-package'
                                src={item.imgSrc}
                            /></Card.Header>
                        <Card.Body className='body-card-package'>
                            <Card.Title className='card-title-package'>{item.name}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            {JSON.parse(localStorage.getItem('kind-of-user')) === 'manager' &&
                                <Button variant="primary" className='delete-button' onClick={() => deletePackageByID(item._id)}><RiDeleteBinLine /></Button>}
                            <Button variant="primary" className='buy-button' onClick={() => handleClickBuy(item)}>To Buy</Button>
                        </Card.Body>
                    </Card>

                })}

            </div>
            <div><About /></div>
            <div><Tips /></div>
            <div><ContactUS /></div>

        </div>
    )
});
