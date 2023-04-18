
import React from "react";
import Navbar from "../Navbar";
import Conge from "../admin/personnel/conge";

const Conge_personnel  = () => {
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
                                <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Conge</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#affecte"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Affecter</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    <Conge />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="affecte" role="tabpanel">
                                
                            </div>
                            <div class="tab-pane p-20" id="conge" role="tabpanel">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export  default Conge_personnel;