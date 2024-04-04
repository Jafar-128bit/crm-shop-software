import '../menuForm.css';
import {useFormik} from "formik";
import {productCategoriesValidationSchema} from "../../../helper/formValidationSchema";

const NewProductCategories = () => {
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
        },
        validationSchema: productCategoriesValidationSchema,
        onSubmit: values => {
            // Handle form submission
        },
    });

    return <section className="formWrapper">
        <form className="formContainer" onSubmit={handleSubmit}>

            <div className="inputContainer">
                <label className="label" htmlFor="name">Category Name</label>
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

            <button type="submit" className="submitBtn">Submit</button>
        </form>
    </section>
}

export default NewProductCategories;