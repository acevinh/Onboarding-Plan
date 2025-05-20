// hooks/useDashboard.js
import { useEffect, useRef, useState } from "react";
import { getDasboardData } from "../api/dasboardApi";


export const useDashboard = () => {
  const [chartData, setChartData] = useState({
    installs: [],
    uninstalls: [],
    labels: [],
  });
  const [discountData, setDiscountData] = useState({});
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const lineChartRef = useRef(null);
  const discountChartRef = useRef(null);

  // Fetch Data
  const fetchData = async (startDate = minDate, endDate = maxDate) => {
    try {
      const response = await getDasboardData({ startDate, endDate });
      const data = response.data.data;
      setChartData({
        installs: data.install_uninstall_data.map((item) => item.installs),
        uninstalls: data.install_uninstall_data.map((item) => item.uninstalls),
        labels: data.install_uninstall_data
          .map((item) => item.date)
          .filter(Boolean),
      });

      setDiscountData({
        ...data.discount_data,
        free: data.store_useFree,
        premium: data.store_usePremium,
        uninstalled: data.store_uninstalled,
        active: data.store_active,
      });

      setMinDate(data.oldest_date);
      setMaxDate(data.latest_date);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle Filter Button Click
  const handleFilter = () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (startDate < minDate || endDate > maxDate) {
      alert(`Please select dates between ${minDate} and ${maxDate}`);
      return;
    }

    fetchData(startDate, endDate);
  };

  // Draw Line Chart on Data Change
  useEffect(() => {
    if (chartData.labels.length > 0 && lineChartRef.current) {
      const ctx = lineChartRef.current.getContext("2d");
      const lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Daily Installs",
              data: chartData.installs,
              borderColor: "rgba(59, 130, 246, 1)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.3,
            },
            {
              label: "Daily Uninstalls",
              data: chartData.uninstalls,
              borderColor: "rgba(239, 68, 68, 1)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Installs vs Uninstalls",
              font: {
                size: 16,
              },
            },
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                tooltipFormat: "MMM d, yyyy",
              },
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Count",
              },
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        lineChart.destroy();
      };
    }
  }, [chartData]);

  // Draw Pie Chart on Discount Data Change
  useEffect(() => {
    if (
      discountData &&
      Object.keys(discountData).length > 0 &&
      discountChartRef.current
    ) {
      const ctx1 = discountChartRef.current.getContext("2d");
      const discountChart = new Chart(ctx1, {
        type: "pie",
        data: {
          labels: [
            "0 Discounts",
            "5 Discounts",
            "10 Discounts",
            "More than 10 Discounts",
          ],
          datasets: [
            {
              label: "Number of Stores",
              data: [
                discountData["0"] || 0,
                discountData["5"] || 0,
                discountData["10"] || 0,
                discountData["more_than_10"] || 0,
              ],
              backgroundColor: [
                "rgba(239, 68, 68, 0.7)",
                "rgba(59, 130, 246, 0.7)",
                "rgba(234, 179, 8, 0.7)",
                "rgba(16, 185, 129, 0.7)",
              ],
              borderColor: [
                "rgba(239, 68, 68, 1)",
                "rgba(59, 130, 246, 1)",
                "rgba(234, 179, 8, 1)",
                "rgba(16, 185, 129, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "Stores by Discount Count",
              font: {
                size: 16,
              },
            },
          },
        },
      });

      return () => {
        discountChart.destroy();
      };
    }
  }, [discountData]);

  // On initial load, fetch data
  useEffect(() => {
    fetchData();
  }, []);

  return {
    chartData,
    discountData,
    minDate,
    maxDate,
    lineChartRef,
    discountChartRef,
    handleFilter,
    setMinDate,
    setMaxDate,
  };
};