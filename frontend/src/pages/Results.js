import React, { useState, useEffect } from 'react';
import { getPollResults, getSurveyResults } from '../api';

const Results = ({ type, id }) => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                if (type === 'poll') {
                    const response = await getPollResults(id);
                    setResults(response.data);
                } else if (type === 'survey') {
                    const response = await getSurveyResults(id);
                    setResults(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchResults();
    }, [type, id]);

    if (!results) return <div>Loading...</div>;

    return (
        <div>
            <h2>{type === 'poll' ? 'Poll' : 'Survey'} Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
    );
};

export default Results;
