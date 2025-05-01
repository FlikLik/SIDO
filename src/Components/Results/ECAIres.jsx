import { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function ECAIres() {
    const [chartData, setChartData] = useState([])
    const colors = ['#32a852', '#a83253', '#329194', '#727ce8']

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        const name = localStorage.getItem('company')
        const year = '2024'
        axios.post('http://localhost:3000/ecairesults', { name, year })
            .then(response => {
                const formattedData = [
                    { name: 'Educación', value: response.data.eValue },
                    { name: 'Capacitación', value: response.data.cValue },
                    { name: 'Adiestramiento', value: response.data.aValue },
                    { name: 'Instrucción', value: response.data.iValue }
                ]
                setChartData(formattedData)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            {
                chartData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={500}>
                        <PieChart width={800} height={800} key={chartData.length}>
                            <Pie isAnimationActive={true} animationDuration={1500} data={chartData} dataKey={'value'} nameKey={'name'} fill='#8884d8' label={renderCustomizedLabel} labelLine={false}>
                                {
                                    chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '1.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px white' }} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : <p className='title is-4'>Cargando...</p>
            }
        </>
    )
}