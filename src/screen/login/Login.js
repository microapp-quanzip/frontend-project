import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthenContext } from '../../components/provider/AuthenProvider';
import './login.css';
import axios from 'axios';
import { SERVER } from '../../api/API';

export default function Login() {
    let history = useHistory();
    let authCtx = useContext(AuthenContext)

    useEffect(() => {
        checkAuthorizationCode()
    }, [])

    let login = () => {
        const authURL = `${SERVER.auth_uri}/oauth/authorize?client_id=${SERVER.clientId}&scope=${SERVER.scopes}&redirect_uri=${SERVER.callback_uri}&response_type=code`
        window.location.href = (authURL)
    }

    let checkAuthorizationCode = () => {
        let authorizationCode = getUrlParameter("code")
        if (authorizationCode)
            getAccessToken(authorizationCode)
    }

    let getAccessToken = async (code) => {
        const params = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: SERVER.callback_uri
        }

        const headers = {
            'Authorization': 'Basic ' + Buffer.from(SERVER.clientId + ":" + SERVER.clientSecret).toString('base64'),
            'Content-Type': 'application/json'
        }

        var config = {
            baseURL: SERVER.auth_uri,
            method: 'post',
            url: '/oauth/token',
            headers,
            params
        };

        let response = await axios(config)

        let token = response.data
        authCtx.login(token)
        history.replace("/")
    }

    let getUrlParameter = (sParam) => {
        var sPageURL = window.location.search.substring(1)
        var sURLVariables = sPageURL.split('&')
        var sParameterName
        var i

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    }

    return (
        <div className="container h-80">
            <div className="row align-items-center h-100">
                <div className="col-3 mx-auto mt-5">
                    <div className="text-center">
                        <img id="profile-img" className="rounded-circle profile-img-card" src="/anonymous.png" />
                        <form className="form-signin">
                            <button onClick={login} className="btn btn-lg btn-primary btn-block btn-signin" type="button">LOGIN TO JMASTER.IO</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}