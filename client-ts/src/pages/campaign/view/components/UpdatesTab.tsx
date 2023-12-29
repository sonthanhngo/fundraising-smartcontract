import { Update } from '@/src/api/update';
import { getDaysLeft } from '@/src/common/utils/data-formatter';
type UpdatesTabProps = {
  updates: Update[];
  owner: string;
  ownerName: string;
};
export const UpdatesTab = ({ updates, owner, ownerName }: UpdatesTabProps) => {
  return (
    <div>
      {updates.map((update) => (
        <div className='border-2 rounded-md my-5 p-3 '>
          <h1 className='text-[1.2rem]'>
            <span className='font-bold text-green-700'>{ownerName} </span>:
            <span className='font-bold text-green-700'> {owner}</span>
          </h1>
          <h1 className='font-semibold'>
            {-getDaysLeft(update.date)} days ago
          </h1>
          <p>{update.update}</p>
        </div>
      ))}
    </div>
  );
};
