
export const cdmCount = async (data) => {
    return data.length;
};

export const closestMiss = async (data) => {
    let closestMissDistance = Infinity;
    let closestMissCDM = "N/A";
    for (const cdm of data) {
        if (cdm.missDistance < closestMissDistance) {
            closestMissDistance = cdm.missDistance;
            closestMissCDM = cdm.messageId;
        }
    }
    return [closestMissDistance, closestMissCDM];
};

export const largestCollisionProbability = async (data) => {
    let largestP = 0;
    let largestP_CDM = "N/A";
    for (const cdm of data) {
        if (cdm.collisionProbability > largestP) {
            largestP = cdm.collisionProbability;
            largestP_CDM = cdm.messageId;
        }
    }
    return [largestP, largestP_CDM];
};

export const eventCount = async (data) => {
    const events = new Set(data.filter(cdm => 'event' in cdm).map(cdm => cdm.event.eventName));
    return events.size;
};

export const objectCount = async (data) => {
    const objects1 = new Set(data.filter(cdm => 'object1' in cdm).map(cdm => cdm.object1.object));
    const objects2 = new Set(data.filter(cdm => 'object2' in cdm).map(cdm => cdm.object2.object));
    return (new Set([...objects1, ...objects2])).size;
};
