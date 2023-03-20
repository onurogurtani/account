import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../../styles/announcementManagement/editor.scss';
import QuillToolbar, { formats, modules } from './QuillToolbar';

export const CustomReactQuill = ({ onChange, quillValue }) => {
    const [newVal, setnewVal] = useState('');
    useEffect(() => {
        setnewVal(quillValue);
        return () => {
            setnewVal('');
        };
    }, [quillValue]);
    const handleQuillChange = (value) => {
        setnewVal(value);
        onChange(value);
    };

    return (
        <div style={{ height: '100%' }}>
            <QuillToolbar />
            <ReactQuill
                value={newVal}
                theme="snow"
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default CustomReactQuill;
