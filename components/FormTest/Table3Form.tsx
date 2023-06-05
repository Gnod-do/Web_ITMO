import { useEffect, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type Table3Data = {
  Eleventh: boolean;
  Twelfth: boolean;
  Thirteenth: boolean;
  Fourteenth: boolean;
  Fifteenth: boolean;
};

type Table3FormProps = Table3Data & {
  updateFields: (fields: Partial<Table3Data>) => void;
};

export function Table3Form({
  Eleventh,
  Twelfth,
  Thirteenth,
  Fourteenth,
  Fifteenth,
  updateFields,
}: Table3FormProps) {
  const [criteria11, setCriteria11] = useState("");
  const [criteria12, setCriteria12] = useState("");
  const [criteria13, setCriteria13] = useState("");
  const [criteria14, setCriteria14] = useState("");
  const [criteria15, setCriteria15] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/criterias")
      .then((response) => response.json())
      .then((data) => {
        setCriteria11(data.criteriaList[0].criteria11);
        setCriteria12(data.criteriaList[0].criteria12);
        setCriteria13(data.criteriaList[0].criteria13);
        setCriteria14(data.criteriaList[0].criteria14);
        setCriteria15(data.criteriaList[0].criteria15);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <FormWrapper title=" Какими качествами ты обладаешь?">
      <p>Какими качествами ты обладаешь?</p>
      <ul className={"no-bullets"}>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Eleventh}
              onChange={(e) => updateFields({ Eleventh: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria11}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Twelfth}
              onChange={(e) => updateFields({ Twelfth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria12}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Thirteenth}
              onChange={(e) => updateFields({ Thirteenth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria13}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Fourteenth}
              onChange={(e) => updateFields({ Fourteenth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria14}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Fifteenth}
              onChange={(e) => updateFields({ Fifteenth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria15}</p>}
          </label>
        </li>
      </ul>
    </FormWrapper>
  );
}
