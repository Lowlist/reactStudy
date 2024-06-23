import { configureStore, createSlice } from '@reduxjs/toolkit'
/**리덕스 쓰는이유 
 * -컴포넌트간 state 공유 편해짐
 * -작은 프로젝트면 props 사용하는게 더 편함
 * -컴포넌트간 공유가 필요없으면 useState() 그냥 써도 상관없슴
 */

//유즈 스테이트 역할임
let user = createSlice({
  name : 'user',
  initialState : 'kim'
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ]
})




//여기에서도 써줘야됨
export default configureStore({
  reducer: { 
    user : user.reducer,
    cart : cart.reducer
  }
}) 