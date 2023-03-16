import ReactQuill from 'react-quill';
import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import './editor.css';
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
        console.log('🚀 ~ file: CustomReactQuill.js:8 ~ handleQuillChange ~ value:', value);
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
                // onBlur={handleQuillChange}
                // onMouseLeave={() => console.log('onMouseLeave')}
                // onMouseOut={() => console.log('onMouseLeave')}
                modules={modules}
                formats={formats}
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default CustomReactQuill;
