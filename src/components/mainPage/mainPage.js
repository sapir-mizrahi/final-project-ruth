import React from 'react'
import './style.css'
import { Route, BrowserRouter } from 'react-router-dom';
import CoursesShop from '../coursesShop/coursesShop';
import Courses from '../ManagmentComponents/courses/courses';
import HomeUser from '../UserComponent/HomeUser/homeUser';
import Pay from '../UserComponent/Pay/pay';
import Statistic from '../ManagmentComponents/statistic/Statistic';
import Packages from '../ManagmentComponents/packages/packages';
import VideoLesson from '../UserComponent/VideoLesson/videoLesson';
import RequestsUsers from '../ManagmentComponents/RequestsUsers/requestsUsers';

const MainPage = () => {
    return (
        <div>
            <div className="">
                <div className="">
                    <React.StrictMode>
                        <BrowserRouter>
                            <Route path='/' component={CoursesShop} exact />
                            <Route path='/courses' component={Courses} />
                            <Route path='/homeUser' component={HomeUser} />
                            <Route path='/pay' component={Pay} />
                            <Route path='/packages' component={Packages} />
                            <Route path='/statistic' component={Statistic} />
                            <Route path='/videoLesson/:name' component={VideoLesson} />
                            <Route path='/requests-user' component={RequestsUsers} />
                        </BrowserRouter>
                    </React.StrictMode>
                </div>
            </div>
        </div>
    )
}
export default MainPage;
