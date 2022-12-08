import { AiOutlineSend } from "react-icons/ai";

export const ChatForm = ({ userData, setUserData, sendMessage }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="input-container">
      <form className="input-box" onSubmit={(event) => handleSubmit(event)}>
        <input
          className="input"
          type="text"
          placeholder="메시지 보내기"
          value={userData.message}
          onChange={(event) => handleChange(event)}
        />
        <AiOutlineSend size="2rem" color="gray" cursor="pointer" />
      </form>
    </div>
  );
};
