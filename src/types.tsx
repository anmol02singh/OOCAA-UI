export interface Account {
  _id?: string;
  name?: string;
  username?: string;
  passwordHash?: string;
  email?: string;
  phoneNumber?: string;
  roleNum?: number;
  role?: string;
  profileImage?: {
    publicId?: string;
    url?: string;
  };
}

export interface RoleChangeRequest {
    _id?: string,
    accountId: string,
    creationTime: string,
    newRoleNum: number,
    newRole: string,
}

export interface Position {
    comment: string;
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
    comment: string;
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

export interface DragCovariance {
  cdrg_r: number;
  cdrg_t: number;
  cdrg_n: number;
  cdrg_rdot: number;
  cdrg_tdot: number;
  cdrg_ndot: number;
  cdrg_drg: number;
}

export interface SrpCovariance {
  csrp_r: number;
  csrp_t: number;
  csrp_n: number;
  csrp_rdot: number;
  csrp_tdot: number;
  csrp_ndot: number;
  csrp_drg: number;
  csrp_srp: number;
}

export interface ThrCovariance {
  cthr_r: number;
  cthr_t: number;
  cthr_n: number;
  cthr_rdot: number;
  cthr_tdot: number;
  cthr_ndot: number;
  cthr_drg: number;
  cthr_srp: number;
  cthr_thr: number;
}

export interface RelativePosition {
  r: number;
  t: number;
  n: number;
  rUnit: string;
  tUnit: string;
  nUnit: string;
}

export interface RelativeVelocity {
  r: number;
  t: number;
  n: number;
  rUnit: string;
  tUnit: string;
  nUnit: string;
}

export interface ScreenVolume {
  x: number;
  y: number;
  z: number;
}

export interface CDMObject {
  comment: string;
  object: string;
  objectDesignator: string;
  catalogName: string;
  objectName: string;
  internationalDesignator: string;
  objectType: string;
  operatorOrganization: string;
  operatorContactPosition: string;
  operatorPhone: string;
  operatorEmail: string;
  ephemerisName: string;
  covarianceMethod: string;
  maneuverable: string;
  referenceFrame: string;
  gravityModel: string;
  atmosphericModel: string;
  nBodyPerturbations: string;
  solarRadPressure: string;
  earthTides: string;
  inTrackThrust: string;
  commentCovarianceScaleFactor: string;
  commentExclusionVolumeRadius: string;
  commentApogee: string;
  commentPerigee: string;
  commentInclination: string;
  commentOperatorHardBodyRadius: string;
  commentScreeningDataSource: string;
  timeLastobStart: string;
  timeLastobEnd: string;
  recommendedOdSpan: number;
  recommendedOdSpanUnit: string;
  actualOdSpan: number;
  actualOdSpanUnit: string;
  obsAvailable: number;
  obsUsed: number;
  tracksAvailable: number;
  tracksUsed: number;
  residualsAccepted: number;
  residualsAcceptedUnit: string;
  weightedRms: number;
  areaPC: number;
  areaPCUnit: string;
  areaDRG: number;
  areaSRP: number;
  mass: number;
  cdAreaOverMass: number;
  cdAreaOverMassUnit: string;
  crAreaOverMass: number;
  crAreaOverMassUnit: string;
  thrustAcceleration: number;
  thrustAccelerationUnit: string;
  sedr: number;
  sedrUnit: string;
  position: Position;
  velocity: Velocity;
  commentDcpDensityForecastUncertainty: string;
  commentDcpSensitivityVectorPosition: string;
  commentDcpSensitivityVectorVelocity: string;
  positionCovariance: PositionCovariance;
  velocityCovariance: VelocityCovariance;
  dragCovariance: DragCovariance;
  srpCovariance: SrpCovariance;
  thrCovariance: ThrCovariance;
}

export interface CDM {
  _id: string;
  event: string;
  constellation: string;
  cdmId: string;
  fileName: string;
  insertEpoch: string;
  ccsdsCdmVers: string;
  comment: string;
  creationDate: string;
  originator: string;
  messageFor: string;
  messageId: string;
  commentEmergencyReportable: string;
  tca: string;
  missDistance: number;
  missDisatnceUnit: string;
  relativeSpeed: number;
  relativeSpeedUnit: string;
  relativePosition: RelativePosition;
  relativeVelocity: RelativeVelocity;
  startScreenPeriod: string;
  stopScreenPeriod: string;
  screenVolumeFrame: string;
  screenVolumeShape: string;
  screenVolume: ScreenVolume;
  screenEntryTime: string;
  screenExitTime: string;
  commentScreeningOption: string;
  collisionProbability: number;
  collisionProbabilityMethod: string;
  commentEffectiveHBR: string;
  object1: CDMObject;
  object2: CDMObject;
  gid: string;
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
  tca: string;
  missDistances: [number];
  collisionProbabilities: [number];
  primaryOperatorOrganization: string;
  secondaryOperatorOrganization: string;
}

  export interface WatchlistEntry {
    _id: string;
    user: string;
    searchParams: SearchParams[];
    tcaRange: [number, number];
    missDistanceOperator: string;
    missDistanceValue?: number;
    collisionProbabilityOperator: string;
    collisionProbabilityValue?: number;
    operatorOrganization: string;
    createdAt: string;
  }

export interface SearchParams {
  id: number;
  criteria: string;
  value: string;
}

export interface ObjectTypeCounts {
  payload: number;
  debris: number;
  rocketBody: number;
  unknown: number;
  other: number;
  total: number;
}
