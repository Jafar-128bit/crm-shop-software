import '../menuForm.css';

import {useFormik} from 'formik';
import {inventoryValidationSchema} from "../../../helper/formValidationSchema";

const NewInventoryForm = () => {

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        initialValues: {
            name: "",
            type: "",
            location: "In house",
            batchQuantity: "",
        },
        validationSchema: inventoryValidationSchema,
        onSubmit: values => {
            // Handle form submission
        },
    });

    return (
        <section className="formWrapper">
            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label className="label" htmlFor="name">Inventory Name</label>
                    <input
                        className="input"
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                </div>
                <div className="inputContainer">
                    <label className="label" htmlFor="type">Inventory Type</label>
                    <select
                        className="selectInput"
                        id="type"
                        name="type"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.type}
                    >
                        <option className="option" value="JIT">JIT Just-In-Time</option>
                        <option className="option" value="FIFO">FIFO First-In-First-Out</option>
                        <option className="option" value="LIFO">LIFO Last-In-First-Out</option>
                    </select>
                </div>
                <div className="inputContainer">
                    <label className="label" htmlFor="location">Inventory Location</label>
                    <input
                        className="input"
                        type="text"
                        id="location"
                        name="location"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.location}
                    />
                </div>
                <div className="inputContainer">
                    <label className="label" htmlFor="batchQuantity">Batch Quantity</label>
                    <input
                        className="input"
                        type="number"
                        id="batchQuantity"
                        name="batchQuantity"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.batchQuantity}
                    />
                </div>
                <button type="submit" className="submitBtn">Submit</button>
            </form>
        </section>
    );
}

export default NewInventoryForm;
