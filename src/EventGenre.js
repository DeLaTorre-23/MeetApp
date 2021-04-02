import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const getData = () => {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
    const data = genres.map((genre) => {
      const value = events.filter(({ summary }) =>
        summary.split(" ").includes(genre)
      ).length;
      return { name: genre, value };
    });
    return data;
  };

  const colors = ["#ff25c8", "#ff7e62", "#ffce44", "#e6ff86", "#acffd8"];

  return (
    <ResponsiveContainer
      className="chart-responsiveContainer chart-pieChart"
      height={400}
    >
      <PieChart>
        <Pie
          data={data}
          cx="47%"
          cy="50%"
          labelLine={false}
          legendType="square"
          outerRadius={80}
          fill="#c51f5d"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              name={entry.name}
            />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
        ></Legend>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
