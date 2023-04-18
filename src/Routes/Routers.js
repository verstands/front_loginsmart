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
import Rapport_carburant from "../Components/carburant/rapport_carburant";
import Vehicule_maintenance from "../Components/maintenance/vehicule";
import Generateur_maintenace from "../Components/maintenance/generateur";
import Affectation_vehicule from "../Components/vehicule/affectation";
import Conge_personnel from "../Components/personnel/conge";
import Affecter_personnel from "../Components/personnel/affecter_personnel";
import Fournisseur from "../Components/admin/fournisseur";
import Acheter from "../Components/approvisionnemment/acheter";
import Vente from "../Components/approvisionnemment/vente";
import Budget_carburant from "../Components/carburant/budget";

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
                <Route path="/generateur_vehicule" element={<Generateur_vehicule />} />
                <Route path="/vehicule_maintenance" element={<Vehicule_maintenance />} />
                <Route path="/Generateur_maintenace" element={<Generateur_maintenace />} />
                <Route path="/affectation_vehicule" element={<Affectation_vehicule />} />
                <Route path="/conge_personnel" element={<Conge_personnel />} />
                <Route path="/affecter_personnel" element={<Affecter_personnel />} />
                <Route path="/fournisseur" element={<Fournisseur />} />
                <Route path="/acheter" element={<Acheter />} />
                <Route path="/vente" element={<Vente />} />
                <Route path="/budget_carburant" element={<Budget_carburant />} />
            </Routes>
        )
    }
}
export default Routers;