// import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Result.css";
import Problempic from "../Assets/undraw_problem_solving_re_4gq3.svg";
import Analyticpic from "../Assets/undraw_analytics_re_dkf8.svg";
import Researchpic from "../Assets/undraw_logic_re_nyb4.svg";
import Creativitypic from "../Assets/undraw_creativity_wqmm.svg";
import Leaderpic from "../Assets/undraw_powerful_re_frhr.svg";
import { Progress,ChakraProvider,Box } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import { Center, Square, Circle } from "@chakra-ui/react";

function Result() {
    const data = [
        {
            name: 'Science',
            uv: 84,
        },
        {
            name: 'Commerce',
            uv: 30,
        },
        {
            name: 'Arts',
            uv: 10,
        }
    ];
    const scoreData = [
        {
            name: 'Logical',
            uv: 75,
        },
        {
            name: 'Verbal',
            uv: 70,
        },
        {
            name: 'Maths',
            uv: 95,
        }
    ];
    

    return (
        <div className="container">
            <h1 className="top-head">Career Guidance Report</h1>
            <div className="score">
                <div className="score-content-left">
                    <h3>Total Score</h3>
                    <svg viewBox="0 0 36 36" className="circular-chart red">
                        <path className="circle-bg"
                            d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray="70, 100"
                            d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">70%</text>
                    </svg>
                </div>
                <div className="score-content-right">
                    <div className="top-score">
                        <p className="score-heading">Best</p>
                        <p className="score-heading">Score</p>
                    </div>
                    <div className="top-score">
                        <div className="res-circle">
                            <div className="circle-txt">Logical</div>
                        </div>
                    </div>
                    <div className="top-score">
                        <div className="res-circle">
                            <div className="circle-txt">Maths</div>
                        </div>
                    </div>
                    <div className="top-score">
                        <div className="res-circle">
                            <div className="circle-txt">Gk</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chart">
                <div className="chart-content">
                    <ResponsiveContainer width="100%" aspect={3}>
                        <BarChart width={150} height={100} data={data} margin={{
                            top: 5, bottom: 5
                        }}>
                            <Bar dataKey="uv" fill="#8884d8" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-content">
                    <ResponsiveContainer width="100%" aspect={3} className="bar">
                        <BarChart width={150} height={100} data={scoreData} margin={{
                            top: 5, bottom: 5
                        }}>
                            <Bar dataKey="uv" fill="#eba434" width="10%" />
                            <XAxis dataKey="name" />
                            <YAxis markerEnd='100' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="top-skill">
                <div className="skill-card">
                    <h1>Problem Solving</h1>
                    <img src={Problempic} alt="image" className="skill-image"/>
                    <p className="skill-text"> 95/100</p>
                </div>
                <div className="skill-card">
                    <h1>Analytical</h1>
                    <img src={Analyticpic} alt="image" className="skill-image"/>
                    <p className="skill-text"> 95/100</p>

                </div>
                <div className="skill-card">
                    <h1>Research</h1>
                    <img src={Researchpic} alt="image" className="skill-image"/>
                    <p className="skill-text"> 95/100</p>
                </div>
                <div className="skill-card">
                    <h1>Creativity</h1>
                    <img src={Creativitypic} alt="image" className="skill-image"/>
                    <p className="skill-text"> 95/100</p>
                </div>
               
                <div className="skill-card">
               
                    <h1>Leadership</h1>
                    <img src={Leaderpic} alt="image" className="skill-image"/>
                    <p className="skill-text"> 95/100</p>
                    
                </div>
            </div>
            <div className="progress-skill">
                <div className="progress-card">
                    <p>Best Carrer For You!</p>
                    <ChakraProvider >
                        <Box>
                            <h2>Engineering</h2>
                            <Progress hasStripe value={84} />
                        </Box>
                        <Box>
                        <h2>Medical Science</h2>
                        <Progress hasStripe value={44} />
                        </Box>
                        <Box>
                        <h2>Doctor</h2>
                        <Progress hasStripe value={24} />
                        </Box>
                        <Box>
                        <h2>CA</h2>
                        <Progress hasStripe value={34} />
                        </Box>
                        <Box>
                        <h2>Lowyer</h2>
                        <Progress hasStripe value={14} />
                        </Box>
                        <Box>
                        <h2>Civil Services</h2>
                        <Progress hasStripe value={64} />
                        </Box>
                    </ChakraProvider>
                    
                </div>
            </div>
            
            <Center bg="tomato" h="100px" color="white">
  Thank You!
</Center>

        </div>
    )
}

export default Result
