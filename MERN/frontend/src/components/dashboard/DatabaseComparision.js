import React, { useEffect, useState } from 'react';
import app_config from '../../config';

const DatabaseComparison = () => {
  const { apiurl } = app_config;
  const [operationList, setOperationList] = useState([]);

  const fetchOperationsData = async () => {
    const res = await fetch(`${apiurl}/op/getall`);
    const data = await res.json();
    console.log(data);
    setOperationList(data.result);
  };

  useEffect(() => {
    fetchOperationsData();
  }, []);

  const displayOperations = () => {
    return operationList.map((operation) => {
      return (
        <tr key={operation._id}>
          <td>{operation.name}</td>
          <td>{operation.description}</td>
          <td>{operation.time} seconds</td>
          <td>{operation.stack}</td>
          <td>{new Date(operation.created_at).toLocaleDateString()} - {new Date(operation.created_at).toLocaleTimeString()}</td>
        </tr>
      );
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url('http://getwallpapers.com/wallpaper/full/5/f/f/1080818-light-blue-backgrounds-2560x1600-mobile.jpg')`
      }}
    >
      <header className="bg-dark">
        <div className="container py-5">
          <p className="fw-bold text-white display-4">Database Comparison</p>
        </div>
      </header>
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Operation Name</th>
                  <th>Description</th>
                  <th>Elapsed Time</th>
                  <th>Stack Used</th>
                  <th>Operation Time</th>
                </tr>
              </thead>
              <tbody>{displayOperations()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseComparison;
