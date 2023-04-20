import React ,{ useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Recherche_carburant = () => {
const [debut, setdebut] = useState("");
const [fin, setfin] = useState("");
const [datax, setdata] = useState([]);
const [loading, setLoading] = useState(false);
let n = 1;
let token = `Bearer ${localStorage.getItem("token")}` ;

const RechercheBtn = () => {
        const sites = JSON.parse(localStorage.getItem("site"))
        setLoading(true)
        if(sites != ""){
            sites.map((s) => {
                axios.get(`http://localhost:5000/api/recherche_consomation/${debut}/${fin}/${s.idSite}`,
                    {
                        headers : {
                            Accept: 'application/json',
                            'Content-Type' : 'application/json',
                            Authorization : token
                        }
                    }
                ).then((response) => {
                        setdata(response.data.data);
                        setLoading(false)
                }).catch((error) => {
                    if(error.response.status === 404){
                        Swal.fire({
                            icon: 'error',
                            title: 'error',
                            text: 'Veillez choisir une date de debut et de fin !!!',
                        })
                    }
                    setLoading(false)
                })
            })
        }
}
    return(
        <div class="card card-body">
           <br />
                <div class="row">
                    <div class="col-md-3">
                        <input type="date" onChange={(e) => setdebut(e.target.value)} class="form-control" placeholder="Date debut" /> 
                    </div>
                    <div class="col-md-3">
                        <input type="date" onChange={(e) => setfin(e.target.value)} class="form-control" placeholder="Date fin" /> 
                    </div>
                    <div class="col-md-3">
                        <button onClick={RechercheBtn} class="btn btn-primary"> <i class="fas fa-search"></i></button>
                    </div>
                </div>
                <div className="card-body">
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
                        {
                            datax.map((e) => {
                                return (
                                    <tr>
                                         <td>{n++}</td>
                                        <td>{e.immatriculation}</td>
                                        <td>{e.nom}</td>
                                        <td>{e.date_plein}</td>
                                        <td>{e.qteplein}</td>
                                        <td>{e.kilometrage}</td>
                                            
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
    );
}
export default Recherche_carburant;