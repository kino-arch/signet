// @origin signet-native
import { SignetSection } from '@/components/layout/SignetSection';
import { SignetWell } from '@/components/layout/SignetWell';
import { SignetCard } from '@/components/primitives/SignetCard';
import { motion } from 'motion/react';

const testimonials = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/47919550?v=4',
    name: 'Meschac Irung',
    role: 'Frontend Engineer',
    quote: 'Signet got me interviews at top tier tech companies within weeks of rewriting my resume. It has been a game-changer for my career.',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/68236786?v=4',
    name: 'Theo Balick',
    role: 'Product Manager',
    quote: 'The ATS optimization feature alone is worth its weight in gold. Passed initial screening 90% of the time and saved me hours.',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    name: 'Sarah Johnson',
    role: 'DevOps Engineer',
    quote: 'Elegant, intuitive, and highly effective. This is exactly how modern career tools should be built. Highly recommended.',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/34567890?v=4',
    name: 'Aisha Patel',
    role: 'Data Scientist',
    quote: 'I struggled to translate my technical skills into recruiter-friendly terms. Signet’s AI handled it perfectly on the first try.',
  },
];

export function SignetTestimonials() {
  return (
    <SignetSection variant="default" className="py-24">
      <SignetWell size="hero">
        <div className="space-y-4 mb-14 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-balance text-4xl font-extrabold tracking-tight text-white"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from the professionals who have transformed their job search and landed their dream roles with our platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <SignetCard className="flex h-full flex-col justify-between gap-6 rounded-2xl p-8 bg-card border-border hover:border-white/10 hover:shadow-xl transition-all duration-300">
                <p className="text-white text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border border-white/10 bg-white/5">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </SignetCard>
            </motion.div>
          ))}
        </div>
      </SignetWell>
    </SignetSection>
  );
}
