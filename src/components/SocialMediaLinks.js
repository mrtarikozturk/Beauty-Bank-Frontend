import { Chip, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0, 1)
    }
}))

export const SocialMediaLinks = ({ socialMedia }) => {

    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            {
                Object.keys(socialMedia).map((key) => {
                    return (
                        <Grid item>
                            <Chip
                                // className={classes.root}
                                label={socialMedia[key].label}
                                color={socialMedia[key].color}
                                size={socialMedia[key].size}
                                icon={socialMedia[key].icon}
                                onClick={() => window.open(socialMedia[key].url)}
                            />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}
