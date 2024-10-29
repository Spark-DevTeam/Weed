import "@styles/Index.scss";
import blind from "@images/blind.png";
import friend from '@images/friend.png'

const Friends = () => {
  return (
    <div className="friends">
      <div className="blind">
        <img src={blind} alt="Blind" />
      </div>
      <div className="title">Invite Friends</div>
      <div className="subtitle">
        <span>Invite</span> your friends and <span>earn points</span> % from
        their earnings
      </div>
      <div className="friends-list">
        <div className="item">
          <div className="left">
            <div className="ava"></div>
            <div className="info">
                <div className="name">Huden</div>
                <div className="friend">
                    <img src={friend} />
                    <span>+5</span>
                </div>
            </div>
          </div>
          <div className="right">
            <span>2,500,320</span>
          </div>
        </div>

        <div className="item">
          <div className="left">
            <div className="ava"></div>
            <div className="info">
                <div className="name">Huden</div>
                <div className="friend">
                    <img src={friend} />
                    <span>+5</span>
                </div>
            </div>
          </div>
          <div className="right">
            <span>2,500,320</span>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="claim">Claim 25,008</button>
        <button className="invite">Invite</button>
      </div>
    </div>
  );
};

export default Friends;
