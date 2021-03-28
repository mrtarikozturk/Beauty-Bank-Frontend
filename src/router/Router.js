import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import {
    Signin,
    SignupDetail,
    SignupMenu,
    DashboardAdmin,
    DashboardClient,
    DashboardConnector,
    DashboardProfessional,
    DashboardSponsor,
    EmailVerify,
    Profile,
    CreateTicket,
    ConfirmTicket,
    TermsApproved,
    ConnectorClientList,
} from '../pages/Index';
import { Footer } from '../components/Index';
import { AppContext } from '../context/AppContext';
import { ConnectorProList } from '../pages/ConnectorProList';

const AppRouter = () => {

    const { user } = useContext(AppContext);
    // console.log(user);
    // console.log(user?.role);
    return (
        <Router>
            <Switch>
                <Route exact path='/register' component={SignupMenu} />
                <Route exact path='/register/:id' component={SignupDetail} />
                <Route exact path='/login' component={Signin} />
                <Route exact path='/admin' component={user?.role === 'Admin' ? DashboardAdmin : Signin} />
                <Route exact path='/client' component={user?.role === 'Client' ? DashboardClient : Signin} />
                <Route exact path='/client-profile' component={user?.role === 'Client' ? Profile : Signin} />
                <Route exact path='/connector' component={user?.role === 'Connector' ? DashboardConnector : Signin} />
                <Route exact path='/connector-profile' component={user?.role === 'Connector' ? Profile : Signin} />
                <Route exact path='/connector-client-list' component={user?.role === 'Connector' ? ConnectorClientList : Signin} />
                <Route exact path='/connector-pro-list' component={user?.role === 'Connector' ? ConnectorProList : Signin} />
                <Route exact path='/professional' component={user?.role === 'Pro' ? DashboardProfessional : Signin} />
                <Route exact path='/professional-profile' component={user?.role === 'Pro' ? Profile : Signin} />
                <Route exact path='/sponsor' component={user?.role === 'Sponsor' ? DashboardSponsor : Signin} />
                <Route exact path='/sponsor-profile' component={user?.role === 'Sponsor' ? Profile : Signin} />
                <Route exact path='/create-ticket' component={user?.role === 'Client' ? CreateTicket : Signin} />
                <Route path='/email-verify/:token' component={EmailVerify} />
                <Route path='/ticket/confirm/:id' component={ConfirmTicket} />
                <Route path='/terms_approved/:id' component={TermsApproved} />
            </Switch>
            {/* <Footer /> */}
        </Router>
    )
}

export default AppRouter;

