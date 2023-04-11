import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Prelevement_generateur = () => {
    const [loading, setLoading] = useState(true);
    const [numBon, setnumBon] = useState("");
    const [groupeAgence, setgroupeAgence] = useState("");
    const [dates, setdates] = useState("");
    const [indexs, setindexs] = useState("");
    const [Qte, setQte] = useState("");
    const [carburant, setcarburant] = useState("");
    const [update, setupdate] = useState([]);
    const [loadingD, setloadingD] = useState(false);

    let token = `Bearer ${localStorage.getItem("token")}` ;
    const [pleingen,  setpleingen] = useState([]);
    const [agence,  setagence] = useState([]);
    let n = 1;

    const enregistrer = () =>{
        if(numBon == "" || indexs == "" || Qte == "" ){
            Swal.fire({
                icon: 'error',
                title: 'Attention',
                text: 'Veillez remplir tous les champs !!!',
            })
        }else{
            alert(numBon + '*' + groupeAgence + '*' + dates + '*' + indexs + '*' + Qte + '*' + carburant)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/pleingen`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setpleingen(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/agence`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setagence(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    const DeleteUser = (id) => {
        axios.delete(`http://localhost:5000/api/pleingen/${id}`,{
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

    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `http://localhost:5000/api/pleingen/${id}`;
        axios.get(urlDetail,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setupdate(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })  
    }

    
    return(
        <>
            <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addadmin" className="btn btn-primary"> + Prelevement</a></h5>
                  <div className="table-responsive">
                    <table
                      id="example" className="table table-striped" 
                    >
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th>Groupe</th>
                          <th>Date</th>
                          <th>Qte</th>
                          <th>Heure</th>
                          <th>User</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                            pleingen.map((e) => {
                                return (
                                    <tr>
                                        <td>{n++}</td>
                                        <td>{e.agent}</td>
                                        <td>{e.datesyst}</td>
                                        <td>{e.qteplein}</td>
                                        <td>{e.heures}</td>
                                        <td>{e.user}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={ () => {DeleteUser(e.id)}}>
                                                <i className="fa fa-edit"></i>
                                            </button>&nbsp;
                                            <button onClick={() => UpdateId(e.id)}  data-bs-toggle="modal" data-bs-target="#updatePrelevementGen" className="fa fa-edit btn btn-primary"></button>

                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    </table>
                    <center>
                        {
                            loading === true && (
                                <p><i className="fa fa-pulse fa-spinner text-primary" style={{fontSize : 40}} ></i></p>
                            )
                        }
                    </center>
                  </div>
                </div>
              </div>
                <div className="modal fade" id="addadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Prelevement + </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="">Numero de bon</label>
                                        <input type="text" onChange={(e) => setnumBon(e.target.value)}  className="form-control" />
                                    </div>
                                    <div  className="col-md-6">
                                    <label for="">Groupe Agence</label>
                                        <select onChange={(e) => setgroupeAgence(e.target.value)}   className="form-control">
                                                {
                                                    agence.map((e) => {
                                                        return <option value={e.id}>{e.nom_ag}</option>
                                                    })
                                                }
                                        </select>
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Date</label>
                                        <input type="date" onChange={(e) => setdates(e.target.value)}  className="form-control" />
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Index</label>
                                        <input type="number" onChange={(e) => setindexs(e.target.value)}  className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="">Quantité</label>
                                        <input type="number" onChange={(e) => setQte(e.target.value)} className="form-control" />
                                    </div>
                                    <div  className="col-md-6" >
                                        <label for="">Carburant</label>
                                        <select onChange={(e) => setcarburant(e.target.value)}     className="form-control">
                                                <option value="essence" key="essence">Essence</option>
                                                <option value="gasoil" key="gasoil">Gasoil</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" onClick={enregistrer} className="btn btn-primary">Enregister</button>
                            </div>
                        </div>
                    </div>
                </div> 

            <div className="modal fade" id="updatePrelevementGen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Update  </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div className="modal-body">
                        <center>
                            {
                                loadingD === true && (
                                    <p><i className="fa fa-pulse fa-spinner text-primary" style={{fontSize : 20}} ></i></p>
                                )
                            }
                        </center>
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="">Numero</label><br />
                                <input type="text" value={update.numero} className="form-control"  />

                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Date plein</label><br />
                                <input type="text" value={update.date_plein} className="form-control"   />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Quantite</label><br />
                                <input type="text" value={update.qteplein} className="form-control"   />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Heure</label><br />
                                <input type="text" value={update.heures} className="form-control"   />
                            </div><div className="col-md-6">
                                <label htmlFor="">Type carburant</label><br />
                                <input type="text" value={update.type_carb} className="form-control"   />
                            </div><div className="col-md-6">
                                <label htmlFor="">Agent</label><br />
                                <input type="text" value={update.agent} className="form-control"   />
                            </div><div className="col-md-6">
                                <label htmlFor="">Observation</label><br />
                                <input type="text" value={update.observation} className="form-control"   />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit"  className="btn btn-primary">Modifier</button>
                    </div>
                </div>
            </div>
            </div>

        </>
    )
}

export default Prelevement_generateur;