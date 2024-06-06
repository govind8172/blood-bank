import moment from 'moment';
import React, { useEffect, useState } from 'react'
import API from '../../services/api';
import Layout from './../../components/Shared/Layout/Layout';



const OrganisationPage = () => {
        const [data, setData] = useState([]);
       
        const getOrg = async () => {
          try {
            const { data } = await API.get("/inventory/get-organisation");
            //console.log(data);
            if(data?.success)
              {
                  setData(data?.organisations)
              }
            
          } catch (error) {
            console.log(error);
          }
        };
        useEffect(() => {
          getOrg();
        }, []);
        return (
          <Layout>
                    <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Time and Date</th>
                  </tr>
                </thead>
                <tbody>
                 {data?.map((record)=>(
                  <tr key={record._id}>
                    <td>{record.organisationName}</td>
                    <td>{record.email}</td>
                    <td>{record.phone}</td>
                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
      
                  </tr>
                 ))}
                </tbody>
              </table>
          </Layout>
        );
      };
      


export default OrganisationPage
