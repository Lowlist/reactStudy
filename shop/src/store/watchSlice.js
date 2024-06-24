import { createSlice } from '@reduxjs/toolkit';

let watch = createSlice({
    name: 'watch',
    initialState: [],
    // array/object의 경우 return 없이 직접수정해도 state변경 가능 immer.js의 도움이있어서 그럼
    // 걍 object나 array로 만드는게 편함
    reducers: {
        setLocal(state,action){
            console.log('여기 들리긴함?')
            let bb = localStorage.getItem('watched');
            state.push(JSON.parse(bb));
        }
    }
})

// 디스트럭쳐링 문법
export let { setLocal } = watch.actions

export default watch;