import React from 'react';
import { Container, Row } from 'react-bootstrap';
// import 할때 경로 주의해야댐
import Goods from './goods.js';
import bg from '../img/bg.png';

// 만약 props 안에 props 추가하려면 잘 줘야함.

function Home (props){
    return(
        <div>
            <div className='main-bg' style={{ backgroundImage: 'url(' + bg + ')' }} />
              <Container>
                <Row>
                  {
                    props.shoes.map(function (a, i) {
                      return (
                        <Goods key={i} shoes={props.shoes} i={i} navigate={props.navigate}/>
                      )
                    })
                  }
                </Row>
              </Container>
        </div>
    )

}

export default Home;