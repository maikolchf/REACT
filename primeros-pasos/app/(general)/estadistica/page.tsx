'use client'
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Ventas',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const options = {
  scales: {
    x: {         
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'], // Aquí deberías proporcionar las etiquetas para las categorías
    },
    y: {
      beginAtZero: true,
    },
    category: ''
  },
};

export default function NamePage() {
  return (
    <>
      <Bar
        data={data}  
        options={options}            
      />
    </>
  );
}
