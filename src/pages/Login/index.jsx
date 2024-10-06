import React, { Component } from 'react'
import { NavBar, Input, Button, Toast } from 'antd-mobile'
import {phoneReg,codeReg} from '../../config/reg'
import './index.less'

export default class Login extends Component {
  state = {
    phone: '',
    code: ''
  }

  login = () => {
    const {phone,code} = this.state
    if(!phone) return Toast.show({
      icon: 'fail',
      content: 'Please enter a valid phone number',
      duration: 2000,
      maskClickable: false
    })
    else if(!code) return Toast.show({
      icon: 'fail',
      content: 'Code is not correct',
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

  render() {
    return (
      <div>
        <NavBar back={null}>
          手机验证码登录
        </NavBar>
        <div className="login-wrapper">
          <Input placeholder='输入手机号' clearable onChange={this.saveData('phone')}/>
          <div className="verify-group">
            <Input placeholder='输入验证码' clearable onChange={this.saveData('code')}/>
            <Button className="verify-code">获取验证码</Button>
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
