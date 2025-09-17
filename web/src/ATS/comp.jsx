import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyzeChart = ({ scores }) => {
  const overall_score = scores["Overall Score"] || 0;
  const readability_score = scores["Readability Score"] || 0;
  const ats_compatibility_score = scores["ATS Compatibility Score"] || 0;
  const overall_match_percentage = scores["Overall Match"] || 0;

  const data = {
    labels: ["Overall Score", "Readability", "ATS Compatibility", "Overall Match"],
    datasets: [
      {
        label: "Analysis Scores",
        data: [
          overall_score,
          readability_score,
          ats_compatibility_score,
          overall_match_percentage,
        ],
        backgroundColor: " rgba(56, 222, 97, 0.8)",
        borderColor: " rgba(56, 222, 97, 0.8)",
        borderWidth: 1,
        barPercentage: 0.6, // Decrease bar width
        categoryPercentage: 0.9, // Place bars closer
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow dynamic height
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: "",
        color: "#FFFFFF",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: { top: 0, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#1E293B",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "rgba(56, 222, 97, 0.8)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // Set maximum height to 100
        grid: {
          color: (context) => {
            // Make grid lines invisible inside the bars
            const tickValue = context.tick.value;
            return tickValue === 0 || tickValue === 100 ? "#CCCCCC" : "rgba(0,0,0,0)";
          },
          drawBorder: false, // Remove border around the Y-axis
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
          stepSize: 20, // Add steps for better readability
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "80%", // Decrease overall width of the chart box
        margin: "0 auto", // Center the chart box
      }}
    >
        <h1 className="text-3xl font-semibold	">Resume Analysis Overview</h1>
      <h3
        style={{
          color: "#FFFFFF",
          fontSize: "16px",
          marginBottom: "1px",
        }}
      >
        Key scores and metrics from your resume analysis
      </h3>
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalyzeChart;
