import { Avatar as FlowbiteAvatar, Dropdown } from 'flowbite-react';
import { useUserInfo } from '@/contexts/user-context';
import { useRouter } from 'next/navigation';

type Props = {
  name: string;
};

const AvatarComponent: React.FC<Props> = ({ name, ...props }) => {
  return (
    <div
      className="flex gap-2 items-center bg-green-700 p-2 rounded-2xl w-fit cursor-pointer"
      {...props}
    >
      <FlowbiteAvatar img="" alt="avatar of Jese" rounded />
      <p className="text-amber-50">{name}</p>
    </div>
  );
};

export const Avatar: React.FC<Props> = (props) => {
  const { user, logoutUser } = useUserInfo();
  const { push } = useRouter();

  const logout = () => {
    push('/login');
    logoutUser();
  };

  const dropdownItems = {
    admin: [
      {
        label: 'Cadastrar Médico',
        route: '/add-doctor',
      },
      {
        label: 'Cadastrar Paciente',
        route: '/add-patient',
      },
    ],
  };

  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => <AvatarComponent {...props} />}
    >
      {dropdownItems[user?.role?.description]?.map(({ label, route }) => (
        <Dropdown.Item key={label} onClick={() => push(route)}>
          {label}
        </Dropdown.Item>
      ))}
      <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
    </Dropdown>
  );
};
