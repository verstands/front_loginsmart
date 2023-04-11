import React ,{ useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";  

const FicheTechnique = () => {
   const [un, setun] = useState("");
   const [deux, setdeux] = useState("");
   const [fiche, setfiche] = useState([]);
   const [loading, setLoading] = useState(false);
   const [vehicule, setvehicule] = useState([])
   let token = `Bearer ${localStorage.getItem("token")}` ;
   let n = 1;
   const url = `http://localhost:5000/api/recherche_consomation/${un}/${deux}`;	
   const RechercheBtn = () => {
      setLoading(true)
      
      axios.get(url,
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
}
  return(
     <>
        <div class="card">
           <br />
                <div class="row">
                    <div class="col-md-3">
                     <label htmlFor="">Immatriculation</label>
                     <select name="" id="" className="form-control">
                        <option value="">A</option>
                     </select>
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Code groupe" /> 
                    </div>
                    <div class="col-md-3">
                     <label htmlFor=""></label>
                        <button class="btn btn-primary"> <i class="fas fa-search"></i></button>
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
                          <th>Matricule</th>
                          <th>Qte</th>
                          <th>Kilometrage</th>
                        </tr>
                      </thead>
                      <tbody>
                       
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

export default FicheTechnique;