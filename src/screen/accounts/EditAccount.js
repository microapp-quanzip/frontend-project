import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axiosAuthInstance from "../../api/API";

export default function EditAccount() {
    let history = useHistory();
    const location = useLocation();

    const [account, setAccount] = useState(location.state)
    const [error, setError] = useState()

    let setParam = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value })
    }

    //checkbox
    let setRoles = (event) => {
        const value = event.target.value

        if (event.target.checked) {
            setAccount({ ...account, roles: [...account.roles, value] })
        } else {
            let roles = account.roles.filter(item => {
                return item !== value
            })

            setAccount({ ...account, roles })
        }
    }

    var isAdmin = false, isUser = false;
    let roleDefaultAdmin = undefined, roleDefaultUser = undefined, adminIndex = undefined, userIndex= undefined;
    loadDefaultRole();
    function loadDefaultRole(){
        account.roleDTOS.forEach(function (roleDTO, i){
            if(roleDTO.role == "ROLE_ADMIN"){
                isAdmin = true;
                roleDefaultAdmin = roleDTO;
                adminIndex = i;
            }
            if(roleDTO.role == "ROLE_USER"){
                isUser = true;
                roleDefaultUser = roleDTO;
                userIndex =  i;
            }
        }
    )}

    let changeAdminRole = (event)=> {
        isAdmin = event.target.checked;
    }

    let changeUserRole = (event) => {
        isUser = event.target.checked;
    }

    let saveUser = async () => {
        let deleteAdminRole = false;
        if(isAdmin){
            if(roleDefaultAdmin == undefined){
                account.roleDTOS.push({role: "ROLE_ADMIN"})
            }
        }else {
            if(roleDefaultAdmin != undefined){
                account.roleDTOS.splice(adminIndex, 1)
                deleteAdminRole = true;
            }
        }

        if(isUser){
            if(roleDefaultUser == undefined){
                account.roleDTOS.push({role: "ROLE_USER"})
            }
        }else {
            if(roleDefaultUser != undefined){
                
                account.roleDTOS.splice(deleteAdminRole ? userIndex - 1 : userIndex, 1);
            }
        }

        axiosAuthInstance.post("/user/account/edit", account)
            .then(function () {
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
                    <input type="text" className="form-control" name="name" value={account.name} onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="login" value={account.login} onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={account.email} name="email" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Roles</label>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" defaultChecked={isAdmin} value="ROLE_ADMIN" onChange={changeAdminRole} />
                            ROLE ADMIN
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" defaultChecked={isUser} value="ROLE_USER" onChange={changeUserRole} />
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