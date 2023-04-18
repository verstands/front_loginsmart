import React from "react";
import Navbar from "../Navbar";

const Generateur_maintenace = () => {
    return (
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
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>immatriculation</th>
                                                <th>Matricule</th>
                                                <th>Date entreée</th>
                                                <th>Date sortie</th>
                                                <th>Jrs</th>
                                                <th>Libelle de repatition</th>
                                                <th>Detail</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
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

export default Generateur_maintenace;