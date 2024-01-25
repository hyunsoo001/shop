/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import { useState } from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //훅이란 유용한것들이 들어있는것

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <div
        className="main-bg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div> */}

      {/* <Link to="/" style={{ marginRight: "10px" }}>
        홈
      </Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes} i={i} key={i}></Card>;
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((data) => {
                      // let copy = [...shoes, ...data.data]
                      // setShoes; (copy);
                      setShoes((prevShoes) => [...prevShoes, ...data.data]);

                      console.log(data.data[0]);
                    })
                    .catch(() => {
                      console.log("실패");
                    });
                }}
              >
                버튼
              </button>
            </>
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={<Detail shoes={shoes}></Detail>}
        ></Route>

        {/* Nested Routes*/}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>위치정보임</div>}></Route>
        </Route>

        {/* <Route path="/about/member" element={<About />}></Route>
        <Route path="/about/location" element={<About />}></Route> */}

        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>

        <Route path="*" element={<div>없는페이지에요</div>}></Route>
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width="80%"
      />
      <h4>{props.shoes[props.i].title} </h4>
      <p>{props.shoes[props.i].content}</p>
      <p>{props.shoes[props.i].price}</p>
    </div>
  );
}
export default App;
