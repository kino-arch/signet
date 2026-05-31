import React, { useState } from 'react';
import { Target, Crosshair, Radar, Zap, Shield, ChevronRight, Activity, Search, Building2, CheckCircle2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-primary/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md border border-primary/30 text-primary">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase flex items-center gap-2">
              Target Lock <Badge variant="outline" className="text-primary border-primary">BETA</Badge>
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
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Company Name (Required)
                  </label>
                  <Input 
                    placeholder="e.g. Acme Corp, Google, Stripe..." 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="bg-background/50 border-primary/30 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Crosshair className="w-4 h-4" /> Target Role (Optional)
                  </label>
                  <Input 
                    placeholder="e.g. Senior Frontend Engineer" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-background/50 border-primary/30 focus-visible:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoDeploy}
                    onChange={(e) => setAutoDeploy(e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">Fast-Track Auto-Deploy</span>
                  <span className="text-xs text-muted-foreground">Skip review and instantly inject target strategy</span>
                </div>
              </div>

              <Button type="submit" className="w-full sm:w-auto" disabled={!companyName.trim()}>
                <Search className="w-4 h-4 mr-2" />
                Engage Target Lock
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* State: SCANNING / ANALYZING */}
      {(status === 'scanning' || status === 'analyzing') && (
        <Card className="border-primary/50 bg-background/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          <CardContent className="pt-6 text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Radar className="w-16 h-16 text-primary animate-spin-slow" />
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-widest text-primary">{progressLabel}</h3>
              <Progress value={progress} className="h-2 w-full max-w-md mx-auto bg-primary/20" />
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">
              Scraping corporate registry, decrypting culture signals, and forging strategic matrix...
            </p>
          </CardContent>
        </Card>
      )}

      {/* State: ERROR */}
      {status === 'error' && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="pt-6 text-center space-y-4">
            <Shield className="w-12 h-12 text-destructive mx-auto" />
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Data Persistence Banner */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold text-primary uppercase tracking-widest block mb-1">Tactical Cache Secured</span>
              <span className="text-muted-foreground">Target intelligence and corporate signals have been intercepted and cached. This research data will remain available in your sidebar until you finalize your resume build.</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Company DNA */}
            <Card className="md:col-span-2 border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> 
                  Target Profile: {company}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Corporate Persona</div>
                  <div className="text-lg font-medium">{briefing.company_dna.personality}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Culture Signals</div>
                  <div className="flex flex-wrap gap-2">
                    {briefing.company_dna.culture_keywords.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Resume Tone Recommendation</div>
                  <div className="p-3 bg-secondary/50 rounded-md text-sm border-l-2 border-primary">
                    {briefing.company_dna.tone_recommendation}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fit Radar */}
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm flex flex-col">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
                  <Activity className="w-5 h-5 text-primary" /> Role Fit Radar
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center min-h-[250px] -mt-4">
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
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Strategic Advantages
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {briefing.advantage_cards.map((card, idx) => (
                <Card key={idx} className="border-primary/20 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5">
                  <CardContent className="p-5 space-y-2">
                    <h4 className="font-bold text-foreground">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">{card.insight}</p>
                    <div className="pt-2 mt-2 border-t border-border/50 text-xs font-medium text-primary">
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
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Target Strategy Generated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Generated Summary Draft</div>
                    <div className="p-3 bg-secondary/30 rounded-md text-sm">
                      {briefing.resume_strategy.summary_draft}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">Priority Skills</div>
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
                    <div className="text-sm font-medium text-muted-foreground mb-2">Keyword Injection Targets</div>
                    <div className="space-y-2">
                      {briefing.resume_strategy.keyword_injection_targets.map((kw, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm bg-secondary/30 p-2 rounded-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {kw}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {deployPhase === 'deployed' ? (
                <div className="mt-4 border-t border-green-500/30 pt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <Check className="h-5 w-5" strokeWidth={3} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-green-400 uppercase tracking-widest">Strategy Deployed Successfully</h4>
                        <p className="text-sm text-muted-foreground">
                          Your resume summary, skills, and keyword targets have been injected.
                          Continue to the next step to review and refine your data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end pt-4 border-t border-primary/20">
                  <Button 
                    onClick={handleDeploy} 
                    disabled={deployPhase === 'deploying'}
                    className="gap-2 relative overflow-hidden group transition-all duration-300 w-full sm:w-auto" 
                    size="lg"
                  >
                    {deployPhase === 'deploying' ? (
                      <>
                        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                        <div className="flex items-center gap-2 relative z-10">
                          <Activity className="w-4 h-4 animate-spin" />
                          INJECTING DATASLATE...
                        </div>
                      </>
                    ) : (
                      <>
                        Deploy Strategy to Resume
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
