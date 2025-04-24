export interface Account {
    _id?: string,
    name?: string,
    username?: string,
    passwordHash?: string,
    email?: string,
    phoneNumber?: string,
    roleNum?: number,
    role?: string,
    profileImage?: {
        publicId?: string,
        url?: string,
    },
}

export interface RoleChangeRequest {
    id: number,
    accountId: string,
    creationTime: string,
    newRoleNum: number,
}

export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Velocity {
    x_dot: number;
    y_dot: number;
    z_dot: number;
}

export interface PositionCovariance {
    cr_r: number;
    ct_r: number;
    ct_t: number;
    cn_r: number;
    cn_t: number;
    cn_n: number;
}

export interface VelocityCovariance {
    crdot_r: number;
    crdot_t: number;
    crdot_n: number;
    crdot_rdot: number;
    ctdot_r: number;
    ctdot_t: number;
    ctdot_n: number;
    ctdot_rdot: number;
    ctdot_tdot: number;
    cndot_r: number;
    cndot_t: number;
    cndot_n: number;
    cndot_rdot: number;
    cndot_tdot: number;
    cndot_ndot: number;
}

export interface CDMObject {
    object: string;
    objectDesignator: string;
    catalogName: string;
    objectName: string;
    internationalDesignator: string;
    objectType: string;
    operatorOrganization: string;
    covarianceMethod: string;
    maneuverable: string;
    referenceFrame: string;
    position: Position;
    velocity: Velocity;
    positionCovariance: PositionCovariance;
    velocityCovariance: VelocityCovariance;
}

export interface CDM {
    _id: string;
    ccsdsCdmVers: string;
    creationDate: string;
    originator: string;
    messageId: string;
    tca: string;
    missDistance: number;
    collisionProbability: number;
    object1: CDMObject;
    object2: CDMObject;
}

export interface Event {
    _id: string;
    eventName: string;
    primaryObjectDesignator: string;
    primaryObjectName: string;
    primaryObjectType: string;
    secondaryObjectDesignator: string;
    secondaryObjectName: string;
    secondaryObjectType: string;
    tca: string; // or Date, depending on your API
    missDistances: [number];
    collisionProbabilities: [number];
    primaryOperatorOrganization: string;
    secondaryOperatorOrganization: string;
}