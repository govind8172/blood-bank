import React from "react";
import Form from "../../components/Shared/Form/Form";

const Register = () => {
  return (
    <>
      <div className="row" g-0 style={{ display: "flex" }}>
        <div style={{ flex: "0 0 50%" }}>
          <img
            src="./assets/images/register.png"
            alt="registerimg"
            style={{ width: "100%" }}
          />
        </div>

        <div
          style={{
            flex: "0 0 25%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form formTitle={"Register"} submitBtn={"Register"} formType={'register'} />
        </div>
      </div>
    </>
  );
};

export default Register;
