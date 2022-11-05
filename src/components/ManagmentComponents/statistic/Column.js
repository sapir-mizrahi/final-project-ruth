// #2:
import React from "react";
//npm i canvasjs-react-charts
import { CanvasJSChart } from 'canvasjs-react-charts'
const Column = (props) => {
  const { allPackages } = props;
  const options = {
    title: {
      text: "Most Useful Packages"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: allPackages[0]?.name, y: 10 },
        { label: allPackages[1]?.name, y: 15 },
        { label: allPackages[2]?.name, y: 25 },
        { label: allPackages[3]?.name, y: 30 },
        { label: allPackages[4]?.name, y: 28 }
      ]
    }]
  }
  return (
    <div style={{ margin: "auto", width: "60vw" }}>
      <CanvasJSChart options={options}
      />
    </div>
  );
}
export default Column;
