import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "antd";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function DashBoardChart({ carts }) {
  const [dataSource, setDataSource] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    const labels = carts.map((cart) => {
      return `Tên khách: ${cart.userId.lastName}`;
    });
    const data1 = carts.map((cart) => {
      return cart.total;
    });
    const dataSource = {
      labels,
      datasets: [
        {
          label: "Tổng tiền mua hàng",
          data: data1,
          backgroundColor: "rgba(255,0,0,1)",
        },
      ],
    };
    setDataSource(dataSource);
  }, [carts]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Số liệu mua hàng gần đây",
      },
    },
  };
  return (
    <Card>
      <Bar options={options} data={dataSource} />
    </Card>
  );
}
export default DashBoardChart;
