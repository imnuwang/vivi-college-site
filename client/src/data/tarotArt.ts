import type { TarotCardId } from "@shared/tarot";

/**
 * Classical Rider–Waite–Smith Major Arcana scans are public-domain assets.
 * See research/tarot-classic-license.md for source and license rationale.
 */
const tarotArtBase = "/assets/images/tarot-rws";

export const tarotArt: Record<TarotCardId, string> = {
  fool: `${tarotArtBase}/fool.webp`,
  magician: `${tarotArtBase}/magician.webp`,
  high_priestess: `${tarotArtBase}/high_priestess.webp`,
  empress: `${tarotArtBase}/empress.webp`,
  emperor: `${tarotArtBase}/emperor.webp`,
  hierophant: `${tarotArtBase}/hierophant.webp`,
  lovers: `${tarotArtBase}/lovers.webp`,
  chariot: `${tarotArtBase}/chariot.webp`,
  strength: `${tarotArtBase}/strength.webp`,
  hermit: `${tarotArtBase}/hermit.webp`,
  wheel: `${tarotArtBase}/wheel.webp`,
  justice: `${tarotArtBase}/justice.webp`,
  hanged_man: `${tarotArtBase}/hanged_man.webp`,
  death: `${tarotArtBase}/death.webp`,
  temperance: `${tarotArtBase}/temperance.webp`,
  devil: `${tarotArtBase}/devil.webp`,
  tower: `${tarotArtBase}/tower.webp`,
  star: `${tarotArtBase}/star.webp`,
  moon: `${tarotArtBase}/moon.webp`,
  sun: `${tarotArtBase}/sun.webp`,
  judgement: `${tarotArtBase}/judgement.webp`,
  world: `${tarotArtBase}/world.webp`,
};
