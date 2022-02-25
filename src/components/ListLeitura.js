import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import LeiturasDataService from "./services/leituras.services";
import { BrowserRouter, Routes, Link, Route, Switch } from 'react-router-dom';

const ListLeitura = ({ getLeituraId }) => {
    const [leituras, setLeituras] = useState([]);
    useEffect(() => {
        getLeituras();
    }, []);
  
    const getLeituras = async () => {
      const data = await LeiturasDataService.getAllLeituras()
      console.log(data.docs);
      setLeituras(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    const deleteHandler = async (id) => {
      await LeiturasDataService.deleteLeitura(id);
      getLeituras();
    };

    const convertDate = (date) => {
        // whatever formatting you want to do can be done here
        var d = date.toString()
        return d.substr(0, 21);
    }
    return (
        <>
          <div className="mb-2">
            <Button variant="dark edit" onClick={getLeituras}>
              Refresh List
            </Button>
          </div>
    
          {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>UID</th>
                <th>Email</th>
                <th>Status</th>
                <th>URL QR</th>
                <th>Data</th>
                {/*
                <th>Status</th>
                 */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leituras.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>A{/*{doc.uideng}*/}</td>
                    <td>{doc.emaillog}</td>
                    <td>{doc.status}</td>
                    <td><Link to={{ pathname: doc.urlQR  }} target="_blank" >Link SEFAZ</Link></td>
                    <td>{convertDate(doc.readedAt.toDate())}</td>
                    
                    {/* 
                    <td>{doc.status}</td>
                    <td><Link to={{ pathname: {doc.urlQR}  }} target="_blank" /></td>
                     */}
                    <td>
                        <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => getLeituraId(doc.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="delete"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </Button> 
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    };


    export default ListLeitura;