import React from 'react';
import './infoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';


function infoBox({ title, cases, total, ...props }) {
    return (
        <Card onClick={props.onClick} className="infoBox">
            <CardContent>
                {/**Title */}
                <Typography className="infoxBox__title" color="textSecondary">
                    {title}
                </Typography>
                
                {/**Number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>

                {/**1.2M total */}
                <Typography className="infoBox__total" color="textPrimary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default infoBox
