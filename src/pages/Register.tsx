import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Button, Form, Input, Typography, Select, message } from "antd";
import type { FormProps } from "antd";
import { useGetRegionsQuery } from "../redux/api/region.api";
import { useRegisterAuthMutation } from "../redux/api/auth.api";
import Login from "./Login";
import axios from "axios";
const { Title } = Typography;

type FieldType = {
  email?: string;
  firstname?: string;
  lastname?: string;
  regionId?: string;
  password?: string;
  img?: string;
};

const Register = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const [messageApi, contextHolder] = message.useMessage();
  const { data } = useGetRegionsQuery({});
  const options = data?.data?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
  const [registerAuth, { isLoading, isSuccess }] = useRegisterAuthMutation();

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const handleUpload = (e: any) => {

    const file = e[0];
    setFilePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("https://keldibekov.online/upload", formData)
      .then((res) => {
        setUploadedFileUrl(res.data.fileUrl); 
      })
      .catch((err) => {
        console.error("Yuklashda xatolik:", err);
      });

  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    values.img = String(uploadedFileUrl)
    console.log(values);

    registerAuth(values)
      .unwrap()
      .then(res => {
        messageApi.open({
          type: 'success',
          content: res?.message || "Registration successful",
        });
      }).catch((res) => {
        console.log(res);
      })
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {contextHolder}
      {isSuccess ?
        (<Login />)
        :
        (
          <>
            <div className="max-w-[340px] p-5 rounded-2xl bg-[#eee] w-full shadow-2xl">
              <Title level={1} className="font-bold flex justify-center">Register</Title>
              <Form
                name="basic"
                initialValues={{ email }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <div className='container mx-auto py-3  flex justify-center items-center'>
                  <div className='size-24 rounded-lg overflow-hidden bg-[#ccc]  relative'>
                    <span className='absolute top-1/2 left-1/2 -translate-1/2 font-bold text-[#5e5d5d]'>Upload image</span>
                    <img src={filePreview || uploadedFileUrl || ""} alt="" className='w-full h-full object-contain relative' />
                    <input className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' type="file" onChange={(e) => handleUpload(e.target.files)} accept="images/*" />
                  </div>
                </div>


                <Form.Item<FieldType>
                  label="First name"
                  name="firstname"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Last name"
                  name="lastname"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Region"
                  name="regionId"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Select
                    placeholder="Select region"
                    // onChange={handleChange}
                    options={options}
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input disabled={true} />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                  <Button loading={isLoading} className="w-full" type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </>
        )}
    </div>
  );
};

export default React.memo(Register);
