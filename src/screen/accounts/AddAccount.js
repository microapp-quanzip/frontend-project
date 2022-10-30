import { useState } from "react";
import { useHistory } from "react-router";
import axiosAuthInstance from "../../api/API";

export default function AddAccount() {
    let history = useHistory();
    const [account, setAccount] = useState({
        name: '',
        password: '',
        username: '',
        email: '',
        roles: []
    })
    const [error, setError] = useState()

    let setParam = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value })
    }

    var isAdmin = false;
    var isUser = false;
    //checkbox
    let setRolesAdmin = (event) => {
        isAdmin = event.target.value
    }
    //checkbox
    let setRolesUser = (event) => {
        isUser = event.target.value
    }

    let saveUser = async () => {
         account.roleDTOS = [];
        if(isAdmin){
            account.roleDTOS.push({role: "ROLE_ADMIN"})
        }
        if(isUser){
            account.roleDTOS.push({role: "ROLE_USER"})
        }
        axiosAuthInstance.post("/user/account", account)
            .then(function (response) {
                console.log(response.data)
                history.goBack()
            })
            .catch(function (error) {
                setError(error.message)
            });
    }

    return <>
        <div className="col-12 mt-4">
            <button onClick={() => history.goBack()} type="button" className="btn btn-success">List Accounts</button>
        </div>
        <div className="col-12 mt-4 table-responsive">
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="login" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="passWord" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="name@example.com" name="email" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Roles</label>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" value="ROLE_ADMIN" onChange={setRolesAdmin} />
                            ROLE ADMIN
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" value="ROLE_USER" onChange={setRolesUser} />
                            ROLE USER
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <p className="text-danger">{error}</p>
                    <button onClick={saveUser} type="button" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </>
}