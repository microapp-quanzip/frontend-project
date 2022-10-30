import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axiosAuthInstance from "../../api/API";

export default function Accounts() {
    let history = useHistory();
    let [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        axiosAuthInstance.get("/user/accounts")
            .then(function (response) {
                setAccounts(response.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    let deleteAccount = (id) => {
        axiosAuthInstance.post('/user/account/delete/' + id)
            .then(function () {
                console.log("ok")
                fetchData()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let navigateEditAccount = (account) => {
        history.push("/account/update", account);
    }

    return <>
        <div className="col-12 mt-4">
            <Link to="/account/add" className="btn btn-primary">Create New</Link>
        </div>
        <div className="col-12 mt-4 table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th >STT</th>
                        <th >Name</th>
                        <th >Username</th>
                        <th >Email</th>
                        <th >Roles</th>
                        <th >Options</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.name}>
                            <th>{account.id}</th>
                            <td>{account.name}</td>
                            <td>{account.login}</td>
                            <td>{account.email}</td>
                            <td>
                                {account.roleDTOS.map(roleDTO => (
                                    <p key={roleDTO.id}>{roleDTO.role}</p>
                                ))}
                            </td>
                            <td>
                                <button onClick={() => navigateEditAccount(account)} type="button" className="btn btn-outline-primary">Edit</button>
                                <button onClick={() => deleteAccount(account.id)} type="button" className="btn btn-outline-danger m-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}