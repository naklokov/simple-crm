import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'

import { logo } from '../../assets/img'
import style from './authorization.module.scss'

const layout = {
    wrapperCol: { offset: 10, span: 4 },
};

const onFinish = () => {
    console.log('Success');
};

const onFinishFailed = () => {
    console.log('Failed');
};

export const Authorization = () => {
    const [t] = useTranslation('authorization');
    return (
        <form className={style.container}>
            <img
                className={style.img}
                alt="logo"
                src={logo}
            />
            <p>{t('title')}</p>
            <Form
                {...layout}
                name="login"
                className={style.login}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a
                        className={style.forgotPassword}
                        href=""
                    >
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={style.submit}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </form >
    )
}

export default Authorization