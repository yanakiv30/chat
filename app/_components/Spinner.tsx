import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function Spinner() {
  return (
    <div className="spinner" style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 999 }}>
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
    </div>
  );
}
export default Spinner;
