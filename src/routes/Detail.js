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
function Detail(props) {
  let { id } = useParams();

  const result = props.shoes.find((item) => item.id === parseInt(id));

  console.log(result);

  return (
    <div className="container">
      {/* <Box>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
      </Box> */}
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
