import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from './Slider';

const Body = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);

    function enhanceImage() {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const { data } = imageData;

                // // Apply contrast enhancement
                const contrastFactor = 1.5;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, contrastFactor * (data[i] - 128) + 128);
                    data[i + 1] = Math.min(255, contrastFactor * (data[i + 1] - 128) + 128);
                    data[i + 2] = Math.min(255, contrastFactor * (data[i + 2] - 128) + 128);
                }

                // // Apply saturation adjustment
                const saturationFactor = 2.0; // Increase for more saturation, decrease for less
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
                    data[i] = gray + saturationFactor * (r - gray);
                    data[i + 1] = gray + saturationFactor * (g - gray);
                    data[i + 2] = gray + saturationFactor * (b - gray);
                }

                // Apply gamma correction
                const gamma = 1.5;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.pow(data[i] / 255, gamma) * 255;
                    data[i + 1] = Math.pow(data[i + 1] / 255, gamma) * 255;
                    data[i + 2] = Math.pow(data[i + 2] / 255, gamma) * 255;
                }

                ctx.putImageData(imageData, 0, 0);

                // Trigger download
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'enhanced-image.jpg';
                    a.click();
                }, 'image/jpeg', 0.9);
            };

            img.src = URL.createObjectURL(image);
        }
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div className='w-full h-screen static'>
            <div className='text-2xl text-white font-sans font-bold tracking-wider text-center mt-6'>ResoLift</div>
            <div className='w-1/3 h-56 absolute top-[100px] left-[50px]'>
                <h1 className='font-sans text-4xl antialiased font-bold text-left indent-5 p-3  text-white leading-relaxed'>ResoLift Your free Image Enhancer</h1>
                <h3 className=' text-white pr-3'>Increase Image quality without loosing its original properties</h3>
                <div className='rounded-xl border-2 w-full h-80 border-yellow-100 mt-6 border-dashed cursor-pointer' onChange={handleImageChange}>
                    {image ? <img src={URL.createObjectURL(image)} /> : <></>}
                    <input type='file' ref={inputRef} onChange={handleImageChange} ></input>
                    <h5 className='text-white relative top-[170px] left-[160px]'>Drop your image here</h5>
                    <button onClick={() => enhanceImage()} className='bg-white rounded-xl h-[40px] w-60 font-bold relative top-[180px] left-[120px] '>Upload</button>
                </div>
            </div>
            <Slider />
        </div>
    )
}

export default Body