import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Search_vehicule = () => {
    const [immatriculation, setimmatriculation] = useState([]);
    const [chauffeur, setchauffeur] = useState([]);
    const [marque, setmarque] = useState([]);
    const [province, setprovince] = useState([]);
    const [ville, setville] = useState([]);
    const [sitevariable, setsitevariable] = useState([]);
    const [loadingR, setLoadingR] = useState(false);
    const [dateDebut, setdateDebut] = useState("");
    const [dateFin, setdateFin] = useState("");
    const [immatriculations, setimmatriculations] = useState("");
    const [numerobc, setnumerobc] = useState("");
    const [chauffeurs, setchauffeurs] = useState("");
    const [marques, setmarques] = useState("");
    const [modeles, setmodeles] = useState("");
    const [provinces, setprovinces] = useState("");
    const [villes, setvilles] = useState("");
    const [quantites, setquantites] = useState("");
    const [carburant, setcarburant] = useState("");
    const [sites, setsites] = useState("");
    const [search, setsearch] = useState("");
    let token = `Bearer ${localStorage.getItem("token")}`;

    const recherche = () => {
        if (dateDebut === "" || dateFin === "" || numerobc === "" || modeles === "" || quantites === "") {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veillez remplir tous les champs !!!',
            })
        } else {
            setLoadingR(true)
            axios.post(`http://localhost:5000/api/recherche_carburant/${dateDebut}/${dateFin}/${immatriculations}/${chauffeurs}/${marques}/${modeles}/${provinces}/${villes}/${quantites}/${carburant}/${sites}/${search}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            ).then((response) => {
                 setLoadingR(true)
                setsearch(response.data.data);
                setLoadingR(false)
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur de la recherche',
                    text: 'Erreu !!!',
                })
            })
        }
    }

    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`http://localhost:5000/api/vehicule/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setimmatriculation(response.data.data);
                }).catch((error) => {
                    alert(error)
                })
            })
        }
    }, [])

    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`http://localhost:5000/api/chauffeur/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setchauffeur(response.data.data);
                }).catch((error) => {

                })
            })
        }
    }, [])

    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`http://localhost:5000/api/marque/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setmarque(response.data.data);
                }).catch((error) => {

                })
            })
        }
    }, [])
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`http://localhost:5000/api/province/${sit.idSite}`,
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

                })
            })
        }
    }, [])
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`http://localhost:5000/api/ville/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setville(response.data.data);
                }).catch((error) => {

                })
            })
        }
    }, [])
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`http://localhost:5000/api/site/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setsitevariable(response.data.data);
                }).catch((error) => {

                })
            })
        }
    }, [])
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="">Periode</label>
                            <input type="date" onChange={(e) => setdateDebut(e.target.value)} className="form-control" /><br />
                            <input type="date" onChange={(e) => setdateFin(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Immatriculation</label>
                            <select name="" onChange={(e) => setimmatriculations(e.target.value)} className="form-control">
                                {
                                    immatriculation.map((imm) => {
                                        return (
                                            <option value={imm.id} key={imm.id}>{imm.immatriculation}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Numero BC</label>
                            <input type="text" onChange={(e) => setnumerobc(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Chauffeur</label>
                            <select onChange={(e) => setchauffeurs(e.target.value)} id="" className="form-control">
                                {
                                    chauffeur.map((chauf) => {
                                        return (
                                            <>
                                                <option key={chauf.id} value={chauf.id}>{chauf.nom + " " + chauf.prenom}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Marque</label>
                            <select onChange={(e) => setmarques(e.target.value)} id="" className="form-control">
                                {
                                    marque.map((mar) => {
                                        return (
                                            <option key={mar.id} value={mar.id}>{mar.marque}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Model</label>
                            <input type="text" onChange={(e) => setmodeles(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Province</label>
                            <select name="" onChange={(e) => setprovinces(e.target.value)} className="form-control">
                                {
                                    province.map((pro) => {
                                        return (
                                            <option value={pro.id} key={pro.id}>{pro.province}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Ville</label>
                            <select onChange={(e) => setvilles(e.target.value)} id="" className="form-control">
                                {
                                    ville.map((vill) => {
                                        return (
                                            <option value={ville.id} key={vill.id}>{vill.ville}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Quantite</label>
                            <input type="text" onChange={(e) => setquantites(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Carburant</label>
                            <input type="text" onChange={(e) => setcarburant(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Site</label>
                            <select onChange={(e) => setsites(e.target.value)} className="form-control">
                                {
                                    sitevariable.map((sitv) => {
                                        return (
                                            <option value={sitv.id} key={sitv.id}>{sitv.nom_site}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <br />
                            <button onClick={recherche} className="btn btn-primary"> <i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
                <center>
                    {
                        loadingR === true && (
                            <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                        )
                    }
                </center>
                <div className="table-responsive">
                    <table
                        id="zero_config"
                        className="table table-striped table-bordered"
                    >
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>immatriculation</th>
                                <th>Utilisateur</th>
                                <th>Date</th>
                                <th>Qte</th>
                                <th>Kilometrage</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Search_vehicule;