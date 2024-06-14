import { Col } from 'react-bootstrap';

function Goods(props){
    return(
      <Col sm onClick={() =>{ props.navigate(`/detail/${props.shoes[props.i].id}`) }}>
        <img src={"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} width='250px'/>
        {/* <img src={'img/shoes'+(props.i+1)+'.jpg'}width='250px'/>  */}
        {/* 정수 가져와서 숫자 바꾸고싶으면 () << 에 묶으면됨 */}
        <h4>{props.shoes[props.i].title}</h4>
        <p>{props.shoes[props.i].content}</p>
        <p>{props.shoes[props.i].price}</p>
      </Col>
    )
  }

export default Goods;