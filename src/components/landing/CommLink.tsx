import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";

export function CommLink() {
  return (
    <section id="commlink" className="w-full bg-background py-16 md:py-24">
      <div className="relative z-10 container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <Mail className="mr-2 h-3 w-3" />
            Comm-Link
          </Badge>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Transmit a Signal
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Whether you seek an enterprise alliance or require assistance in the Forge, our Covert stands ready to answer.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <Card className="border-border/50 bg-card p-6 shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
                <MessageSquare className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Direct Channel</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                For immediate assistance or technical queries regarding the Forge algorithms.
              </p>
              <div className="font-mono text-sm text-primary">
                transmit@signetforge.dev
              </div>
            </Card>

            <Card className="border-border/50 bg-card p-6 shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
                <Mail className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Enterprise Bounties</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                For bulk licenses or custom ATS integrations for your guild.
              </p>
              <div className="font-mono text-sm text-primary">
                guilds@signetforge.dev
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border/50 bg-card shadow-md">
              <CardContent className="p-6 md:p-8">
                <form 
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // In a real implementation, this would send to an API.
                    // For now, we alert to show it's wired up.
                    alert("Transmission sent to the Covert.");
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Designation</Label>
                    <Input id="name" placeholder="Mando" className="bg-background/50" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Comm-Link Address (Email)</Label>
                    <Input id="email" type="email" placeholder="mando@covert.com" className="bg-background/50" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Transmission</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Enter your message..." 
                      className="min-h-[120px] bg-background/50"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Send Transmission
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
