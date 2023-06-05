import React, { FormEvent, useState } from 'react';
import { Container } from './HomeElements';
import { useMultistepForm } from '../FormTest/useMultistepForm';
import { Table2Form } from '../FormTest/Table2Form';
import { Table3Form } from '../FormTest/Table3Form';
import { Result } from '../FormTest/Result';
import Table1Form from '../FormTest/Table1Form';
type Props = {};

type FormData = {
    First: boolean;
    Second: boolean;
    Third: boolean;
    Fourth: boolean;
    Fifth: boolean;
    Sixth: boolean;
    Seventh: boolean;
    Eighth: boolean;
    Ninth: boolean;
    Tenth: boolean;
    Eleventh: boolean;
    Twelfth: boolean;
    Thirteenth: boolean;
    Fourteenth: boolean;
    Fifteenth: boolean;
};

const INITIAL_DATA: FormData = {
    First: false,
    Second: false,
    Third: false,
    Fourth: false,
    Fifth: false,
    Sixth: false,
    Seventh: false,
    Eighth: false,
    Ninth: false,
    Tenth: false,
    Eleventh: false,
    Twelfth: false,
    Thirteenth: false,
    Fourteenth: false,
    Fifteenth: false,
};

const HomeContent = (props: Props) => {
    const [data, setData] = useState(INITIAL_DATA);
    const [show, setShow] = useState(false);
    function updateFields(fields: Partial<FormData>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }
    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
    } = useMultistepForm([
        <Table1Form {...data} updateFields={updateFields} />,
        <Table2Form {...data} updateFields={updateFields} />,
        <Table3Form {...data} updateFields={updateFields} />,
    ]);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!isLastStep) return next();
        setShow(true);
    }

    return (
        <div className={'container'}>
            {show ? (
                <Result {...data} setShow={() => setShow(false)} />
            ) : (
                <div>
                    {/* <div id="header">
                        <div id="nav">
                            <a href="">ОЦЕНКА ЭКСПЕРТОВ</a>
                            <div className="square">
                                <i className="control-icon ti-control-stop"></i>
                            </div>
                        </div>
                    </div> */}

                    <div id="slider">
                        <div className="text" style={{ whiteSpace: 'pre' }}>
                            {'\t'}ВЫБЕРИ СЕБЕ ПРОФЕССИЮ
                            <br />
                            ПО СВОИМ УНИКАЛЬНЫМ КАЧЕСТВАМ
                        </div>

                        <div className="button">
                            <a href="#come">ПРОЙТИ ТЕСТ </a>
                        </div>
                    </div>

                    <div id="content">
                        <div className="profes1">
                            <div className="subprofes">ИНДИ РАЗРАБОТЧИК</div>
                            <div>
                                <p>
                                    Специалист, который занимается
                                    самостоятельной разработкой игр или входит в
                                    состав небольшой команды без финансовой
                                    поддержки какого- либо издания. В его
                                    обязанности входит полная разработка
                                    проекта: от проработки сюжета и арт-
                                    концептов до игровых механик
                                </p>
                            </div>

                            <div className="sub-button">
                                <a href="">ПРОФЕССИОНАЛЬНЫЕ КАЧЕСТВА</a>
                            </div>
                        </div>
                        <div className="profes2">
                            <div className="subprofes">MOBILE РАЗРАБОТЧИК</div>
                            <div>
                                <p>
                                    Специалист, который создает программные
                                    приложения для телефонов, планшетов и других
                                    мобильных устройств. Помимо непосредственно
                                    программирования он часто ведет коммуникацию
                                    с другими отделами по продукту, проводит
                                    финальное ревью и заливает на нужные
                                    платформы.
                                </p>
                            </div>
                            <div className="sub-button">
                                <a href="">ПРОФЕССИОНАЛЬНЫЕ КАЧЕСТВА</a>
                            </div>
                        </div>
                        <div className="profes3">
                            <div className="subprofes">DATA SCIENTIST</div>
                            <div>
                                <p>
                                    Специалист, который работает с данными из
                                    различных источников: собирает их,
                                    структурирует, выделяет их и занимается
                                    машинным обучением. Ему нужно знать
                                    аналитические методы, алгоритмы машинного
                                    обучения и уметь работать с базами данных
                                </p>
                            </div>
                            <div className="sub-button">
                                <a href="">ПРОФЕССИОНАЛЬНЫЕ КАЧЕСТВА</a>
                            </div>
                        </div>
                    </div>

                    <div id="footer">
                        <div className="line"></div>
                        <div className={'question'} id="come">
                            <p>
                                <i
                                    className={'fa-sharp fa-solid fa-circle'}
                                    style={{
                                        color: '#ffffff',
                                        marginRight: '12px',
                                    }}></i>
                                ПРОЙДИ ТЕСТ И УЗНАЙ КАКАЯ ПРОФЕССИЯ ПОДХОДИТ
                                ТЕБЕ БОЛЬШЕ ВСЕГО
                                <i
                                    className={'fa-sharp fa-solid fa-circle'}
                                    style={{
                                        color: '#ffffff',
                                        marginLeft: '12px',
                                    }}></i>
                            </p>
                        </div>
                        <form
                            onSubmit={onSubmit}
                            className={'question form-container chose'}
                            id="cometo">
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '.5rem',
                                    right: '.5rem',
                                }}>
                                {currentStepIndex + 1} / {steps.length}
                            </div>
                            {step}
                            <div
                                className={'form_wrap'}
                                style={{
                                    marginTop: '0vh',
                                    display: 'flex',
                                    position: 'relative',
                                    bottom: '50px',
                                    left: '75%',
                                    width: '70px',
                                    // gap: ".5rem",
                                    // justifyContent: "flex-end",
                                }}>
                                {!isFirstStep && (
                                    <button type="button" onClick={back}>
                                        Back
                                    </button>
                                )}
                                <button type="submit">
                                    {isLastStep ? 'Finish' : 'Next'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeContent;
