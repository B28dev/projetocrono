import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import getCroppedImg from '../utils/getCroppedImg';

const MAX_AVATAR_SIZE_MB = 2;

function getProfileData(user) {
  return {
    displayName: String(user?.displayName || '').trim(),
    email: String(user?.email || '').trim(),
    photoURL: String(user?.photoURL || '').trim(),
    avatarBase64: '',
    providerIds: Array.isArray(user?.providerData)
      ? user.providerData.map((provider) => provider?.providerId).filter(Boolean)
      : [],
  };
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    if (!(blob instanceof Blob)) {
      reject(new Error('Formato de imagem invalido para conversao.'));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Nao foi possivel converter o recorte para Base64.'));
    reader.readAsDataURL(blob);
  });
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);
  const [profileError, setProfileError] = useState('');
  const [profileNotice, setProfileNotice] = useState('');
  const [profileData, setProfileData] = useState(() => getProfileData(auth.currentUser));

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      void (async () => {
        const nextProfile = getProfileData(user);

        if (!user) {
          if (!isMounted) return;
          setProfileData(nextProfile);
          setEditNameValue(nextProfile.displayName);
          return;
        }

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          const avatarBase64 = userDoc.exists() ? String(userDoc.data()?.avatarBase64 || '').trim() : '';

          if (!isMounted) return;
          setProfileData({
            ...nextProfile,
            avatarBase64,
          });
          setEditNameValue(nextProfile.displayName);
        } catch {
          if (!isMounted) return;
          setProfileData(nextProfile);
          setEditNameValue(nextProfile.displayName);
        }
      })();
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (passwordFeedback?.type !== 'success') return undefined;

    const timeoutId = window.setTimeout(() => {
      setPasswordFeedback(null);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [passwordFeedback]);

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
        setConfirmPassword('');
        setShowNewPassword(false);
        setShowConfirmPassword(false);
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
        setConfirmPassword('');
        setShowNewPassword(false);
        setShowConfirmPassword(false);
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
  const passwordReady = useMemo(() => {
    const normalizedPassword = newPassword.trim();
    const normalizedConfirmPassword = confirmPassword.trim();
    return (
      normalizedPassword.length >= 6 &&
      normalizedConfirmPassword.length >= 6 &&
      normalizedPassword === normalizedConfirmPassword
    );
  }, [confirmPassword, newPassword]);

  const handleToggleProfile = useCallback(() => {
    setIsProfileOpen((current) => !current);
    setIsEditingName(false);
    setProfileError('');
    setProfileNotice('');
    setPasswordFeedback(null);
    setNewPassword('');
    setConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
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
    setConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  }, []);

  const handleToggleNewPasswordVisibility = useCallback(() => {
    setShowNewPassword((current) => !current);
  }, []);

  const handleToggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((current) => !current);
  }, []);

  const handleUpdatePassword = useCallback(
    async (event) => {
      event.preventDefault();
      if (isUpdatingPassword) return;

      const normalizedPassword = newPassword.trim();
      const normalizedConfirmPassword = confirmPassword.trim();
      if (normalizedPassword.length < 6) {
        setPasswordFeedback({
          type: 'error',
          message: 'A nova senha deve ter no minimo 6 caracteres.',
        });
        return;
      }

      if (normalizedPassword !== normalizedConfirmPassword) {
        setPasswordFeedback({
          type: 'error',
          message: 'As senhas devem ser iguais.',
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
        setConfirmPassword('');
        setShowNewPassword(false);
        setShowConfirmPassword(false);
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
    [confirmPassword, isUpdatingPassword, newPassword],
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
      const croppedResult = await getCroppedImg(imageSrc, croppedAreaPixels);
      const avatarBase64 = typeof croppedResult === 'string'
        ? croppedResult
        : await blobToDataUrl(croppedResult);

      if (typeof avatarBase64 !== 'string' || !avatarBase64.startsWith('data:image/')) {
        throw new Error('Falha ao gerar o recorte da imagem.');
      }

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email || '',
          avatarBase64,
        },
        { merge: true },
      );

      setProfileData((current) => ({ ...current, avatarBase64 }));
      setProfileNotice('Foto atualizada com sucesso.');
    } catch (error) {
      const errorMessage = error?.message ? String(error.message) : 'erro desconhecido';
      setProfileError(`Erro ao enviar: ${errorMessage}`);
    } finally {
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
    confirmPassword,
    showNewPassword,
    showConfirmPassword,
    passwordReady,
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
    setConfirmPassword,
    handleToggleProfile,
    handleToggleEditingName,
    handleToggleNewPasswordVisibility,
    handleToggleConfirmPasswordVisibility,
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
