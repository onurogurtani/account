import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import {
    CustomCheckbox,
    CustomDatePicker,
    CustomForm,
    CustomFormItem,
    CustomInput,
    CustomSelect,
    Option,
    Text,
} from '../../../../components';

// import './styles.css';

const Editor = () => {
    const { quill, quillRef, Quill } = useQuill({
        modules: {
            blotFormatter: {},
            history: {
                delay: 2000,
                maxStack: 500,
                userOnly: true,
            },
            toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                ['undo'],
                ['redo'],
                [{ undo: true, redo: true }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
                ['link', 'image'],
                ['clean'],
                ['emoji'],
            ],
        },
    });

    // const modules = {
    //     blotFormatter: {},
    //     history: {
    //         delay: 2000,
    //         maxStack: 500,
    //         userOnly: true,
    //     },
    //     toolbar: {
    //         container: [
    //             [{ font: [] }],
    //             [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //             ['bold', 'italic', 'underline', 'strike'],
    //             [{ color: [] }, { background: [] }],
    //             [{ script: 'sub' }, { script: 'super' }],
    //             ['blockquote', 'code-block'],
    //             [{ list: 'ordered' }, { list: 'bullet' }],
    //             [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    //             ['link', 'image', 'video'],
    //             ['clean'],
    //             // [{ undo: true, redo: true }]
    //             ['undo'],
    //             ['redo'],
    //         ],
    //         handlers: {
    //             undo: myUndo,
    //             redo: myRedo,
    //         },
    //     },
    // };

    if (Quill && !quill) {
        // const BlotFormatter = require('quill-blot-formatter');
        Quill.register('modules/blotFormatter', BlotFormatter);
    }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldContents) => {
                console.log('Text change!');
                console.log(delta);

                let currrentContents = quill.getContents();
                console.log(currrentContents.diff(oldContents));
            });
        }
    }, [quill, Quill]);

    return (
        <div>
            <div ref={quillRef} />
        </div>
    );
};

export default Editor;
// import { useEffect } from 'react';
// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';
// import {
//     CustomCheckbox,
//     CustomDatePicker,
//     CustomForm,
//     CustomFormItem,
//     CustomInput,
//     CustomSelect,
//     Option,
//     Text,
// } from '../../../../components';
// import { EyeOutlined } from '@ant-design/icons';

// const Editor = () => {
//     const myUndo = async () => {
//         let myEditor = quillRef.getEditor();
//         return myEditor.history.undo();
//     };

//     const myRedo = async () => {
//         let myEditor = quillRef.getEditor();
//         return myEditor.history.redo();
//     };
//     const modules = {
//         blotFormatter: {},
//         // history: {
//         //     delay: 2000,
//         //     maxStack: 500,
//         //     userOnly: true,
//         // },
//         toolbar: [
//             [{ font: [] }],
//             [{ header: [1, 2, 3, 4, 5, 6, false] }],
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ color: [] }, { background: [] }],
//             [{ undo: true, redo: true }],
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
//             ['link', 'image'],
//             ['clean'],
//             // [{<EyeOutlined onClick={() => alert('hopp')} />}],
//         ],
//     };

//     const { quill, quillRef, Quill } = useQuill({ modules });

//     useEffect(() => {
//         if (quill) {
//             quill.on('text-change', (delta, oldContents) => {
//                 console.log('Text change!');
//                 console.log(delta);

//                 let currrentContents = quill.getContents();
//                 console.log(currrentContents.diff(oldContents));
//             });
//         }
//     }, [quill, Quill]);

//     return (
//         <div>
//             <div ref={quillRef} />
//         </div>
//     );
// };

// export default Editor;
