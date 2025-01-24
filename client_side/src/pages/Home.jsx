import React, { useRef, useState } from 'react';
//import Layout from '../components/Layout';
//import SidePanel from '../components/SidePanel';
import axios from 'axios';
import parse from 'html-react-parser';
import JoditEditor from 'jodit-react';
export default function Home() {

    const editor = useRef(null);

    let [file, setFiles] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const [image, setImage] = useState("");

    //sending data to the backend

    async function handleImage(event) {
        const file = event.target.files[0];
        if (!file) return;

        const newformData = new FormData();
        newformData.append("image", file);

        try {
            const response = await axios.post("https://email-template-generator-1.onrender.com/uploadImage", newformData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            //console.log("Image uploaded successfully:", response.data.data._id);
            setImage(response.data.data.logoImage);





            alert("Image uploaded successfully");
        } catch (error) {
            //console.error("Error uploading image:", error);
            alert("Failed to upload image");
        }
    }

    //for sending data to the backend
    async function sendData(e) {

        e.preventDefault();
        try {

            const payload={ formData,image}

            const response = await axios.post("https://email-template-generator-1.onrender.com/renderanddownloadlayout", payload, { responseType: "blob" });

            //console.log(response);

            // Create a temporary download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "email_template.html");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

        } catch (error) {
           // console.log(error);

        }
    }

    return (
        <div>
            <h1 className='text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-transparent bg-clip-text uppercase tracking-wider shadow-lg animate-glow'> 
                Email Template Builder</h1>
            <div className='container flex flex-col sm:flex-row md:flex-row p-1 gap-2 '>


                <div className="layout w-100 flex-1 p-3">

                    <div className='container p-3 '>

                        <div className='w-40 h-20 mx-auto flex items-center justify-center border border-sky-500'>
                            <img src={image} alt="Logo" />
                        </div>
                        <p>---------title----------</p>
                        <div className='w-50 h-20 my-2  flex items-center justify-center border border-yellow-300'>
                            <h1 >{parse(String(formData.title))}</h1><br />
                        </div>
                        <p>--------content-----------</p>
                        <div className='w-50 h-60 mx-auto  border border-green-800'>
                            <p className='px-3'>{parse(String(formData.content))}</p>
                        </div>

                    </div>

                </div>


                <div className="sidebar w-100 flex-1">

                    <form onSubmit={sendData} >

                        <div className="box w-50 h-20 my-2  flex items-center justify-center border border-gray-200">
                            <input type="file" className=" py-2" id="validationDefault03" onChange={handleImage} name="image" />

                        </div>

                        <div className="box">
                            <JoditEditor
                                ref={editor}
                                onChange={(content) => setFormData((prevValue) => ({ ...prevValue, title: content }))}
                                name='title'

                            />
                        </div>

                        <div className="box">
                            <JoditEditor
                                ref={editor}
                                onChange={(content) => setFormData((prevValue) => ({ ...prevValue, content: content }))}
                                name='content'
                                

                            />
                        </div>

                        <button type='submit' className="bg-blue-500 text-white font-medium py-2 px-6 rounded shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"> Save and Download</button>
                    </form>
                </div>
            </div>

        </div>

    )
}
