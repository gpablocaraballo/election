import React from 'react';

function Footer() {
    const footerStyle = {
      padding: '10px',
      margin:'10px'
    };
    return (
        <footer className="footer" style={footerStyle} >
          <div className="content has-text-centered">
            <p>
            Ver: 20170801100000-CRQ21877 
            </p>
          </div>
        </footer>
    );
}
export default Footer;