import React from "react";

const Consomation = () => {
    <div className="card">
        <h2>Calcul consommation</h2>
        <form action="">
            <div className="row">
                <div className="col-md-3">
                    <input type="date" className="form-control" placeholder="Date debut" /> 
                </div>
                <div className="col-md-3">
                    <input type="date" className="form-control" placeholder="Date fin" /> 
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary"> <i className="fas fa-search"></i></button>
                </div>
            </div>
        </form>
    </div>
}

export default Consomation;