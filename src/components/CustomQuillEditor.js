import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

const CustomQuillEditor = ({ value, onChange }) => {
    const quillRef = useRef(null);
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        if (!quillRef.current) return;

        const options = {
            modules: {
                toolbar: [
                    [{ font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ color: [] }, { background: [] }],
                    [{ script: 'sub' }, { script: 'super' }],
                    ['blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
                    ['link', 'image', 'video'],
                    ['clean'],
                ],
                imageResize: {
                    modules: ['Resize', 'DisplaySize', 'Toolbar'],
                },
            },
            placeholder: 'Enter your text here',
            theme: 'snow',
        };

        const newQuill = new Quill(quillRef.current, options);
        setQuill(newQuill);
    }, []);

    useEffect(() => {
        if (!quill) return;
        quill.on('text-change', () => {
            onChange(quillRef.current.innerHTML);
        });
    }, [quill, onChange]);

    useEffect(() => {
        if (!quill) return;
        quillRef.current.innerHTML = value;
    }, [quill, value]);

    return <div ref={quillRef} />;
};

export default CustomQuillEditor;
