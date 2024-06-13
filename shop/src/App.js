import { useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import GoodsInfo from './routes/detail.js';
import Event from './routes/event.js';
import Home from './routes/home.js';
import { Routes , Route , Link , useNavigate} from 'react-router-dom';

// 스타일 컴포넌트 장점
// 1.css 안가고 여기서 만들수 있어서 편하긴 함
// 2.스타일이 다른 js파일로 오염되지 않음 (내부에서만 놀수있음)
// 3.페이지 로딩시간 단축
// ***** 중요 *****
// 오염방지하려면 컴포넌트.module.css 이렇게 작명하면 됨.

// 스타일 컴포넌트 단점
// 1.js파일이 매우 복잡해짐
// 2.중복스타일은 컴포넌트간 import 할텐데 그러면 CSS import하는거랑 뭔차이임?
// 3.협업시 CSS담당의 숙련도 이슈

// 결론 = 기본 CSS 스타일 컴포넌트 둘중 아무거나 사용해도 상관 없습니다.

import styled from 'styled-components';
// 프롭스도 작동함
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black' } ;
  padding : 10px;
`
let Boxs = styled.div`
  background : grey;
  padding : 10px;
`
//기존 스타일 복사 가능 똑같이 수정도 가능
let NewBtn = styled.button(YellowBtn)`
  
`

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Boxs>
        <YellowBtn bg="blue">ㅋㅋ</YellowBtn>
      </Boxs>
      {/** 헤더 시작 */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="detail">Features</Nav.Link>
            <Nav.Link href="/">Pricing</Nav.Link>
            <Nav.Link href="event">Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          /** ver 1
          <div>
            <div className='main-bg' style={{ backgroundImage: 'url(' + bg + ')' }} />
              <Container>
                <Row>
                  {
                    shoes.map(function (a, i) {
                      return (
                        <Goods shoes={shoes} i={i} navigate={navigate}/>
                      )
                    })
                  }
                </Row>
              </Container>
          </div>
          */
          <Home shoes={shoes} navigate={navigate}></Home>
        }>
        </Route>

        {
        /** ver 1
        {
          shoes.map(function (a, i) {
            return (
              <Route path={"/detail/"+i} element={
                <div>
                  <GoodsInfo i={i} shoes={shoes}/>
                  <Link to="/">홈으로 돌아가기</Link>
                </div>
              }>
              </Route>
            )
          })
        }
         */
        }

        <Route path="/detail/:id" element={<GoodsInfo shoes={shoes}/>}></Route>
        <Route path="*" element={<div>404임</div>}></Route>

        <Route path="/event" element={<Event/>}>
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path='two' element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;