import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
const Site = () => {
    const [ville, setville] = useState([]);
    const [zone, setzone] = useState([]);
    const [site, setsite] = useState([]);
    const [codesite, setcodesite] = useState("");
    const [nomsite, setnomsite] = useState("");
    const [villesite, setvillesite] = useState("");
    const [zonesite, setzonesite] = useState("");
    const [adresse, setadresse] = useState("");
    const [tel, settel] = useState("");
    const [loading, setLoading] = useState(true);
    let token = `Bearer ${localStorage.getItem("token")}` ;

    let ns = 1;
    const ajouterSite = () => {
        if(codesite === "" || nomsite === "" ||  adresse === "" || tel === ""){
            Swal.fire({
                icon : 'error',
                text : 'Veuillez remplir tous les champs',
            });
        }else{
            axios.post(`http://localhost:5000/api/site`,
            {
                CodeSite : codesite,
                nom_site : nomsite,
                IdVille : villesite,
                IdZone : zonesite,
                adress : adresse,
                tel : tel,
                ref_site :codesite
            },{
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
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/api/ville`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setville(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/zone`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setzone(response.data.data);
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
            setsite(response.data.data);
            setLoading(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])
    const DeleteSite = (id) => {
        axios.delete(`http://localhost:5000/api/site/${id}`,{
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
    return (
        <>
           
            <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addadmin" className="btn btn-primary"> + Site</a></h5>
                  <div className="table-responsive">
                    <table
                      id="zero_config"
                      class="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th>Code</th>
                          <th>Nom site</th>
                          <th>Ville</th>
                          <th>Province</th>
                          <th>Zone</th>
                          <th>Adresse</th>
                          <th>Telephone</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                         {
                            site.map((e) => {
                                return(
                                    <tr>
                                        <td>{ns++}</td>
                                        <td>{e.CodeSite}</td>
                                        <td>{e.nom_site}</td>
                                        <td>{e.IdVille}</td>
                                        <td>{e.nom_site}</td>
                                        <td>{e.IdZone}</td>
                                        <td>{e.adress}</td>
                                        <td>{e.tel}</td>
                                        <td>
                                            <button onClick={() => DeleteSite(e.id)} className="btn btn-danger"><i className="fa fa-edit"></i></button> &nbsp;
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
             

<div className="modal fade" id="addadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Site + </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <div className="modal-body">
                    <div>
                        <label for="">Code site</label>
                        <input type="text"  onChange={(e) => setcodesite(e.target.value)}   className="form-control" />
                        <label for="">Nom site</label>
                        <input type="text"  onChange={(e) => setnomsite(e.target.value)}    className="form-control" />
                        <label for="">Ville</label>
                        <select name="site"  onChange={(e) => setvillesite(e.target.value)}   className="form-control">
                            {
                                ville.map((e) => {
                                    return(
                                        <option key={e.id} value="{e.id}">{e.ville}</option>
                                    );
                                })
                            }
                        </select>
                        <label for="">Zone</label>
                        <select name="site"  onChange={(e) => setzonesite(e.target.value)}   className="form-control">
                            {
                                zone.map((e) => {
                                    return(
                                        <option key={e.id} value="{e.id}">{e.NomZone}</option>
                                    );
                                })
                            }
                        </select>
                        <div>
                        <label for="">Adresse</label>
                        <input type="text"  onChange={(e) => setadresse(e.target.value)}    className="form-control" />
                        <label for="">Telephone</label>
                        <input type="text"  onChange={(e) => settel(e.target.value)}    className="form-control" />
                    </div>
                    </div>
            </div>
            <div className="modal-footer">
                <button onClick={ajouterSite } className="btn btn-primary">Ajouter</button>
            </div>
        </div>
    </div>
</div>
        </>
    )
}
export default Site;