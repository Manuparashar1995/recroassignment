import './App.css';
import { useState, useEffect,useRef } from 'react'
import ListItem from './components/ListItem'
import axios from 'axios'

import useViewCheck from './customHook/viewCheck'

function App() {
  const [taskList, setTaskList] = useState([])
  const [start,setStart] = useState(0)
  const [loading,setLoading] = useState(false)
  const [loadingError,setLoadingErr] = useState(false)

  const[containerRef, isVisible] = useViewCheck({
    root:null,
    rootMargin:"0px",
    threshold:1.0
  })

  const loadingCSS = { 
    height: "100px", 
    margin: "30px" 
  };

  const loadingTextCSS = { display: loading ? "block" : "none" };
  const loadingErrorCSS = { display: loadingError ? "block" : "none" ,margin:"auto" };

  useEffect(() => {
    setLoading(true)
    axios.get(' http://jsonplaceholder.typicode.com/posts?_start=0&_limit=10').then(data=>{
      console.log(data)
    setTaskList(data.data)
    setStart(start+10)
    setLoading(false)
    setLoadingErr(false)
  }).catch(err => {
    setLoadingErr(true)
  })
  }, []
  )

  useEffect(() => {
    console.log("triggered")
    console.log(isVisible,isVisible === true,!loading)
    if(isVisible === true && !loading){
      console.log('triggering reload')
      reload()
    }
  }, [isVisible]
  )

  const reload = () => {
    setLoading(true)
    axios.get(`http://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`).then(data=>{
      console.log()
    setTaskList([...taskList,...data.data])
    setStart(start+10)
    setLoading(false)
    setLoadingErr(false)
    }).catch(err => {
      setLoadingErr(true)
    })
  }

  return (
    <div className="container-fluid App">
      
      <div className = "row" style={{padding:'2px',justifyContent:"center"}}>
        {taskList && taskList.map(task => { return (<div className = 'col-md-3' style={{padding:'2px'}}><ListItem task={task}/></div>) })}
      </div>
      <div ref ={containerRef} style={loadingCSS}></div>
      <span style={loadingTextCSS}>Loading...</span>
      <button style={loadingErrorCSS} onClick={reload}>something went wrong please click to reload...</button>
    </div>
  );
}

export default App;
