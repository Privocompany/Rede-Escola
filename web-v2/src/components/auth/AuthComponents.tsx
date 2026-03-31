'use client';
import {
  memo,
  ReactNode,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  forwardRef,
} from 'react';
import Image from 'next/image';
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// ==================== Input Component ====================

const Input = memo(
  forwardRef(function Input(
    { className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          rgba(104, 53, 214, 0.15),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='group/input rounded-xl p-[2px] transition duration-300'
      >
        <input
          type={type}
          className={cn(
            `shadow-card flex h-12 w-full rounded-xl border border-ui-divider/50 bg-white px-4 py-2 text-sm text-text-primary transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-placeholder focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  })
);

Input.displayName = 'Input';

// ==================== BoxReveal Component ====================

type BoxRevealProps = {
  children: ReactNode;
  width?: string;
  boxColor?: string;
  duration?: number;
  delay?: number;
  overflow?: string;
  position?: string;
  className?: string;
};

const BoxReveal = memo(function BoxReveal({
  children,
  width = 'fit-content',
  boxColor,
  duration,
  delay,
  overflow = 'hidden',
  position = 'relative',
  className,
}: BoxRevealProps) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible');
      mainControls.start('visible');
    } else {
      slideControls.start('hidden');
      mainControls.start('hidden');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      ref={ref}
      style={{
        position: position as
          | 'relative'
          | 'absolute'
          | 'fixed'
          | 'sticky'
          | 'static',
        width,
        overflow,
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: duration ?? 0.5, delay: delay ?? 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
        initial='hidden'
        animate={slideControls}
        transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? '#6835D6',
          borderRadius: 4,
        }}
      />
    </div>
  );
});

// ==================== Ripple Component ====================

type RippleProps = {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
};

const Ripple = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 11,
  className = '',
}: RippleProps) {
  return (
    <div
      className={`max-w-[100%] absolute inset-0 flex items-center justify-center
        dark:bg-white/5 bg-transparent
        [mask-image:radial-gradient(circle,black,transparent)]
        dark:[mask-image:radial-gradient(circle,white,transparent)] ${className}`}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
        const borderOpacity = 5 + i * 5;

        return (
          <span
            key={i}
            className='absolute animate-ripple rounded-full bg-brand-purple/10 border'
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animationDelay: animationDelay,
              borderStyle: borderStyle,
              borderWidth: '1px',
              borderColor: `rgba(104, 53, 214, ${borderOpacity / 100})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
});

// ==================== OrbitingCircles Component ====================

type OrbitingCirclesProps = {
  className?: string;
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
};

const OrbitingCircles = memo(function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          className='pointer-events-none absolute inset-0 size-full'
        >
          <circle
            className='stroke-black/5 stroke-1 dark:stroke-white/10'
            cx='50%'
            cy='50%'
            r={radius}
            fill='none'
          />
        </svg>
      )}
      <div
        style={
          {
            '--duration': `${duration}s`,
            '--radius': radius,
            '--delay': `-${delay}s`,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  );
});

// ==================== TechOrbitDisplay Component ====================

type IconConfig = {
  className?: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
  component: () => React.ReactNode;
};

type TechnologyOrbitDisplayProps = {
  iconsArray: IconConfig[];
  text?: string;
};

const TechOrbitDisplay = memo(function TechOrbitDisplay({
  iconsArray,
  text = 'Rede Escola',
}: TechnologyOrbitDisplayProps) {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg'>
      <span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-brand-purple to-brand-blue bg-clip-text text-center text-7xl font-black leading-none text-transparent blur-[1px] opacity-20'>
        {text}
      </span>

      {iconsArray.map((icon, index) => (
        <OrbitingCircles
          key={index}
          className={icon.className}
          duration={icon.duration}
          delay={icon.delay}
          radius={icon.radius}
          path={icon.path}
          reverse={icon.reverse}
        >
          {icon.component()}
        </OrbitingCircles>
      ))}
    </div>
  );
});

// ==================== AnimatedForm Component ====================

type FieldType = 'text' | 'email' | 'password';

type Field = {
  label: string;
  id: string;
  required?: boolean;
  type: FieldType;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type AnimatedFormProps = {
  header: string;
  subHeader?: string;
  fields: Field[];
  submitButton: string;
  textVariantButton?: string;
  errorField?: string;
  fieldPerRow?: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  googleLogin?: string;
  goTo?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type Errors = {
  [key: string]: string;
};

const AnimatedForm = memo(function AnimatedForm({
  header,
  subHeader,
  fields,
  submitButton,
  textVariantButton,
  errorField,
  fieldPerRow = 1,
  onSubmit,
  googleLogin,
  goTo,
}: AnimatedFormProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const toggleVisibility = () => setVisible(!visible);

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const currentErrors: Errors = {};
    fields.forEach((field) => {
      const value = (event.target as HTMLFormElement)[field.id]?.value;

      if (field.required && !value) {
        currentErrors[field.id] = `${field.label} é necessário`;
      }

      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        currentErrors[field.id] = 'Email inválido';
      }

      if (field.type === 'password' && value && value.length < 6) {
        currentErrors[field.id] =
          'A senha deve ter no mínimo 6 caracteres';
      }
    });
    return currentErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formErrors = validateForm(event);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(event);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='w-full max-w-sm flex flex-col gap-4 mx-auto'>
      <BoxReveal boxColor='rgba(104, 53, 214, 0.2)' duration={0.3}>
        <h2 className='font-black text-4xl text-text-primary mb-1 tracking-tight'>
          {header}
        </h2>
      </BoxReveal>

      {subHeader && (
        <BoxReveal boxColor='rgba(104, 53, 214, 0.2)' duration={0.3} className='pb-2'>
          <p className='text-text-secondary font-medium text-base'>
            {subHeader}
          </p>
        </BoxReveal>
      )}

      {googleLogin && (
        <div className="space-y-4">
          <BoxReveal
            boxColor='rgba(104, 53, 214, 0.2)'
            duration={0.3}
            overflow='visible'
            width='100%'
          >
            <button
              className='group/btn bg-white w-full rounded-2xl border border-ui-divider h-14 font-black text-text-primary hover:bg-ui-wash smooth shadow-card flex items-center justify-center gap-3 active:scale-[0.98]'
              type='button'
              onClick={() => console.log('Google login clicked')}
            >
              <Image
                src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
                width={24}
                height={24}
                alt='Google Icon'
              />
              {googleLogin}
              <BottomGradient />
            </button>
          </BoxReveal>

          <BoxReveal boxColor='rgba(104, 53, 214, 0.2)' duration={0.3} width='100%'>
            <div className='flex items-center gap-4 py-2'>
              <hr className='flex-1 border-ui-divider' />
              <p className='text-text-placeholder font-bold text-xs uppercase tracking-widest'>
                Ou com email
              </p>
              <hr className='flex-1 border-ui-divider' />
            </div>
          </BoxReveal>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={cn(
            "grid gap-4",
            fieldPerRow === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          )}
        >
          {fields.map((field) => (
            <div key={field.id} className='flex flex-col gap-2'>
              <BoxReveal boxColor='rgba(104, 53, 214, 0.2)' duration={0.3}>
                <Label htmlFor={field.id}>
                  {field.label} {field.required && <span className='text-brand-orange'>*</span>}
                </Label>
              </BoxReveal>

              <BoxReveal
                width='100%'
                boxColor='rgba(104, 53, 214, 0.2)'
                duration={0.3}
                className='flex flex-col space-y-1 w-full'
              >
                <div className='relative'>
                  <Input
                    type={
                      field.type === 'password'
                        ? visible
                          ? 'text'
                          : 'password'
                        : field.type
                    }
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    onChange={field.onChange}
                  />

                  {field.type === 'password' && (
                    <button
                      type='button'
                      onClick={toggleVisibility}
                      className='absolute inset-y-0 right-4 flex items-center text-text-secondary hover:text-brand-purple smooth'
                    >
                      {visible ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  )}
                </div>

                <div className='h-4'>
                  {errors[field.id] && (
                    <p className='text-brand-orange text-[10px] font-black uppercase tracking-wide'>
                      {errors[field.id]}
                    </p>
                  )}
                </div>
              </BoxReveal>
            </div>
          ))}
        </div>

        <BoxReveal width='100%' boxColor='rgba(104, 53, 214, 0.2)' duration={0.3}>
          {errorField && (
            <p className='text-brand-orange text-sm font-bold mb-4'>{errorField}</p>
          )}
        </BoxReveal>

        <BoxReveal
          width='100%'
          boxColor='rgba(104, 53, 214, 0.2)'
          duration={0.3}
          overflow='visible'
        >
          <button
            className='bg-brand-purple hover:bg-brand-purple-hover text-white w-full rounded-2xl h-14 font-black shadow-float smooth active:scale-[0.98] relative group/btn overflow-hidden'
            type='submit'
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {submitButton} &rarr;
            </span>
            <BottomGradient />
          </button>
        </BoxReveal>

        {textVariantButton && goTo && (
          <BoxReveal boxColor='rgba(104, 53, 214, 0.2)' duration={0.3} width="100%">
            <div className='mt-6 text-center'>
              <button
                type="button"
                className='text-sm font-black text-brand-purple hover:underline smooth'
                onClick={goTo}
              >
                {textVariantButton}
              </button>
            </div>
          </BoxReveal>
        )}
      </form>
    </div>
  );
});

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand-blue to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-brand-purple to-transparent' />
    </>
  );
};

// ==================== AuthTabs Component ====================

interface AuthTabsProps {
  formFields: {
    header: string;
    subHeader?: string;
    fields: Array<{
      label: string;
      id: string;
      required?: boolean;
      type: 'text' | 'email' | 'password';
      placeholder: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }>;
    submitButton: string;
    textVariantButton?: string;
  };
  goTo: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AuthTabs = memo(function AuthTabs({
  formFields,
  goTo,
  handleSubmit,
}: AuthTabsProps) {
  return (
    <div className='flex justify-center w-full min-h-screen items-center'>
      <AnimatedForm
        {...formFields}
        fieldPerRow={1}
        onSubmit={handleSubmit}
        goTo={goTo}
        googleLogin='Login com Google'
      />
    </div>
  );
});

// ==================== Label Component ====================

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

const Label = memo(function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-black text-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase tracking-widest',
        className
      )}
      {...props}
    />
  );
});

// ==================== Exports ====================

export {
  Input,
  BoxReveal,
  Ripple,
  OrbitingCircles,
  TechOrbitDisplay,
  AnimatedForm,
  AuthTabs,
  Label,
  BottomGradient,
};
