
import { Character } from '../types/gameTypes';
import { colors } from '@/shared/styles/tokens/colors';

export const isCharacterAlive = (health: number, sanity: number): boolean => {
  return health > 0 && sanity > 0;
};

export const isCharacterDying = (health: number, sanity: number): boolean => {
  if (!isCharacterAlive(health, sanity)) return false;
  return health <= 30 || sanity <= 30;
};

export const getCharacterStatusMessage = (health: number, sanity: number): string => {
  if (!isCharacterAlive(health, sanity)) {
    return '사망';
  }
  
  const minStat = Math.min(health, sanity);
  
  if (minStat <= 20) return '위험';
  if (minStat <= 40) return '주의';  
  if (minStat <= 60) return '보통';
  return '건강';
};

export const enrichCharacterData = (
  baseCharacter: Character,
  updatedData: Partial<Character>
): Character => {
  const health = updatedData.charHealth ?? baseCharacter.charHealth;
  const sanity = updatedData.charSanity ?? baseCharacter.charSanity;

  return {
    ...baseCharacter,
    ...updatedData,
    alive: isCharacterAlive(health, sanity),
    statusMessage: getCharacterStatusMessage(health, sanity)
  };
};

export const createCharacterFromAPI = (apiData: {
  charId: number;
  charName: string;
  charHealth: number;
  charSanity: number;
  hasGameProgress?: boolean;
  createdAt?: string;
}): Character => {
  const { charHealth, charSanity } = apiData;

  return {
    charId: apiData.charId,
    charName: apiData.charName,
    charHealth,
    charSanity,
    alive: isCharacterAlive(charHealth, charSanity),
    statusMessage: getCharacterStatusMessage(charHealth, charSanity),
    hasGameProgress: apiData.hasGameProgress || false,
    createdAt: apiData.createdAt
  };
};

export const getCharacterStatusColor = (health: number, sanity: number): string => {
  if (!isCharacterAlive(health, sanity)) return colors.error;
  if (isCharacterDying(health, sanity)) return colors.warning;

  const minStat = Math.min(health, sanity);
  if (minStat <= 40) return colors.warning;
  if (minStat <= 60) return '#eab308';
  return colors.success;
};
