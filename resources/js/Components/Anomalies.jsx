import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AnomalousStudentsCarousel = () => {
    const [anomalousStudents, setAnomalousStudents] = useState([]);

    useEffect(() => {
        fetchAnomalousStudents();
    }, []);

    const fetchAnomalousStudents = async () => {
        try {
            const response = await axios.get('/api/anomalous-students');
            setAnomalousStudents(response.data);
        } catch (error) {
            console.error('Error fetching anomalous students:', error);
        }
    };

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    return (
        <div className="p-4">

            {anomalousStudents.length > 0 ? (
                <Carousel responsive={responsive}>
                    {anomalousStudents.map((student, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-md">
                            <h4 className="text-md font-semibold">Student ID: {student.student_id}</h4>
                            <Scatter
                                data={{
                                    datasets: [
                                        {
                                            label: 'Normal Marks',
                                            data: student.all_marks.map(mark => ({
                                                x: mark.subject_id,
                                                y: mark.marks
                                            })),
                                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                                            pointRadius: 8,
                                            pointHoverRadius: 10
                                        },
                                        {
                                            label: 'Anomalous Marks',
                                            data: [
                                                { x: student.anomalous_mark.subject_id, y: student.anomalous_mark.marks_original }
                                            ],
                                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                                            pointRadius: 8,
                                            pointHoverRadius: 10
                                        }
                                    ]
                                }}
                                options={{
                                    scales: {
                                        x: {
                                            type: 'linear',
                                            position: 'bottom',
                                            title: {
                                                display: true,
                                                text: 'Subject ID'
                                            }
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: 'Marks'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    ))}
                </Carousel>
            ) : (
                <p>No anomalies detected.</p>
            )}
        </div>
    );
};

export default AnomalousStudentsCarousel;
