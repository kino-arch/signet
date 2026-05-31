import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <Mail className="mr-2 h-3 w-3" />
            Contact
          </Badge>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Whether you're looking for an enterprise plan or need technical assistance with your resume, our team is ready to help.
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
              <div className="mb-4 inline-flex  bg-secondary p-3">
                <MessageSquare className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Support</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                For immediate assistance or technical queries regarding the platform.
              </p>
              <div className="font-mono text-sm text-primary">
                support@signet.com
              </div>
            </Card>

            <Card className="border-border/50 bg-card p-6 shadow-md">
              <div className="mb-4 inline-flex  bg-secondary p-3">
                <Mail className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Enterprise Sales</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                For bulk licenses or custom ATS integrations for your company.
              </p>
              <div className="font-mono text-sm text-primary">
                sales@signet.com
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
                    alert("Message sent to our team.");
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" className="bg-background/50" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Enter your message..." 
                      className="min-h-[120px] bg-background/50"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Send Message
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
