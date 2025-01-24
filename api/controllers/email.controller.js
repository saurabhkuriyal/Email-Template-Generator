const Email = require("../models/emailTemplate.model");
const cloudinary = require("cloudinary").v2;
const Logo = require("../models/logoImage.model");
const fs = require("fs");
const path = require("path");

async function getEmailLayout(req, res) {
    try {

        res.status(200).json({ success: true, msg: "get layout" })
    } catch (error) {
       // console.log(error);
        res.status(500).json({ success: false, error })

    }

}

async function saveLayout(req, res) {
    try {

       // console.log("req body", req.body);

        const newLayout = new Email(req.body.formData);

        await newLayout.save();

        //console.log("The image URL",req.body.image);
        

        //template
        // Generate the HTML content
        const template = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <!-- Container -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600px" border="0" cellspacing="0" cellpadding="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <!-- Header Image -->
                    <tr>
                        <td>
                            <img src="${req.body.image}" alt="Logo Image"
                                style="width: 50%; display: block; margin: auto; border-radius: 5px; " />
                        </td>
                    </tr>
                    <!-- Title -->
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #0073e6; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 24px;">${newLayout.title}</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 20px; color: #333333;">
                        ${newLayout.content}
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="padding: 20px; text-align: center; background-color: #f4f4f4; font-size: 14px; color: #666666;">
                            <p style="margin: 2rem;">&copy; 2025 All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
  
`;
        //for downloading the image

        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Disposition", "attachment; filename=email_template.html");
        // res.send(template);


        res.status(200).send(template);

    } catch (error) {
       // console.log(error);
        res.status(500).json({ success: false, msg: "some error occurred" })
    }
}


async function uploadImage(req, res) {
    try {
        const response = req.file;

        //console.log("This is reponse", response);

        let logoImage = "";

        if (req.file) {
            cloudinary.config({
                cloud_name: "deuofkrkf",
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: "vrtWkACC1-Tra5I0WzJ6tIsstLw"
            });

            const result = await cloudinary.uploader.upload(req.file.path);
            //console.log(result.secure_url, 'uploaded.secure_url');
            logoImage = result.secure_url;
        }

        const newLogo = new Logo({ logoImage: logoImage });
        await newLogo.save();

        res.status(200).json({ success: true, msg: "Image saved successfully", data: newLogo });

    } catch (error) {
        //console.log(error);
        res.status(500).json({ success: false, msg: "some error occurred" });

    }
}

module.exports = {
    getEmailLayout,
    saveLayout,
    uploadImage
}