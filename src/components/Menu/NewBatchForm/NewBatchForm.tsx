import '../menuForm.css';

import {useFormik} from "formik";
import {batchValidationSchema} from "../../../helper/formValidationSchema";

const NewBatchForm = () => {
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        initialValues: {
            inventoryName: "",
            name: "",
            location: "In house",
            batchQuantity: "",
        },
        validationSchema: batchValidationSchema,
        onSubmit: values => {
            // Handle form submission
        },
    });

    return <section className="formWrapper">
        <form className="formContainer" onSubmit={handleSubmit}>

            <div className="inputContainer">
                <label className="label" htmlFor="name">Batch Name</label>
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
                <label className="label" htmlFor="batchQuantity">Storage Limit</label>
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

            <div className="inputContainer">
                <label className="label" htmlFor="inventoryName">Select Inventory List</label>
                <select
                    className="selectInput"
                    id="inventoryName"
                    name="inventoryName"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inventoryName}
                >
                    <option value="" selected disabled>Select Inventory</option>
                    {/*<option className="option" value="inventory">Inventory Name</option>*/}
                </select>
            </div>

            <button type="submit" className="submitBtn">Submit</button>
        </form>
    </section>
};

export default NewBatchForm;