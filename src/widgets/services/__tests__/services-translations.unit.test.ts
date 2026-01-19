import { describe, it, expect } from 'vitest'
import enTranslations from '@/i18n/locales/en.json'
import esTranslations from '@/i18n/locales/es.json'

describe('Services Translations', () => {
  describe('English translations', () => {
    it('should have services section in English locale', () => {
      expect(enTranslations.services).toBeDefined()
    })

    it('should have section header translations', () => {
      expect(enTranslations.services.label).toBe('Services')
      expect(enTranslations.services.title).toBe('WHAT I CAN DO')
      expect(enTranslations.services.subtitle).toBeDefined()
    })

    it('should have all 6 service card translations', () => {
      const cards = enTranslations.services.cards
      expect(cards['custom-software']).toBeDefined()
      expect(cards['legacy-migration']).toBeDefined()
      expect(cards['multi-platform']).toBeDefined()
      expect(cards['ai-integration']).toBeDefined()
      expect(cards['ux-ui-design']).toBeDefined()
      expect(cards['landing-pages']).toBeDefined()
    })

    it('should have title and description for each service', () => {
      const cards = enTranslations.services.cards
      Object.values(cards).forEach((card) => {
        expect(card.title).toBeDefined()
        expect(card.title).not.toBe('')
        expect(card.description).toBeDefined()
        expect(card.description).not.toBe('')
      })
    })
  })

  describe('Spanish translations', () => {
    it('should have services section in Spanish locale', () => {
      expect(esTranslations.services).toBeDefined()
    })

    it('should have section header translations', () => {
      expect(esTranslations.services.label).toBe('Capacidades')
      expect(esTranslations.services.title).toBe('ECOSISTEMA DE INGENIERÍA')
      expect(esTranslations.services.subtitle).toBeDefined()
    })

    it('should have all 6 service card translations', () => {
      const cards = esTranslations.services.cards
      expect(cards['custom-software']).toBeDefined()
      expect(cards['legacy-migration']).toBeDefined()
      expect(cards['multi-platform']).toBeDefined()
      expect(cards['ai-integration']).toBeDefined()
      expect(cards['ux-ui-design']).toBeDefined()
      expect(cards['landing-pages']).toBeDefined()
    })

    it('should have title and description for each service', () => {
      const cards = esTranslations.services.cards
      Object.values(cards).forEach((card) => {
        expect(card.title).toBeDefined()
        expect(card.title).not.toBe('')
        expect(card.description).toBeDefined()
        expect(card.description).not.toBe('')
      })
    })
  })

  describe('Translation structure consistency', () => {
    it('should have matching keys between English and Spanish', () => {
      const enKeys = Object.keys(enTranslations.services.cards)
      const esKeys = Object.keys(esTranslations.services.cards)

      expect(enKeys.sort()).toEqual(esKeys.sort())
    })

    it('should have same structure for section headers', () => {
      expect(Object.keys(enTranslations.services)).toEqual(
        Object.keys(esTranslations.services)
      )
    })
  })
})
