import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/customQuill/editor.scss';
import QuillToolbar, { formats, modules } from './QuillToolbar';

export const NewCustomQuill = () =>
    // { onChange, quillValue, placeholder }

    {
        // const [newVal, setnewVal] = useState('');
        // useEffect(() => {
        //     setnewVal(quillValue);
        //     return () => {
        //         setnewVal('');
        //     };
        // }, [quillValue]);
        // const handleQuillChange = (value) => {
        //     setnewVal(value);
        //     onChange(value);
        // };

        return (
            <div style={{ height: '100%' }}>
                {/* <QuillToolbar /> */}
                <ReactQuill
                    // placeholder={placeholder}
                    // value={newVal}
                    // onChange={handleQuillChange}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    style={{ height: '100%' }}
                />
            </div>
        );
    };

export default NewCustomQuill;
