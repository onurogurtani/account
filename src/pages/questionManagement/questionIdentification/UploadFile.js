const UploadFile = ({ accept, title, onChange, disabled, file }) => {
  return (
    <div className="file-upload">
      <input
        className={` ${disabled ? 'title-disabled' : ''}`}
        disabled={disabled}
        accept={accept}
        onChange={(e) => {
          onChange(e);
        }}
        type={'file'}
      />
      <div className={`title ${disabled ? 'title-disabled' : ''}`}>{file.name ? <span>{file.name}</span> : title}</div>
    </div>
  );
};

export default UploadFile;
