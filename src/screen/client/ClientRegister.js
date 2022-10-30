import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axiosAuthInstance from "../../api/API";

export default function ClientRegister() {
    let history = useHistory();

    let [clients, setClients] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        axiosAuthInstance.get("/client/clients")
            .then(function (response) {
                setClients(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return <>
        <div className="col-12 mt-4 table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >Scope</th>
                        <th >Grant Types</th>
                        <th >Redirect URI</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.clientId}>
                            <th >{client.clientId}</th>
                            <td>{client.scopes}</td>
                            <td>{client.grantType}</td>
                            <td>{client.redirectUrl}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}