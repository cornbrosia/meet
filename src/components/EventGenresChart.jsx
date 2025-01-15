// src/components/EventGenresChart.jsx

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define colors for different genres
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);  // Local state for chart data

  // Array of event topics to search for in event summaries
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  // 🔢 Generate genre data with nested .filter() and return 'data'
  const getGenreData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary && event.summary.toLowerCase().includes(genre.toLowerCase())
      );
      return { name: genre, value: filteredEvents.length };
    });

    return data.filter((genre) => genre.value > 0);
  };

  // 📊 Update 'data' when component mounts or 'events' changes
  useEffect(() => {
    setData(getGenreData());
  }, [events]);

  // 🏷️ Customized label for pie slices
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}              // Pie chart data
          dataKey="value"          // Size of each slice
          nameKey="name"           // Slice labels
          cx="50%"
          cy="50%"
          outerRadius={150}        // Bigger radius for better visibility
          fill="#8884d8"
          labelLine={false}        // Hide default label lines
          label={renderCustomizedLabel}  // 🏷️ Custom label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
