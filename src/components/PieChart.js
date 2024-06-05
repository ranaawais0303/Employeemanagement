import React, { useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import * as htmlToImage from "html-to-image";

const createFileName = (extension = "", ...names) => {
  if (!extension) {
    return "";
  }
  return `${names.join("")}.${extension}`;
};

function PieChart({ chartData, setShowPieChart }) {
  const screenshotArea = useRef(null); // Reference for chart canvas

  //   const handleClickOutside = (event) => {
  //     if (
  //       screenshotArea.current &&
  //       !screenshotArea.current.contains(event.target)
  //     ) {
  //       setShowPieChart(false);
  //     }
  //   };

  //   useEffect(() => {
  //     document.addEventListener("click", handleClickOutside, true);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside, true);
  //     };
  //   }, []);

  const downloadFile = (
    image,
    { name = "Pie Chart", extension = "jpg" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const handleMemeDownload = async () => {
    if (!screenshotArea.current) return;
    await htmlToImage.toJpeg(screenshotArea.current).then(downloadFile);
    alert("Meme saved as Pie Chart.jpg");
  };

  return (
    <div
      className="chart-container"
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={handleMemeDownload}
        style={{ width: 100, marginTop: 10, marginLeft: "80%" }}
      >
        Take Snapshot
      </button>
      <div
        ref={screenshotArea}
        style={{
          width: 500,
        }}
      >
        <Pie
          //   ref={handleMemeDownload}
          data={chartData}
          // height={300}
          // width={200}
          options={{
            plugins: {
              title: {
                display: true,
                text: "'Total Value by Date',",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default PieChart;
