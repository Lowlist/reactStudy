import { useState } from 'react';

function App() {
  function nowDate (){
    let dates = new Date();
    let months = dates.getMonth() + 1;
    return dates.getFullYear() + " 년 " + months+ " 월 " + dates.getDate() + " 일 ";
  }
  let [title,setTitle] = useState(['응애','멍청이','바보']);
  let [content,setContent] = useState('');
  let [date,setDate] = useState(nowDate());
  let [like,setLike] = useState([0,0,0]);
  let [countTitle,setCountTitle] = useState(0);
  let [modalBoolean,setModalBoolean] = useState(false);
  let copyTitle = [...title];
  let copyContent = [...content];
  let copyDate = [...date];
  let copyLike = [...like];

  function likePlus (i){
    copyLike[i] = copyLike[i] + 1;
    return setLike(copyLike);
  }

  function createTitle (e){
    copyTitle.unshift(e);
    copyLike.unshift(0);
    setLike(copyLike);
    return setTitle(copyTitle);
  }

  return (
    <div className="App">
      {
        title.map(function(a, i){
          return(
            <div onClick={()=>{ setCountTitle(i); setModalBoolean(true);}}>
              {title[i]}
              <div onClick={(e)=>{e.stopPropagation(); likePlus(i)}}>
              👍{like[i]}</div>
            </div>
          )
          })
          }
      <input className='create-title' type="text" onChange={(e)=>{setContent(e.target.value)}}/>
      <button onClick={()=>{createTitle(content)}}>응애</button>
      {
        modalBoolean === true ? <Modal title = {title} content = {content} date = {date} countTitle={countTitle} lkie = {like}/> : null
      }
    </div>
  );
}

function Modal(props){
  return(
    <div className='modal-main'>
      <div className='title'>{props.title[props.countTitle]}</div>
      <div>대충 내용임</div>
      <div className='date'>{props.date}</div>
    </div>
  );
}

export default App;
