import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styled from "styled-components";

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;
// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `;

// let NewBtn = styled.button(YellowBtn)`
// asdfadfasdf
// `

/* eslint-disable jsx-a11y/alt-text */

//옛날 방법
// class Detail2 extends React.Component {
//   componentDidMount() {}

//   componentDidUpdate() {}
//   componentWillUnmount() {}
// }

function Detail(props) {
  //렌더링이 다 되고나서 실행됩니다
  // useEffect(() => {
  //   for (var i = 0; i < 10000; i++) {
  //     console.log(1);
  //   }
  //   console.log("안녕");
  // });

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    // 2초 후에 알림을 숨김
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    // 컴포넌트가 언마운트될 때 clearTimeout 호출
    return () => clearTimeout(timeoutId);
  }, []); // 빈 배열을 전달하여 마운트시에만 실행

  let [count, setCount] = useState(0);

  let { id } = useParams();

  const result = props.shoes.find((item) => item.id === parseInt(id));

  console.log(result);

  return (
    <div className="container">
      {/* <Box>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
      </Box> */}
      <div>
        {showAlert && (
          <div className="alert alert-warning">2초 이내 구매 시 할인</div>
        )}
        {/* 나머지 컴포넌트 내용 */}
      </div>

      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>

      {result ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={`https://codingapple1.github.io/shop/shoes${
                parseInt(id) + 1
              }.jpg`}
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{result.title}</h4>
            <p>{result.content}</p>
            <p>{result.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      ) : (
        <div>없는 페이지입니다.</div>
      )}
    </div>
  );
}
export default Detail;
