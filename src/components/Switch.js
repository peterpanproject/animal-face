import React from "react";
import "./Switch.css";

const Switch = ({changeGender, isChecked}) => {
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     return () => {
//       setIsChecked(false);
//     };
//   }, []);

//   function _handleChange() {
//     console.log(isChecked);
//     setIsChecked(!isChecked);
//   }

  return (
    <div className="switch-container">
      <label>
        <input
          checked={isChecked}
          onChange={changeGender}
          className="switch"
          type="checkbox"
        />
        <div>
          <div></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;

// React.render( <Switch isChecked={ true } />, document.getElementById( "page" ) );
