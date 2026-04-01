import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';

const MAX_AVATAR_SIZE_MB = 2;
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024;

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
  }, [isProfileOpen, profileHubRef]);

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

  const handleImageChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      event.target.value = '';

      if (!file) return;
      setProfileNotice('');

      if (!file.type.startsWith('image/')) {
        setProfileError('Selecione uma imagem valida.');
        return;
      }

      if (file.size > MAX_AVATAR_SIZE_BYTES) {
        setProfileError(`A imagem deve ter no maximo ${MAX_AVATAR_SIZE_MB}MB.`);
        return;
      }

      if (!auth.currentUser) {
        setProfileError('Sessao invalida. Faca login novamente.');
        return;
      }

      setProfileError('');
      setProfileNotice('');
      setIsUploading(true);

      try {
        const fileRef = storageRef(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(auth.currentUser, { photoURL });
        setProfileData((current) => ({ ...current, photoURL }));
        setProfileNotice('Foto atualizada com sucesso.');
      } catch {
        setProfileError('Falha no upload da imagem. Tente novamente.');
      } finally {
        setIsUploading(false);
      }
    },
    [],
  );

  return {
    isProfileOpen,
    isEditingName,
    editNameValue,
    isSavingName,
    isUploading,
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
    setNewPassword,
    handleToggleProfile,
    handleToggleEditingName,
    handleSaveName,
    handleUpdatePassword,
    handleLogout,
    handleTriggerFilePicker,
    handleImageChange,
  };
}
