import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ tests }) {
    return (
        <div className="tests-grid">
            {tests.map(test => (
                <Link key={test.id} to={`/test/${test.id}`}>
                    <div className="test-item">
                        <img src={test.image} alt={test.title} />
                        <h2>{test.title}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Home;
