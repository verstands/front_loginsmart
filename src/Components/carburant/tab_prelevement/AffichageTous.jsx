import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AffchageTous = () => {
  const [plein,  setplain] = useState([])
    let token = `Bearer ${localStorage.getItem("token")}` ;
    const [loadingD, setloadingD] = useState(false);
    const [update, setupdate] = useState([]);
    let n = 1
    useEffect(() => {
        axios.get(`http://localhost:5000/api/plein`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setplain(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
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
        <div class="card">
                <div class="card-body">
                  <center>
                  <h5 class="card-title"> Liste de tous le prelevements de carburant</h5>
                  </center>
                  
                  <div class="table-responsive">
                    <table
                      id="zero_config"
                      class="table table-striped table-bordered"
                    >
                      <thead>
                      <tr>
                          <th>N°</th>
                          <th>immatriculation</th>
                          <th>Utilisateur</th>
                          <th>Matricule</th>
                          <th>Qte</th>
                          <th>Kilometrage</th>
                          <th>Numero</th>
                          <th>Detail</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                            plein.map((e) => {
                                return (
                                    <tr>
                                        <td>{ n++}</td>
                                        <td>{e.immatriculation}</td>
                                        <td>{e.user}</td>
                                        <td>{e.matricule_ch}</td>
                                        <td>{e.qteplein}</td>
                                        <td>{e.kilometrage}</td>
                                        <td>{e.num}</td>
                                        <td>
                                           <button className="btn btn-primary" onClick={() => UpdateId(e.id)}  data-bs-toggle="modal" data-bs-target="#Detail" >
                                              <i className="mdi mdi-apps"></i>
                                           </button>
                                        </td>
                                        <td>
                                            <button onClick={ () => Deleteprelevement(e.id)} className="fa fa-edit btn btn-danger"></button>&nbsp;
                                            <button onClick={() => UpdateId(e.id)}  data-bs-toggle="modal" data-bs-target="#updatePrelevement" className="fa fa-edit btn btn-primary"></button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            <div className="modal fade" id="updatePrelevement" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


            <div className="modal fade" id="Detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Detail  </h5>
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
                            <div className="col-md-6">
                                <label htmlFor="">Utilisateur</label><br />
                                <input type="text" value={update.user} className="form-control"   />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Matricule</label><br />
                                <input type="text" value={update.matricule_ch} className="form-control"   />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div> 
        </>
   );
}

export default AffchageTous;