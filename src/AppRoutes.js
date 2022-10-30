import React, { useEffect } from "react";
import { Route } from "react-router";
import Accounts from "./screen/accounts/Accounts";
import AddAccount from "./screen/accounts/AddAccount";
import EditAccount from "./screen/accounts/EditAccount";
import ClientRegister from "./screen/client/ClientRegister";
import Statistic from "./screen/statistic/Statistic";
import Email from "./screen/email/Email";

export const routes = [
    {
        path: '/accounts',
        component: Accounts,
        name: "Accounts",
        exact: true
    },
    {
        path: '/account/add',
        component: AddAccount,
        name: "Add Account",
        exact: true
    },
    {
        path: '/account/update',
        component: EditAccount,
        name: "Edit Account",
        exact: true
    },
    {
        path: '/statistics',
        component: Statistic,
        name: "Statistics",
        exact: true
    },
    {
        path: '/clients',
        component: ClientRegister,
        name: "Clients Register",
        exact: true
    },
    {
        path: '/emails',
        component: Email,
        name: "Emails list",
        exact: true
    },

]

export const AppRoute = (props) => {
    const { name, ...other } = props

    useEffect(() => {
        document.title = props.name || "JMaster.io Dashboard";
    }, [props.path]);

    return <Route {...other} />
}