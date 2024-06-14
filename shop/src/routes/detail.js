import { React, useEffect ,useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams , Link } from 'react-router-dom';

//이게 url 입력한곳에서 내주소/detail/x << x부분을 가져오는 함순데 이게
// 아까 오브젝트 형식으로 가져온다 했잖아 그게 이유가
// {} << 중괄호 처리를 안해서 그럼 (스테이트와 관련이 있슴)
// 2번째 예외처리 버그는
// 저거 파인드 아이디가 오브젝트 형식으로 리턴받는데
// 배열찾는곳에 또 오브젝트를 그냥 넣어버림ㅋㅋ 그래서 버그났던거임

function GoodsInfo(props){
    let [times,setTimes] = useState(5);
    let [alert,setAlert] = useState(true);
    let {id} = useParams();

    useEffect(()=>{
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
        }
    },[]);

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
    <Container>
        {
        alert == true ? 
            <div className='alert alert-warning'>
                {times}초이내 구매시 할인
            </div>
        : null
        }
        <Row>
        <Col sm>
            <img src={props.shoes[findData.id].img} width='500px'/>
            <h4>상품명 : {props.shoes[findData.id].title}</h4>
            <p>상품설명 : {props.shoes[findData.id].content}</p>
            <p>가격 : {props.shoes[findData.id].price}</p>
            <button className='btn btn-danger'>주문하기</button>
            <br/>
            <Link to="/">집으로 돌아가버렷</Link>
        </Col>
        </Row>
    </Container>
    )
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