import React from "react";
import "./App.css";
import MultiSelect from "./components/MultiSelect";
import { emails } from "./data/email";

const selectOptions = emails.map((item) => ({ label: item }));

function App() {
  const [value, setValue] = React.useState([]);
  const validate = (val) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val.label)) {
    } else {
      val.error = true;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <MultiSelect
          options={selectOptions}
          value={value}
          onChange={(all, val) => {
            setValue(all);
            validate(val);
          }}
        />
      </div>
    </div>
  );
}

export default App;
