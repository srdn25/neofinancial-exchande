import * as React from 'react';

export default function About() {
    return (
        <div className="App-info">
            <h1>Currency exchange</h1>

            <p>
                Company looking to find the best currency conversion possible for our customers.
                However, we don’t have direct Canadian Dollar conversions to all currencies,
                so we have to trade currencies for other currencies.
                It is possible that we can go from one currency to another,
                and that a currency could show up multiple times.
            </p>
            <p>
                Example<br/>
                <br/>
                Convert CAD to EUR<br/>
                CAD - GBP - EUR<br/>
                <br/>
                There are no cycles<br/>
                <br/>
                CAD - GBP - EUR - GBP<br/>
                Utilizing the API data, return the best possible conversion rate for every currency we can get, assuming we start with $100 CAD.
            </p>

            <div id="phone-image-full-width">
                <img alt='phone' src='/phone-image.jpg' />
            </div>
        </div>
    );
}