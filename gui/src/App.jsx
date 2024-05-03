import "./App.css";
import Navbar from "./Navbar.jsx";
import { Line } from "react-chartjs-2";
import data from "./data/serialtest.json";
import { useState, useEffect } from "react";
import beepSound from "./beep.mp3";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function App() {
    const graphData = data;
    const sampleData = graphData;
    const [playBeep, setPlayBeep] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // State for mute button

    const canvasData = {
        datasets: [
            {
                label: "Home",
                borderColor: "navy",
                pointRadius: 0,
                fill: true,
                backgroundColor: "yellow",
                lineTension: 0.4,
                data: sampleData,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "index",
            intersect: false,
        },
        scales: {
            x: {
                grid: {
                    display: true,
                },
                ticks: {
                    color: "red",
                    font: {
                        family: "Nunito",
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    display: true,
                },
                border: {
                    display: false,
                },
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    color: "green",
                    font: {
                        family: "Nunito",
                        size: 12,
                    },
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    const graphStyle = {
        minHeight: "10rem",
        maxWidth: "540px",
        width: "100%",
        border: "1px solid #C4C4C4",
        borderRadius: "0.375rem",
        padding: "0.5rem",
    };
    useEffect(() => {
        const audio = new Audio(beepSound);

        const checkSampleData = () => {
            const values = Object.values(sampleData);
            for (const value of values) {
                const numericValue = parseFloat(value);
                if (numericValue < 20 || numericValue > 80) {
                    if (!playBeep && !isMuted) {
                        setPlayBeep(true);
                        return;
                    }
                }
            }
            if (isMuted) {
                audio.pause();
                audio.currentTime = 0;
                setPlayBeep(false);
            }
        };

        checkSampleData();

        if (playBeep && !isMuted) {
            audio.play();
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                setPlayBeep(false);
            }, 1000); // Stop the beep after 1 second (adjust as needed)
        }
    }, [sampleData, playBeep, isMuted]);

    return (
        <div className="container">
            <Navbar />
            <h1>Moisture Reading GUI</h1>
            <div style={graphStyle} className="graph">
                <Line id="home" options={options} data={canvasData} />
            </div>
            {/* <button onClick={() => setPlayBeep(true)}>Play Beep</button> */}
            <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? "Unmute" : "Mute"}
            </button>
        </div>
    );
}

export default App;
