import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const Zone = () => {
    const [Zone, setZone] = useState([]);
    const [ZoneA, setZoneA] = useState([]);
    let nz = 1;
    const url = 'http://localhost:5000/api/zone';
    let token = `Bearer ${localStorage.getItem("token")}` ;
    const ajouter = () => {
        if(ZoneA == ""){
            Swal.fire({
                icon : 'info',
                text : 'Veuillez remplire ce champs svp !!!',
                confirmButtonText: 'OK'
            })
        }else{
            axios.post(url, {
                NomZone : ZoneA
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
        axios.get(url,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setZone(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const DeleteZone = (id) => {
        axios.delete(`http://localhost:5000/api/zone/${id}`,{
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
                  <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addZone" className="btn btn-primary"> + Zone</a></h5>
                  <div className="table-responsive">
                    <table
                      id="zero_config"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                            <th>N°</th>
                          <th>Zone</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                            {
                                Zone.map((e) => {
                                    return(
                                        <tr>
                                            <td>{nz++}</td>
                                            <td>{e.NomZone}</td>
                                            <td>
                                                
                                                    <button className="btn btn-danger" onClick={ () => {DeleteZone(e.id)}}>
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                 &nbsp;
                                                <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="addZone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Zone + </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div className="modal-body">
                            <div> 
                               <div>
                                <label for="">Zone</label>
                                <input type="text" onChange={(e) => setZoneA(e.target.value)}   className="form-control" />
                            </div>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={ajouter} className="btn btn-primary">Ajouter</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Zone;