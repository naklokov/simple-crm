import React from 'react'
import { Header, Form } from './components'

import style from './login.module.scss'

export const Login = (props: any) => (
    <div className={style.container}>
        <div className={style.header}>
            <Header />
        </div>
        <Form {...props}/>
    </div>
)

export default Login