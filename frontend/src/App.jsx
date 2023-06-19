import { reset } from "styled-reset";
import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import axios from 'axios'

const GlobalStyle = createGlobalStyle`
    ${reset}

    *, *::before, *::after {
        box-sizing: border-box;
    }
`

function App() {

    const [values, setValues] = useState({
        name: "",
        text: "",
        data: {
            name: "",
            text: ""
        }
      })
    
      const handleChange = e => {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        })
      }
    
      const handleSubmit = e => {
        axios.post('/api/db/push', values)
        .then(()=>{
            alert("데이터를 성공적으로 전송하였습니다.")
        }
        ).catch(()=>{
            console.log(values)
            alert("데이터 전송에 실패하였습니다.")
        })
      }

      const handleGet = e => {
        axios.get('/api/db/get')
        .then((res) => {
            console.log(res.data)
            alert("데이터를 성공적으로 호출하였습니다.\n F12 -> Console 탭을 통해 데이터를 식별하세요.")
        })
        .catch(() => {
            alert("데이터 호출에 실패하였습니다.")
        })
      }

    return (
        <>
            <GlobalStyle />
            name <input type="text" name="name" value={values.name} onChange={handleChange}/>
            <br/>
            any text <input type="text" name="text" value={values.text} onChange={handleChange}/>
            <br/>
            <button onClick={handleSubmit}>전송</button>
            <br/><br/><br/><br/>
            <button onClick={handleGet}>데이터 불러오기</button>
        </>
    );


}
export default App;