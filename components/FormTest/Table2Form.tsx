import { FormWrapper } from './FormWrapper';

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
                            checked={Sixth}
                            onChange={(e) =>
                                updateFields({ Sixth: e.target.checked })
                            }
                        />
                        <p>
                            Способность организовывать свою деятельность в
                            условиях большого потока информации
                        </p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Seventh}
                            onChange={(e) =>
                                updateFields({ Seventh: e.target.checked })
                            }
                        />
                        <p>
                            Переключаемость внимания (способность быстрого
                            переключения внимания с
                        </p>
                        <p style={{ marginTop: '60px' }}>
                            одного объекта на другой или с одной деятельности на
                            другую)
                        </p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Eighth}
                            onChange={(e) =>
                                updateFields({ Eighth: e.target.checked })
                            }
                        />
                        <p>
                            Способность к распределению внимания между
                            несколькими объектами или видами
                        </p>
                        <p style={{ marginTop: '60px' }}>деятельности</p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Ninth}
                            onChange={(e) =>
                                updateFields({ Ninth: e.target.checked })
                            }
                        />
                        <p>
                            Синтетичность (способность к обобщениям,
                            установлению связей, закономерностей,
                        </p>
                        <p style={{ marginTop: '60px' }}>
                            формирование понятий)
                        </p>
                    </label>
                </li>
                <li className={'flex-li'}>
                    <label>
                        <input
                            type="checkbox"
                            name="option1"
                            value="option1"
                            checked={Tenth}
                            onChange={(e) =>
                                updateFields({ Tenth: e.target.checked })
                            }
                        />
                        <p>
                            Аналитичность (способность выделять отдельные
                            элементы действительности,
                        </p>
                        <p style={{ marginTop: '60px' }}>
                            способность к классификации)
                        </p>
                    </label>
                </li>
            </ul>
        </FormWrapper>
    );
}
