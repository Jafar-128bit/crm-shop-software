import * as Yup from 'yup';

export const supplierValidationSchema = Yup.object().shape({
    supplierName: Yup.string().required('Inventory Name is required'),
    phoneNumber: Yup.string().required('Inventory Type is required').max(10, "Too long").min(10, "Too short"),
    email: Yup.string().required('Inventory Location is required').email("Invalid email address"),
    address: Yup.string().required('Batch Quantity is required'),
});

export const inventoryValidationSchema = Yup.object().shape({
    name: Yup.string().required('Inventory Name is required'),
    type: Yup.string().required('Inventory Type is required'),
    location: Yup.string().required('Inventory Location is required'),
    batchQuantity: Yup.number()
        .required('Batch Quantity is required')
        .positive('Batch Quantity must be a positive number')
        .integer('Batch Quantity must be an integer'),
});

export const batchValidationSchema = Yup.object().shape({
    inventoryName: Yup.string().required('Inventory Name is required'),
    name: Yup.string().required('Inventory Name is required'),
    location: Yup.string().required('Inventory Location is required'),
    batchQuantity: Yup.number()
        .required('Batch Quantity is required')
        .positive('Batch Quantity must be a positive number')
        .integer('Batch Quantity must be an integer'),
});

export const productCategoriesValidationSchema = Yup.object().shape({
    name: Yup.string().required('Inventory Name is required'),
});
