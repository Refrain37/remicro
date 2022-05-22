import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useRemicro} from 'remicro.js'

function App() {
  useRemicro()
  const win:any = window
  win.testProperty = 'test_react'
  console.log(win);
  // win?.commCenter.addDataListener((e:any) => console.log(e))
  // win.commCenter.dispatch({ msg: 'test' });
  // console.log(win.commCenter);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p className='color-red'>
         子应用React16
        </p> */}
        <div className="login-container flex-column align-items-center" style={{'width': '300px',margin:'0 auto',fontSize:'16px'}}>
        <div>
          账户：<rm-input  style={{width: '250px'}} placeholder="请输入账号"></rm-input>
        </div>
        <div className="mt20">
          密码：<rm-input
            style={{width: '250px'}}
            placeholder="请输入密码"
            type="password"
          ></rm-input>
        </div>
        <div style={{width: '90%'}} className="mt20 flex-row justify-content-space-between">
          <rm-btn style={{width: '120px'}} content="登录" type="primary"></rm-btn>
          <rm-btn  style={{width: '120px'}} content="注册"></rm-btn>
        </div>
        </div>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
