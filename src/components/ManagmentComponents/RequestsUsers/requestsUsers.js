import React, { useState, useEffect } from 'react'
import { actions } from '../../../Redux/action'
import { connect } from 'react-redux';
import './style.css';
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';

function mapStateToProps(state) {
    return {
        requests: state.requestsReducer.requests
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllRequests: () => dispatch(actions.getAllRequests()),
})

export default connect(mapStateToProps, mapDispatchToProps)(function RequestsUsers(props) {
    const { getAllRequests, requests } = props;
    const [packageName, setPackageName] = useState('');

    useEffect(() => {
        getAllRequests();
    }, []);
    const history = useHistory();
    const navigateToPages = (page) => {
        history.push(`/${page}`)
    }
    return (
        <>
        <div className="buttons-for-navigat row">
                <div className="btn-nabigate col" onClick={() => navigateToPages('courses')}>Create new course</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('packages')}>Create new Packade</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('statistic')}>Statistic</div>
                <div className="btn-nabigate-choosed col" onClick={() => navigateToPages('requests-user')}>Reqests from users</div>
            </div>
            <div className='requests-users-container'>
                <div className='requests-title'>Requests from users</div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>First and Last Name</th>
                            <th>Email user</th>
                            <th>Phone number</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((item, index) =>
                            <tr>
                                <td>{index}</td>
                                <td>{item.firstAndLastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.note}</td>
                            </tr>
                        )}


                    </tbody>
                </Table>
            </div>
        </>
    )
});
