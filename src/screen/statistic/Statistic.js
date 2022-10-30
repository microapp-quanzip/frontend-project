import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axiosAuthInstance from "../../api/API";

export default function Statistic() {
    let history = useHistory();

    let [statistics, setStatistics] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        axiosAuthInstance.get("/statistic/statistics")
            .then(function (response) {
                let statistics = response.data;
                for(let statistic of statistics){
                    let index = statistic.message.lastIndexOf('at');
                    if(index != -1) {
                        let time = statistic.message.substring(index)
                        let message = statistic.message.substring(0, index);
                        statistic.message = message;
                        time = time.substring(2);
                        statistic.createdDate = time;
                    }
                }
                setStatistics(statistics)
                console.log(response.data)
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
                        <th >Message</th>
                        <th >Time</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.map(statistic => (
                        <tr key={statistic.id}>
                            <th >{statistic.id}</th>
                            <td>{statistic.message}</td>
                            <td>{statistic.createdDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}