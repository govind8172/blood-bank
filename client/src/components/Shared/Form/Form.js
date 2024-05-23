// import React,{useState} from 'react'
// import InputType from './InputType'

// const Form = ({submitBtn,formTitle}) => {

//     const [email,setEmail]=useState('');
//     const [password,setPassword]=useState('');
//     const [role,setRole]=useState('');
//     const [name,setName]=useState('');
//     const [organization,setOrganization]=useState('');
//     const [hospital,setHospital]=useState('');
//     const [website,setWebsite]=useState('');
//     const [address,setAddress]=useState('');
//     const [phone,setPhone]=useState('');
    



//   return (
//     <div>
//       <form >
//                <h1 className='text-center'>{formTitle}</h1>
//                <hr/>
//                <InputType 
//                 labelText={'Email'}
//                 labelFor={'forEmail'} 
//                 inputType={'email'} 
//                 name={'email'}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 />
//                 <InputType 
//                 labelText={'Password'} 
//                 labelFor={'forPassword'} 
//                 inputType={'password'}
//                  name={'password'}
//                  onChange={(e)=>setPassword(e.target.value)}
//                  />

//         <InputType 
//           labelText={"Role"}
//           labelFor={"forRole"}
//           inputType={"text"}
//           name={"role"}
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         />
//         <InputType 
//           labelText={"Name"}
//           labelFor={forName"}
//           inputType={"text"}
//           name={"name"}
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <InputType 
//           labelText={"Organization"}
//           labelFor={"forOrganization"}
//           inputType={"text"}
//           name={"organization"}
//           value={organization}
//           onChange={(e) => setOrganization(e.target.value)}
//         />
//         <InputType 
//           labelText={"Hospital"}
//           labelFor={"forHospital"}
//           inputType={"text"}
//           name={"hospital"}
//           value={hospital}
//           onChange={(e) => setHospital(e.target.value)}
//         />
//         <InputType 
//           labelText={"Website"}
//           labelFor={"forWebsite"}
//           inputType={"url"}
//           name={"website"}
//           value={website}
//           onChange={(e) => setWebsite(e.target.value)}
//         />
//         <InputType 
//           labelText={"Address"}
//           labelFor={"forAddress"}
//           inputType={"text"}
//           name={"address"}
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <InputType 
//           labelText={"Phone"}
//           labelFor={"forPhone"}
//           inputType={"text"}
//           name={"phone"}
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
  
//            <div className="d-flex">
//             <button type="submit" className="btn btn-primary">{submitBtn}</button>
//            </div>
            
//       </form>
//     </div>
//   )
// }

// export default Form
import React, { useState } from 'react';
import InputType from './InputType';

const Form = ({ formType,submitBtn, formTitle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [hospital, setHospital] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      email,
      password,
      role,
      name,
      organization,
      hospital,
      website,
      address,
      phone
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        

        <div className="d-flex mb-3">
            <div className="form-check">
                <input type="radio"
                className='form-check-input'
                name="role"
                id="donorRadio"
                value={'donor'}
                onChange={(e)=>setRole(e.target.value)}
                defaultChecked
                 />

                 <label htmlFor='donorRadio' className='form-check-label'>
                    Donor
                 </label>
            </div>
            <div className="form-check ms-2">
                <input type="radio"
                className='form-check-input'
                name="role"
                id="organizationRadio"
                value={'organization'}
                onChange={(e)=>setRole(e.target.value)}
                
                 />

                 <label htmlFor='organizationRadio' className='form-check-label'>
                    Organization
                 </label>
            </div>
            <div className="form-check ms-2">
                <input type="radio"
                className='form-check-input'
                name="role"
                id="hospitalRadio"
                value={'hospital'}
                onChange={(e)=>setRole(e.target.value)}
                
                 />

                 <label htmlFor='hospitalRadio' className='form-check-label'>
                    Hospital
                 </label>
            </div>
            <div className="form-check ms-2">
                <input type="radio"
                className='form-check-input'
                name="role"
                id="adminRadio"
                value={'admin'}
                onChange={(e)=>setRole(e.target.value)}
               
                 />

                 <label htmlFor='adminRadio' className='form-check-label'>
                    Admin
                 </label>
            </div>
        </div>
         


         {(()=>{
            switch(true){
                case formType==='login':{
                    return (
                        <>
                            <InputType 
                            labelText="Email"
                            labelFor="forEmail"
                            inputType="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputType 
                            labelText="Password"
                            labelFor="forPassword"
                            inputType="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />

                        </>
                    )
                }
                case formType==='register':{
                    return (
                        <>
                           
                            {/* <InputType 
                            labelText="Role"
                            labelFor="forRole"
                            inputType="text"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            /> */}

                            {(role==='admin' || role==='donor')&& (
                                <InputType 
                                labelText="Name"
                                labelFor="forName"
                                inputType="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />

                            )}
                            {(role==='organization')&&(
                                <InputType 
                                labelText="Organization"
                                labelFor="forOrganization"
                                inputType="text"
                                name="organization"
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                />

                            )}
                            {(role==='hospital')&&(
                                <InputType 
                                labelText="Hospital"
                                labelFor="forHospital"
                                inputType="text"
                                name="hospital"
                                value={hospital}
                                onChange={(e) => setHospital(e.target.value)}
                                />
    

                            )}
                            
                            <InputType 
                            labelText="Email"
                            labelFor="forEmail"
                            inputType="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputType 
                            labelText="Password"
                            labelFor="forPassword"
                            inputType="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputType 
                            labelText="Website"
                            labelFor="forWebsite"
                            inputType="url"
                            name="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            />
                            <InputType 
                            labelText="Address"
                            labelFor="forAddress"
                            inputType="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            />
                            <InputType 
                            labelText="Phone"
                            labelFor="forPhone"
                            inputType="tel"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                        </>
                    )
                }

            }
         })()}
        
        <div className="d-flex">
          <button type="submit" className="btn btn-primary">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
