// import React from "react";
// import Form from "../../components/Shared/Form/Form";
// import Spinner from "../../components/Shared/Spinner";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

// const Register = () => {
//  const {loading,error }= useSelector((state)=>state.auth)
//   return (
//     <>
//     {error && <span>{alert(error)}</span>}
//     {loading?<Spinner/>:(
//       <div className="row" g-0 style={{ display: "flex" }}>
//         <div style={{ flex: "0 0 50%" }}>
//           <img
//             src="./assets/images/register.png"
//             alt="registerimg"
//             style={{ width: "100%" }}
//           />
//         </div>

//         <div
//           style={{
//             flex: "0 0 25%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Form formTitle={"Register"} submitBtn={"Register"} formType={'register'} />
//         </div>
//       </div>
//       )}
//     </>
//   );
// };

// export default Register;
import React from "react";
import Form from "../../components/Shared/Form/Form";
import Spinner from "../../components/Shared/Spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import './Register.css'; // Import the CSS file

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? <Spinner /> : (
        <div className="register-background">
          <div className="register-form-container">
            <div className="register-card">
              
              <h2>Welcome</h2>
              <p>Please register your account</p>
              <Form formTitle={''} submitBtn={'Register'} formType={'register'} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
