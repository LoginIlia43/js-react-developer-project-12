import React from "react";
import SignUpForm from "../components/SignUpForm";
import HeaderComponent from "../components/HeaderComponent";

function SignUpPage() {
    return (
        <div className="h-100 d-flex flex-column">
            <HeaderComponent />
            <div className="h-100 d-flex align-items-center">
                <div className="col">
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;
