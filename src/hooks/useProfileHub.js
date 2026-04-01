import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';

const MAX_AVATAR_SIZE_MB = 2;
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024;

function getProfileData(user) {
  return {
    displayName: String(user?.displayName || '').trim(),
    email: String(user?.email || '').trim(),
    photoURL: String(user?.photoURL || '').trim(),
  };
}

export default function useProfileHub({ profileHubRef, fileInputRef }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
        setIsEditingName(false);
        setProfileError('');
        setProfileNotice('');
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

  const handleToggleProfile = useCallback(() => {
    setIsProfileOpen((current) => !current);
    setIsEditingName(false);
    setProfileError('');
    setProfileNotice('');
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
  }, []);

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
    profileError,
    profileNotice,
    profileData,
    displayName,
    email,
    avatarInitial,
    maxAvatarSizeMb: MAX_AVATAR_SIZE_MB,
    setEditNameValue,
    handleToggleProfile,
    handleToggleEditingName,
    handleSaveName,
    handleLogout,
    handleTriggerFilePicker,
    handleImageChange,
  };
}
