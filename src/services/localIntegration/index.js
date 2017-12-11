export function getVocabularies() {
    return new Promise(function(resolve, reject) {
        resolve([
            { id: 1, title: '1', url: '1' },
            { id: 2, title: '2', url: '2' },
        ]);
    });
}

export function addVocabulary(template) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

export function updateVocabulary(template) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

export function deleteVocabulary(templateId) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}
