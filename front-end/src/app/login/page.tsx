'use client';

import { FormEvent, useState } from 'react';
import Cookies from 'js-cookie';

import { Toast } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/contexts/user-context';

export default function Login() {
  const [showToast, setShowToast] = useState(false);
  const { push } = useRouter();
  const { updateUser } = useUserInfo();

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = new FormData(event.currentTarget);

    const authResponse = await fetch('/api/auth', {
      method: 'POST',
      body: values,
    }).then((response) => response.json());

    if (authResponse.error) {
      return setShowToast(true);
    }

    setShowToast(false);
    Cookies.set('user', JSON.stringify(authResponse.data));
    updateUser();
    push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <div className="flex flex-col bg-blue-300 bg-opacity-10">
        <h1 className="text-green-800 text-center text-2xl pt-6">
          MedScheduler
        </h1>
        <form
          method="post"
          onSubmit={formSubmitHandler}
          className="flex flex-col items-center h-fit justify-center px-16 py-32 rounded-lg gap-2"
        >
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Senha" />

          <button
            className="bg-blue-500 text-white p-2 rounded-lg my-4"
            type="submit"
          >
            Conectar-se
          </button>
          {showToast && (
            <Toast>
              <div className="ml-3 text-sm font-normal">
                Usuário ou senha inválidos
              </div>
              <Toast.Toggle onDismiss={() => setShowToast(false)} />
            </Toast>
          )}
        </form>
      </div>
    </div>
  );
}
