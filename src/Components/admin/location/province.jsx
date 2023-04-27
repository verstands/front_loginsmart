import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const Province = () => {
    const [province, setprovince] = useState([]);
    const [pays, setpays] = useState([]);
    const [pay, setpay] = useState("");
    const [provinc, setprovinc] = useState("");

    let np = 1
    let token = `Bearer ${localStorage.getItem("token")}`;


    const ajouterProvince = () => {
        if (provinc == "") {
            Swal.fire({
                icon: 'error',
                text: 'Veuillez remplir tous les champs',
            });
        } else {
            axios.post(`http://localhost:5000/api/province`,
                {
                    province: provinc,
                    id_pays: pay,
                }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }).then((response) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Success',
                });
            }).catch((error) => {
                alert(error)
            })
        }
    }
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sitp) => {
                axios.get(`http://localhost:5000/api/province/${sitp.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setprovince(response.data.data);
                }).catch((error) => {
                    alert(error)
                })
            })
        }
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/pays`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setpays(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const DeleteProvince = (id) => {
        axios.delete(`http://localhost:5000/api/province/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((response) => {
            Swal.fire({
                icon: 'success',
                text: 'Success',
                confirmButtonText: 'OK'
            });
        }).catch((error) => {
            alert(error)
        })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addprovince" className="btn btn-primary"> + Province</a></h5>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Province</th>
                                    <th>Pays</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    province.map((e) => {
                                        return (
                                            <tr>
                                                <td>{np++}</td>
                                                <td>{e.province}</td>
                                                <td>{e.id_pays}</td>
                                                <td>
                                                    <button onClick={() => DeleteProvince(e.id)} className="btn btn-danger"><i className="fa fa-edit"></i></button> &nbsp;
                                                    <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addprovince" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Province + </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label for="">Pays</label>
                                <select onChange={(e) => setpay(e.target.value)} name="site" className="form-control">
                                    {
                                        pays.map((py) => {
                                            return (
                                                <option key={py.id} value={py.id}>{py.pays}</option>
                                            );
                                        })
                                    }
                                </select>
                                <div>
                                    <label for="">Province</label>
                                    <input type="text" onChange={(e) => setprovinc(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={ajouterProvince} className="btn btn-primary">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Province;