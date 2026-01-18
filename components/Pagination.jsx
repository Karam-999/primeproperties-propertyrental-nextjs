import Link from 'next/link';
const Pagination = ({ pageNo, pageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {pageNo > 1 && (
        <Link
          href={`/properties?page=${pageNo - 1}`}
          className='mr-2 px-2 py-1 border border-gray-300 hover:bg:emerald-500 rounded'>
          Previous
        </Link>
      )}

      <span className='mx-2'>
        Page {pageNo} of {totalPages}
      </span>
      {pageNo < totalPages && (
        <Link
          href={`/properties?page=${pageNo + 1}`}
          className='ml-2 px-2 py-1 border border-gray-300 hover:bg:emerald-500 rounded'>
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
