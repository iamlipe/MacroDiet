import { FirebaseError } from 'firebase/app';

export const handleErrorAuth = (error: FirebaseError): string => {
  let errorMessage = 'Ocorreu um erro no Firebase Authentication.';

  switch (error.code) {
    case 'auth/invalid-email':
      errorMessage = 'O endereço de e-mail informado é inválido.';
      break;
    case 'auth/user-disabled':
      errorMessage = 'Este usuário foi desativado.';
      break;
    case 'auth/user-not-found':
      errorMessage = 'Nenhum usuário encontrado com as credenciais informadas.';
      break;
    case 'auth/wrong-password':
      errorMessage = 'A senha informada está incorreta.';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'O endereço de e-mail informado já está em uso.';
      break;
    case 'auth/weak-password':
      errorMessage =
        'A senha informada é fraca. Por favor, escolha uma senha mais forte.';
      break;
    default:
      errorMessage =
        'Ocorreu um erro no Firebase Authentication. Por favor, tente novamente.';
      break;
  }

  return errorMessage;
};

export const handleErrorFirestore = (error: FirebaseError): string => {
  let errorMessage = 'Ocorreu um erro no Firebase Firestore.';

  switch (error.code) {
    case 'permission-denied':
      errorMessage = 'Acesso negado. Verifique suas permissões de acesso.';
      break;
    case 'not-found':
      errorMessage = 'Documento não encontrado.';
      break;
    case 'already-exists':
      errorMessage = 'O documento já existe.';
      break;
    default:
      errorMessage =
        'Ocorreu um erro no Firebase Firestore. Por favor, tente novamente.';
      break;
  }

  return errorMessage;
};
