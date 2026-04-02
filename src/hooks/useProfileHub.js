import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
// getCroppedImg retorna um Data URL (Base64 JPEG 160x160), sem uso de Storage.
import getCroppedImg from '../utils/getCroppedImg';

const MAX_AVATAR_SIZE_MB = 2;

function getProfileData(user) {
  return {
    displayName: String(user?.displayName || '').trim(),
    email: String(user?.email || '').trim(),
    photoURL: String(user?.photoURL || '').trim(),
    providerIds: Array.isArray(user?.providerData)
      ? user.providerData.map((provider) => provider?.providerId).filter(Boolean)
      : [],
  };
}

export default function useProfileHub({ profileHubRef, fileInputRef }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);
  const [profileError, setProfileError] = useState('');
  const [profileNotice, setProfileNotice] = useState('');
  const [profileData, setProfileData] = useState(() => getProfileData(auth.currentUser));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const nextProfile = getProfileData(user);
      setProfileData(nextProfile);
      setEditNameValue(nextProfile.displayName);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isProfileOpen) return undefined;

    const handlePointerDown = (event) => {
      if (imageSrc) return;

      if (!profileHubRef.current?.contains(event.target)) {
        setIsProfileOpen(false);
        setIsEditingName(false);
        setProfileError('');
        setProfileNotice('');
        setPasswordFeedback(null);
        setNewPassword('');
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (imageSrc) {
          if (!isUploading) {
            setImageSrc(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
          }
          return;
        }

        setIsProfileOpen(false);
        setIsEditingName(false);
        setProfileError('');
        setProfileNotice('');
        setPasswordFeedback(null);
        setNewPassword('');
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [imageSrc, isProfileOpen, isUploading, profileHubRef]);

  const displayName = useMemo(
    () => profileData.displayName || 'Usuario ICEV',
    [profileData.displayName],
  );
  const email = useMemo(
    () => profileData.email || 'usuario@somosicev.com',
    [profileData.email],
  );
  const avatarInitial = useMemo(() => {
    const avatarSeed = profileData.displayName || profileData.email || 'U';
    return avatarSeed.charAt(0).toUpperCase();
  }, [profileData.displayName, profileData.email]);
  const isEmailUser = useMemo(
    () => profileData.providerIds.includes('password'),
    [profileData.providerIds],
  );

  const handleToggleProfile = useCallback(() => {
    setIsProfileOpen((current) => !current);
    setIsEditingName(false);
    setProfileError('');
    setProfileNotice('');
    setPasswordFeedback(null);
    setNewPassword('');
    setEditNameValue(profileData.displayName);
  }, [profileData.displayName]);

  const handleToggleEditingName = useCallback(() => {
    setIsEditingName((current) => !current);
    setProfileError('');
    setEditNameValue(profileData.displayName);
  }, [profileData.displayName]);

  const handleSaveName = useCallback(
    async (event) => {
      event.preventDefault();
      if (isSavingName) return;

      const normalizedName = editNameValue.trim().replace(/\s+/g, ' ');
      if (normalizedName.length < 2) {
        setProfileError('Digite um nome valido.');
        return;
      }

      if (!auth.currentUser) {
        setProfileError('Sessao invalida. Faca login novamente.');
        return;
      }

      setIsSavingName(true);
      setProfileError('');

      try {
        await updateProfile(auth.currentUser, { displayName: normalizedName });
        setProfileData((current) => ({ ...current, displayName: normalizedName }));
        setIsEditingName(false);
      } catch {
        setProfileError('Nao foi possivel atualizar o nome.');
      } finally {
        setIsSavingName(false);
      }
    },
    [editNameValue, isSavingName],
  );

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    setIsProfileOpen(false);
    setIsEditingName(false);
    setProfileError('');
    setProfileNotice('');
    setPasswordFeedback(null);
    setNewPassword('');
  }, []);

  const handleUpdatePassword = useCallback(
    async (event) => {
      event.preventDefault();
      if (isUpdatingPassword) return;

      const normalizedPassword = newPassword.trim();
      if (normalizedPassword.length < 6) {
        setPasswordFeedback({
          type: 'error',
          message: 'A nova senha deve ter no minimo 6 caracteres.',
        });
        return;
      }

      if (!auth.currentUser) {
        setPasswordFeedback({
          type: 'error',
          message: 'Sessao invalida. Faca login novamente.',
        });
        return;
      }

      setIsUpdatingPassword(true);
      setPasswordFeedback(null);

      try {
        await updatePassword(auth.currentUser, normalizedPassword);
        setNewPassword('');
        setPasswordFeedback({
          type: 'success',
          message: 'Senha atualizada com sucesso!',
        });
      } catch (error) {
        if (error?.code === 'auth/requires-recent-login') {
          setPasswordFeedback({
            type: 'error',
            message: 'Por seguranca, faca logout e login novamente para trocar sua senha.',
          });
        } else {
          setPasswordFeedback({
            type: 'error',
            message: 'Nao foi possivel atualizar a senha.',
          });
        }
      } finally {
        setIsUpdatingPassword(false);
      }
    },
    [isUpdatingPassword, newPassword],
  );

  const handleTriggerFilePicker = useCallback(() => {
    if (isUploading) return;
    setProfileNotice('');
    fileInputRef.current?.click();
  }, [fileInputRef, isUploading]);

  const resetCropState = useCallback(() => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, []);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCancelCrop = useCallback(() => {
    if (isUploading) return;
    resetCropState();
  }, [isUploading, resetCropState]);

  const handleImageChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      event.target.value = '';

      if (!file) return;
      setProfileNotice('');

      if (!file.type.startsWith('image/')) {
        setProfileError('Selecione uma imagem valida.');
        return;
      }

      if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
        setProfileError(`A imagem deve ter no maximo ${MAX_AVATAR_SIZE_MB}MB.`);
        return;
      }

      if (!auth.currentUser) {
        setProfileError('Sessao invalida. Faca login novamente.');
        return;
      }

      setProfileError('');
      setProfileNotice('');
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') {
          setProfileError('Nao foi possivel preparar a imagem selecionada.');
          return;
        }

        setImageSrc(reader.result);
      };
      reader.onerror = () => {
        setProfileError('Nao foi possivel ler o arquivo selecionado.');
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleConfirmCrop = useCallback(async () => {
    if (isUploading) return;

    if (!auth.currentUser) {
      setProfileError('Sessao invalida. Faca login novamente.');
      resetCropState();
      return;
    }

    if (!imageSrc || !croppedAreaPixels) {
      setProfileError('Nao foi possivel preparar o recorte da imagem.');
      resetCropState();
      return;
    }

    setProfileError('');
    setProfileNotice('');
    setIsUploading(true);

    try {
      // 1. Gera o Data URL (Base64 JPEG 160x160) via canvas — sem Storage
      const photoURL = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Sanidade: verifica que o resultado é um data URL válido
      if (typeof photoURL !== 'string' || !photoURL.startsWith('data:image/')) {
        throw new Error('Falha ao gerar o recorte da imagem.');
      }

      // 2. Salva o Base64 diretamente no perfil do Firebase Auth
      //    Não há upload de Storage — a imagem vive no próprio perfil do usuário
      await updateProfile(auth.currentUser, { photoURL });

      // 3. Recarrega o usuário para sincronizar o estado com o servidor
      await auth.currentUser.reload();

      // 4. Atualiza o estado local (reflete imediatamente na UI)
      setProfileData((current) => ({ ...current, photoURL }));
      setProfileNotice('Foto atualizada com sucesso.');
    } catch (error) {
      const errorMessage = error?.message ? String(error.message) : 'erro desconhecido';
      setProfileError(`Erro ao enviar: ${errorMessage}`);
    } finally {
      // Garante que o loading SEMPRE seja desligado — previne loop infinito
      setIsUploading(false);
      setImageSrc(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [croppedAreaPixels, imageSrc, isUploading, resetCropState]);

  return {
    isProfileOpen,
    isEditingName,
    editNameValue,
    isSavingName,
    isUploading,
    imageSrc,
    crop,
    zoom,
    newPassword,
    isUpdatingPassword,
    passwordFeedback,
    profileError,
    profileNotice,
    profileData,
    displayName,
    email,
    avatarInitial,
    isEmailUser,
    maxAvatarSizeMb: MAX_AVATAR_SIZE_MB,
    setEditNameValue,
    setCrop,
    setZoom,
    setNewPassword,
    handleToggleProfile,
    handleToggleEditingName,
    handleSaveName,
    handleUpdatePassword,
    handleLogout,
    handleTriggerFilePicker,
    handleCropComplete,
    handleCancelCrop,
    handleConfirmCrop,
    handleImageChange,
  };
}
