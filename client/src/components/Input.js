function Input({ type, name, placeholder, onChange, value }) {
  return (
    <div className='input-control'>
      <input
        type={type}
        value={value}
        name={name}
        className='input-field'
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
