import React, { useState, useEffect } from "react";
import exchangeGraphData from "../data/exchangeGraphData";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

function ShowExchangeGraph({ id }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await exchangeGraphData(id);
        setChartData(data.exchangeData); // Use the transformed data for chart
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, [id]); // Add id as a dependency

  return (
    <>
      <div className="graphOnly-whole-container">
        <h2 style={{ textAlign: "center", color: "#aaaaaa" }}>
          7d volume for {id}
        </h2>
        <style>
          {`
            .recharts-wrapper {
              background-color: white;
            }
            .recharts-surface {
              stroke: #aaa;
            }
            .recharts-cartesian-axis-line {
              stroke: #aaa;
            }
            .recharts-cartesian-grid {
              stroke: #aaa;
            }
            .recharts-text {
              fill: #aaa;
            }
          `}
        </style>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={300}
            height={150}
            data={chartData}
            margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="Date"
              axisLine={{ stroke: "#aaaaaa" }}
              tick={{ fill: "#aaaaaa" }}
            />
            <YAxis
              axisLine={{ stroke: "#aaaaaa" }}
              tick={{ fill: "#aaaaaa" }}
            />
            <Line
              type="monotone"
              dataKey="Price"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default ShowExchangeGraph;
