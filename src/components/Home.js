import { Avatar, Button, Col, List, Pagination, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../constants/apiConstants";
import MainLayout from "./Layout";
const pageSize = 10
const Home = () => {
  const token = useSelector((state) => state.user.token);

  const [dataSource, setDataSource] = useState([]);
 const [currentPage,setCurrentPage]=useState(1)
 const [totalRecords,setTotalRecords]=useState(0)
 const [isLoading, setIsLoading] = useState(false);


  const fetchData = async () => {
    setIsLoading(true);
    const dataRes = await axios.get(
      `${baseUrl}/api/v1/artist?page=${currentPage}&limit=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDataSource(dataRes.data.data);
    setTotalRecords(dataRes.data.totalRecords);
    setIsLoading(false)
  };

  const removeData = async (id) => {
    await axios.delete(`${baseUrl}/api/v1/artist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <MainLayout>
      <Row justify={"space-between"} align="middle">
        <Col>
          <h1>Artists</h1>
        </Col>
        <Col>
          <Link to="/artist/add">
            <Button type="primary">Add Artist</Button>
          </Link>
        </Col>
      </Row>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loading={isLoading}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link to={`/update/${item._id}`}>Edit</Link>,
              <Button type="link" onClick={() => removeData(item._id)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={80}
                  src={`${baseUrl}/${item?.image}`}
                />
              }
              title={item.artistname}
              description={item.biography}
            />
          </List.Item>
        )}
      ></List>
      {
        console.log(totalRecords)
      }
      {dataSource.length>0 &&
      <Pagination current={currentPage} total={totalRecords} pageSize={pageSize} onChange={(nextPage)=>{
        setCurrentPage(nextPage)
      }}/>
      }
    </MainLayout>
  );
};
export default Home;
