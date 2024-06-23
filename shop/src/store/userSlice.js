import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    // array/object의 경우 return 없이 직접수정해도 state변경 가능 immer.js의 도움이있어서 그럼
    // 걍 object나 array로 만드는게 편함
    reducers: {
        changeName(state) {
            state.name = 'park'
        },
        changeAge(state, action) {
            // payload 필수임 파라미터 가져올꺼면
            state.age += action.payload;
        }

    }
})

// 디스트럭쳐링 문법
export let { changeName , changeAge } = user.actions

export default user;