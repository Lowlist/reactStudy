import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 1 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        // 자료형이 달라서 그냥 오브젝트 째로 추가하는걸로 바꿈
        addCart(state,action) {
            let item = state.find(item => item.id === action.payload.id)
            if(item){
                item.count += 1;
            }else{
                state.push({ id : action.payload.id, name: action.payload.title, count : 1 });
            }
        },
        changeCount(state, action) {
            // payload 필수임 파라미터 가져올꺼면
            // 둘다 되는 코드인데 위에꺼가 좀더 보기 편한거같음.
            // 코딩애플은 이렇게 함 let 번호 = state.findIndex((a)=> return a.id === action.payload)
            let item = state.find(item => item.id === action.payload)
            // let item = state.find(
            //     function(x){
            //         return x.id === action.payload
            //     }
            // )
            //  x << 여기엔 state가 담긴다고 생각하면됨. 그리고 action.payload를 통해 id값을 받아온 후 비교문 실행
            // 만약 값이 없거나 틀린경우 undefinded가 리턴됨.
            if(item){
                item.count += 1;
            }
        },
        changeCount2(state, action) {
            let itemIndex = state.findIndex(item => item.id === action.payload)
            if(itemIndex !== -1){
                state[itemIndex].count -= 1;
                if(state[itemIndex].count === 0){
                    state.splice(itemIndex , 1);
                }
            }
            if(action.payload.del){
                itemIndex = state.findIndex(item => item.id === action.payload.id)
                state.splice(itemIndex , 1);
            }
        },
        cartSort(state,action){
            if(action.payload.nameOn){
                //a->z 순 정렬
                return state.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
            }
            if(action.payload.idOn){
                //id 0부터 정렬
                return state.sort((a, b) => a.id - b.id)
            }
            if(action.payload.amountOn){
                //개수 높은순으로 위로 올라감
                return state.sort((a, b) => b.count - a.count)
            }
        }
    }
})
export let { changeCount, changeCount2 , addCart , cartSort } = cart.actions
export default cart;