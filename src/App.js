import React, { useEffect } from "react";
import { Routers } from "./routes";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Layout, Menu, Select } from "antd";
import "./assets/scss/styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getVersions,
  getGenerations,
  changeLanguagePokemon,
} from "./store/actions";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

function App() {
  const { versions } = useSelector((state) => state.versions);
  const { generations } = useSelector((state) => state.generations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVersions());
    dispatch(getGenerations());
  }, []);

  function handleChange(value) {
    dispatch(changeLanguagePokemon(value));
  }

  return (
    <Router>
      <Layout className="layout">
        <Header className="header">
          <div className="header__logo">
            <Link to="/">
              <img src="/pokemon-logo.png" alt="logo" />
            </Link>
          </div>
          <Menu theme="dark" mode="horizontal">
            <SubMenu key="sub1" title="Games">
              {versions
                ? versions.map((version) => (
                    <SubMenu title={version.name} key={version.id}>
                      {version?.subVersions
                        ? version?.subVersions.map((subVersion, index) => (
                            <Menu.Item key={index}>{subVersion.name}</Menu.Item>
                          ))
                        : null}
                    </SubMenu>
                  ))
                : null}
            </SubMenu>
            <SubMenu key="sub2" title="Generations">
              {generations
                ? generations.map((generation, index) => (
                    <Menu.Item key={index}>{generation.name}</Menu.Item>
                  ))
                : null}
            </SubMenu>
            <Menu.Item key="3">Locations</Menu.Item>
            <Menu.Item key="4">Items</Menu.Item>
          </Menu>
          <div className="header__language">
            <Select
              defaultValue="en"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="en">English</Option>
              <Option value="ja-Hrkt">Japanese</Option>
            </Select>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Routers />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          HCG Pokemon Created by VanNguyen
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
