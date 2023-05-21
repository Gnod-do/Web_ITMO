import { FormWrapper } from './FormWrapper';

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

export function Table1Form({
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    updateFields,
}: Table1FormProps) {
    return (
        <FormWrapper title=" Какими качествами ты обладаешь?">
            <p>Какими качествами ты обладаешь?</p>
            <ul className={'no-bullets'}>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={First}
                            onChange={(e) =>
                                updateFields({ First: e.target.checked })
                            }
                        />
                        <p>Самостоятельность</p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Second}
                            onChange={(e) =>
                                updateFields({ Second: e.target.checked })
                            }
                        />
                        <p>Исполнительность и старательность</p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Third}
                            onChange={(e) =>
                                updateFields({ Third: e.target.checked })
                            }
                        />
                        <p>Логичность</p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Fourth}
                            onChange={(e) =>
                                updateFields({ Fourth: e.target.checked })
                            }
                        />
                        <p>Ответственность</p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Fifth}
                            onChange={(e) =>
                                updateFields({ Fifth: e.target.checked })
                            }
                        />
                        <p>Экстернальность</p>
                    </label>
                </li>
            </ul>
        </FormWrapper>
    );
}
