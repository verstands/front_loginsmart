import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Intervention = () => {
    let token = `Bearer ${localStorage.getItem("token")}` ;
    const [intervention, setintervention] = useState([]);
    const [vehicule, setvehicule] = useState([]);
    const [reparation, setreparation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [immatriculations, setimmatriculations] = useState("");
    const [debut, setdebut] = useState("");
    const [kilo, setkilo] = useState("");
    const [fournisseur, setfournisseur] = useState("");
    const [typerep, settyperep] = useState("");
    const [desc, setdesc] = useState("");
    const [cout, setcout] = useState("");
    let n = 1;
    const url = 'http://localhost:5000/api/intervention';
    const Enregistrer = () => {
        if( kilo == "" || desc == "" || cout == ""){
            Swal.fire({
                icon : 'error',
                text : 'Veuillez remplire tous les champs svp !!!',
                confirmButtonText: 'OK'
            })
        }else{
            axios.post(url, {
                type_rep : typerep,
                date_debut : debut,
                intervention : fournisseur,
                km1 : kilo,
                km2 : immatriculations,
                mat_mec : immatriculations,
                cout : cout,
                explicatif : desc,
            },{
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
            ).then((response) => {
                Swal.fire({
                    icon : 'success',
                    text : 'Success',
                    confirmButtonText: 'OK'
                });
               
            }).catch( (err) => {
                alert('Erreur' + err);
                console.log('erreur' + err)
            }); 
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/api/type_reparation`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setreparation(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/intervention`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setintervention(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/vehicule`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setvehicule(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    return(
        <>
            <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addadmin" className="btn btn-primary"> + Intervention</a></h5>
                  <div className="table-responsive">
                    <table
                      id="example" className="table table-striped" 
                    >
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th>immatriculation</th>
                          <th>Matricule</th>
                          <th>Date entreée</th>
                          <th>Date sortie</th>
                          <th>Jrs</th>
                          <th>Libelle de repatition</th>
                          <th>Detail</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                            {
                                intervention.map((e) => {
                                    return (
                                        <tr>
                                            <td>{n++}</td>
                                            <td>{e.km2}</td>
                                            <td>{e.mat_mec}</td>
                                            <td>{e.date_debut}</td>
                                            <td>{e.date_debut}</td>
                                            <td>{e.date_debut}</td>
                                            <td>{e.intervention}</td>
                                            <td>
                                              <button className="fa fa-edit btn btn-danger"></button>&nbsp;
                                            </td>
                                            <td>
                                                <button className="fa fa-edit btn btn-danger"></button>&nbsp;
                                                <button   data-bs-toggle="modal" data-bs-target="#updatePrelevements" className="fa fa-edit btn btn-primary"></button>
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
                            <h5 className="modal-title" id="exampleModalLabel">Intervention + </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div  className="col-md-6">
                                        <label for="">Immatriculation</label>
                                        <select   onChange={(e) => setimmatriculations(e.target.value)} className="form-control">
                                        {
                                                vehicule.map((e) => {
                                                    return(
                                                        <option key={e.id} value={e.id}>{e.immatriculation}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="">Date</label>
                                        <input type="date" onChange={(e) => setdebut(e.target.value)} className="form-control" />
                                    </div>
                                    
                                    <div  className="col-md-6">
                                        <label for="">Kilometrage</label>
                                        <input type="number" onChange={(e) => setkilo(e.target.value)} className="form-control" />
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Cout(devise)</label>
                                        <input type="number" onChange={(e) => setcout(e.target.value)}  className="form-control" />
                                    </div>
                                    
                                    <div  className="col-md-6">
                                        <label for="">Fournisseur</label>
                                        <select   onChange={(e) => setfournisseur(e.target.value)} className="form-control">
                                        {
                                                vehicule.map((e) => {
                                                    return(
                                                        <option key={e.id} value={e.id}>{e.immatriculation}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Type de reparation</label>
                                        <select   className="form-control" onChange={(e) => settyperep(e.target.value)}>
                                        {
                                                reparation.map((e) => {
                                                    return(
                                                        <option key={e.id} value={e.id}>{e.type_rep}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    
                                    <div  className="col-md-6">
                                        <label for="">Description</label>
                                    <textarea name="" id="" onChange={(e) => setdesc(e.target.value)}  cols="10" rows="3" className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" onClick={Enregistrer}  className="btn btn-primary">Enregister</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Intervention
