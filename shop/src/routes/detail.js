import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams , Link } from 'react-router-dom';

function GoodsInfo(props){
    //이게 url 입력한곳에서 내주소/detail/x << x부분을 가져오는 함순데 이게
    // 아까 오브젝트 형식으로 가져온다 했잖아 그게 이유가
    // {} << 중괄호 처리를 안해서 그럼 (스테이트와 관련이 있슴)
    // 2번째 예외처리 버그는
    // 저거 파인드 아이디가 오브젝트 형식으로 리턴받는데
    // 배열찾는곳에 또 오브젝트를 그냥 넣어버림ㅋㅋ 그래서 버그났던거임
    let {id} = useParams();
    let findData = props.shoes.find(
        function(x){
            return x.id == id;
        }
    );

    if(findData == undefined){
        return(
            <div>
                404임 40404040404040404
                {/* 나중에 컴포넌트 404 가져오면 될듯? */}
            </div>
        )
    }

    return(
    <Container>
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