import React from 'react';
import { Select, MenuItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    select: {
        '& .MuiSelect-select.MuiSelect-select': {
            padding: theme.spacing(2)
        }
    },
    flag: {
        margin: 'auto',
        width: '30px',
    }
}))


const LanguageOption = ({ lang, handleChangeFlag }) => {

    const classes = useStyles();

    return (
        <Select
            className={classes.select}
            value={lang}
            onChange={handleChangeFlag}
            disableUnderline
            IconComponent={() => ('')}
        >
            <MenuItem value={'en'}>
                <img className={classes.flag} src={'../images/united-kingdom.png'} alt='EN' />
            </MenuItem>
            <MenuItem value={'nl'}>
                <img className={classes.flag} src={'../images/netherlands.png'} alt='NL' />
            </MenuItem>
        </Select>
    )
}

export default LanguageOption
