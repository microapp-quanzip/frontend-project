import React from "react";
import AppContent from "./AppContent";
import Footer from "./Footer";
import TopHeader from "./TopHeader";

export default function AppLayout() {
    return <>
        <TopHeader />
        <div className="container-fluid">
            <div className="row">
                <AppContent />
            </div>
            <div className="row">
                <Footer />
            </div>
        </div>
    </>
}
