import * as React from "react";
import './NoMatch.css';
import { Link } from 'react-router-dom';

export default function NoMatch() {
    return (
        <div className="not-found">
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}