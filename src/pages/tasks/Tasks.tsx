import "@styles/Index.scss";
import blind from "@images/blind.png";
import friend from "@images/friend.png";

const Tasks = () => {
  return (
    <div className="tasks">
      <div className="blind">
        <img src={blind} alt="Blind" />
      </div>
      <div className="title">Tasks</div>
      <div className="subtitle">
        <span>Complete</span> tasks and <span>earn</span> points
      </div>

      <div className="friends-list">
        <div className="item">
          <div className="left">
            <div className="ava"></div>
            <div className="info">
              <div className="task">Follow Fudless in IG</div>
              <div className="friend">
                <span>+1000 points</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="open">Open</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
