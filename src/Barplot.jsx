import { useState } from "react";
import * as d3 from "d3";
import "./barplot.css"

const Barplot = ({ data }) => {
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [hoveredPosition, setHoveredPosition] = useState(null);
    
    const width = 1000;
    const height = 1500;
    const margin = { top: 20, right: 20, bottom: 40, left: 150 };
    const squareSize = 15;
    const squareGap = 5;
    const squaresPerRow = 25;
    const rowHeight = squareSize + squareGap;
    const countrySpacing = 20;
    
    let currentY = 0;
    const countryPositions = data.map(d => {
        const numRows = Math.ceil(d.students / squaresPerRow);
        const gridHeight = numRows * rowHeight;
        const yPos = currentY;
        currentY += gridHeight + countrySpacing;
        return { country: d.country, y: yPos, gridHeight };
    });

    return(
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                {data.map((d, idx) => {
                    const squares = [];
                    const { y: baseY, gridHeight } = countryPositions[idx];
                    
                    for (let i = 0; i < d.students; i++) {
                        const row = Math.floor(i / squaresPerRow);
                        const col = i % squaresPerRow;
                        squares.push(
                            <rect
                                key={`${d.country}-${i}`}
                                x={col * (squareSize + squareGap)}
                                y={baseY + row * rowHeight}
                                width={squareSize}
                                height={squareSize}
                                fill="firebrick"
                                rx={3}
                                className={`waffle-square ${hoveredCountry?.country === d.country ? 'hovered' : ''}`}
                            />
                        );
                    }
                    
                    return (
                        <g 
                            key={d.country}
                            onMouseEnter={() => {
                                const lastSquareCol = d.students >= squaresPerRow 
                                    ? squaresPerRow - 1 
                                    : (d.students - 1) % squaresPerRow;
                                const tooltipX = (lastSquareCol + 1) * (squareSize + squareGap) + 20;
                                setHoveredCountry(d);
                                setHoveredPosition({ y: baseY, gridHeight, x: tooltipX });
                            }}
                            onMouseLeave={() => {
                                setHoveredCountry(null);
                                setHoveredPosition(null);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            {squares}
                        </g>
                    );
                })}
                {countryPositions.map((pos) => (
                    <text
                        key={pos.country}
                        x={-10}
                        y={pos.y + pos.gridHeight / 2}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        fontSize="12"
                    >
                        {pos.country}
                    </text>
                ))}
                
                {hoveredCountry && hoveredPosition && (
                    <g>
                        <rect
                            x={hoveredPosition.x}
                            y={hoveredPosition.y}
                            width={200}
                            height={60}
                            fill="white"
                            stroke="black"
                            strokeWidth={1}
                            rx={5}
                        />
                        <text 
                            x={hoveredPosition.x + 10} 
                            y={hoveredPosition.y + 25} 
                            fontSize="14" 
                            fontWeight="bold"
                        >
                            {hoveredCountry.country}
                        </text>
                        <text 
                            x={hoveredPosition.x + 10} 
                            y={hoveredPosition.y + 45} 
                            fontSize="12"
                        >
                            {hoveredCountry.students} students
                        </text>
                    </g>
                )}
            </g>
        </svg>
    )
}

export default Barplot;
