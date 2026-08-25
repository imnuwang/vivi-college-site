import type { TarotCardId } from "@shared/tarot";

/**
 * Classical Rider–Waite–Smith Major Arcana scans are public-domain assets.
 * See research/tarot-classic-license.md for source and license rationale.
 */
const tarotArtBase = "https://raw.githubusercontent.com/imnuwang/vivi-college-site/master/netlify-assets/images/tarot-rws";

export const tarotArt: Record<TarotCardId, string> = {
  fool: `${tarotArtBase}/fool.jpg`,
  magician: `${tarotArtBase}/magician.jpg`,
  high_priestess: `${tarotArtBase}/high_priestess.jpg`,
  empress: `${tarotArtBase}/empress.jpg`,
  emperor: `${tarotArtBase}/emperor.jpg`,
  hierophant: `${tarotArtBase}/hierophant.jpg`,
  lovers: `${tarotArtBase}/lovers.jpg`,
  chariot: `${tarotArtBase}/chariot.jpg`,
  strength: `${tarotArtBase}/strength.jpg`,
  hermit: `${tarotArtBase}/hermit.jpg`,
  wheel: `${tarotArtBase}/wheel.jpg`,
  justice: `${tarotArtBase}/justice.jpg`,
  hanged_man: `${tarotArtBase}/hanged_man.jpg`,
  death: `${tarotArtBase}/death.jpg`,
  temperance: `${tarotArtBase}/temperance.jpg`,
  devil: `${tarotArtBase}/devil.jpg`,
  tower: `${tarotArtBase}/tower.jpg`,
  star: `${tarotArtBase}/star.jpg`,
  moon: `${tarotArtBase}/moon.jpg`,
  sun: `${tarotArtBase}/sun.jpg`,
  judgement: `${tarotArtBase}/judgement.jpg`,
  world: `${tarotArtBase}/world.jpg`,
};
