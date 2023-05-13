import './App.css';
import React, { useState} from 'react';
import Profs from './Components/Profs';
import { SelectButton } from 'primereact/selectbutton';
import Etudiants from './Components/Etudiants';
import Filieres from './Components/Filieres';

function App() {
    const optionsList = ["PROFS", "ETUDIANTS", "FILIERES"];
    const [valueList, setValueList] = useState(optionsList[0]);
    const optionsType = ["ALL", "ENSA", "EST", "FST"];
    const [valueType, setValueType] = useState(optionsType[0]);

    console.log()
  return (
    <div className="App">
      <div className='header'>GESTION ADMINISTRATIF</div>
      <div className="button-nav mt-5">
            <div className=" flex justify-content-center">
                <SelectButton
                    value={valueList}
                    onChange={(e) => setValueList(e.value)}
                    options={optionsList}
                />
            </div>
        </div>
        <div className="button-nav mt-5">
            <div className=" flex justify-content-center">
                <SelectButton
                    value={valueType}
                    onChange={(e) => setValueType(e.value)}
                    options={optionsType}
                />
            </div>
        </div>

        {valueList === "PROFS" ? <Profs Type={ valueType } /> : null}
        {valueList === "ETUDIANTS" ? <Etudiants /> : null}
        {valueList === "FILIERES" ? <Filieres /> : null}
    </div>
  );
}

export default App;
