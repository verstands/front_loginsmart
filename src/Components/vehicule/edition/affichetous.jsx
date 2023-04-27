import React, {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Affiche_vehicule = () => {
    const [vehicule, setvehicule] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = `Bearer ${localStorage.getItem("token")}` ;
    const site = localStorage.getItem("site");
    
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
            setLoading(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const DeleteVehicule = (id) => {
        axios.delete(`http://localhost:5000/api/vehicule/${id}`,{
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
    return(
        <>
            <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="zero_config"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Marque/Modele</th>
                          <th>Carburant</th>
                          <th>Puissance</th>
                          <th>Dimention</th>
                          <th>Mise en service</th>
                          <th>Reservoir</th>
                          <th>Affectation</th>
                          <th>Detail</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                            vehicule.map((e) => {
                                return(
                                    <tr>
                                        <td>{e.immatriculation}</td>
                                        <td>{e.modele}</td>
                                        <td>{e.type_carb}</td>
                                        <td>{e.transm}</td>
                                        <td>{e.disposition_cyl}</td>
                                        <td>{e.cons_carb_veh}</td>
                                        <td>{e.foto}</td>
                                        <td>{e.foto}</td>
                                        <td>{e.foto}</td>
                                        <td>
                                            <button onClick={() => DeleteVehicule(e.id)} className="btn btn-danger"><i className="fa fa-edit"></i></button> &nbsp;
                                            <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                        </td>
                                    </tr>
                                )
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
    )
}

export default Affiche_vehicule;