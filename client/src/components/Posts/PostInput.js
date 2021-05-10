function PostInput({ className, type, name, onChange, placeholder }) {
  return (
    <>
      {type === 'text' ? (
        <div className={className}>
          <textarea
            type='text'
            name={name}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div className={className}>
          <input type='file' />
        </div>
      )}
    </>
  );
}

export default PostInput;
