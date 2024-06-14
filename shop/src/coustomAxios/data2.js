import axios from 'axios';

function data2(props) {
    axios.get('https://codingapple1.github.io/shop/data.json')
        .then((response) => {
            let shoesCopy = [...props.shoes];
            // 이거 중요함 ... 으로 스프레드 해야지 기존 데이터에서 데이터 추가로 넣을수 있음 근데 DB쓰면 될듯 ㅋㅋ
            props.setShoes(shoesCopy.concat(...response.data));
        })
        .catch(() => {
            console.log("ㅋㅋ 실패했는데 바보")
        })
        .finally(() => {
            return(
                <div>로딩중입니다.</div>
            )
        })
}

export default data2;