export interface PhoenixSnapshot {
  timestamp: string;
  commit: string;
  branch: string;
  
  census: {
    totalFiles: number;
    categories: Record<string, number>;
    violations: {
      spatial: { count: number; files: string[] };
      color: { count: number; files: string[] };
      typography: { count: number; files: string[] };
    };
    heatmap: Array<{
      directory: string;
      fileCount: number;
      spatial: number;
      color: number;
      total: number;
      priority: 'critical' | 'high' | 'medium' | 'low';
    }>;
  };
  
  tokenDiff: {
    overallScore: number;        // 0.0 - 1.0
    standardTokens: number;
    hardcodedValues: number;
    trend: 'improving' | 'stable' | 'degrading';
    deltaFromLast: number;       // percentage point change
  };
  
  chromatic: {
    baselinesApproved: number;
    baselinesPending: number;
    lastBaselineReset: string;
  };
}
