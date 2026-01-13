import { getSessionUserInServerr } from '@/utils/getSessionUser';
const InfoBox = async ({
  children,
  heading,
  btnInfo,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  hrefLink,
}) => {
  await getSessionUserInServerr();
  // console.log('Session user:', sessionUser); // This will show in termi
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className='mt-2 mb-4'>{children}</p>
      <a
        href={btnInfo.hrefLink}
        className={`inline-block ${btnInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}>
        {btnInfo.btntext}
      </a>
    </div>
  );
};

export default InfoBox;
