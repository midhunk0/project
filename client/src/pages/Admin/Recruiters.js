import React from "react";
import AdminMenu from "../../components/AdminMenu";

const Recruiters= () => {
  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-6">
          <h2>Recruiters</h2>
        </div>
      </div>
    </div>
  );
};

export default Recruiters;
