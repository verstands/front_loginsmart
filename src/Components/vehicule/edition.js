import React from "react";
import Navbar from "../Navbar";
import Vehicule_vehicule from "./edition/vehicule";
import Affiche_vehicule from "./edition/affichetous";
import FicheTechnique from "../generateur/edition/ficheTechnique";

const Edition_vehicule = () => {
  return(
    <>
    <Navbar />
    <div class="page-wrapper">
        <div class="row">
            <div class="card">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a
                        class="nav-link active"
                        data-bs-toggle="tab"
                        href="#home"
                        role="tab"
                        ><span class="hidden-sm-up"></span>
                        <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Vehicule</span></a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                        class="nav-link"
                        data-bs-toggle="tab"
                        href="#aff"
                        role="tab"
                        ><span class="hidden-sm-up"></span>
                        <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Afficher tous</span></a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                        class="nav-link"
                        data-bs-toggle="tab"
                        href="#affecte"
                        role="tab"
                        ><span class="hidden-sm-up"></span>
                        <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Fiche technique</span></a
                        >
                    </li>
                </ul>
                <div class="tab-content tabcontent-border">
                    <div class="tab-pane active" id="home" role="tabpanel">
                        <div class="p-20">
                            <Vehicule_vehicule />
                        </div>
                    </div>
                    <div class="tab-pane p-20" id="aff" role="tabpanel">
                          <Affiche_vehicule />
                    </div>
                    <div class="tab-pane p-20" id="affecte" role="tabpanel">
                         <FicheTechnique />
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default Edition_vehicule; 