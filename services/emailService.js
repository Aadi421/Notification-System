const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const CONFIG=require('../config/config');

const sendEmail = async (to, subject, text) => { 
    let transporter = nodemailer.createTransport(sesTransport
        ({
            accessKeyId: CONFIG.AWS_LYNKBUILTY_ACCESS_KEY,
            secretAccessKey: CONFIG.AWS_LYNKBUILTY_SECRET_KEY,
        }));

    let mailOptions = {
        from: `Lynkgrid WMS <${CONFIG.EMAIL_ID}>`,
        to: to,
        bcc: "support@lynkgrid.com",
        subject: subject,
        html:`<html style='width:100%;font-family:lato,  helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;'>
        <head>
           <link href='https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i' rel='stylesheet'></link>
           <style> @media only screen and (max-width: 600px) { p, ul li, ol li, a { font-size: 16px !important } h1 { font-size: 30px !important; text-align: center } h2 { font-size: 26px !important; text-align: center } h3 { font-size: 20px !important; text-align: center } h1 a { font-size: 30px !important } h2 a { font-size: 26px !important } h3 a { font-size: 20px !important } .es-menu td a { font-size: 16px !important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size: 16px !important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size: 16px !important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size: 12px !important } *[class='gmail-fix'] { display: none !important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align: center !important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align: right !important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align: left !important } .es-m-txt-r a img, .es-m-txt-c a img, .es-m-txt-l a img { display: inline !important } .es-button-border { display: block !important } .es-button { font-size: 20px !important; display: block !important; border-width: 15px 25px 15px 25px !important } .es-btn-fw { border-width: 10px 0px !important; text-align: center !important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width: 100% !important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width: 100% !important; max-width: 600px !important } .es-adapt-td { display: block !important; width: 100% !important } .adapt-img { width: 100% !important; height: auto !important } .es-m-p0 { padding: 0px !important } .es-m-p0r { padding-right: 0px !important } .es-m-p0l { padding-left: 0px !important } .es-m-p0t { padding-top: 0px !important } .es-m-p0b { padding-bottom: 0 !important } .es-m-p20b { padding-bottom: 20px !important } .es-hidden { display: none !important } table.es-table-not-adapt, .esd-block-html table { width: auto !important } table.es-social { display: inline-block !important } table.es-social td { display: inline-block !important } } </style>
           <style> 
             #outlook a { padding: 0; }
            .ExternalClass { width: 100%; } 
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .es-button { mso-style-priority: 100 !important; text-decoration: none !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } @-ms-viewport { width: device-width; } </style>
        </head>
        <body style='width:100%;font-family:lato,  helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;'>
           <div class='es-wrapper-color' style='background-color:#F4F4F4;'>${text}</div>
        </body>
        </html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error" + error.message)
            console.log("--------------------", 'red')
        }
        else {
            //  console.log(info)
            console.log("Email send----------------------", 'green')
        }
    })
};

module.exports = { sendEmail };
