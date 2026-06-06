# Adaptation Diff: hero.original.tsx → Signet Hero

## Full Diff
```diff
@@ -1,99 +1,69 @@
-import Link from "next/link"
-
-import { Button } from "@/components/ui/button"
+import { Link } from "react-router-dom"
+import { motion } from "framer-motion"
+import { Diamond } from "lucide-react"
+import { SignetSection } from "@/components/layout/SignetSection"
+import { SignetWell } from "@/components/layout/SignetWell"
+import { cn } from "@/lib/utils"
 
 export default function HeroSection01() {
   return (
-    <div className="relative flex h-screen items-center justify-center">
-      <div className="absolute h-full w-full overflow-hidden">
-        <div className="relative min-h-screen w-full">
-          <div
-            className="absolute inset-0 z-0 opacity-15 dark:opacity-30"
-            style={{
-              backgroundImage: `
-              linear-gradient(to right, var(--primary) 1px, transparent 1px),
-              linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
-              `,
-              backgroundSize: "20px 20px",
-              backgroundPosition: "0 0, 0 0",
-              maskImage: `
-              repeating-linear-gradient(
-              to right,
-              black 0px,
-              black 3px,
-              transparent 3px,
-              transparent 8px
-            ),
-            repeating-linear-gradient(
-              to bottom,
-              black 0px,
-              black 3px,
-              transparent 3px,
-              transparent 8px
-            ),
-            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
-            `,
-              WebkitMaskImage: `
-              repeating-linear-gradient(
-              to right,
-              black 0px,
-              black 3px,
-              transparent 3px,
-              transparent 8px
-            ),
-            repeating-linear-gradient(
-              to bottom,
-              black 0px,
-              black 3px,
-              transparent 3px,
-              transparent 8px
-            ),
-            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
-             `,
-              maskComposite: "intersect",
-              WebkitMaskComposite: "source-in",
+    <SignetSection variant="hero" className="bg-signet-hero-depth relative overflow-hidden flex items-center justify-center min-h-[80vh] py-24">
+      <SignetWell size="wide" className="relative z-10">
+        <div className="flex flex-col text-center items-center justify-center">
+          <motion.div
+            className="mb-8"
+            animate={{ 
+              opacity: [0.8, 1, 0.8],
+              scale: [1, 1.02, 1]
             }}
-          />
-          <div
-            className="absolute inset-0 z-0"
-            style={{
-              background:
-                "radial-gradient(125% 125% at 50% 10%, transparent 40%, var(--primary) 100%)",
+            transition={{ 
+              duration: 4, 
+              repeat: Infinity, 
+              ease: "easeInOut" 
             }}
-          />
-        </div>
-      </div>
-      <div className="container flex flex-col text-center">
-        <img
-          src="/ai-logo.png"
-          alt="Your Image"
-          height={50}
-          width={50}
-          className="z-40 h-30 w-full object-contain"
-        />
-        <h2 className="z-10 pt-10 text-7xl font-extrabold tracking-tighter md:text-7xl lg:text-9xl">
-          Design <br /> without Limits
-        </h2>
-        <div className="z-10 flex flex-col items-center justify-center space-y-6 px-6 pt-20 text-center">
-          <p className="w-full max-w-lg text-sm font-light md:text-xl">
-            I create digital experiences that connect and inspire. I build apps,
-            websites, brands, and products end-to-end.
-          </p>
-          <div className="mt-6 flex flex-wrap justify-center gap-3">
-            <Link target="_blank" href="https://cal.com/aliimam/30min">
-              <Button className="h-12 cursor-pointer px-8 md:h-14 md:px-10">
-                Book an Intro Call
-              </Button>
-            </Link>
-            <Button
-              variant={"secondary"}
-              className="h-12 cursor-pointer px-8 md:h-14 md:px-10"
-            >
-              Get Started Explore
-            </Button>
-          </div>
+          >
+            <Diamond className="w-12 h-12 text-signet-cyan-400" />
+          </motion.div>
+
+          <motion.div
+            initial={{ opacity: 0, y: 16 }}
+            animate={{ opacity: 1, y: 0 }}
+            transition={{ duration: 0.5, ease: "easeOut" }}
+            className="max-w-2xl mx-auto flex flex-col items-center justify-center"
+          >
+            <h2 className="text-white text-5xl font-extrabold tracking-tight mb-6">
+              Design <br /> without Limits
+            </h2>
+            
+            <p className="w-full text-signet-slate-400 text-lg leading-relaxed mb-10">
+              I create digital experiences that connect and inspire. I build apps,
+              websites, brands, and products end-to-end.
+            </p>
+            
+            <div className="flex flex-wrap justify-center items-center gap-6">
+              <Link to="https://cal.com/aliimam/30min" target="_blank" rel="noopener noreferrer">
+                <button 
+                  className={cn(
+                    "bg-signet-amber-500 text-signet-navy-950 px-8 py-4 text-lg font-bold shadow-signet-cta rounded-md",
+                    "transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
+                  )}
+                >
+                  Book an Intro Call
+                </button>
+              </Link>
+              
+              <button
+                className={cn(
+                  "bg-signet-surface-elevated border border-signet-border-subtle text-white px-6 py-3 text-base font-medium rounded-md",
+                  "transition-all duration-300 hover:scale-[1.02] active:scale-95"
+                )}
+              >
+                Get Started Explore
+              </button>
+            </div>
+          </motion.div>
         </div>
-      </div>
-    </div>
+      </SignetWell>
+    </SignetSection>
   )
 }

```

Adaptation Score: pending
Violations Introduced: pending
