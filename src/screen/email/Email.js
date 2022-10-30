import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axiosAuthInstance from "../../api/API";

export default function Email() {
    let history = useHistory();

    let [emails, setEmails] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        axiosAuthInstance.get("/email/emails")
            .then(function (response) {
                let emails = response.data;
                for(let email of emails){
                    let index = email.content.lastIndexOf('at');
                    if(index != -1) {
                        let time = email.content.substring(index)
                        let message = email.content.substring(0, index);
                        email.message = message;
                        time = time.substring(2);
                        email.createdDate = time;
                    }
                    email.result = email.result == 'S' ? "Successful" : "Failed"
                }
                setEmails(emails)
                console.log(emails)
            }).catch(function (error) {
                console.log(error);
            });
    }

    return <>
        <div className="col-12 mt-4 table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >from</th>
                        <th >to</th>
                        <th >subject</th>
                        <th >content</th>
                        <th >Result</th>
                        <th >Time</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map(email => (
                        <tr key={email.id}>
                            <th >{email.id}</th>
                            <td>{email.fromName + '-' + email.fromMail}</td>
                            <td>{email.toName + '-' + email.toMail}</td>
                            <th >{email.subject}</th>
                            <td>{email.content}</td>
                            <td>{email.result}</td>
                            <td>{email.createdDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}