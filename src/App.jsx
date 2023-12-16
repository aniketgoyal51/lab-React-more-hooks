import { useState } from 'react'
import './App.css'
import { useReducer ,useRef} from 'react'

const newarr=[{
  name:"Raj",
  visible:true
}]

function reduce(arr,action){
  switch (action.type) {
    case "Add":
      return[...arr,{name:action.data , visible:true}]
    case "Hide":
      return arr.map((item,index)=>{
        console.log(item.visible);
        if(action.index===index){
          return {...item , visible:!item.visible}
        }else{
          return item
        }
      })
      
    default:
      return arr
  }
}

function App() {

  let[myarr,dispatch]=useReducer(reduce,newarr)
  let[state,setstate]=useState("")
  let reference=useRef()
  function readyToAdd(e){
    setstate(e.target.value)
  }

  function clickAdd(){
    dispatch({type:"Add",data:state})
  }

  function hide(index){
    dispatch({type:"Hide",index})
  }

  function PutFocus(){
    reference.current.focus()
  }
  return (
    <>
      <input type="text" onChange={(e)=>readyToAdd(e)} ref={reference}/>
      <button onClick={clickAdd}>Add</button>
      {myarr.map((item,index)=>{
        return(
            <div key={index}>
              <p>{(item.visible)?item.name:"Name is hidden"}</p>
              <button onClick={()=>hide(index)}>Hide</button>
            </div>
        )
      })}
      <button onClick={PutFocus}>Get Writting</button>
    </>
  )
}

export default App
