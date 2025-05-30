import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { useLoginAuthMutation } from '../redux/api/auth.api';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/features/auth.slice';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  email: string;
  password: string;
};


const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [LoginAut, { isLoading }] = useLoginAuthMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    LoginAut(values).unwrap().then((res) => {
      messageApi.open({
        type: 'success',
        content: res?.message || "Login successful",
      });
      console.log(res.token);
      dispatch(setAuth({ token: res.token, email: values.email }))
      navigate("/")
    }).catch((res) => {
      messageApi.open({
        type: 'error',
        content: res?.data.message || "Email yoki parol notogri",
      });
      console.log(res);
    })

  };
  return (
    <div className='container mx-auto min-h-screen  flex flex-col justify-center items-center'>
      <div className=' w-[400px]'>
        {contextHolder}

        <div>
          <h1 className='text-4xl flex justify-center py-5'>Login</h1>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
          >
            <Form.Item<FieldType>
              label="email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" className='w-full' loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
};

export default Login;