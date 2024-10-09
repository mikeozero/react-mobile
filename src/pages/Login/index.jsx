import React, { Component } from 'react'
import { NavBar, Input, Button, Toast } from 'antd-mobile'
import {phoneReg,codeReg} from '../../config/reg'
import {codeTime} from '../../config/constants'
import './index.less'

export default class Login extends Component {
  state = {
    phone: '',
    code: '',
    time: codeTime, // countdown seconds
    canClick: true
  }

  login = () => {
    const {phone,code} = this.state
    this.phoneError = false
    this.codeError = false
    if(!phone) this.phoneError = true
    if(!code) this.codeError = true
    let errMsg = ''
    errMsg += this.phoneError? ' phone number': ''
    errMsg += this.codeError? ' code': ''
    if (errMsg) return Toast.show({
      icon: 'fail',
      content: 'Please input valid' + errMsg,
      duration: 2000,
      maskClickable: false
    })
    console.log(`login with phone: ${phone}, code: ${code}`)
  }

  saveData = (type) => {
    return (value) => {
      if(type === 'phone' && !phoneReg.test(value)) value=''
      else if(type === 'code' && !codeReg.test(value)) value=''
      this.setState({[type]:value})
    }
  }

  getCode = () => {
    const {canClick,phone} = this.state
    if(!canClick) return
    else if(!phone) return Toast.show({
      icon: 'fail',
      content: 'Please enter a valid phone number',
      duration: 2000,
      maskClickable: false
    })
    this.setState({canClick:false})
    this.timeId = setInterval(()=>{
      const {time} = this.state
      this.setState({time:time-1})
      if(time<=0){
        clearInterval(this.timeId)
        this.setState({canClick: true,time: codeTime})
      }
    },1000)
    console.log('send request...')
  }

  render() {
    const {canClick,time} = this.state
    return (
      <div>
        <NavBar back={null}>
          手机验证码登录
        </NavBar>
        <div className="login-wrapper">
          <Input placeholder='输入手机号' clearable onChange={this.saveData('phone')}/>
          <div className="verify-group">
            <Input placeholder='输入验证码' clearable onChange={this.saveData('code')}/>
            <Button className= {canClick?'verify-code active':'verify-code disable'}
             onTouchEnd={this.getCode}
             >获取验证码{canClick ? '':`(${time})`}</Button>
          </div>
          <Button block color="danger" onTouchEnd={this.login}>登录</Button>
          <div className="login-btn" >
            未注册的手机号,验证后会自动创建账号,登录即代表您已同意
            <a href="https://google.com/">'隐私协议'</a>
          </div>
        </div>
      </div>
    )
  }
}
