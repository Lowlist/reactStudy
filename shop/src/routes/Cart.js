import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../store';

function Cart() {
    
    /**
     * redux에서 스테이트 꺼내 쓰는방법
     * 
     * useSelector 편하게 쓰려면 state.{항목명}쓰면 원하는것만 골라 가져올수있음. {return } << 이것도 축약 가능함
     */
    let state = useSelector((state)=>{ return state })
    let disPatch = useDispatch();

    return (
        <div>

            {state.user}의 장바구니

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map(function (a, i) {
                            return (
                                    <tr key={i}> 
                                        <td>{i+1}</td>
                                        <td>{state.cart[i].name}</td>
                                        <td>{state.cart[i].count}</td>
                                        <td>응애</td>
                                        <td>
                                            <button onClick={()=>{
                                                disPatch(changeName())
                                            }}>
                                                +
                                            </button>
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