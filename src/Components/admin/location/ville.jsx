import React, {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Ville = () => {
    const [ville, setville] = useState([]);
    const [province, setprovince] = useState([]);
    const [ref_ville, setrefville] = useState("");
    const [villes, setvilles] = useState("");
    const [ref_prov, setrefprov] = useState("");
    let nv = 1;
    let token = `Bearer ${localStorage.getItem("token")}` ;

    const ajouterVille = () => {
        if(villes == "" || ref_ville == ""){
            Swal.fire({
                icon : 'error',
                text : 'Veuillez remplir tous les champs',
            });
        }else{
            axios.post(`http://localhost:5000/api/ville`,
            {
                ref_ville : ref_ville,
                ville : villes,
                ref_prov : ref_prov
            },{
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }).then((response) => {
                Swal.fire({
                    icon : 'success',
                    text : 'Success',
                    confirmButtonText: 'OK'
                });
            }).catch((error) => {
                alert(error)
            })
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/api/ville`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setville(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/province`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setprovince(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const Deleteville = (id) => {
        axios.delete(`http://localhost:5000/api/ville/${id}`,{
            headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
                Authorization : token
            }
        }).then((response) => {
            Swal.fire({
                icon : 'success',
                text : 'Success',
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
                  <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addville" className="btn btn-primary"> + Ville</a></h5>
                  <div className="table-responsive">
                    <table
                      id="zero_config"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th>Ville</th>
                          <th>Province</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                            {
                                ville.map((e) => {
                                    return(
                                        <tr>
                                            <td>{nv++}</td>
                                            <td>{e.ville}</td>
                                            <td>{e.ref_prov}</td>
                                            <td>
                                                <button onClick={ () => Deleteville(e.id)} className="btn btn-danger"><i className="fa fa-edit"></i></button> &nbsp;
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

            <div className="modal fade" id="addville" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ville + </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div className="modal-body">
                            <div>
                                <label for="">Province</label>
                                <select name="site" onChange={(e) => setrefprov(e.target.value)}  className="form-control">
                                    {
                                        province.map((e) => {
                                            return(
                                                <option key={e.id} value="{e.id}">{e.province}</option>
                                            );
                                        })
                                    }
                                </select>
                                <div>
                                <label for="">Ville</label>
                                <input type="text" onChange={(e) => setvilles(e.target.value)}    className="form-control" />
                                <label for="">Reference ville</label>
                                <input type="text" onChange={(e) => setrefville(e.target.value)}    className="form-control" />
                            </div>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={ajouterVille} className="btn btn-primary">Ajouter</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Ville;