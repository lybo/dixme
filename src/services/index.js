import * as integration from './localIntegration/';

//VOCABULARY
export function getVocabularies() {
    return integration.getVocabularies();
}

export function addVocabulary(template) {
    return integration.addVocabulary(template);
}

export function updateVocabulary(template) {
    return integration.updateVocabulary(template);
}

export function deleteVocabulary(templateId) {
    return integration.deleteVocabulary(templateId);
}
