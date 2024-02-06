/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import { useState, useEffect, createContext } from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from "./routes/Cart";

//state 보관함
export let Context1 = createContext();

function App() {
  useEffect(() => {
    if (!localStorage.getItem("watched"))
      localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  let [재고] = useState([10, 11, 12]);

  //data 가져와서 바로 집어 넣었음. 배열이면서 안에는 객체로 되어있음.
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //훅이란 유용한것들이 들어있는것

  let [따봉, 따봉변경] = useState([0, 0, 0]);

  let [btCount, setBtCount] = useState(1);

  let [showLoading, setShowLoading] = useState(false);

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
              {showLoading ? <LoadingComponent /> : null}

              {/* <button
                onClick={() => {
                  setShowLoading(true);
                  setBtCount((btCount = btCount + 1));
                  {
                    // eslint-disable-next-line no-unused-expressions
                    btCount > 3 ? alert("더 이상 없습니다") : null;
                  }
                  axios
                    .get(
                      `https://codingapple1.github.io/shop/data${btCount}.json`
                    )
                    .then((result) => {
                      // let copy = [...shoes, ...data.data];
                      // setShoes(copy);

                      //함수형 업데이트
                      setShoes((prevShoes) => [...prevShoes, ...result.data]);

                      console.log(result.data[0]);
                    })
                    .catch(() => {
                      setShowLoading(false);
                      console.log("실패");
                    });

                  setShowLoading(false);
                }}
              >
                더보기
              </button> */}
              <button
                onClick={() => {
                  setShowLoading(true);

                  //함수형 업데이트
                  setBtCount((prevBtCount) => prevBtCount + 1);

                  // 지연 추가 (예: 3초 지연)
                  setTimeout(() => {
                    axios
                      .get(
                        `https://codingapple1.github.io/shop/data${btCount}.json`
                      )
                      .then((result) => {
                        setShoes((prevShoes) => [...prevShoes, ...result.data]);
                        console.log(result.data[0]);
                      })
                      .catch(() => {
                        console.log("실패");
                      })
                      .finally(() => {
                        setShowLoading(false);
                      });
                  }, 2000); // 2초 지연

                  // 이 부분은 지연 시간 동안 로딩 상태가 즉시 false로 변경되므로 의미가 없습니다.
                  //finally 안에 써야지 의미가있지 그냥 안에 써봤자 true에서 바로 false로 바뀌어버린다
                  //처음에 잘못 구성된 구조였음
                  // setShowLoading(false);
                }}
              >
                더보기
              </button>
            </>
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={
            // <Context1.Provider value={{ 재고 }}>
            //   <Detail shoes={shoes}></Detail>
            // </Context1.Provider>
            <Detail shoes={shoes}></Detail>
          }
        ></Route>
        <Route path="/cart" element={<Cart></Cart>} />

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
      {/* <div>
        <button
          onClick={() => {
            //따봉변경(따봉[0] + 1);
            let copy = [...따봉];
            copy[0] = copy[0] + 1;
            따봉변경(copy);
          }}
        >
          따봉버튼
          {console.log("따봉 :", 따봉[0])}
        </button>
        {따봉[0]}
      </div> */}
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

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
        fontWeight: "bold",
      }}
    >
      <p>Loading...</p>
    </div>
  );
};
export default App;
