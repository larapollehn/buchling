import React from "react";

const Layout = ({className, children}) =>
    (
        <div id={"layout"} className="container layout-parent">
            <div className={className} id="layout-child">{children}</div>
            <hr className="footer-hr"/>
            <footer className="row page-footer">
                <div className="col-md-3">
                    This is a not a real shop.
                    Do not buy anything from here.
                    It is not real. Nothing will be sent to you.
                </div>
                <div className="col-md-3">
                    <ul className="footer-list">
                        <li><a className="footer-list-item" href="/">FAQ</a></li>
                        <li><a className="footer-list-item" href="/">Payment Info</a></li>
                        <li><a className="footer-list-item" href="/">Shipping Info</a></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <ul className="footer-list">
                        <li><a className="footer-list-item" href="/">Gift Cards</a></li>
                        <li><a className="footer-list-item" href="/">Sale & Discount</a></li>
                        <li><a className="footer-list-item" href="/">Customer Service</a></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    Product images from: <br/>
                    <a className="footer-list-item" href="https://shop.mybluprint.com" target="_blank">https://shop.mybluprint.com</a><br/>
                    <a className="footer-list-item" href="https://www.amazon.de" target="_blank">https://www.amazon.de</a>
                </div>
            </footer>
        </div>);

export default Layout;
