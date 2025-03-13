import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

interface DailyStats {
  date: string;
  count: number;
}

function Dashboard() {
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    // 初始化图表
    const chartDom = document.getElementById('completedTodosChart');
    if (chartDom) {
      const chart = echarts.init(chartDom);
      setChartInstance(chart);
      return () => chart.dispose();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DailyStats[]>('http://localhost:5000/api/statistics/completed-todos');
        const data = response.data;

        if (chartInstance) {
          const option = {
            title: {
              text: '近7天任务完成情况',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              data: data.map(item => item.date),
              axisLabel: {
                formatter: (value: string) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }
              }
            },
            yAxis: {
              type: 'value',
              minInterval: 1,
              axisLabel: {
                formatter: '{value} 个'
              }
            },
            series: [
              {
                name: '完成任务数',
                type: 'line',
                data: data.map(item => item.count),
                smooth: true,
                itemStyle: {
                  color: '#4CAF50'
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgba(76, 175, 80, 0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(76, 175, 80, 0.1)'
                    }
                  ])
                }
              }
            ]
          };
          chartInstance.setOption(option);
        }
      } catch (error) {
        console.error('获取统计数据失败:', error);
      }
    };

    fetchData();
    // 每5分钟更新一次数据
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [chartInstance]);

  return (
    <div className="dashboard-container">
      <div
        id="completedTodosChart"
        style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
}

export default Dashboard;