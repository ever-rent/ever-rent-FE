import styled from "styled-components";

export const StyledJoin = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  .auth-box {
    display: none;
    background-color: aliceblue;
    padding: 10px;
    margin: 10px 0;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      button {
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }

  label {
    margin-bottom: 10px;
    font-weight: bold;
  }
  input {
    height: 30px;
    margin-bottom: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    height: 50px;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    color: #fff;
    font-size: large;
    font-weight: bold;
    background-color: #5902ff;
    cursor: pointer;
  }
  .span-box {
    display: flex;
    gap: 10px;
    justify-content: center;
    span:nth-child(2) {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  img {
    width: 200px;
    margin-bottom: 40px;
  }
  label {
    margin-bottom: 10px;
    font-weight: bold;
  }
  input {
    height: 30px;
    margin-bottom: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    height: 50px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: large;
    font-weight: bold;
    background-color: #5902ff;
    cursor: pointer;
  }
  .span-box {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    span {
      cursor: pointer;
    }
  }
`;
