import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import './Profs.css'

const Profs = ({Type}) => {
    const [profs, setProfs] = useState([]);
    const [selectedProfs, setSelectedProfs] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        fetch("http://localhost:8888/profs/"+Type)
          .then((resp) => resp.json())
          .then((data) => setProfs(data)); // set data to state
    }, [Type]);

    console.log("im inside Profs", Type)
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => {}} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => {}} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">GESTION DES PROFESSEURS</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const columns = [
        {field: 'code', header: 'Code'},
        {field: 'nom', header: 'Nom'},
        {field: 'prenom', header: 'Prenom'},
        {field: 'specialite', header: 'Specialite'},
        {field: 'adresse', header: 'Adresse'}
    ];
    

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header}  sortable />;
    });


  return (
    <div className='home'>
        <div className=" container datatable-crud-demo">
            <div className='d-flex justify-content-center align-center list-text mt-5 mb-3'>{Type === "ALL" ? "LISTE DE TOUT LES PROFESSEURS" : "LISTE DES PROFESSEURS " + Type } </div>
            <div className="card">
                <DataTable ref={dt} value={profs} selection={selectedProfs} onSelectionChange={(e) => setSelectedProfs(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} professors"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {dynamicColumns}
                    <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                

            </div>
        </div>
    </div>
  )
}

export default Profs