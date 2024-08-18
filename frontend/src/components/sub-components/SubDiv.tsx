import "../App.css"
import { FirstRowDivContent } from "../Data";

const SubDiv = () => {
  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

  return (
    <div className="sub-div-container">
      {FirstRowDivContent.map((firstrowcont) => {
        return (
          <div className="sub-div" key={firstrowcont.id}>
            <h1 className="title">{firstrowcont.text}</h1>
            <p className="description">{formatNumber(firstrowcont.Number)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SubDiv;
