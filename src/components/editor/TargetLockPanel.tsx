import React, { useState } from 'react';
import { Target, Crosshair, Radar, Zap, Shield, ChevronRight, Activity, Search, Building2, CheckCircle2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { OpenBetaBadge } from '@/components/ui/open-beta-badge';
import { Progress } from '@/components/ui/progress';
import { useTargetLock } from '@/lib/useTargetLock';
import { useForgeStore } from '@/store/useForgeStore';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar, ResponsiveContainer } from 'recharts';

export function TargetLockPanel({ onComplete }: { onComplete?: () => void }) {
  const { status, progress, progressLabel, error, activateTargetLock, reset } = useTargetLock();
  const applyTargetLock = useForgeStore(state => state.applyTargetLock);
  const briefing = useForgeStore(state => state.targetLockBriefing);
  const company = useForgeStore(state => state.targetLockCompany);

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [deployPhase, setDeployPhase] = useState<'idle' | 'deploying' | 'deployed'>('idle');
  const [autoDeploy, setAutoDeploy] = useState(true);

  const handleEngage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim()) {
      const result = await activateTargetLock(companyName, jobTitle, autoDeploy);
      if (result && result.autoDeployed) {
        // Auto-deploy: show deploying animation, apply, then show success
        setDeployPhase('deploying');
        setTimeout(() => {
          applyTargetLock();
          setDeployPhase('deployed');
          // If modal context, close after user sees the success state
          if (onComplete) {
            setTimeout(() => onComplete(), 2000);
          }
        }, 1000);
      }
    }
  };

  const handleDeploy = () => {
    setDeployPhase('deploying');
    // Show the deploying animation for 1.2s, then apply and transition to success
    setTimeout(() => {
      applyTargetLock();
      setDeployPhase('deployed');
      // If modal context (DashboardOverview), auto-close after the user sees the success
      if (onComplete) {
        setTimeout(() => onComplete(), 2000);
      }
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-5xl animate-in space-y-6 duration-500 zoom-in-95 fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-primary/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-primary/30 bg-primary/10 p-2 text-primary">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground uppercase">
              Target Lock <OpenBetaBadge title="BETA" className="border-primary text-primary" />
            </h2>
            <p className="text-sm text-muted-foreground">AI-Powered Company Intelligence & Resume Strategy</p>
          </div>
        </div>
        {status === 'complete' && (
          <Button variant="outline" size="sm" onClick={reset}>
            Retarget
          </Button>
        )}
      </div>

      {/* State: IDLE */}
      {status === 'idle' && (
        <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Acquire Target</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEngage} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Building2 className="h-4 w-4" /> Company Name (Required)
                  </label>
                  <Input 
                    placeholder="e.g. Acme Corp, Google, Stripe..." 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="border-primary/30 bg-background/50 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Crosshair className="h-4 w-4" /> Target Role (Optional)
                  </label>
                  <Input 
                    placeholder="e.g. Senior Frontend Engineer" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="border-primary/30 bg-background/50 focus-visible:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 py-2">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={autoDeploy}
                    onChange={(e) => setAutoDeploy(e.target.checked)}
                  />
                  <div className="peer h-5 w-9 rounded-full bg-muted peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/50 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">Fast-Track Auto-Deploy</span>
                  <span className="text-xs text-muted-foreground">Skip review and instantly inject target strategy</span>
                </div>
              </div>

              <Button type="submit" className="w-full sm:w-auto" disabled={!companyName.trim()}>
                <Search className="mr-2 h-4 w-4" />
                Engage Target Lock
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* State: SCANNING / ANALYZING */}
      {(status === 'scanning' || status === 'analyzing') && (
        <Card className="relative overflow-hidden border-primary/50 bg-background/50 backdrop-blur-sm">
          <div className="absolute inset-0 animate-pulse bg-primary/5" />
          <CardContent className="space-y-6 pt-6 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <Radar className="animate-spin h-16 w-16 text-primary" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 animate-ping rounded-full border-4 border-primary/30" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-widest text-primary">{progressLabel}</h3>
              <Progress value={progress} className="mx-auto h-2 w-full max-w-md bg-primary/20" />
            </div>
            <p className="animate-pulse text-sm text-muted-foreground">
              Scraping corporate registry, decrypting culture signals, and forging strategic matrix...
            </p>
          </CardContent>
        </Card>
      )}

      {/* State: ERROR */}
      {status === 'error' && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="space-y-4 pt-6 text-center">
            <Shield className="mx-auto h-12 w-12 text-destructive" />
            <div>
              <h3 className="text-lg font-bold text-destructive">Signal Intercept Failed</h3>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
            <Button variant="destructive" onClick={reset}>Retry</Button>
          </CardContent>
        </Card>
      )}

      {/* State: COMPLETE */}
      {status === 'complete' && briefing && (
        <div className="animate-in space-y-6 duration-700 fade-in slide-in-from-bottom-4">
          
          {/* Data Persistence Banner */}
          <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="text-sm">
              <span className="mb-1 block font-semibold tracking-widest text-primary uppercase">Tactical Cache Secured</span>
              <span className="text-muted-foreground">Target intelligence and corporate signals have been intercepted and cached. This research data will remain available in your sidebar until you finalize your resume build.</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Company DNA */}
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5 text-primary" /> 
                  Target Profile: {company}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 text-sm text-muted-foreground">Corporate Persona</div>
                  <div className="text-lg font-medium">{briefing.company_dna.personality}</div>
                </div>
                
                <div>
                  <div className="mb-2 text-sm text-muted-foreground">Culture Signals</div>
                  <div className="flex flex-wrap gap-2">
                    {briefing.company_dna.culture_keywords.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-sm text-muted-foreground">Resume Tone Recommendation</div>
                  <div className="rounded-md border-l-2 border-primary bg-secondary/50 p-3 text-sm">
                    {briefing.company_dna.tone_recommendation}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fit Radar */}
            <Card className="flex flex-col border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center justify-center gap-2 text-center text-lg">
                  <Activity className="h-5 w-5 text-primary" /> Role Fit Radar
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-4 flex min-h-[250px] flex-1 items-center justify-center">
                <ResponsiveContainer width="100%" height={250} minWidth={200}>
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={[
                    { subject: 'Tech', A: briefing.fit_radar.technical_match, fullMark: 100 },
                    { subject: 'Culture', A: briefing.fit_radar.culture_alignment, fullMark: 100 },
                    { subject: 'Exp.', A: briefing.fit_radar.experience_level, fullMark: 100 },
                    { subject: 'Industry', A: briefing.fit_radar.industry_relevance, fullMark: 100 },
                    { subject: 'Keywords', A: briefing.fit_radar.keyword_coverage, fullMark: 100 },
                  ]}>
                    <PolarGrid stroke="#06b6d4" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <RechartsRadar name="Fit" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Advantage Cards */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-primary" /> Strategic Advantages
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {briefing.advantage_cards.map((card, idx) => (
                <Card key={idx} className="border-primary/20 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5">
                  <CardContent className="space-y-2 p-5">
                    <h4 className="font-bold text-foreground">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">{card.insight}</p>
                    <div className="mt-2 border-t border-border/50 pt-2 text-xs font-medium text-primary">
                      <span className="opacity-70">ACTION:</span> {card.action}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Strategy Preview */}
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Target Strategy Generated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 text-sm font-medium text-muted-foreground">Generated Summary Draft</div>
                    <div className="rounded-md bg-secondary/30 p-3 text-sm">
                      {briefing.resume_strategy.summary_draft}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Priority Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {briefing.resume_strategy.skills_priority.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-primary/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Keyword Injection Targets</div>
                    <div className="space-y-2">
                      {briefing.resume_strategy.keyword_injection_targets.map((kw, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-md bg-secondary/30 p-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {kw}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {deployPhase === 'deployed' ? (
                <div className="mt-4 animate-in border-t border-green-500/30 pt-6 duration-500 fade-in slide-in-from-bottom-2">
                  <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <Check className="h-5 w-5" strokeWidth={3} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold tracking-widest text-green-400 uppercase">Strategy Deployed Successfully</h4>
                        <p className="text-sm text-muted-foreground">
                          Your resume summary, skills, and keyword targets have been injected.
                          Continue to the next step to review and refine your data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end border-t border-primary/20 pt-4">
                  <Button 
                    onClick={handleDeploy} 
                    disabled={deployPhase === 'deploying'}
                    className="group relative w-full gap-2 overflow-hidden transition-all duration-300 sm:w-auto" 
                    size="lg"
                  >
                    {deployPhase === 'deploying' ? (
                      <>
                        <div className="absolute inset-0 animate-pulse bg-primary/20" />
                        <div className="relative z-10 flex items-center gap-2">
                          <Activity className="h-4 w-4 animate-spin" />
                          INJECTING DATASLATE...
                        </div>
                      </>
                    ) : (
                      <>
                        Deploy Strategy to Resume
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              )}

            </CardContent>
          </Card>

        </div>
      )}

    </div>
  );
}
