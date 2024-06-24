import { React, useContext, useEffect ,useState } from 'react';
import { Container, Row, Col , Nav} from 'react-bootstrap';
import { useParams , Link, Outlet } from 'react-router-dom';
import { addCart } from './../store/cartSlice.js'
import { useDispatch, useSelector } from 'react-redux';
// ContextAPI 세팅3 임포트 시켜서 변수할당 해야됨
import { Context1 } from '../App.js';


//이게 url 입력한곳에서 내주소/detail/x << x부분을 가져오는 함순데 이게
// 아까 오브젝트 형식으로 가져온다 했잖아 그게 이유가
// {} << 중괄호 처리를 안해서 그럼 (스테이트와 관련이 있슴)
// 2번째 예외처리 버그는
// 저거 파인드 아이디가 오브젝트 형식으로 리턴받는데
// 배열찾는곳에 또 오브젝트를 그냥 넣어버림ㅋㅋ 그래서 버그났던거임

function GoodsInfo(props){
    // ContextAPI 세팅4 디스츠럭쳐링 쓰던가 아니면 변수에 데이터 넣던가 해서 가져오면됨
    let {contextTest} = useContext(Context1);
    let [times,setTimes] = useState(5);
    let [alerts,setAlert] = useState(true);
    let [number,setNumber] = useState('');
    let [fade2,setFade2] = useState('');
    let {id} = useParams();
    let [showWarning,setShowWarning] = useState(false);
    let [showOption,setShowOption] = useState(false);
    let [tap,setTap] = useState(0);
    let disPatch = useDispatch();

    useEffect(()=>{
        /**
         *  변수에 로컬스토리지를 넣음 -> 배열길이가 있을경우에만 if코드 실행 아니면 생성
         *  일단 데이터를 제이슨형식에서 파싱 후 배열에 추가 Set 내장객체 이용해서 중복데이터 제거
         *  Array.from 사용해서 배열로 바꾼 후 로컬스토리지에 set
         */
        let localData = localStorage.getItem('watched') || [];
        if(localData.length > 0){
            localData = JSON.parse(localData);
            localData.push(findData.id);
            let set = new Set(localData);
            set = Array.from(set)
            localStorage.setItem('watched', JSON.stringify(set));
        }else{
            localStorage.setItem('watched', JSON.stringify([]));
        }
    },[]);

    useEffect(()=>{
        setFade2('end')
        let timer = setInterval(()=>{ 
            setTimes(times = times - 1);
        }, 1000);

        let out = setTimeout(()=>{
            setAlert(false);
            clearInterval(timer);
        }, 5000);

        return ()=>{
            clearInterval(timer);
            clearTimeout(out);
            setFade2('')
        }
    },[]);

    useEffect(()=>{
        if(isNaN(number) == true){
            alert('문자 입력 하지 마셈!');
            setShowWarning(true);
        }else{
            setShowWarning(false);
        }
    },[number])

    // [] << 이렇게 아무것도 안넣을시 1번만 실행하고 영영 실행 안해줌
    // 만약 파라미터 값을 삽입하면 그 값이 변할 시 useEffect 를 바뀔때마다 실행해줌. ajax 통신할때 사용하면 좋을듯?
    // 당연히 스테이트값을 넣어도 작동함
    // return ()=>{} 를 사용하면 useEffect를 사용하기 전에 실행되는 코드임. 즉 div를 지울떄나 그럴때 사용하면 좋을듯?
    // 컴포넌트가 삭제될떄도 작동함. ( mount시 작동x unmount시 작동o )
    // !!!!! 서버에 요청보낼때 주의할것 !!!!!

    /** 빡통식 정리
     * useEffect(()=>{ })       1. 재 랜더링마다 코드실행      랜더링 = 홈페이지 html이 전부 불러와졌을때의 단어 
     * useEffect(()=>{ },[])    2. mount시 1회 코드실행           mount = componant 생성할시의 단어
     * useEffect(()=>{          3. unmount시 1회 코드실행     unmount = componant 가 삭제됐을때의 단어
     *   return ()=>{
     *                          4. useEffect 사용 전 코드를 실행하려면 항상 retrun()=>{}
     *   }
     * },[])
     */

    let findData = props.shoes.find(
        function(x){
            return x.id == id;
        }
    );

    if(findData == undefined){
        return(
            <div>
                404임 40404040404040404
                {/* 나중에 컴포넌트로 404 가져오면 될듯? */}
            </div>
        )
    }


    return(
    <Container className={'start ' + fade2}>
        {
        alerts == true ? 
            <div className='alert alert-warning'>
                {times}초이내 구매시 할인
            </div>
        : null
        }
        <Row>
        <Col sm>
            <img src={"https://codingapple1.github.io/shop/shoes"+(findData.id+1)+".jpg"} width='500px'/>
            <h4>상품명 : {props.shoes[findData.id].title}</h4>
            <p>상품설명 : {props.shoes[findData.id].content}</p>
            <p>가격 : {props.shoes[findData.id].price}</p>
            <button className='btn btn-danger' onClick={()=>{disPatch(addCart(props.shoes[findData.id]))}}>주문하기</button>
            <button className='btn btn-danger' onClick={()=>{setShowOption(true)}}>옵션설정</button>
            <br/>
            <Link to="/">집으로 돌아가버렷</Link>
            <br></br>
            <Link to="/cart">카트로 가버렷</Link>
            <br/>
            <input className={'number-test'} value={number} onChange={(e)=>{ setNumber(e.target.value) } }></input>
            {showWarning && <h4 className="text-danger" aria-disabled>숫자만 입력해주세요!</h4>}  
            {showOption == true ? 
                <div>
                    <Nav variant="tabs" defaultActiveKey="link0">
                        <Nav.Item>
                            <Nav.Link eventKey="link0" onClick={()=>{setTap(0)}}>색상선택</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link1" onClick={()=>{setTap(1)}}>사이즈선택</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link2" onClick={()=>{setTap(2)}}>옵션2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <TabContent tap={tap} shoes={props.shoes}/>
                </div>
                :null
            }
        </Col>
        </Row>
    </Container>
    )
}
// {tap} << 이런식으로 props 말고 전송 가능함.
function TabContent(props){

    //여기서도 변수설정 해줘야됨. ContextAPI
    let {contextTest} = useContext(Context1);

    let [fade,setFade] = useState('')

    useEffect(()=>{

        setTimeout(()=>{ setFade('end') },[10])
        
        return ()=>{
            setFade('')
        }
    },[props])

    if(props.tap == 0){
       return <div className={'start ' + fade}> {props.shoes[0].title} </div>
    }
    if(props.tap == 1){
       return <div>{contextTest}</div>
    }
    if(props.tap == 2){
       return <div>내용2</div>
    }
    // 이거도 작동함 어레이에서 어레이 자료 빼오는 문법 근데 if가 편하니까 if할꺼임
    // return[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][props.tap]

}

export default GoodsInfo;

/** ver:1
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function GoodsInfo(props){
    return(
      <Container>
        <Row>
          <Col sm>
            <img src={props.shoes[props.i].img} width='500px'/>
            <h4>상품명 : {props.shoes[props.i].title}</h4>
            <p>상품설명 : {props.shoes[props.i].content}</p>
            <p>가격 : {props.shoes[props.i].price}</p>
            <button className='btn btn-danger'>주문하기</button>
          </Col>
        </Row>
    </Container>
    )
}

export default GoodsInfo;*/