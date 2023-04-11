import React, { useState, useEffect } from "react"
import axios from "axios";
const Affecter = () => {
    const [chauffeur, setchauffeur] = useState([]);
    const [affectation, setaffectation] = useState([]);
    const [chauffeurs, setchauffeurs] = useState('');
    const [site, setsite] = useState('');
    const [dates, setdates] = useState('');

    let token = `Bearer ${localStorage.getItem("token")}` ;
    const url = 'http://localhost:5000/api/chauffeur';
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
        }).catch((error) => {
            alert(error)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/site`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setaffectation(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
  return(
    <>
       <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <label for="">Site d'affecation</label>
                            <select name=" site"  className="form-control">
                            {
                                    affectation.map((e) => {
                                        return(
                                            <>
                                                <option key={e.id} value={e.id}>{ e.nom_site}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label for="">Chauffeur</label>
                            <select name="site"  className="form-control">
                                {
                                    chauffeur.map((e) => {
                                        return(
                                            <>
                                                <option key={e.id} value={e.id}>{ e.nom + " " + e.prenom}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label for="">Date d'affectation</label>
                            <input type="date" className="form-control" />
                        </div>
                        <br />
                        <button className="btn btn-primary">Valider</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Affecter;