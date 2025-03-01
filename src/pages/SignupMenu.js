import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    container: {
        padding: theme.spacing(20, 0),
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(5, 5),
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(10, 10),
        },
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        height: theme.spacing(50),

    },
}));



const SignupMenu = () => {
    const classes = useStyles();
    const history = useHistory();
    const { formatMessage } = useIntl();

    const handleClick = (event) => {
        history.push(`/register/${event.currentTarget.value.toLowerCase()}`)
    }

    const items = [
        {
            title: formatMessage({
                id: 'client',
                defaultMessage: 'Client'
            }),
            price: '0',
            description: [formatMessage({
                id: 'client_message',
                defaultMessage: 'U kunt onder  de verzekering van  onze stichting terecht    voor een goede service. Alstublieft!'
            })],
            buttonText: formatMessage({
                id: 'thats_me',
                defaultMessage: 'That\'s me!'
            }),
            buttonVariant: 'outlined',
            imageURL: '../images/client.jpg',
        },
        {
            title: formatMessage({
                id: 'professional',
                defaultMessage: 'Professional'
            }),
            // subheader: 'Most Popular',
            price: '15',
            description: [
                formatMessage({
                    id: 'professional_message',
                    defaultMessage: 'Wil je je klanten niet imponeren met je talenten en ze een goede service bieden?'
                }),
            ],
            buttonText: formatMessage({
                id: 'thats_me',
                defaultMessage: 'That\'s me!'
            }),
            buttonVariant: 'outlined',
            imageURL: 'images/professional.jpg',
        },
        {
            title: formatMessage({
                id: 'connector',
                defaultMessage: 'Connector'
            }),
            subheader: '',
            price: '30',
            description: [
                formatMessage({
                    id: 'connector_message',
                    defaultMessage: 'Als vrijwillig medewerker van onze stichting bouw je een brug tussen professionals en klanten.'
                }),
            ],
            buttonText: formatMessage({
                id: 'contact_us',
                defaultMessage: 'Contact Us'
            }),
            buttonVariant: 'contained',
            imageURL: '../images/connector.jpg',
        },
        {
            title: formatMessage({
                id: 'sponsor',
                defaultMessage: 'Sponsor'
            }),
            subheader: '',
            price: '30',
            description: [
                formatMessage({
                    id: 'sponsor_message',
                    defaultMessage: 'Wilt u als sponsor deelnemen om onze stichting te helpen een breder publiek te bereiken?'
                }),
            ],
            buttonText: formatMessage({
                id: 'contact_us',
                defaultMessage: 'Contact Us'
            }),
            buttonVariant: 'contained',
            imageURL: 'images/sponsor.jpg',
        },

    ];

    return (
        <Container maxWidth="lg" >
            <Grid container spacing={5} className={classes.container}>
                {items.map((item) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={item.title} xs={12} sm={6} md={3} alignItems="center" style={{ display: 'flex' }}>
                        <Card>
                            <CardHeader
                                title={item.title}
                                subheader={item.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                action={item.title === 'Professional' ? <StarIcon /> : null}
                                className={classes.cardHeader}
                            />
                            <CardMedia

                                className={classes.cardMedia}
                                image={item.imageURL}
                                title={item.title}
                            />
                            <CardContent>
                                <ul>
                                    {item.description.map((line) => (
                                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                                            {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={handleClick}
                                    fullWidth
                                    variant={item.buttonVariant}
                                    color="secondary"
                                    value={item.title}
                                >
                                    {item.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export { SignupMenu };
