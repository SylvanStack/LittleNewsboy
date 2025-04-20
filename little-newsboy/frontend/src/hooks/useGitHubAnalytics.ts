import { useState, useEffect } from 'react';
import { getGitHubAnalytics, GitHubAnalytics } from '../services/analyticsService';
import { useToast } from '../contexts/ToastContext';

type Period = 'last_3_months' | 'last_6_months' | 'last_year';

interface UseGitHubAnalyticsProps {
  repoName: string;
  initialPeriod?: Period;
  autoFetch?: boolean;
}

interface UseGitHubAnalyticsResult {
  data: GitHubAnalytics | null;
  loading: boolean;
  error: string | null;
  fetchData: (period?: Period) => Promise<void>;
  period: Period;
  setPeriod: (period: Period) => void;
}

export const useGitHubAnalytics = ({
  repoName,
  initialPeriod = 'last_6_months',
  autoFetch = true
}: UseGitHubAnalyticsProps): UseGitHubAnalyticsResult => {
  const [data, setData] = useState<GitHubAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const toast = useToast();

  const fetchData = async (customPeriod?: Period) => {
    const fetchPeriod = customPeriod || period;
    setLoading(true);
    setError(null);

    try {
      const result = await getGitHubAnalytics(repoName, fetchPeriod);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取GitHub分析数据失败';
      setError(errorMessage);
      toast.error('获取数据失败', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 当repoName或period变化时，重新获取数据
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [repoName, period, autoFetch]);

  return {
    data,
    loading,
    error,
    fetchData,
    period,
    setPeriod
  };
}; 