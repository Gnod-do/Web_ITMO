import axios from "axios";
import { FormWrapper } from "./FormWrapper";
import {
  useState,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

type Table1Data = {
  First: boolean;
  Second: boolean;
  Third: boolean;
  Fourth: boolean;
  Fifth: boolean;
};

type Table1FormProps = Table1Data & {
  updateFields: (fields: Partial<Table1Data>) => void;
};

const Table1Form = ({
  First,
  Second,
  Third,
  Fourth,
  Fifth,
  updateFields,
}: Table1FormProps) => {
  const [criteria1, setCriteria1] = useState("");
  const [criteria2, setCriteria2] = useState("");
  const [criteria3, setCriteria3] = useState("");
  const [criteria4, setCriteria4] = useState("");
  const [criteria5, setCriteria5] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/criterias")
      .then((response) => response.json())
      .then((data) => {
        setCriteria1(data.criteriaList[0].criteria1);
        setCriteria2(data.criteriaList[0].criteria2);
        setCriteria3(data.criteriaList[0].criteria3);
        setCriteria4(data.criteriaList[0].criteria4);
        setCriteria5(data.criteriaList[0].criteria5);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <FormWrapper title=" Какими качествами ты обладаешь?">
      <p>Какими качествами ты обладаешь?</p>
      <ul className={"no-bullets"} >
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={First}
              onChange={(e) => updateFields({ First: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p >{criteria1}</p>}
          </label>
        </li>

        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Second}
              onChange={(e) => updateFields({ Second: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p>{criteria2}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Third}
              onChange={(e) => updateFields({ Third: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p>{criteria3}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Fourth}
              onChange={(e) => updateFields({ Fourth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p>{criteria4}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Fifth}
              onChange={(e) => updateFields({ Fifth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p>{criteria5}</p>}
          </label>
        </li>
      </ul>
    </FormWrapper>
  );
};

export default Table1Form;
