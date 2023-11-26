import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { Loader } from '../../common/components/misc/Loader';
// import { useQueryCampaign } from '../../api/campaign';
import { convertUnixTimestamptoDate } from '../../common/utils';
import {
  useUpdateGetByIdQuery,
  useUpdateCreateByIdMutation,
} from '../../api/update';
import { useReviewGetByIdQuery } from '../../api/review';
// import { useGetAllProductsQuery } from '../../api/slice';

export default function TestPage() {
  const { data: updates, isLoading: isLoadingUpdates } = useReviewGetByIdQuery(
    '682fee00-752a-40bd-9af5-238e436bbd22'
  );
  if (!isLoadingUpdates) {
    console.log(updates[0].address);
  }
  const update = 'hello';

  const [updateCreate, { isLoading: isCreating }] =
    useUpdateCreateByIdMutation();
  return (
    <div className='ml-[200px]'>
      <button
        onClick={() =>
          updateCreate({
            id: '682fee00-752a-40bd-9af5-238e436bbd22',
            body: { update },
          })
        }
      >
        Click me
      </button>
    </div>
  );
}
