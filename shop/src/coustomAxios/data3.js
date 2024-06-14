import axios from 'axios';
import { useState, useEffect } from 'react';

// 이건 한번에 두곳에 보내는거라서 되는거였슴!!!!!!!!!!!!!!!????
function data3(props,props1,props2) {
    Promise.all(
        [axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((response) => {
                let shoesCopy = [...props.shoes];
                props.setShoes(shoesCopy.concat(...response.data));
                console.log("1번요청"+response)
                console.log(props.shoes)
                console.log("1번요청"+response)
            })
            .catch(() => {
                console.log("ㅋㅋ 실패했는데 바보")
            })
            .finally(() => {
                props2.setIsLoading(false);
            })
            , axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((response) => {
                    let shoesCopy = [...props.shoes];
                    props.setShoes(shoesCopy.concat(...response.data));
                    props2.setIsLoading(false);
                    console.log("2번요청"+response)
                    console.log(props.shoes)
                    console.log("2번요청"+response)
                })
                .catch(() => {
                    console.log("ㅋㅋ 실패했는데 바보")
                })
                .finally(() => {
                })
        ]
    )
}
export default data3;