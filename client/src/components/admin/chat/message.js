import "./message.css";

const message = ({own}) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQIlzA34k6wJFdlStpzdI-IM3YYvUduKgx-teD160EpEGUrZZGTB6g8BGngoNtf1qbLE&usqp=CAU"
          alt=""
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet. Aut culpa repellat aut sint facere aut
          galisum facere ea provident repellat et perspiciatis provident. Non
          dolores optio qui ipsam atque ab voluptatem internos et velit
          consequuntur et magni nulla. Et laboriosam tempora est pariatur animi
          id odio quasi qui quibusdam dignissimos vel quibusdam impedit qui fuga
          quidem. Eos veritatis commodi ut officiis soluta et galisum sapiente
          eum quibusdam nisi.
        </p>
        
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default message;
