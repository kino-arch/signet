// @ts-nocheck
export async function getCompanyIntel(companyName: string, jobTitle: string | undefined, apiKey: string) {
  // We'll perform up to 3 parallel searches to gather comprehensive intelligence.
  const searchPromises = [];

  // 1. Google Search: Company Culture & Values
  const cultureQuery = `${companyName} company culture values mission`;
  searchPromises.push(
    fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(cultureQuery)}&api_key=${apiKey}`)
      .then(res => res.json())
  );

  // 2. Google Search: Interview Process
  const interviewQuery = `${companyName} ${jobTitle ? jobTitle + ' ' : ''}interview process hiring`;
  searchPromises.push(
    fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(interviewQuery)}&api_key=${apiKey}`)
      .then(res => res.json())
  );

  // 3. Google Jobs Listing (if job title is provided)
  if (jobTitle) {
    const jobsQuery = `${jobTitle} at ${companyName}`;
    searchPromises.push(
      fetch(`https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(jobsQuery)}&api_key=${apiKey}`)
        .then(res => res.json())
    );
  }

  const results = await Promise.all(searchPromises);

  const cultureData = results[0];
  const interviewData = results[1];
  const jobsData = jobTitle ? results[2] : null;

  // Synthesize into a single CompanyIntel object
  return synthesizeIntel(companyName, jobTitle, cultureData, interviewData, jobsData);
}

function synthesizeIntel(companyName: string, jobTitle: string | undefined, cultureData: any, interviewData: any, jobsData: any) {
  const intel = {
    company: {
      name: companyName,
      description: extractDescription(cultureData),
      culture_signals: extractSnippets(cultureData, 5),
      recent_news: extractNews(cultureData)
    },
    job: {
      title: jobTitle || "General Role",
      description: "",
      requirements: [] as string[],
      detected_keywords: [] as string[]
    },
    interview_insights: extractSnippets(interviewData, 5)
  };

  if (jobsData && jobsData.jobs_results && jobsData.jobs_results.length > 0) {
    // Pick the most relevant job result
    const job = jobsData.jobs_results[0];
    intel.job.title = job.title || intel.job.title;
    intel.job.description = job.description || "";
    
    // Attempt to extract keywords/requirements from description if available
    // (A naive extraction, the NIM AI will do a better job later)
    if (job.description) {
      intel.job.detected_keywords = extractNaiveKeywords(job.description);
    }
  }

  return intel;
}

function extractDescription(serpData: any): string {
  if (serpData.knowledge_graph && serpData.knowledge_graph.description) {
    return serpData.knowledge_graph.description;
  }
  if (serpData.organic_results && serpData.organic_results.length > 0) {
    return serpData.organic_results[0].snippet || "";
  }
  return "";
}

function extractSnippets(serpData: any, limit: number): string[] {
  const snippets: string[] = [];
  if (serpData.organic_results) {
    for (const result of serpData.organic_results) {
      if (result.snippet && snippets.length < limit) {
        snippets.push(result.snippet);
      }
    }
  }
  return snippets;
}

function extractNews(serpData: any): string[] {
  const news: string[] = [];
  if (serpData.news_results) {
    for (const item of serpData.news_results) {
      if (item.title && news.length < 3) {
        news.push(item.title);
      }
    }
  }
  return news;
}

function extractNaiveKeywords(text: string): string[] {
  // A very basic keyword extraction to pass to the AI as hints
  const commonTech = ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'Go', 'Rust', 'Java', 'C++', 'Machine Learning', 'AI', 'Data Science', 'Agile', 'Scrum'];
  return commonTech.filter(tech => text.toLowerCase().includes(tech.toLowerCase()));
}
