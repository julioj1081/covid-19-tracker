import React from 'react';
import './Table.css';
function Table({countries}) {
    return (
        <div className="table">
            <tr>
                <td>#</td>
                <td>Country</td>
                <td>Cases</td>
            </tr>
            {countries.map((country, cases) => (
                <tr>
                    <td><b>{cases}</b></td>
                    <td>{country.country}</td>
                    <td><strong>{country.cases}</strong></td>
                </tr>
            ))
            }
        </div>
    )
}

export default Table
