import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar,Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Size } from 'react-bootstrap/lib/utils/StyleConfig';
import '../PerformancePage.css';
import './SemCharts.css'

export default function Sem3Chart() {
 

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const rollnumber = params.get('roll');
    const [users, setUsers] = useState({});
    
    const url = `http://localhost:5000/sem3/${rollnumber}`;
    
    const fetchUserData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
        });
    
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          console.log(data);
        } else {
          console.log('Error');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    
    useEffect(() => {
      fetchUserData()
    }, [])
    
    useEffect(() => {
      console.log(users);
    }, [users]);

   
 const labelss = ['OOP', 'OS', 'MSF', 'DSGT', 'DLCO'];

 const dataa =labelss.map(function getMarks(item)
 {
    return users[item];
 })

  const chartData = {
    labels: labelss,
    datasets: [{
      label: 'Scores',
      data: dataa,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(201, 203, 207, 1)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      xAxisID: 'Subjects',
      yAxisID: 'Marks'
    },
  ]
  };
  return <div className="chartBody" >
    <p className='chartTitle'> Your Performance
    </p>
    <Bar className="Bar" data={chartData }/>
    </div>;
}