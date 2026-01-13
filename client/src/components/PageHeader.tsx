import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  align?: "center" | "left";
}

export function PageHeader({ title, subtitle, image, align = "center" }: PageHeaderProps) {
  return (
    <div className="relative bg-secondary overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28">
      {/* Background Image with Overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10" />
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      )}

      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[length:24px_24px]" />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 md:mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
