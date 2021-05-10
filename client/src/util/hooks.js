import { useState } from 'react';
import { Link } from 'react-router-dom';

export const useForm = (callback, initailState = {}) => {
  const [values, setValues] = useState(initailState);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Send to server for validation
    callback();
  };

  return { values, onChange, onSubmit };
};

export const stripes = (
  <div>
    <div className='striped'>
      <span className='striped-line'></span>
      <span className='striped-text'>Or</span>
      <span className='striped-line'></span>
    </div>
  </div>
);

export const AuthHeading = ({ title, question, link, account }) => {
  return (
    <div className='heading'>
      <h1 className='text text-large'>{title}</h1>
      <p className='text text-normal'>
        {question}
        <span>
          <Link to={link} className='text text-links'>
            {account}
          </Link>
        </span>
      </p>
    </div>
  );
};
