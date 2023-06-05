import axios from "axios";
import { FormWrapper } from "./FormWrapper";
import { useState, useEffect } from "react";

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
  //   try {
  //     const listData = await getList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   const [listData, setListData] = useState();
  //   useEffect(async () => {
  //     const listData = await getList();
  //     setListData(listData);
  //   }, []);

  const [listData, setListData] = useState();

  const getList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXTAUTH_URL}/api/criterias`
      );
      setListData(response?.data);
      console.log(response);
    } catch (error) {}
  };

  //   const listData = await getList();

  useEffect(() => {
    const data = getList();
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
              checked={First}
              onChange={(e) => updateFields({ First: e.target.checked })}
            />
            <p>Самостоятельность</p>
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
            <p>Исполнительность и старательность</p>
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
            <p>Логичность</p>
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
            <p>Ответственность</p>
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
            <p>Экстернальность</p>
          </label>
        </li>
      </ul>
    </FormWrapper>
  );
};

export default Table1Form;
