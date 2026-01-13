'use client';
import { FaShare } from 'react-icons/fa';
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  ThreadsIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
  BlueskyIcon,
} from 'react-share';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from 'react-share';
const ShareButtons = ({ property }) => {
  const shareurl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    // <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
    //   <FaShare className='mr-2' /> Share Property
    // </button>
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share this Property:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={shareurl}
          quote={property.propName}
          hashtag={`#${property.propType.replace(/\s/g, '')}ForRent`}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <WhatsappShareButton
          url={shareurl}
          title={property.propName}
          seperator='::'>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareurl}
          subject={`Property : ${property.propName} for rent`}
          body={`${property.propType} : ${property.propName}, for rent!!\n The location is ${property.propLocation.street}, ${property.propLocation.city}.\n Check it out here: ${shareurl}.\n\n Thank you\nKaram\n`}
          seperator='  '>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
        <TwitterShareButton
          url={shareurl}
          title={property.propName}
          hashtags={[`${property.propType.replace(/\s/g, '')}ForRent`]}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
