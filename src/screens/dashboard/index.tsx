import Loader from "components/Loader";
import { useGetStatQuery } from "store/apis/auth";
import { IDetailsCard } from "types/dashboard";

const DetailsCard = ({ title, value, icon }: IDetailsCard) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 boder-2 p-4 border-l-8 border-l-primary-900 rounded-md grid gap-4 dark:border-l-primary-200">
      <p className="dark:text-white">{title}</p>
      <h1 className="text-dark text-2xl font-bold dark:text-white">{value}</h1>
    </div>
  );
};

export default function Dashboard() {
  const { data, isLoading } = useGetStatQuery();
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <DetailsCard title="Total Users" value={data?.data?.totalUsers ?? 0} />
        <DetailsCard title="Total Teams" value={data?.data?.totalTeams ?? 0} />
        <DetailsCard
          title="Total Events"
          value={data?.data?.totalEvents ?? 0}
        />
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
}
