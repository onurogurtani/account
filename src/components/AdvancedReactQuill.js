/* eslint-disable react-hooks/exhaustive-deps */
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useState, useRef } from 'react';
import { useQuill } from 'react-quilljs';

const AdvancedReactQuill = ({ onChange, quillValue, placeholder }) => {
    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} },
        placeholder: placeholder,
    });

    const initialValue = useRef(quillValue);
    useEffect(() => {
        initialValue.current = quillValue;
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(quillValue);
        }
    }, [quillValue, quill]);

    if (Quill && !quill) {
        // const BlotFormatter = require('quill-blot-formatter');
        Quill.register('modules/blotFormatter', BlotFormatter);
    }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const value = quill.root.innerHTML;
                onChange?.(value);
            });
        }
    }, [quill, Quill]);

    return (
        <div>
            <div ref={quillRef} style={{ height: '100%' }} />
        </div>
    );
};

export default AdvancedReactQuill;
