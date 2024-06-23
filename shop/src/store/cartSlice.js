import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 1, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        addCart(state,action) {
            state.push({ id : state.length + 1, name: action.payload, count : 0 });
        },
        changeCount(state, action) {
            // payload 필수임 파라미터 가져올꺼면
            // 둘다 되는 코드인데 위에꺼가 좀더 보기 편한거같음.
            // let item = state.find(item => item.id === action.payload)
            let item = state.find(
                function(x){
                    return x.id === action.payload
                }
            )
            //  x << 여기엔 state가 담긴다고 생각하면됨. 그리고 action.payload를 통해 id값을 받아온 후 비교문 실행
            // 만약 값이 없거나 틀린경우 undefinded가 리턴됨.
            if(item){
                item.count += 1;
            }
        }
    }
})
export let { changeCount , addCart } = cart.actions
export default cart;