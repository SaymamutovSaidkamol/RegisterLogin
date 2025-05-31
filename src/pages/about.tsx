import React, { useState } from 'react';
const about: React.FC = () => {

    const [file, setFile] = useState<any>(null)

    const handleUpload = (e:any) => {
        setFile(e[0])
        let formData = new FormData()
        formData.append("file", e[0])
        console.log(e[0].name);

    }

    return (
        <>
            <div className='container mx-auto border h-screen flex justify-center items-center'>
                <div className='size-24 rounded-lg overflow-hidden relative border'>
                    <span className='absolute top-1/2 left-1/2 -translate-1/2 text-4xl'>+</span>
                    <img src={file && URL.createObjectURL(file)} alt="" className='w-full h-full object-contain relative' />
                    <input className='absolute top-0 left-0 w-full h-full opacity-0' type="file" onChange={(e) => handleUpload(e.target.files)} accept="images/*" />
                </div>
            </div>
        </>
    );
};

export default about;