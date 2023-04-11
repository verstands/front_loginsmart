import React from "react";
import Navbar from "../Navbar";
import Intervention from "./vehicule/intervention";

const Vehicule_maintenance = () => {
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
                            <span class="hidden-xs-down"><i class="fas fa-save"></i>Intervention</span></a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#profile"
                            role="tab"
                            ><span class="hidden-sm-up"></span>
                            <span class="hidden-xs-down"><i class="fas fa-book"></i> Planning</span></a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#messages"
                            role="tab"
                            ><span class="hidden-sm-up"></span>
                            <span class="hidden-xs-down"><i class="fas fa-search"></i> Controle T</span></a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#rech"
                            role="tab"
                            ><span class="hidden-sm-up"></span>
                            <span class="hidden-xs-down"><i class="fas fa-search"></i>Recherceh</span></a
                            >
                        </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    <Intervention />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="profile" role="tabpanel">
                                <div class="p-20">
                                  
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="messages" role="tabpanel">
                               
                            </div>
                            <div class="tab-pane p-20" id="consomation" role="tabpanel">
                                 
                            </div>
                               
                            <div class="tab-pane p-20" id="rech" role="tabpanel">
                        </div>
                </div>
              </div>
            </div>
          </div>
  
    </>
    )
}

export default Vehicule_maintenance;