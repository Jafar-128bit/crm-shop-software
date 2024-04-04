import "./login.css";

import logo from "../../assets/logo/logoNormal.svg";

import * as Yup from "yup";
import {useFormik} from "formik";
import {JSX, useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {toggleMenuState} from "../../store/slices/menuSlices";
import {PayloadAction} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import {ActionType} from "../../type/type";

const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isResetMenuOpen, setIsResetMenuOpen] = useState<boolean>(false);

    interface FormValues {
        email: string;
        password: string;
    }

    const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
        email: Yup.string()
            .required('Email Required')
            .email('Invalid email address'),
        password: Yup.string()
            .required('Password Required')
            .min(8, 'Password must be at least 8 characters'),
    });

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            navigate("/dashboard");
        },
    });

    type LoginInputData = {
        key: number;
        id: string;
        name: string;
        type: string;
        placeholder: string;
        label: string;
        onChange: any;
        value: string;
        validation: string | undefined;
        blurEvent: any;
        touched: boolean | undefined;
    }
    const loginInputData: LoginInputData[] = [
        {
            key: 1,
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: "Ex. johnwatson99@email.com",
            label: 'Email',
            onChange: formikLogin.handleChange,
            value: formikLogin.values.email,
            validation: formikLogin.errors.email,
            blurEvent: formikLogin.handleBlur,
            touched: formikLogin.touched.email,
        },
        {
            key: 2,
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: "Your password",
            label: 'Password',
            onChange: formikLogin.handleChange,
            value: formikLogin.values.password,
            validation: formikLogin.errors.password,
            blurEvent: formikLogin.handleBlur,
            touched: formikLogin.touched.password,
        },
    ];

    const handleSidebar = (): PayloadAction<ActionType> => dispatch(toggleMenuState({actionState: false, optionName: "SIDE_BAR"}));
    const handleOpenReset = (): void => setIsResetMenuOpen(!isResetMenuOpen);

    useEffect(() => {
        handleSidebar();
    }, [dispatch]);

    return (
        <div className="loginContainer">
            {!isResetMenuOpen && <div className="loginBox loginMenu">
                <div className="login__logoContainer">
                    <img src={logo} alt="store sync pro logo"/>
                </div>
                <h3 className="login__title">Welcome to System</h3>
                <form className="login__form" onSubmit={() => formikLogin.handleSubmit()}>
                    {loginInputData.map((input, index) =>
                        <div key={input.key} className="login__form__inputComponent">
                            <p>{input.validation && input.touched ? `*${input.validation}` : null}</p>
                            <label htmlFor={input.id}>{input.label}</label>
                            <input
                                id={input.id}
                                name={input.name}
                                type={input.type}
                                placeholder={input.placeholder}
                                onBlur={input.blurEvent}
                                onChange={input.onChange}
                                value={input.value}
                                required={true}
                            />
                        </div>
                    )}
                    <button type="submit" className="login__form__submitBtn">Login</button>
                </form>
                <button
                    className="login__form__resetBtn"
                    onClick={handleOpenReset}
                >
                    Forgot email & password?
                </button>
            </div>}
            {isResetMenuOpen && <div className="loginBox resetMenu">
                <button
                    type="button"
                    className="resetMenu__cancelBtn"
                    onClick={handleOpenReset}
                >
                    back
                </button>
            </div>}
        </div>
    );
}

export default Login;