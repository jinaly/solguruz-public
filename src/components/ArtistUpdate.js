import React from "react";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import MainLayout from "./Layout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../constants/apiConstants";

const ArtistUpdate = () => {
  const token = useSelector((state) => state.user.token);
  const [uploadingFile, setUploadingFile] = useState(null);
  const [getSource, setGetSource] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const fetchData = async () => {
    const dataRes = await axios.get(
      `${baseUrl}/api/v1/artist/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const {artistrole="",...otherValues}=dataRes.data
    setGetSource({
      ...otherValues,
      roles:artistrole.split(',')
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    console.log(uploadingFile);
    const reqData = new FormData();
    reqData.append("artistname", artistname);
    reqData.append("biography", biography);
    reqData.append("artistroles", roles.join(","));
    if(uploadingFile){
      reqData.append("image",uploadingFile);
    }
    await axios.put(
      `${baseUrl}/api/v1/artist/${id}`,
      reqData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    navigate("/artist");

  };
  const onClose=()=>{
    navigate("/artist")
  }

  return (
    <div>
      <MainLayout>
      {getSource &&
        <Form layout="vertical" onFinish={onFinish} initialValues={getSource}>
          <Row justify={"space-between"} align="middle">
            <Col>
              <div><CloseOutlined onClick={onClose}/></div>
              <h1>Create New Artist</h1>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Artist Name"
                name="artistname"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Biography"
                name="biography"
              >
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
            <Col>
              <Button type="primary" htmlType="submit">
                Update Artist
              </Button>
            </Col>
          </Row>
        </Form>
      }
      </MainLayout>
    </div>
  );
};

export default ArtistUpdate;
