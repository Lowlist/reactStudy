import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {
    
    /**
     * redux에서 스테이트 꺼내 쓰는방법
     * 
     * useSelector 편하게 쓰려면 state.{항목명}쓰면 원하는것만 골라 가져올수있음. {return } << 이것도 축약 가능함
     */
    let ab = useSelector((state)=>{ return state })
    console.log(ab.stock);

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>

                {
                    ab.cart.map(function (a, i) {
                        return (
                            <tbody>
                                <tr> 
                                    <td>{i}</td>
                                    <td>{ab.cart[i].name}</td>
                                    <td>{ab.cart[i].count}</td>
                                    <td>응애</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </div>
    )
}

export default Cart;