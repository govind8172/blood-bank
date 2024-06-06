import moment from 'moment';
import React, { useEffect, useState } from 'react'
import API from '../../services/api';
import Layout from './../../components/Shared/Layout/Layout';

const HospitalPage = () => {
    const [data, setData] = useState([]);
       
        const getHospital = async () => {
          try {
            const { data } = await API.get("/inventory/get-hospitals");
            //console.log(data);
            if(data?.success)
              {
                  setData(data?.hospitals)
              }
            
          } catch (error) {
            console.log(error);
          }
        };
        useEffect(() => {
          getHospital();
        }, []);
        return (
          <Layout>
                    <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    
                    <th scope="col">Time and Date</th>
                  </tr>
                </thead>
                <tbody>
                 {data?.map((record)=>(
                  <tr key={record._id}>
                    <td>{record.hospitalName}</td>
                    <td>{record.email}</td>
                    <td>{record.phone}</td>
                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
      
                  </tr>
                 ))}
                </tbody>
              </table>
          </Layout>
        );
 
}

export default HospitalPage
