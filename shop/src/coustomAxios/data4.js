import axios from 'axios';
// ,props2,props3,props4
function data4( {shoes,setShoes} , {num,setNum} , {renewal,setRenewal} , {isLoading,setIsLoading} ) {
    setIsLoading(true);
    if(num <= 3){
        setRenewal(true);
        axios.get('https://codingapple1.github.io/shop/data'+(num)+'.json')
            .then((response) => {
                setNum(num => num+1);
                let shoesCopy = [...shoes];
                // 이거 중요함 ... 으로 스프레드 해야지 기존 데이터에서 데이터 추가로 넣을수 있음 근데 DB쓰면 될듯 ㅋㅋ
                setShoes(shoesCopy.concat(...response.data));
                if(num==3){
                   setRenewal(false);
                }
                for(let i=0;i<100000;i++){
                    console.log(i);
                }
                setIsLoading(false);
            })
            .catch(() => {
                console.log("ㅋㅋ 실패했는데 바보")
                setIsLoading(false);
            })
    } else {
        setRenewal(false);
        alert('응애');
    }
}

export default data4;