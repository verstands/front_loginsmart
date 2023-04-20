import React from "react";

const Consomation = () => {
    return (
        <>
            <div className="card">
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="">Date Debut</label>
                        <input type="date" className="form-control" placeholder="Date debut" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="">Date Fin</label>
                        <input type="date" className="form-control" placeholder="Date fin" />
                    </div>
                    <div className="col-md-3">
                        <br />
                        <button className="btn btn-primary"> <i className="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Consomation;