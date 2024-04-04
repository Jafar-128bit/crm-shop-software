import '../menuForm.css';

import {useFormik} from 'formik';
import {supplierValidationSchema} from "../../../helper/formValidationSchema";

const NewSupplierForm = () => {

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        initialValues: {
            supplierName: "",
            phoneNumber: "",
            email: "",
            address: "",
        },
        validationSchema: supplierValidationSchema,
        onSubmit: values => {
            // Handle form submission
        },
    });

    return <section className="formWrapper">
        <form className="formContainer" onSubmit={handleSubmit}>
            <div className="inputContainer">
                <label className="label" htmlFor="supplierName">Supplier Name</label>
                <input
                    className="input"
                    type="text"
                    id="supplierName"
                    name="supplierName"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.supplierName}
                />
            </div>
            <div className="inputContainer">
                <label className="label" htmlFor="phoneNumber">Phone Number</label>
                <input
                    className="input"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                />
            </div>
            <div className="inputContainer">
                <label className="label" htmlFor="email">Email</label>
                <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
            </div>
            <div className="inputContainer">
                <label className="label" htmlFor="address">Address</label>
                <input
                    className="input"
                    type="text"
                    id="address"
                    name="address"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                />
            </div>
            <button type="submit" className="submitBtn">Submit</button>
        </form>
    </section>
};

export default NewSupplierForm;