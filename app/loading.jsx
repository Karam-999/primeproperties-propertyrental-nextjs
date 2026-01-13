'use client';
import ClipLoader from 'react-spinners/ClipLoader';
const override = {
  display: 'block',
  margin: '100px auto',
};

const LoadingPage = () => {
  return (
    <ClipLoader
      color='#3b8241'
      cssOverride={override}
      size={100}
      aria-label='Loading Spinner'
    />
  );
};

export default LoadingPage;
