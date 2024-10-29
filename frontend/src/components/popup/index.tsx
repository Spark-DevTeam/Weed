import blind from "@images/blind.png";
import frame from "@images/frame.png";
import growing1 from '@images/growing1.png'
import "@styles/Popup.scss";

export const Popup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="popup">
      <div className="blind">
        <img src={blind} alt="Blind" />
      </div>
      <div className="popup-content">
        <div className="popup-title">
          <h2>Congratulations!</h2>
          <p>Your level has been increased!</p>
        </div>
        {/* Wrap both images in a container */}
        <div className="frame-container">
          <img src={frame} alt="Frame" className="frame-image" />
          <img src={growing1} alt="Growing Element" className="growing-image" />
        </div>
        <button className="close-button" onClick={onClose}>
          Next
        </button>
      </div>
    </div>
  );
};
