import { useEffect, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type Table2Data = {
  Sixth: boolean;
  Seventh: boolean;
  Eighth: boolean;
  Ninth: boolean;
  Tenth: boolean;
};

type Table2FormProps = Table2Data & {
  updateFields: (fields: Partial<Table2Data>) => void;
};

export function Table2Form({
  Sixth,
  Seventh,
  Eighth,
  Ninth,
  Tenth,
  updateFields,
}: Table2FormProps) {
  const [criteria6, setCriteria6] = useState("");
  const [criteria7, setCriteria7] = useState("");
  const [criteria8, setCriteria8] = useState("");
  const [criteria9, setCriteria9] = useState("");
  const [criteria10, setCriteria10] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/criterias")
      .then((response) => response.json())
      .then((data) => {
        setCriteria6(data.criteriaList[0].criteria6);
        setCriteria7(data.criteriaList[0].criteria7);
        setCriteria8(data.criteriaList[0].criteria8);
        setCriteria9(data.criteriaList[0].criteria9);
        setCriteria10(data.criteriaList[0].criteria10);
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
              checked={Sixth}
              onChange={(e) => updateFields({ Sixth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria6}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Seventh}
              onChange={(e) => updateFields({ Seventh: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria7}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Eighth}
              onChange={(e) => updateFields({ Eighth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria8}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Ninth}
              onChange={(e) => updateFields({ Ninth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria9}</p>}
          </label>
        </li>
        <li className={"flex-li"}>
          <label>
            <input
              type="checkbox"
              name="option1"
              value="option1"
              checked={Tenth}
              onChange={(e) => updateFields({ Tenth: e.target.checked })}
            />
            {loading ? <p>Retrieving data from API...</p> : <p style={{width: '80%', textAlign: 'left'}}>{criteria10}</p>}
          </label>
        </li>
      </ul>
    </FormWrapper>
  );
}
