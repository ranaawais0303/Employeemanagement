import React from "react";

const PieChartManual = ({ data, size = 200 }) => {
  const radius = size / 2;
  const total = data.reduce((sum, { value }) => sum + value, 0);

  let offset = 0;

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent) * radius;
    const y = Math.sin(2 * Math.PI * percent) * radius;
    return [x, y];
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`-${radius} -${radius} ${size} ${size}`}
    >
      {data.map((slice, index) => {
        const startOffset = offset;
        const [startX, startY] = getCoordinatesForPercent(startOffset / total);
        offset += slice.value;
        const [endX, endY] = getCoordinatesForPercent(offset / total);

        const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

        return (
          <path
            key={index}
            d={`
              M 0 0
              L ${startX} ${startY}
              A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
              Z
            `}
            fill={slice.color}
          />
        );
      })}
    </svg>
  );
};

export default PieChartManual;
