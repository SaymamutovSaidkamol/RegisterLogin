import React, { FC, useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Typography } from "antd";
import type { GetProps } from "antd";
import { useSendOtpMutation, useVerifyOtpMutation } from "../redux/api/auth.api";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/features/auth.slice";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

export const VerifyOTP: FC<{ email: string }> = ({ email }) => {
  const [verifyOtp, { isLoading, isError }] = useVerifyOtpMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange: OTPProps["onChange"] = (text) => {
    verifyOtp({ email, otp: text })
      .unwrap()
      .then(() => {
        dispatch(setAuth({ email, token: "" }))
        navigate("/register")
      })
  };

  const sharedProps: OTPProps = {
    onChange,
  };
  return (
    <div>
      <Title level={5} className="text-center">
        Enter code
      </Title>
      <Input.OTP disabled={isLoading} formatter={(str) => str.toUpperCase()} {...sharedProps} />
      {
        isError && <p className="text-red-500 text-center text-sm">Invalid OTP code</p>
      }
    </div>
  );
};

type FieldType = {
  email?: string;
};
interface EmailSenderProps {
  setEmail: (p: string) => void;
  isLoading: boolean
}

export const EmailSender: React.FC<EmailSenderProps> = ({ setEmail, isLoading }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setEmail(values.email || "");
  };

  return (
    <div className="max-w-[340px] w-full">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Title level={5} >
          Enter email
        </Title>
        <Form.Item<FieldType>
          label=""
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Button loading={isLoading} className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const OTP = () => {
  const [sendEmail, { isSuccess, isLoading }] = useSendOtpMutation()
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email) {
      sendEmail({ email })
    }
  }, [email])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {isSuccess ? (
        <VerifyOTP email={email} />
      ) : (
        <EmailSender setEmail={setEmail} isLoading={isLoading} />
      )}
    </div>
  );
};

export default React.memo(OTP);
