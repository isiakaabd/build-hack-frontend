import { useEffect, useState } from "react";
import { useEtherum } from "./useEtherum";

export const useEtherumMethod = ({ method, ...params }) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { contract } = useEtherum();

  useEffect(() => {
    const fecthData = async () => {
      try {
        setLoading(true);

        const data = `${contract}.${method(...params)}`;
        setData(data);
        setLoading(false);
        setError(null);
        return data;
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };
    fecthData();
  }, []);
  return { loading, error, data };
};
