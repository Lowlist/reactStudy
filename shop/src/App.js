import { useState , useEffect, createContext, Suspense } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import data2 from './coustomAxios/data2.js'
import data3 from './coustomAxios/data3.js'
import data4 from './coustomAxios/data4.js'
import GoodsInfo from './routes/detail.js';
import Event from './routes/event.js';
import Home from './routes/home.js';
import Cart from './routes/Cart.js';
import axios from 'axios';
import { Routes , Route , Link , useNavigate} from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'  

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
// 프롭스로 전부 적용가능.

/**
 *  React Query
 *  실시간 데이터가 중요할때 사용
 */

/**
 *  Lazy 조금 늦게 로딩시키는 react 내장객체
 *  const Detail = lazy( () => import('./routes/Detail.js') )
 *  const Cart = lazy( () => import('./routes/Cart.js') )
 *  
 *  장점:
 */



import styled from 'styled-components';
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
// let NewBtn = styled.button(YellowBtn)`
// `



// ContextAPI 특징 
// 1.state 변경시 쓸데없는 것까지 재 렌더링 시켜서 성능이슈가 있음.
// 2.나중에 컴포넌트 재사용이 어려움
// 결론 = redux쓰는게 더 좋다

// ContextAPI 세팅 1 State 보관함임 
export let Context1 = createContext()

function App() {
  // let obj = {name : 'kim'}
  // localStorage.setItem('data',JSON.stringify(obj));
  // let b = localStorage.getItem('data')
  // console.log(JSON.parse(b))
  let [shoes,setShoes] = useState(data);
  let [contextTest] = useState([10,11,12])
  let [isLoading, setIsLoading] = useState(false);
  let [renewal,setRenewal] = useState(true);
  let [num,setNum] = useState(2);
  let bb = localStorage.getItem('watched')
  let [watch,setWatch]=useState(JSON.parse(bb));
  let navigate = useNavigate();

  // 리턴 2개 필수
  // result.data, result.isLoading, result.error ... 유용하게 사용가능
  // 장점  
  let result = useQuery('names', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
    // ,{ staleTime : 2000 } 시간초 지정가능
  )
  
  return (
    <div className="App">
      {/** 헤더 시작 */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="detail">Features</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="event">Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <div>
        {
          watch && watch.map(
            function (a, i) {
              return (
                <div ket={i}>{shoes[watch[i]] && shoes[watch[i]].title}</div>
              )
            }
          )
        }
      </div> */}
      {/* {result.isLoading && result.data} */}
        {/* ContextAPI 용 세팅 2 프리바이더 라우터 안에다가 넣으려면 한개만 해야하는게 아니라 전체적으로 감싸줘야됨. */}
      <Context1.Provider value={ {contextTest} }>
        {/* Suspense 로딩중일때 나오게하는곳임 */}
        <Suspense fallback={<div>로딩중임</div>}>
          <Routes>
            <Route path="/" element={<Home shoes={shoes} navigate={navigate}></Home>}/>
            <Route path="/detail/:id" element={ <GoodsInfo shoes={shoes}/> }></Route>

            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="*" element={<div>404임</div>}></Route>
            
            {/* Route nested */}
            <Route path="/event" element={<Event/>}>
              <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
              <Route path='two' element={<p>생일기념 쿠폰받기</p>}></Route>
            </Route>
          </Routes>
        </Suspense>
      </Context1.Provider>

      {
        renewal == true ?
        <Boxs>
          <YellowBtn bg="blue" onClick={() => { 
            data4( {shoes,setShoes} , {num,setNum} , {renewal,setRenewal} , {isLoading,setIsLoading} ) 
          }}>갱신</YellowBtn>
        </Boxs>
        : null
      }

      {isLoading && <h4>Loading...</h4>}


    </div>
  );
}

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


{
/** ver 1
  {KF
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
export default App;