import React, { useState } from 'react';
import { Character } from '../../types/gameTypes';
import { useCharacterCreate } from '../../hooks/useCharacterCreate';
import { CharacterCreationHeader } from './CharacterCreationHeader';
import { CharacterStats } from './CharacterStats';
import { CharacterCreationFormUI } from './CharacterCreationFormUI';
import { CharacterFormInfo } from './CharacterFormInfo';

interface CharacterCreationFormProps {
  stationName: string;
  lineNumber: number;
  onCharacterCreated: (character: Character) => void;
  onError: (error: string) => void;
}

export const CharacterCreationForm: React.FC<CharacterCreationFormProps> = ({
  stationName,
  lineNumber,
  onCharacterCreated,
  onError
}) => {
  const {
    charName,
    isLoading,
    nameError,
    setCharName,
    setNameError,
    handleCreateCharacter,
    generateRandomName,
    validateName,
  } = useCharacterCreate({
    returnUrl: '',
    stationName,
    lineNumber: lineNumber.toString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validateName(charName);
    if (!isValid) {
      return;
    }

    try {
      await handleCreateCharacter();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '캐릭터 생성에 실패했습니다';
      onError(errorMessage);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setCharName(value);
      if (nameError) setNameError('');
    }
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      width: '100%', 
      textAlign: 'center' 
    }}>
      <CharacterCreationHeader 
        stationName={stationName}
        lineNumber={lineNumber.toString()}
      />

      <CharacterStats />

      <CharacterCreationFormUI
        charName={charName}
        validationError={nameError}
        isLoading={isLoading}
        onNameChange={handleNameChange}
        onSubmit={handleSubmit}
        onGenerateRandomName={generateRandomName}
      />

      <div style={{ marginTop: '1.5rem' }}>
        <CharacterFormInfo />
      </div>

      <div style={{
        marginTop: '1rem',
        fontSize: '0.875rem',
        color: 'var(--text-tertiary)',
        textAlign: 'center'
      }}>
        캐릭터는 한 번에 하나만 생성할 수 있습니다
      </div>
    </div>
  );
};