import { useState } from 'react';

const UploadFile = ({ accept, title, onChange, disabled }) => {
  const [file, setFile] = useState(null);
  return (
    <div className="file-upload">
      <input
        className={` ${disabled ? 'title-disabled' : ''}`}
        disabled={disabled}
        accept={accept}
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            if (onChange) {
              onChange(e.target.files[0]);
            }
          }
        }}
        type={'file'}
      />
      <div className={`title ${disabled ? 'title-disabled' : ''}`}>
        {file !== null ? <span>{file.name}</span> : title}
      </div>
    </div>
  );
};

export default UploadFile;
