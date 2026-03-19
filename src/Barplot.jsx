import * as d3 from "d3";

const Barplot = ({ data }) => {
    const width = 600;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 40, left: 150 };
    
  
    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.students)])
    .range([0, width - margin.left - margin.right]);
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([0, height - margin.top - margin.bottom])
        .padding(0.1);

    console.log(xScale);
    return(
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                {data.map((d) => (
                    <rect
                        key={d.country}
                        x={0}
                        y={yScale(d.country)}
                        width={xScale(d.students)}
                        height={yScale.bandwidth()}
                        fill="steelblue"
                    />
                ))}
                {data.map((d) => (
                    <text
                        key={d.country}
                        x={-10}
                        y={yScale(d.country) + yScale.bandwidth() / 2}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        fontSize="12"
                    >
                        {d.country}
                    </text>
                ))}
            </g>
        </svg>
    )
}

export default Barplot;
