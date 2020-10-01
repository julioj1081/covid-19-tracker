import React from 'react';
import './infoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';


function infoBox({ title, cases,isRed, active, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                {/**Title */}
                <Typography className="infoxBox__title" color="textSecondary">
                    {title}
                </Typography>
                
                {/**Number of cases si no tiene la case rojo la letra es verde */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>

                {/**1.2M total */}
                <Typography className="infoBox__total" color="textPrimary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default infoBox
