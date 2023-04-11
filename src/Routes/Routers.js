import { Component } from "react";
import LoginA from "../Pages/login";
import { Routes, Route } from "react-router-dom";
import Dashboad from "../Pages/Dashboad";
import Vehicule_carburant from "../Components/carburant/vehicule_carburant";
import UserAdd from "../Components/admin/utilisateur";
import Personnel from "../Components/admin/personnel";
import Location from "../Components/admin/location";
import PersonneP from "../Components/personnel/personnel";
import Edition from "../Components/generateur/edition";
import AffectationGeneral from "../Components/generateur/affectation";
import Edition_vehicule from "../Components/vehicule/edition";
import Deletes from "../Components/delete";
import Generateur_vehicule from "../Components/carburant/generateur";
import Rapport_carburant from "../Components/carburant/generateur";
import Vehicule_maintenance from "../Components/maintenance/vehicule";

class Routers extends Component{
    render(){
        return(
            <Routes>
                <Route path="/" element={<LoginA />}  />
                <Route path="/dashboad" element={<Dashboad />}  />
                <Route path="/carburant_vehicule" element={<Vehicule_carburant />}  />
                <Route path="/ajouterUtilisateur" element={<UserAdd />}  />
                <Route path="/Personnel" element={<Personnel />}  />
                <Route path="/location" element={<Location />}  />
                <Route path="/personnelp" element={<PersonneP />}  />
                <Route path="/edition" element={<Edition />}  />
                <Route path="/affectation_general" element={<AffectationGeneral />}  />
                <Route path="/editio_vehicule" element={<Edition_vehicule />}  />
                <Route path="/deletesuccess" element={<Deletes />}  />
                <Route path="/rapport_carburant" element={<Rapport_carburant />}  />
                <Route path="/generateur_vehicule" element={<Generateur_vehicule />}  />
                <Route path="/vehicule_maintenacne" element={<Vehicule_maintenance />}  />
            </Routes>
        )
    }
}
export default Routers;