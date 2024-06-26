import { useState, memo, useMemo } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName , changeAge } from './../store/userSlice.js'
import { changeCount , changeCount2 , cartSort } from './../store/cartSlice.js'

let Child = memo(function (){
    console.log('내가 필요한기능이였어')
    return <div>자식임</div>
})

function Cart() {
    
    /**
     * redux에서 스테이트 꺼내 쓰는방법
     * useSelector 편하게 쓰려면 state.{항목명}쓰면 원하는것만 골라 가져올수있음. {return } << 이것도 축약 가능함
     */
    // memo로 재 랜더링 오래걸리는 컴포넌트 감싸놓으면 필요할때만 재 렌더링 시킴
    // memo의 원리
    // props가 변할 때만 재렌더링 해줌

    let state = useSelector((state)=>{ return state })
    let disPatch = useDispatch();
    let [count,setCount] = useState(0)
    return (
        <div>
            {/* 
            memo 
            <Child count={count}></Child>
            <button onClick={()=>{setCount(count+1)}}>버튼임</button> 
            */}

            {state.user.name}의 장바구니 나이: {state.user.age}
            {/* 화살표함수 없으면 렉 오지고 작동안됨 */}
            <button onClick={()=>{disPatch(changeAge(3))}}>나이증가</button>
            <br></br>

            <Table>
                <thead>
                    <tr>
                        {/* 아마 유즈이펙트 사용해서 원래대로 되돌릴수도 있을꺼같음. */}
                        <th onClick={()=>{disPatch(cartSort({idOn : true}))}}>#</th>
                        <th onClick={()=>{disPatch(cartSort({nameOn : true}))}}>상품명</th>
                        <th onClick={()=>{disPatch(cartSort({amountOn : true}))}}>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map(function (a, i) {
                            return (
                                    <tr key={i}> 
                                        <td>{state.cart[i].id}</td>
                                        <td>{state.cart[i].name}</td>
                                        <td>{state.cart[i].count}</td>
                                        <td>
                                            <button onClick={()=>{
                                                disPatch(changeCount(state.cart[i].id))
                                            }}>
                                                +
                                            </button>
                                            <button onClick={()=>{
                                                disPatch(changeCount2(state.cart[i].id))
                                            }}>
                                                -
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={()=>{
                                                disPatch(changeCount2( {id : state.cart[i].id , del : true } ))
                                            }}>삭제</button>
                                        </td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;