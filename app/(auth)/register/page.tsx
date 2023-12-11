import RegisterForm from '@/app/ui/register-form';
import ReliefHubLogo from '@/app/ui/relief-hub-logo';

const RegisterPage = () => {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end bg-gray-700 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <ReliefHubLogo />
          </div>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
