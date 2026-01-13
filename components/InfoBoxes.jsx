import InfoBox from './InfoBox';
const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='For Renters'
            btnInfo={{
              btntext: 'Browse Properties',
              hrefLink: '/properties',
              backgroundColor: 'bg-black',
            }}>
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            backgroundColor=' bg-emerald-100'
            btnInfo={{
              btntext: 'Add Property',
              hrefLink: '/properties/add',
              backgroundColor: 'bg-black',
            }}>
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
