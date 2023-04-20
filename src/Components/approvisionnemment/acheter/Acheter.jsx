import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Acheter_approvisionnement = () => {
    const [acheter, setacheter] = useState([]);
    const [vehicule, setvehicule] = useState([]);
    const [numFact, setnumFact] = useState("");
    const [immatriculations, setimmatriculations] = useState("");
    const [produit, setproduit] = useState("");
    const [quantite, setquantite] = useState("");
    const [prixTotal, setprixTotal] = useState("");
    const [commentaire, setcommentaire] = useState("");
    let token = `Bearer ${localStorage.getItem("token")}`;

    const Enregister = () => {
        if(numFact == "" || produit == "" || quantite == "" || prixTotal == "" || commentaire == ""){
            Swal.fire({
                icon: 'error',
                text: 'Veuillez remplir tous les champs',
            });
        }else{
            axios.post(`http://localhost:5000/api/acheter`,
                {
                    num_fact: numFact,
                    immatriculation: immatriculations,
                    produit: produit,
                    qte: quantite,
                    prixtotal: prixTotal,
                    dates: dates,
                    observation: commentaire
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
                    confirmButtonText: 'OK'
                });
            }).catch((error) => {
                alert(error)
            })
        }
    }
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((veh) => {
                axios.get(`http://localhost:5000/api/vehicule/${veh.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setvehicule(response.data.data);
                }).catch((error) => {

                })
            })
        }
    }, [])
    useEffect(() => {
        sites.map((veh) => {
            axios.get(`http://localhost:5000/api/achat`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            ).then((response) => {
                setacheter(response.data.data);
            }).catch((error) => {

            })
        })
        
    }, [])
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addville" className="btn btn-primary"> + Acheter</a></h5>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Date</th>
                                    <th>Numero de facture</th>
                                    <th>Immatriculation</th>
                                    <th>Marque</th>
                                    <th>Produit Acheté</th>
                                    <th>Quantité</th>
                                    <th>P.U.</th>
                                    <th>Prix total</th>
                                    <th>Commentaire</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addville" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Acheter + </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label for="">Numero Facture</label>
                                    <input type="text" onChange={(e) => setnumFact(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Imatriculation</label>
                                    <select onChange={(e) => setimmatriculations(e.target.value)}  className="form-control">
                                        {
                                            vehicule.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.immatriculation}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label for="">Produit</label>
                                    <input type="text" onChange={(e) => setproduit(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Quantité</label>
                                    <input type="number"  onChange={(e) => setquantite(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Prix Total</label>
                                    <input type="number" onChange={(e) => setprixTotal(e.target.value)} className="form-control" />USD
                                </div>
                                <br />
                                <div className="col-md-12">
                                    <label htmlFor="">Commentaire</label>
                                    <textarea name="" onChange={(e) => setcommentaire(e.target.value)} className="form-control" id="" cols="10" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={Enregister} className="btn btn-primary">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Acheter_approvisionnement;