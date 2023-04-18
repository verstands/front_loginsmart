import React, { useState, useEffect } from "react";
import axios from "axios";

const AffeichageTous_generateur = () => {
  const [plein,  setplain] = useState([])
  const [loading, setLoading] = useState(true);
    let token = `Bearer ${localStorage.getItem("token")}` ;
    let n = 1
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if(sites != ""){
            sites.map((sit) => {
              axios.get(`http://localhost:5000/api/pleingen/${sit.idSite}`,
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
                  alert(error)
              })
            })
        }
    }, [])
   return (
        <>
        <div class="card">
                <div class="card-body">
                  <center>
                  <h5 class="card-title"> Liste de tous les prelevements </h5>
                  </center>
                  
                  <div class="table-responsive">
                    <table
                      id="zero_config"
                      class="table table-striped table-bordered"
                    >
                      <thead>
                      <tr>
                          <th>N°</th>
                          <th>Ref</th>
                          <th>Code</th>
                          <th>Groupe</th>
                          <th>Modele</th>
                          <th>Date_pelin</th>
                          <th>Index</th>
                          <th>Quantité</th>
                          <th>Carburant</th>
                          <th>Agent</th>
                          <th>Utilisateur</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                            plein.map((e) => {
                                return (
                                    <tr>
                                        <td>{ n++}</td>
                                        <td>{e.numero}</td>
                                        <td>{e.user}</td>
                                        <td>{e.matricule_ch}</td>
                                        <td>{e.qteplein}</td>
                                        <td>{e.kilometrage}</td>
                                        <td>{e.num}</td>
                                        <td>
                                           <button className="btn btn-primary">
                                              <i className="fa fa-edit"></i>
                                           </button>
                                        </td>
                                        <td>
                                            <button className="fa fa-edit btn btn-danger"></button>
                                            <button className="fa fa-edit btn btn-primary"></button>
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
        </>
   );
}

export default AffeichageTous_generateur;