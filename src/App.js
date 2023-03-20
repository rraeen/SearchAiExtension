import logo from './logo.svg';
import { Input,Row,Col } from 'antd';
import './App.css';
import axios from 'axios';
import { useState } from 'react';


function App() {
  const [question, setQuestion] = useState("")
  const [answer, setanswer] = useState("")
  const [spinnershow, setspinnershow] = useState(false)
  let source = axios.CancelToken.source();
  let config = { cancelToken: source.token}
  const myclickFun=async()=>{
    setspinnershow(true)
    // window.open("https://www.youtube.com","_blank")
    try {
      const res=await axios.post("http://localhost:5000/openai/chatgenerate",{question:question},config)
      setanswer(res.data.answer?res.data.answer:"")
      setspinnershow(false)
    } catch (error) {
      console.log(error);
      setanswer("Something went wrong...")
      setspinnershow(false)
    }
  }
  const dimond=(<div class="pyramid-loader">
  <div class="wrapper">
    <span class="side side1"></span>
    <span class="side side2"></span>
    <span class="side side3"></span>
    <span class="side side4"></span>
    <span class="shadow"></span>
  </div>  
</div>)
const onCencle=()=>{
  source.cancel()
}
 
  return (
    <div className="App">
     <h1> Raunak AI Search powered by OpenAi</h1>
     <div style={{display:"flex", justifyContent:"center",alignItem:"center"}}>
     <div style={{width:"500px",border:"1px solid black",padding:"10px"}}>

     <h3>{question  ?question :"Ask any Questions"}</h3>
     <br/>
     
     
     <Row  justify={"center"} gutter={[20,20]} >
     <Col span={15}>
     {spinnershow
     ?
     <div style={{padding:"0px", margin:"auto"}}>
     {dimond}

     </div>
      
   :<h6>{answer}</h6>}

     </Col>
     <Col className='bn' span={18}>
     <Input  onChange={(e)=>setQuestion(e.target.value)} placeholder="search..." />

     </Col> 
     <Col span={8}>
<div style={{display:"flex"}}>
     <button style={{height:"35px",margin:"10px",background:"skyblue"}} onClick={myclickFun} >Search</button>
     <button style={{height:"35px",margin:"10px",background:"pink"}} onClick={onCencle} >cancel</button>
     {/* <button class="bn"onClick={myclickFun} >Search</button> */}

</div>
     </Col>
    </Row>
     </div>

     </div>
    </div>
  );
}

export default App;
