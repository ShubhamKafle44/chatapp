export const Message = ({ message }) => {
  console.log(message);
  if (message && message.type == "join")
    return <p>{`${message.sid} has joined`}</p>;
  if (message && message.type == "chat")
    return <p>{`${message.sid}: ${message.message}`}</p>;
};
