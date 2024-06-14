import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Shared/Spinner';
import Layout from '../components/Shared/Layout/Layout';
import Modal from '../components/Shared/model/Modal';
import API from '../services/api';
import moment from 'moment';

const HomePage = () => {
  const { loading, error ,user} = useSelector((state) => state.auth);
  const navigate=useNavigate()

  const [data,setData]=useState([])

  //get function
  const getBloodRecords=async()=>{
    try {
      const {data} =await API.get('/inventory/get-inventory')
      if(data?.success)
        {
          setData(data?.inventory)
          //console.log(data)
        }

      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getBloodRecords();
  },[]);

  return (
    <Layout>


      {user?.role==='admin' && navigate('/admin')



      }
      {error && (
        <div>
          <span>{error}</span>
        </div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <>
        <div className="container">

        
         <h4 className='ms-4'  data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor: "pointer"}}>
             <i className='fa-solid fa-plus text-success py-4'></i>
          Add Inventory
          </h4>
        <table className="table">
          <thead >
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity(in ml)</th>
              <th scope="col">Donor Email</th>
              <th scope="col">Time and Date</th>
            </tr>
          </thead>
          <tbody>
           {data?.map((record)=>(
            <tr key={record._id}>
              <td>{record.inventoryType}</td>
              <td>{record.bloodGroup}</td>
              <td>{record.quantity}  (ml)</td>
              <td>{record.email}</td>
              <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>

            </tr>
           ))}
          </tbody>
        </table>

          <Modal/>
          </div>
      </>
      )}
    </Layout>
  );
};

export default HomePage;
