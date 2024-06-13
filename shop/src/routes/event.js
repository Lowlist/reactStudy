import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Event(props){
    return(
        <div>
            <h4> 오늘의 이벤트 </h4>
            <Link to="one">첫번째</Link>
            <br/>
            <Link to="two">두번째</Link>
            <Outlet></Outlet>
        </div>
    )
}
export default Event;