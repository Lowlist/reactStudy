import axios from 'axios';
// ,props2,props3,props4
function data4( {shoes,setShoes} , {num,setNum} , {renewal,setRenewal} , {isLoading,setIsLoading} ) {
    axios.get('https://codingapple1.github.io/shop/data'+(num)+'.json')
        .then((response) => {
            setShoes(num => num+1);
            let shoesCopy = [...shoes];
            // 이거 중요함 ... 으로 스프레드 해야지 기존 데이터에서 데이터 추가로 넣을수 있음 근데 DB쓰면 될듯 ㅋㅋ
            setShoes(shoesCopy.concat(...response.data));
            console.log(num);
        })
        .catch(() => {
            console.log("ㅋㅋ 실패했는데 바보")
        })
}

export default data4;