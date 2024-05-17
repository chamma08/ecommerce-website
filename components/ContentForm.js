import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ContentForm({ _id, title: existingTitle, body: existingBody, images: existingImages }) {
    const [title, setTitle] = useState(existingTitle || '');
    const [body, setBody] = useState(existingBody || '');
    const [goToContents, setGoToContents] = useState(false);
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter(); 

    function goBack() {
        router.push('/contents');
    }

    // Use axios to send request to API 
    async function createContent(e) {
        e.preventDefault();
        const data = { title, body, images };
        if (_id) {
            // Update
            await axios.put('/api/contents', { ...data, _id });
        } else {
            // Create
            await axios.post('/api/contents', data);
        }
        setGoToContents(true);
    }

    if (goToContents) {
        router.push('/contents');
    }

    async function uploadImages(e) {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    return (
        <form onSubmit={createContent}>
            <label>Title</label>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />

            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} className="rounded-lg" />
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 p-1 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 border cursor-pointer text-center justify-center flex items-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload 
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden" />
                </label>
            </div>

            <label>Body</label>
            <textarea placeholder='Body' value={body} onChange={e => setBody(e.target.value)}></textarea> 

            <button type='submit' className="btn-primary">Save</button>
            <button type='reset' className="btn-can ml-3" onClick={goBack}>Cancel</button>
        </form>
    );
}