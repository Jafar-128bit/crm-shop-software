import './billing.css';
import {JSX} from "react";
import {useDispatch, useSelector} from "react-redux";

const Billing = (): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <section className="billing">Billing</section>
    );
}

export default Billing;