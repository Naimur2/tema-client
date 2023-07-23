import Loader from "components/Loader";
import { useGetStatQuery } from "store/apis/auth";

const DetailsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon?: any;
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 boder-2 p-4 border-l-8 border-l-primary-900 rounded-md grid gap-4 dark:border-l-primary-200">
      <p className="dark:text-white">{title}</p>
      <h1 className="text-dark text-2xl font-bold dark:text-white">{value}</h1>
    </div>
  );
};

export default function Dashboard() {
  const { data, isLoading } = useGetStatQuery(undefined);
  console.log(data);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <DetailsCard title="Total Users" value={data?.data?.totalUsers} />
        <DetailsCard title="Total Teams" value={data?.data?.totalTeams} />
        <DetailsCard title="Total Events" value={data?.data?.totalEvents} />
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
}
