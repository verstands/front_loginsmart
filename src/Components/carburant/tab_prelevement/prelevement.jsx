import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const   Prelevement = () => {
    //formulaire
    let token = `Bearer ${localStorage.getItem("token")}` ;
    const [numBon, setnumBon] = useState("");
    const [immatriculation, setimmatriculation] = useState("");
    const [Qte, setQte] = useState("");
    const [kilometrage, setkilometrage] = useState("");
    const [chauffeurs, setchauffeurs] = useState("");
    const [dates, setDates] = useState("");
    const [carburant, setcarburant] = useState("");
    const [commentaire, setcommentaire] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingD, setloadingD] = useState(false);
    const [update, setupdate] = useState([]);

    
    //condition pour le formulaire
   const url = 'http://localhost:5000/api/plein';
   const Enregistrer = () => {
        if(numBon == ""  || Qte == "" || kilometrage == "" || carburant == "" || commentaire == ""){
            Swal.fire({
                icon : 'error',
                text : 'Veuillez remplire tous les champs svp !!!',
                confirmButtonText: 'OK'
            })
        }else{
            axios.post(url, {
                immatriculation : immatriculation,
                date_plein : dates,
                qteplein : Qte,
                kilometrage : kilometrage,
                type_carb : carburant,
                matricule_ch : chauffeurs,
                observation : commentaire,
                id_veh : immatriculation,
                id_chauf : chauffeurs,
                num : numBon,
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
    //affichage
    const [plein,  setplain] = useState([]);
    const [chauffeur,  setchauffeur] = useState([]);
    const [vehicule,  setvehicule] = useState([]);
    let n = 1;
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if(sites != ""){
            sites.map((sit) => {
                axios.get(`http://localhost:5000/api/plein/${sit.idSite}`,
                {
                    headers : {
                        Accept: 'application/json',
                        'Content-Type' : 'application/json',
                        Authorization : token
                    }
                }
                ).then((response) => {
                    setplain(response.data.data);
                    setLoading(false);
                }).catch((error) => {
                
                }) 
            })
        }
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/chauffeur`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setchauffeur(response.data.data);
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
            setLoading(false);  
        }).catch((error) => {
            alert(error)
        })
    }, [])
    const TableauCarburant = [
        {'nom' : "Essence"},
        {'nom' : "ga"},
    ];

    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `http://localhost:5000/api/plein/${id}`;
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

    const Deleteprelevement = (id) => {
        setloadingD(true)
        axios.delete(`http://localhost:5000/api/plein/${id}`,{
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
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })
    }
    return (
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
                          <th>immatriculation</th>
                          <th>Qte</th>
                          <th>Kilometrage</th>
                          <th>Date</th>
                          <th>Utilisateur</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                            {
                                plein.map((e) => {
                                    return (
                                        <tr>
                                            
                                            <td>{n++}</td>
                                            <td>{e.immatriculation}</td>
                                            <td>{e.qteplein}</td>
                                            <td>{e.kilometrage}</td>
                                            <td>{e.date_plein}</td>
                                            <td>{e.nom}</td>
                                            <td>{e.kilometrage}</td>
                                            <td>
                                                <>
                                                    <button onClick={ () => Deleteprelevement(e.id)} className="fa fa-edit btn btn-danger"></button>&nbsp;
                                                    <button onClick={() => UpdateId(e.id)}  data-bs-toggle="modal" data-bs-target="#updatePrelevements" className="fa fa-edit btn btn-primary"></button>
                                                </>
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
                                        <input type="text" onChange={(e) => setnumBon(e.target.value)} className="form-control" />
                                    </div>
                                    <div  className="col-md-6">
                                    <label for="">Immatriculation</label>
                                        <select value={immatriculation} onChange={(e) => setimmatriculation(e.target.value)}  className="form-control">
                                                {
                                                    vehicule.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.immatriculation}</option>
                                                        )
                                                    })
                                                }
                                        </select>
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Date</label>
                                        <input type="date" onChange={(e) => setDates(e.target.value)} className="form-control" />
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Quantité</label>
                                        <input type="number" onChange={(e) => setQte(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="">Kilometrage</label>
                                        <input type="number" onChange={(e) => setkilometrage(e.target.value)} className="form-control" />
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Chauffeur</label>
                                        <select value={chauffeurs}  onChange={(e) => setchauffeurs(e.target.value)} className="form-control">
                                        {
                                                chauffeur.map((e) => {
                                                    return(
                                                        <option key={e.id} value={e.id}>{e.nom}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div  className="col-md-6" >
                                        <label for="">Carburant</label><br />
                                        <select name="" className="form-control" onChange={(e) => setcarburant(e.target.value)}  id="">
                                            {
                                                TableauCarburant.map((tb) => {
                                                    return(
                                                        <option value={tb.nom} key={tb.nom}>{tb.nom}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div  className="col-md-6">
                                        <label for="">Commentaire</label>
                                    <textarea name="" id="" onChange={(e) => setcommentaire(e.target.value)} cols="10" rows="3" className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" onClick={Enregistrer} className="btn btn-primary">Enregister</button>
                            </div>
                        </div>
                    </div>
                </div>

            <div className="modal fade" id="updatePrelevements" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <label htmlFor="">Immatriculation</label><br />
                                <input type="text" value={update.immatriculation} className="form-control"  />

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
                                <label htmlFor="">Kilometrage</label><br />
                                <input type="text" value={update.kilometrage} className="form-control"   />
                            </div><div className="col-md-6">
                                <label htmlFor="">Type carburant</label><br />
                                <input type="text" value={update.type_carb} className="form-control"   />
                            </div><div className="col-md-6">
                                <label htmlFor="">Chauffeur</label><br />
                                <input type="text" value={update.matricule_ch} className="form-control"   />
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
    );
}
export default Prelevement;