import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "./Layout";
import axios from "axios";
import { baseUrl } from "../constants/apiConstants";
import { useNavigate } from "react-router-dom";



const Artist = () => {
  const token = useSelector((state) => state.user.token);
  const [uploadingFile, setUploadingFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const options = [
    {
      label: "Actor",
      value: "Actor",
    },
    {
      label: "Singer",
      value: "Singer",
    },
    {
      label: "Lyricst",
      value: "lyricst",
    },
    {
      label: "Voice over artist",
      value: "voice_over_artist",
    },
    {
      label: "Sound engineer",
      value: "sound_engineer",
    },
  ];
  
 
  const onFinish = async ({ artistname, biography, roles }) => {
    setIsLoading(true);
    try{
      const reqData = new FormData();
      reqData.append("artistname", artistname);
      reqData.append("biography", biography);
      reqData.append("artistroles", roles.join(","));
      reqData.append("image", uploadingFile);
      const resData = await axios.post(
        `${baseUrl}/api/v1/artist`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/artist")

    }catch(error){
      alert("Invalid");

    }finally{
      setIsLoading(false);
    }
  };

  const onClose=()=>{
    navigate("/artist")
  }

  return (
    <MainLayout>
      <Form layout="vertical" onFinish={onFinish}>
        <Row justify={"space-between"} align="middle">
          <Col>
          <div><CloseOutlined onClick={onClose}/></div>
            <h1>Create New Artist</h1> 
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Artist Name" name="artistname">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Biography" name="biography">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Cover Image" name="coverImage">
              <Upload
                onRemove={() => {
                  setUploadingFile(null);
                }}
                beforeUpload={(file) => {
                  console.log(file);
                  setUploadingFile(file);

                  return false;
                }}
                fileList={uploadingFile ? [uploadingFile] : []}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Roles" name="roles">
              <Checkbox.Group options={options} />
            </Form.Item>
          </Col>
          <Col >
          <Button type="primary" htmlType="submit" loading={isLoading}>
              Create Artist
            </Button>
            
          </Col>
        </Row>
      </Form>
    </MainLayout>
  );
};

export default Artist;
